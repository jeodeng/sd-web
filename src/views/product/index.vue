<template>
<div class="product">
  <div class="product-main" v-if="data !== null">
    <div class="product-main-image">
      <el-image
        style="width: 100%; height: 100%"
        :src="data.imgPath"
        :preview-src-list="[ data.imgPath ].concat(data.imgList)">
      </el-image>
    </div>
    <div class="product-main-info">
      <div class="primary">
        <span class="key">Rebate Type : &nbsp</span>
        <span class="value">Popular Rebates</span>
        <span>&nbsp &nbsp &nbsp &nbsp</span>
        <span class="key">Timing: &nbsp</span>
        <count-down class="time" :time="data.endDate"></count-down>
      </div>
      <div class="title">
        {{ data.productName }}
      </div>
      <div class="primary">
        <span class="key">Sales Channel : &nbsp</span>
        <span class="value">Amazon</span>
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content" v-html="channelTips.Amazon"></div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </div>
      <div class="price">
        <div class="price-item">
          <div class="p-i-v"> ${{ data.actualPrice }} </div>
          <div class="p-i-k"> Purchase Price </div>
        </div>
        <div class="price-item">
          <div class="p-i-v red"> ${{ data.actualPrice }} </div>
          <div class="p-i-k"> Rebate </div>
        </div>
        <div class="price-item">
          <div class="p-i-v red"> {{ data.productSku }} </div>
          <div class="p-i-k"> Left </div>
        </div>
        <!-- <div class="price-item">
          <div class="p-i-v"></div>
          <div class="p-i-k">Commission</div>
        </div> -->
      </div>
      <div class="primary">
        <span class="key">Tips : &nbsp</span>
        <span class="value">If there is a clipable coupon on the Amazon product page, please clip it when placing your order.</span>
      </div>
      <div class="primary" :style="{ alignItems: 'center' }">
        <span class="key">Price after Rebate : &nbsp</span>
        <span class="value sale"> ${{ data.discountPice }}</span>
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content" v-html="tips.paypal"></div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </div>

      <div class="button">
        <el-button size="small" type="primary" @click="() => handleGetGood()">Free Get<i class="el-icon-sell"></i></el-button>
        <el-button size="small" type="primary" class="red" @click="() => handleAddCart()">Add to Cart<i class="el-icon-shopping-cart-full"></i></el-button>
      </div>

      <div class="rules">
        <h4>Rebate Procedures:</h4>
        <procedures></procedures>
      </div>
    </div>
  </div>
  <div class="product-other" v-if="data !== null && (data.keyworder || data.remark)">
    <div class="product-other-item">
      <h4>Keywords</h4>
      <p v-if="data.keyworder">{{ data.keyworder }}</p>
      <p v-else>No Description</p>
    </div>
    <div class="product-other-item">
      <h4>Description</h4>
      <p v-if="data.remark">{{ data.remark }}</p>
      <p v-else>No Description</p>
    </div>
  </div>
</div>
</template>

<script>
import { getProductsDetail, getValidProducts, getFreeProducts } from '@/api/product';
import countDown from '@/components/countDown.vue';
import procedures from '@/components/procedures.vue';
import storage from '@/utils/storage';

