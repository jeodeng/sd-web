<template>
  <div id="app">
    <w-header></w-header>

    <div class="main container">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>

    <w-footer></w-footer>
  </div>
</template>
<script>
import wFooter from './components/footer.vue';
import wHeader from './components/header.vue';

export default {
  name: 'App',
  components: {
    wFooter,
    wHeader,
  },
};
</script>
<style lang="less">
  html, body {
    height: 100%;
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 5px;
  }

  .main {
    width: 1100px;
    margin: 0 auto;
  }

  .container {
    min-height: calc(100% - 40px);
    overflow-y: auto;
  }

  #app {
    box-sizing: border-box;
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    padding-bottom: 40px;
  }
</style>
