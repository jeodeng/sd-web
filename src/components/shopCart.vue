<template>
  <!-- 购物车组件 -->
  <div class="shop-cart">
    <el-badge :value="cartNum" class="item">
      <i class="cart-icon" :class="shopCartClass"></i>
    </el-badge>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
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
  },
  methods: {
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
        color: #d61818;
      }
    }

    .el-badge__content {
      background-color: #d61818;
    }
  }
</style>
