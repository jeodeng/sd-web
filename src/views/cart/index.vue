<template>
  <div class="cart-page">
    <div class="cart-page-title">
      Shopping Cart
    </div>

    <div class="cart-page-list">
      <el-table
      border
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange">
        <el-table-column
          align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="Products">
          <template slot-scope="scope">
            <div class="cart-page-list-item">
              <div class="img">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="scope.row.imgPath"
                  :preview-src-list="[scope.row.imgPath]">
                </el-image>
              </div>
              <div class="name">
                {{ scope.row.productName }}
              </div>
              <div class="other">
                <!-- {{ scope.row.productType && scope.row.productType.value }} -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="ASIN"
          prop="productAsin"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="Quality"
          prop="quality"
          width="80">
        </el-table-column>
        <el-table-column label="Operations" width="96" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="cart-page-button">
      <el-button type="primary" size="small" @click="handleGet">GET</el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getValidProducts, getFreeProducts } from '@/api/product';
import storage from '@/utils/storage'

export default {
  beforeRouteEnter(to, from, next) {
    const token = getToken();

    if (!token) next('/home');
    next();
  },
  data() {
    return {
      searchName: '',
      list: [],
      tips: {
        delete: 'Are you sure to remove the product?',
        sure: 'Are you sure these products are what you want?',
        success: 'Your application is waiting for the staff to process. Please wait patiently. We will inform you of the result by mail.',
        amazon: 'Your account has not yet been bound to Amazon account, Amazon ID to get products, do you want to bind Amazon account immediately?',
        login: 'This operation needs to be logged in first. Is it logged in immediately?',
      },
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    handleSelectionChange(val) {
      this.selects = val;
    },
    // 从购物车移除
    async handleDelete(item, flag = true) {
      if (flag) {
        await this.$confirm(this.tips.delete, 'Tips', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        });
      }

      const { list } = this;
      const filter = list.filter(i => i.productId !== item.productId);
      storage.set('cart', filter);
      this.$store.commit('SET_CART_LIST', filter);
      this.initList();
    },
    // 初始化购物车列表
    initList() {
      const cart = storage.get('cart');
      const list = cart || [];
      const result = list.reduce((acc, cur) => {
        if (acc[cur.productId]) {
          acc[cur.productId].quality = acc[cur.productId].quality + 1;
        } else {
          acc[cur.productId] = Object.assign({}, cur);
          acc[cur.productId].quality = 1;
        }
        return acc;
      }, {});
      this.list = Object.entries(result).map(kv => kv[1]);
      this.selects = [];
    },
    // 获取请求
    async handleGet() {
      if (this.selects && this.selects.length <= 0) {
        this.$message.warning('Please choose the product you want.');
        return;
      }
      await this.$confirm(this.tips.sure, 'Tips', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning'
      });

      await Promise.all(this.selects.map(data => this.handleGetGood(data)));
      this.$message.success(this.tips.success);
      await Promise.all(this.selects.map(data => this.handleDelete(data, false)));
      this.selects = [];
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
  },
};
</script>

<style lang='scss'>
  .cart-page {
    padding: 32px 0;

    &-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 32px;
    }

    .cart-page-list-item {
      display: flex;
      align-items: center;

      > div {
        margin-right: 14px;
      }
    }

    .cart-page-button {
      margin-top: 32px;
      text-align: right;

      .el-button {
        width: 120px;
      }
    }
  }
</style>
