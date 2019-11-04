<template>
<div class="product-detail">
  <div class="product-detail-main" v-if="data !== null">
    <div class="product-main-image">

    </div>
    <div class="product-main-info">

    </div>
  </div>
  <div class="product-detail-other">

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {

  },
};
</script>

<style lang='scss'>
  .product-detail {
    padding: 32px 0;

    .product-detail-main {
      padding: 50px;
      background: #fff;
      margin-bottom: 20px;
    }

    .product-detail-other {
      padding: 0 50px;
      background: #fff;
    }
  }
</style>
