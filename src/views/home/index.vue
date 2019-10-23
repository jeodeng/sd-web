<template>
  <div class="home">
    <div class="home-top">
      <div class="home-logo">
        <img src="../../assets/LOGO.png" alt="">
      </div>
      <div class="home-search">
        <div class="search-box">
          <div class="el-icon-search"></div>
          <input class="input" type="text" v-model="searchName" placeholder="search...">
          <div class="el-icon-search btn" @click="handleSearch"></div>
        </div>

      </div>
      <div class="home-view">
        <div class="home-view-btn" @click="goMore">
          <span>More Products</span>
        </div>
      </div>
    </div>
    <div class="home-main">
      <h4 class="home-list-title">
        ★ On Sale ★
      </h4>
      <div class="home-list" v-if="!loading">
        <good-view v-for="(item, index) in list" :key="index" :data="item" @get="handleGetGood" @cart="handleAddCart"></good-view>
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
import storage from '@/utils/storage';
import goodView from '@/components/goodView.vue';

export default {
  components: {
    goodView,
  },
  data() {
    return {
      searchName: '',
      list: [],
      tips: {
        amazon: 'Your account has not yet been bound to Amazon account, Amazon ID to get products, do you want to bind Amazon account immediately?',
        success: 'Your application is waiting for the staff to process. Please wait patiently. We will inform you of the result by mail.',
        // success: '您的领取申请正在等待工作人员处理，请耐心等待，我们会以邮件方式通知您结果。',
        login: 'This operation needs to be logged in first. Is it logged in immediately?',
        // login: '该操作需要先登录，是否立即登录？',
      },
      loading: false,
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
  },
};
</script>

<style lang='scss'>
  .home {
    .home-top {
      height: 100px;
      display: flex;

      .home-logo {
        flex: 1;
        max-width: 240px;
        min-width: 240px;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
      }

      .home-search {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        padding-right: 60px;

        .search-box {
          border: 2px solid #d61818;
          border-radius: 30px;
          width: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 38px;
          box-sizing: border-box;
          box-shadow: 2px 2px 2px 0px rgba(72, 68, 66, 0.35);

          .el-icon-search {
            flex: 1;
            max-width: 30px;
            min-width: 30px;
            font-size: 12px;
            text-align: center;
          }

          .el-icon-search.btn {
            max-width: 60px;
            min-width: 60px;
            color: white;
            background-color: #d61818;
            height: 100%;
            border-radius: 30px;
            line-height: 34px;
            font-size: 18px;
            cursor: pointer;
            margin-right: -1px;
          }

          .input {
            padding-right: 10px;
            flex: 1;
            border: none;
            font-size: 14px;
            background: transparent;
          }
        }
      }

      .home-cart {
        flex: 1;
        width: 160px;
        max-width: 160px;
        min-width: 160px;
        align-items: center;
        display: flex;
        justify-content: center;

        .cart-box {
          cursor: pointer;
          box-sizing: border-box;
          width: 108px;
          height: 38px;
          border-radius: 30px;
          text-align: center;
          border: 2px solid #d61818;
          line-height: 34px;
          font-size: 16px;

          span {
            margin-left: 6px;
          }
        }
      }

      .home-view {
        flex: 1;
        width: 160px;
        max-width: 160px;
        min-width: 160px;
        align-items: center;
        display: flex;
        justify-content: center;

        .home-view-btn {
          background-color: #d61818;
          width: 200px;
          height: 40px;
          line-height: 40px;
          color: rgb(247, 247, 247);
          text-align: center;
          cursor: pointer;
          transition: .3s;
          font-size: 16px;
          border-radius: 5px;
          box-shadow: 2px 2px 2px 0px rgba(72, 68, 66, 0.35);
        }
      }
    }

    .home-list {
      display: flex;
      flex-wrap: wrap;

      .good-view {
        width: 200px;
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

    .home-list-more {
      text-align: right;

      .el-button--text {
        color: #d61818;
      }
    }

    .home-list-title {
      background: #d61818;
      color: rgb(247, 247, 247);
      text-align: center;
      line-height: 60px;
      font-size: 30px;
      // margin-top: 28px;
      font-weight: 600;
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
  }
</style>
