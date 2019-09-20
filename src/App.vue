<template>
  <div id="app">
    <w-header></w-header>

    <div class="main container">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>

    <w-footer></w-footer>

    <el-dialog
      title="Sign in to XXX"
      :visible="hasShowLogin"
      width="360px"
      :close-on-click-modal="false"
      :before-close="handleCloseSignIn">
      <div class="sign-in-dialog">
        <div class="account-item">
          <div class="ai-key">
            Username or email address
          </div>
          <div class="ai-val">
            <el-input size="small" v-model="loginForm.uid"></el-input>
          </div>
        </div>

        <div class="account-item">
          <div class="ai-key">
            Password
          </div>
          <div class="ai-val">
            <el-input size="small" v-model="loginForm.pwd"></el-input>
          </div>
        </div>

        <div class="sign-in-dialog-btn">
          <el-button type="primary" @click="handleCloseSignIn" size="small">Sign in</el-button>
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

export default {
  name: 'App',
  components: {
    wFooter,
    wHeader,
  },
  computed: {
    ...mapState([
      'hasShowLogin',
    ]),
  },
  data() {
    return {
      loginForm: {
        uid: '',
        pwd: '',
      },
    };
  },
  methods: {
    handleCloseSignIn() {
      this.$store.commit('toggleLogin', false);
    },
  },
};
</script>
<style lang="less">
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