export default {
  components: {
    countDown,
    procedures,
  },
  data() {
    return {
      data: null,
      channelTips: {
        Amazon: 'Members order from specifed seller at third party marketplace,<br/> and submit order ID to redeem rebate.',
      },
      tips: {
        paypal: 'Please consider that PayPal will <br/> deduct transaction fees upon <br/> withdrawing your money.',
        amazon: 'Your account has not yet been bound to Amazon account, Amazon ID to get products, do you want to bind Amazon account immediately?',
        success: 'Your application is waiting for the staff to process. Please wait patiently. We will inform you of the result by mail.',
        login: 'This operation needs to be logged in first. Is it logged in immediately?',
        same: 'The same store can only get it once in a month and a half',
      },
    };
  },
  async mounted() {
    const { query } = this.$router.currentRoute;
    if (query.productId === undefined) this.$router.push({ path: '/category' });
    this.init(query.productId)
  },
  methods: {
    async init(id) {
      const { data } = await getProductsDetail(id);

      this.data = {
        ...data,
        imgList: [],
      };
    },
    // 加入购物车
    async handleAddCart() {
      const data = this.data;
      const user = storage.get('user');
      if (!user) {
        await this.$confirm(this.tips.login, 'Tips', {
          confirmButtonText: 'Sure',
          type: 'warning'
        });

        this.$store.commit('toggleLogin', true);
        return;
      }

      try {
        await getValidProducts({
          userId: user.userId,
          productId: data.productId,
        });
      } catch (err) {
        if (err.errorMsg) this.$message.error(this.tips.same);
        return;
      }

      const list = JSON.parse(JSON.stringify(this.$store.state.cartList));

      if (list.find(i => i.productId === data.productId)) {
        this.$message.error('Only one can be added.');
        return;
      }
      list.push(data);

      storage.set('cart', list);
      this.$store.commit('SET_CART_LIST', list);
    },
    // 立即获取
    async handleGetGood() {
      const data = this.data;
      const user = storage.get('user');
      if (!user) {
        await this.$confirm(this.tips.login, 'Tips', {
          confirmButtonText: 'Sure',
          type: 'warning'
        });

        this.$store.commit('toggleLogin', true);
        return;
      }

      try {
        await getValidProducts({
          userId: user.userId,
          productId: data.productId,
        });

        await getFreeProducts({
          userId: user.userId,
          productId: data.productId,
        });

        await this.$confirm(this.tips.success, 'Tips', {
          confirmButtonText: 'Sure',
          type: 'success'
        });
      } catch (err) {
        if (err.code === 213) {
          await this.$confirm(this.tips.amazon, 'Tips', {
            confirmButtonText: 'Sure',
            cancelButtonText: 'Cancel',
            type: 'warning'
          });

          this.$router.push('/personal');
        } else {
          if (err.errorMsg) this.$message.error(this.tips.same);
        }
        console.log(err);
      }
    },
  },
};
</script>

<style lang='scss'>
  .product {
    padding: 32px 0;

    .product-main {
      padding: 30px 50px;
      background: #fff;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;

      .product-main-image {
        max-width: 400px;
        min-width: 400px;
        width: 400px;
        height: 480px;
        flex: 1;

      }

      .product-main-info {
        padding-left: 30px;
        flex: 1;

        .primary {
          margin: 10px 0;
          display: flex;
          font-size: 14px;
          .key {
            color: #666;
            display: inline-block;
            white-space: nowrap;
          }

          .value {
            color: #333;
            display: inline-block;
          }

          .time {
            display: inline-block;
            color: #d60e0a;
          }

          .sale {
            color: #d60e0a;
            font-size: 22px;
            font-weight: 600;
          }
        }

        .title {
          margin: 10px 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .el-tooltip {
          color: #999;
          margin-left: 4px;
        }

        .price {
          margin: 10px 0;
          padding: 20px 10px;
          display: flex;
          background-color: #f2f2f2;

          .price-item {
            text-align: center;
            flex: 1;
            border-right: 2px solid #999;
            line-height: 24px;
            font-weight: 600;
            font-size: 16px;

            &:last-child {
              border-right-color: transparent;
            }

            .red {
              color: #d60e0a;
            }
          }
        }

        .button {
          .el-button {
            width: 200px;
            font-size: 16px;
          }

          .el-icon-sell,
          .el-icon-shopping-cart-full {
            margin-left: 20px;
          }

          .red {
            background-color: #d60e0a;
            border-color: #d60e0a;

            &:hover {
              background-color: #ec3733;
            }
          }
        }

        .rules {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #666;
          width: 560px;

          h4 {
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
    }

    .product-other {
      padding: 0 50px;
      background: #fff;

      .product-other-item {
        padding: 20px;
        h4 {
          font-size: 16px;
          color: #232f3e;
          font-weight: bold;
          text-align: center;
          padding: 10px;
          margin-bottom: 20px;
        }

        p {
          white-space: pre-wrap;
          font-size: 13px;
          line-height: 1.6;
          color: #676767;
          padding-bottom: 10px;
        }
      }
    }
  }
</style>
