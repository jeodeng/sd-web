<template>
  <!-- 流程组件 -->
  <div class="procedures">
    <template v-for="(item, index) in steps">
      <div class="icon" :key="item.icon">
        <span :class="`iconfont icon-${item.icon}`" :style="{ color: item.color }"></span>
      </div>
      <div class="desc" :key="item.desc">{{ item.desc }}</div>
      <div class="next el-icon-right" :key="item.index" v-if="index !== steps.length - 1"></div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      steps: [
        { icon: 'confirm', desc: 'Pick product & Get Rebate', color: '#fe9abc' },
        { icon: 'order', desc: 'Make Purchase & Submit Order ID', color: '#12bcff' },
        { icon: 'Landtransportation', desc: 'Confirm Product Delivery', color: '#c19ce1' },
        { icon: 'paypal', desc: 'Withdraw Rebate to PayPal', color: '#9ae6d9' },
      ],
    };
  },
  activated() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style lang='scss'>
  .procedures {
    min-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .desc {
      width: 100px;
      font-size: 12px;
    }

    .icon {
      margin-right: 16px;
      .iconfont {
        font-size: 58px;
      }
    }

    .next {
      margin: 0 30px;
      font-size: 30px;
      text-align: center;
      color: #b5b5b5;
    }
  }
</style>
