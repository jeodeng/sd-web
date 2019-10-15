<template>
  <!-- view组件，不处理任何业务逻辑，仅展示商品数据 -->
  <div class="good-view">
    <div class="view-main">
      <div class="view-image">
        <img :src="data.imgPath" alt="">
      </div>
      <div class="view-title">{{ data.productName }}</div>
      <p class="view-des">{{ data.keyworder }}</p>
      <div class="view-other">
        <div class="view-left">
          <span>{{ data.productSku }}</span>
          left
        </div>
        <div class="view-end-time">
          <count-down :time="data.endDate"></count-down>
        </div>
      </div>
      <div class="view-price">
        <div class="value">
          <span class="now">
            $0.00
          </span>
          <span class="pre">
            ${{ data.foreignPrice }}
          </span>
        </div>
        <div class="cart" @click="handleAddCart">
          <i class="el-icon-shopping-cart-full"></i>
        </div>
      </div>
      <div class="view-button" @click="handleGetNow">
        Get Now
      </div>
      <!-- <div class="view-wrap">
        <el-button
          size="small"
          icon="el-icon-shopping-cart-full"
          @click="handleAddCart(data)">
          Add to Cart
        </el-button>
        <el-button
          size="small"
          icon="el-icon-star-on"
          @click="handleGetNow(data)">
          Get It Now
        </el-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import countDown from '@/components/countDown.vue';

export default {
  components: {
    countDown,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleAddCart() {
      this.$emit('cart', this.data);
    },
    handleGetNow() {
      this.$emit('get', this.data);
    },
  },
};
</script>
<style lang='scss'>
  .good-view {
    box-sizing: border-box;

    .view-main {
      border-radius: 4px;
      position: relative;
      width: 100%;
      height: 100%;
      box-shadow: 2px 2px 2px 0px rgba(72, 68, 66, 0.35);
      box-sizing: border-box;
      border: 1px solid rgba(72, 68, 66, 0.35);

      .view-title, .view-des, .view-price, .view-other {
        padding: 0 10px;

      }

      .view-title {
        overflow: hidden;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        font-weight: 600;
        text-overflow: ellipsis;
      }

      .view-des {
        padding-top: 6px;
        line-height: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 14px;
        word-break: break-all;
      }

      .view-price {
        padding-top: 4px;
        line-height: 22px;
        justify-content: space-between;
        align-items: center;
        display: flex;

        .value {
          .pre {
            padding-left: 2px;
            font-size: 12px;
            text-decoration: line-through;
            color: #9e9e9e;
          }

          .now {
            font-size: 18px;
            color: #e10000;
          }
        }

        .cart {
          cursor: pointer;
          width: 26px;
          height: 22px;
          font-size: 16px;
          color: white;
          background: #e10000;
          text-align: center;
          font-weight: 600;
          border-radius: 5px;
          line-height: 22px;
        }
      }

      .view-image {
        visibility: hidden;
        border-radius: 4px;
        height: 180px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .view-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(53, 53, 53, 0.35);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        display: flex;
        transition: .3s;
        opacity: 0;

        .el-button+.el-button {
          margin: 20px 0;
        }

        .el-button {
          width: 64%;
          font-size: 14px;

          i {
            margin-right: 4px;
          }
        }

      }

      .view-other {
        margin: 10px 0 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          color: #000;
        }
      }

      .view-left {
        color: #43d6ac;
        font-weight: 600;
      }

      .view-end-time {
        font-size: 12px;
        color: #000;
      }

      .view-button {
        cursor: pointer;
        width: 100%;
        text-align: center;
        height: 36px;
        background-color: #d61818;
        line-height: 34px;
        margin-top: 10px;
        color: #f1f1f1;
        font-weight: 600;
        font-size: 18px;
        transition: .1s;
      }

      .view-button:hover {
        color: #fff;
        background-color: #ca4141;
      }
    }

    // .view-main:hover .view-wrap {
    //   opacity: 1;
    // }
  }
</style>
