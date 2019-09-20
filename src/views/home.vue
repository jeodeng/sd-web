<template>
  <div class="home">
    <div class="home-top">
      <div class="home-logo">
        <span>
          This is a Logo
        </span>
      </div>
      <div class="home-search">
        <div class="search-box">
          <div class="el-icon-search"></div>
          <input class="input" type="text" v-model="input" placeholder="search...">
          <div class="el-icon-search btn"></div>
        </div>

      </div>
      <div class="home-cart">
        <div class="cart-box">
          <i class="el-icon-shopping-cart-2"></i>
          <span>Cart</span>
        </div>
      </div>
    </div>
    <swiper></swiper>
    <div class="home-main">
      <h4 class="home-list-title">
        ★ On Sale ★
      </h4>
      <div class="home-list">
        <good-view v-for="i in 20" :key="i"></good-view>
      </div>
      <div class="home-list-more">
        <el-button type="text">More >></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '@/components/swiper.vue';
import goodView from '@/components/goodView.vue';

export default {
  components: {
    swiper,
    goodView,
  },
  data() {
    return {
      input: '',
    };
  },
};
</script>

<style lang='less'>
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
          border: 2px solid #4e4e4e;
          border-radius: 30px;
          width: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 38px;
          box-sizing: border-box;

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
            background-color: #4e4e4e;
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
          border: 2px solid #4e4e4e;
          line-height: 34px;
          font-size: 16px;

          span {
            margin-left: 6px;
          }
        }
      }
    }

    .home-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .good-view {
        width: 18%;
        height: 274px;
        margin-top: 28px;

        .view-main {
          padding: 10px 0;
        }
      }
    }

    .home-list-more {
      text-align: right;
    }

    .home-list-title {
      background: #d61818;
      color: rgb(247, 247, 247);
      text-align: center;
      line-height: 60px;
      font-size: 30px;
      margin-top: 28px;
      font-weight: 600;
    }
  }
</style>
