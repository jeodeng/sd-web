<template>
  <!-- 购物车组件 -->
  <div class="shop-cart" @click="goCart">
    <el-badge :value="cartNum" class="item">
      <i class="cart-icon" :class="shopCartClass"></i>
    </el-badge>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getToken } from '@/utils/auth'
import storage from '@/utils/storage'

export default {
  data() {
    return {
      tips: {
        login: 'This operation needs to be logged in first. Is it logged in immediately?',
      },
    };
  },
  computed: {
    ...mapGetters([
      'cartNum',
    ]),
    shopCartClass() {
      return this.$store.getters.cartNum ? 'el-icon-shopping-cart-full' : 'el-icon-shopping-cart-2';
    },
  },
  mounted() {
    const token = getToken();
    const cartList = storage.get('cart');

    if (token && cartList) {
      this.$store.commit('SET_CART_LIST', cartList);
    }
  },
  methods: {
    async goCart() {
      const token = getToken();

      if (!token) {
        await this.$confirm(this.tips.login, 'Tips', {
          confirmButtonText: 'Sure',
          type: 'warning'
        });

        this.$store.commit('toggleLogin', true);
        return;
      }

      this.$router.push('/cart');
    },
  },
};
</script>
<style lang='scss'>
  @media screen and (max-width: 1380px) {
      .shop-cart {
        right: 10px !important;
      }
  }

  .shop-cart {
    position: absolute;
    right: 100px;
    bottom: 200px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eaeaea;
    cursor: pointer;
    transition: .1s;

    .cart-icon {
      font-size: 30px;
      font-weight: 500;
      color: #606266d1;
      transition: .13s;
    }

    &:hover {
      background: #f9f9f9;

      .cart-icon {
        color: #43d6ac;
      }
    }

    .el-badge__content {
      background-color: #43d6ac;
    }
  }
</style>
