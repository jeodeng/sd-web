<template>
  <div id="app" :style="{ minWidth: '1300px' }">
    <w-header></w-header>
    <div class="main container">
      <!-- 路由出口 -->
      <router-view></router-view>

    </div>
    <w-footer></w-footer>
    <shop-cart v-show="hasShowCart"></shop-cart>

    <el-dialog
      title="Sign in to XXX"
      :visible="hasShowLogin"
      width="360px"
      :close-on-click-modal="false"
      :before-close="handleCloseSignIn">
      <div class="sign-in-dialog">
        <div class="account-item">
          <div class="ai-key">
            Email Address
          </div>
          <div class="ai-val">
            <el-input placeholder="请输入用户名" v-model="loginForm.username" size="small"></el-input>
          </div>
        </div>

        <div class="account-item">
          <div class="ai-key">
            Password
          </div>
          <div class="ai-val">
            <el-input placeholder="请输入密码" auto-complete="new-password" v-model="loginForm.password" show-password width="80%"></el-input>
          </div>
        </div>

        <div class="sign-in-dialog-btn">
          <el-button type="primary" @click="goLogin" size="small">Sign in</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="sign-in-dialog-tips">
          <span>New to XXX ? </span>
          <el-button type="text" @click="handleCloseSignIn">Create an account</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import wFooter from '@/components/footer.vue';
import wHeader from '@/components/header.vue';
import shopCart from '@/components/shopCart.vue';

const buildLoginForm = () => ({
  username: '345369367@qq.com',
  password: '123456',
});

export default {
  name: 'App',
  components: {
    wFooter,
    wHeader,
    shopCart,
  },
  data() {
    return {
      loginForm: buildLoginForm(),
      hasShowCart: true,
    };
  },
  computed: {
    ...mapState([
      'hasShowLogin',
    ]),
  },
  watch: {
    hasShowLogin() {
      this.loginForm = buildLoginForm();
    },
    $route(val) {
      const whiteList = [
        '/home',
        '/category',
      ];

      const { path } = val;
      if (whiteList.indexOf(path) === -1) {
        this.hasShowCart = false;
      } else {
        this.hasShowCart = true;
      }
    },
  },
  methods: {
    handleCloseSignIn() {
      this.$store.commit('toggleLogin', false);
    },
    async goLogin() {
      const { loginForm } = this;
      await this.$store.dispatch('userLogin', loginForm);
      this.$store.commit('toggleLogin', false);
    },
  },
};
</script>
<style lang="scss">
  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    overflow-y: scroll;
    padding-right: 0 !important;
  }

  .el-popup-parent--hidden {
    overflow: inherit;
    overflow-y: scroll;
  }

  .el-dialog__body {
    padding: 0 20px;
  }

  .sign-in-dialog {

    .account-item {
      margin-top: 16px;

      .ai-key {
        line-height: 1.5;
        color: #24292e;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
      }
    }

    .sign-in-dialog-btn {
      margin-top: 20px;
      text-align: right;

      .el-button {
        width: 100%;
      }
    }
  }

  .sign-in-dialog-tips {
    font-size: 12px;
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
    position: relative;
    min-height: calc(100% - 40px);
    overflow-y: auto;
  }

  #app {
    box-sizing: border-box;
    position: relative;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    padding-bottom: 40px;
    background-image: linear-gradient(180deg,rgba(27,31,35,.065),rgba(27,31,35,0))!important;
    background-repeat: no-repeat!important;
    background-size: 100% 200px!important;
  }
</style>
