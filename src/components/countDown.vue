<template>
  <!-- 倒计时组件 -->
  <div class="count-down">
    {{ str }}
  </div>
</template>
<script>
export default {
  props: {
    time: {
      type: [String, Number],
      default: () => parseInt(new Date().getTime() / 1000),
    },
  },
  data() {
    return {
      val: 0,
      str: '',
      timer: null,
    };
  },
  mounted() {
    this.val = this.time;
    this.initVal();

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.initVal();
    }, 1000);
  },
  methods: {
    initVal() {
      const { val } = this;
      const now = Number(new Date().getTime().toString().substr(0, 10));

      // 剩余的时间，秒
      let t = val - now;

      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      if (t > 0) {
        days = parseInt(t / 86400);
        t = t % 86400;

        if (t > 0) {
          hours = parseInt(t / 3600);
          t = t % 3600;

          if (t > 0) {
            minutes = parseInt(t / 60);
            t = t % 60;

            if (t > 0) seconds = t;
          }
        }
      }

      const fn = this.formatNum;
      const str = `${fn(days)}d:${fn(hours)}h:${fn(minutes)}m:${fn(seconds)}s`;
      this.str = str;
    },
    formatNum(num) {
      if (!num) return '00';
      if (num < 10) return `0${num}`;
      if (num >= 10) return num.toString();
    },
  },
};
</script>
<style>
  .count-down {
  }
</style>
