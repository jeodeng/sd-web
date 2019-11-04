<template>
  <div class="home">
    <div class="home-category">
      <div class="home-category-left">
        <div class="home-category-tag" v-for="i in productTypeKeys" :key="i.key">{{ i.name }}</div>
      </div>
      <div class="home-category-right">
        <swiper></swiper>
      </div>
    </div>
    <div class="home-main">
      <div class="home-list-title">
        <h4>Influencer Specials</h4>
        <div class="home-list-more">
          <el-button type="text" @click="goMore">>>></el-button>
        </div>
      </div>
      <div class="home-list" v-if="!loading">
        <good-view
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          @get="handleGetGood"
          @cart="handleAddCart"
          @detail="handleGoDetail">
        </good-view>
      </div>
      <div class="home-list-loading" v-else>
        <div>
          <i class="el-icon-loading"></i>
        </div>
        <div>
          <span>Loading...</span>
        </div>
      </div>
      <div class="home-list-more" v-show="list && list.length > 0">
        <el-button type="text" @click="goMore">More >></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProducts, getValidProducts, getFreeProducts } from '@/api/product';
import { getDics } from '@/api/common';
import storage from '@/utils/storage';
import goodView from '@/components/goodView.vue';
import swiper from '@/components/swiper.vue';

export default {
  components: {
    goodView,
    swiper,
  },
  data() {
    return {
      searchName: '',
      list: [],
      tips: {
        amazon: 'Your account has not yet been bound to Amazon account, Amazon ID to get products, do you want to bind Amazon account immediately?',
        success: 'Your application is waiting for the staff to process. Please wait patiently. We will inform you of the result by mail.',
        login: 'This operation needs to be logged in first. Is it logged in immediately?',
      },
      loading: false,
      productTypeKeys: [],
    };
  },
  computed: {
    ...mapGetters([
      'country',
    ]),
  },
  watch: {
    country(val) {
      this.getProductsList();
    },
  },
  mounted() {
    this.getProductsList();
    this.getProductTypeKeys();
  },
  methods: {
    handleSearch() {
      this.$router.push({ path: '/category', query: { searchName: this.searchName }});
    },
    // 立即获取
    async handleGetGood(data) {
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
          if (err.errorMsg) this.$message.error(err.errorMsg);
        }
        console.log(err);
      }
    },
    // 加载商品列表
    async getProductsList() {
      const payload = {
        pageId: 1,
        size: 20,
        quertData: {
          country: this.country,
          type: 0,
          status: 1,
          searchName: this.searchName,
        },
      };

      this.loading = true;
      this.list = [];
      const { data: res } = await getProducts(payload);
      this.list = res.records;
      this.loading = false;
    },
    // 加入购物车
    async handleAddCart(data) {
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
        if (err.errorMsg) this.$message.error(err.errorMsg);
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
    goMore() {
      this.$router.push('/category');
    },
    // 获取产品类型字典
    async getProductTypeKeys() {
      const { data } = await getDics('product_type');
      this.productTypeKeys = Object.entries(data).map((kv) => ({ key: kv[0], name: kv[1] }));
    },
    handleGoDetail(data) {
      this.$router.push({ path: '/product', query: { productId: data.productId }});
    },
  },
};
</script>

<style lang='scss'>
  .home {
    margin-bottom: 40px;

    .home-category {
      margin-top: 10px;
      display: flex;
      height: 340px;

      .home-category-left {
        background: #fff;
        flex: 1;
        width: 200px;
        min-width: 200px;
        max-width: 200px;
        margin-right: 10px;
        box-sizing: border-box;
        padding: 10px;
        height: 100%;
        overflow: hidden;

        .home-category-tag {
          cursor: pointer;
          font-size: 14px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            color: #43d6ac;
          }
        }
      }

      .home-category-right {
        flex: 1;
        overflow: hidden;
        height: 100%;
      }
    }

    .home-list {
      display: flex;
      flex-wrap: wrap;

      .good-view {
        width: 220px;
        margin-top: 20px;
        margin-right: 24px;
        .view-main {
          padding: 10px 0 0;
        }
      }

      .good-view:nth-child(5n) {
        margin-right: 0;
      }
    }

    .home-list-title {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        color: #606266;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .home-list-title::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 2px;
      width: 200px;
      background-color: #606266;
    }

    .home-list-loading {
      box-sizing: border-box;
      padding-top: 100px;
      text-align: center;
      height: 400px;
      font-size: 30px;
      color: #909399;

      > div {
        margin-top: 10px;
      }
      .el-icon-loading {
        font-size: 50px;
      }
    }

    .home-list-more {
      text-align: right;
      .el-button {
        color: #606266;
      }
    }
  }
</style>
