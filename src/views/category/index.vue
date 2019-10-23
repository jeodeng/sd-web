<template>
<div class="category">
  <div class="category-title">
    <span @click="handleClickTag({})">All Products {{ curCategory === '' ? '' : '>' }}</span>
    <span class="tag" v-show="curCategory !== ''"> {{ curCategoryName }}</span>
  </div>
  <div class="category-search">
    <el-input placeholder="Please enter what you want" v-model="searchName" clearable>
      <el-button slot="append" icon="el-icon-search" @click="getProductsList()"></el-button>
    </el-input>
  </div>
  <div class="category-select">
    <div class="category-select-item">
      <div class="name">
        <span>Category</span>
      </div>
      <div class="value">
        <span class="category-tag" v-for="i in productTypeKeys" :key="i.key" @click="handleClickTag(i)">{{ i.name }}</span>
      </div>
    </div>
  </div>

  <div class="category-list" v-if="!loading && list && list.length > 0">
    <good-view v-for="(item, index) in list" :key="index" :data="item" @get="handleGetGood" @cart="handleAddCart"></good-view>
  </div>
  <div class="category-list-no" v-else-if="!loading && list && list.length === 0">
    No related products
  </div>
  <div class="category-list-loading" v-else>
    <div>
      <i class="el-icon-loading"></i>
    </div>
    <div>
      <span>Loading...</span>
    </div>
  </div>

  <div class="category-list-pagination">
    <el-pagination
      small
      background
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      @current-change="handleChangePage">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProducts, getValidProducts, getFreeProducts } from '@/api/product';
import { getDics } from '@/api/common';
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
      curCategory: '',
      pageSize: 10,
      pageNum: 1,
      total: 0,
      productTypeKeys: [],
    };
  },
  computed: {
    ...mapGetters([
      'country',
    ]),
    curCategoryName() {
      if (this.curCategory && this.productTypeKeys.length > 0) return this.productTypeKeys.find(i => i.key === this.curCategory).name;
      return '';
    },
  },
  watch: {
    country(val) {
      this.getProductsList();
    },
  },
  mounted() {
    const { searchName } = this.$router.currentRoute.query;
    if (searchName) this.searchName = searchName;
    this.getProductTypeKeys();
    this.getProductsList();
  },
  methods: {
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
    async getProductsList(params = {}) {
      const { pageSize, country, searchName, curCategory } = this;

      const payload = {
        pageId: params.pageNum || 1,
        size: pageSize,
        quertData: {
          country: country,
          type: 0,
          status: 1,
          searchName: searchName,
          productType: curCategory,
        },
      };

      this.loading = true;
      this.list = [];

      const { data: res } = await getProducts(payload);

      this.total = res.total;
      this.pageSize = res.size;
      this.pageNum = res.pageNum;
      this.list = res.records;
      this.loading = false;
    },
    handleClickTag({ key }) {
      this.searchName = '';
      this.curCategory = key || '';
      this.getProductsList();
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
    // 换页
    handleChangePage(page) {
      this.getProductsList({ pageNum: page });
    },
    // 获取产品类型字典
    async getProductTypeKeys() {
      const { data } = await getDics('product_type');
      this.productTypeKeys = Object.entries(data).map((kv) => ({ key: kv[0], name: kv[1] }));
    },
  }
};
</script>

<style lang='scss'>
  .category {
    padding: 32px 0;

    &-title {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 22px;
      height: 36px;

      span {
        cursor: pointer;
      }

      .tag {
        position: relative;
        top: 2px;
        margin-left: 10px;
        color: #5f5e5e;
        display: inline-block;
        border: 1px solid #5f5e5e;
        padding: 8px 28px;
        font-size: 14px;
      }
    }

    &-search {
      width: 400px;
      margin: 32px 0;

      .el-input-group__append,
      .el-input__inner {
        border-color: #bbbbbb;
      }
    }

    &-select {

      &-item {
        display: flex;
        border: 1px solid #bbbbbb;

        .name {
          border-right: 1px solid #bbbbbb;
          padding: 20px;
          display: flex;
          align-items: center;
        }

        .value {
          padding: 20px;
        }
      }
    }

    &-tag {
      display: inline-block;
      margin-right: 14px;
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;

      &:hover {
        color: #d61818;
      }
    }

    &-list {
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

      &-no {
        box-sizing: border-box;
        padding-top: 100px;
        text-align: center;
        height: 720px;
        font-size: 22px;
        color: #909399;
      }

      &-loading {
        box-sizing: border-box;
        padding-top: 100px;
        text-align: center;
        height: 720px;
        font-size: 22px;
        color: #909399;

        > div {
          margin-top: 10px;
        }
        .el-icon-loading {
          font-size: 50px;
        }
      }

      &-pagination {
        margin-top: 20px;
        text-align: center;

        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #d61818;
        }
      }
    }

  }
</style>
