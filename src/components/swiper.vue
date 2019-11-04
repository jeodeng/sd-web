<template>
  <!-- 轮播组件 -->
  <div
    class="swiper"
    :style="{ width, height }"
    @mouseenter="handleStopAuto"
    @mouseleave="handleStartAuto">
    <div class="image">
      <transition-group name="image">
        <el-image
          fit="fill"
          v-for="(img, ind) in list"
          :src="img.imgUrl"
          v-show="curDot === ind"
          :key="img.imgUrl">
        </el-image>
      </transition-group>
    </div>
    <div class="btns" v-if="list && list.length > 1">
      <div class="pre" @click="handleClickPre">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="next" @click="handleClickNext">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="dots" v-if="list && list.length > 1">
      <div
        class="dot"
        v-for="(dot, ind) in list"
        :key="ind"
        :class="{ active: curDot === ind }"
        @click="() => handleClickDot(ind)">
      </div>
    </div>
  </div>
</template>
<script>
import { getBanners } from '@/api/common';

export default {
  props: {
    banners: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: () => '100%',
    },
    width: {
      type: String,
      default: () => '100%',
    },
    isAuto: {
      type: Boolean,
      default: () => true,
    },
    timeout: {
      type: Number,
      default: () => 3500,
    },
  },
  data() {
    return {
      curDot: 0,
      timer: null,
      list: this.banners,
    };
  },
  activated() {
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const { data } = await getBanners();
      this.list = data;
      if (this.isAuto) this.handleStartAuto();
    },
    // 上一张
    handleClickPre() {
      const num = this.curDot;
      const len = this.list.length;

      // 当前已是第一张，返回最后一张
      if (num === 0) this.curDot = len - 1;
      else this.curDot = num - 1;
    },
    // 下一张
    handleClickNext() {
      const num = this.curDot;
      const len = this.list.length;

      // 当前已是最后一张，next返回第一张
      if (num === len - 1) this.curDot = 0;
      else this.curDot = num + 1;
    },
    handleClickDot(ind) {
      this.curDot = ind;
    },
    handleStartAuto() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.handleClickNext();
      }, this.timeout);
    },
    handleStopAuto() {
      clearInterval(this.timer);
    },
  },
};
</script>
<style lang='scss'>
  .swiper {
    position: relative;

    .image {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .el-image {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .btns {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) scaleY(1.2);
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;

      .pre, .next {
        cursor: pointer;
        transition: .3s;
        font-weight: 600;
        font-size: 32px;
        color: rgb(207, 207, 207);

        &:hover {
          color: #fff;
          transform: scale(1.3);
        }
      }
    }

    .dots {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 20px;
      width: 100%;

      .dot {
        cursor: pointer;
        transition: .3s;
        margin: 0 4px;
        width: 10px;
        height: 10px;
        background: #b3b3b3;
        border-radius: 50%;
      }

      .dot.active {
        background: #5674fa;
      }

    }

    .image-enter-active {  // 过渡
      transition: all 0.5s ease;
    }

    .image-leave-active {  // 过渡
      transition: all 0.5s ease;
    }

    .image-enter {  //  开始进入动画的位置
      transform: translateX(100%);
    }

    .image-leave-to {  // 结束消失的位置
      transform: translateX(-100%);
    }
  }
</style>
