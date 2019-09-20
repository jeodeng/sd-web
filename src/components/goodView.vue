<template>
  <!-- view组件，不处理任何业务逻辑，仅展示商品数据 -->
  <div class="good-view">
    <div class="view-main">
      <div class="view-image">
        <img src="../assets/view.jpg" alt="">
      </div>
      <div class="view-title">xxxxxxx</div>
      <p class="view-des">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
      <div class="view-price">xxx</div>
      <div class="view-wrap">
        <el-button
          size="small"
          icon="el-icon-shopping-cart-full"
          @click="handleAddCart(data)">
          AAA
        </el-button>
        <el-button
          size="small"
          icon="el-icon-view"
          @click="handleViewDetail(data)">
          BBB
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
  activated() {
  },
  mounted() {
  },
  methods: {
    handleAddCart(item) {
      this.$emit('cart', item);
    },
    handleViewDetail(item) {
      this.$emit('detail', item);
    },
  },
};
</script>
<style lang='less'>
  .good-view {
    box-sizing: border-box;
    padding: 10px;

    .view-main {
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      width: 100%;
      height: 100%;
      box-shadow: 2px 2px 2px 0px rgba(72, 68, 66, 0.35);
      box-sizing: border-box;
      border: 1px solid rgba(72, 68, 66, 0.35);

      .view-title, .view-des, .view-price {
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
        line-height: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 14px;
        word-break: break-all;
      }

      .view-price {
        line-height: 16px;
        text-align: right;
        font-size: 14px;
      }

      .view-image {
        border-radius: 4px;
        height: calc(100% - 70px);
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
            margin-right: 8px;
          }
        }

      }

    }

    .view-main:hover .view-wrap {
      opacity: 1;
    }
  }
</style>
