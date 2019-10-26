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
      title="Sign in to 100 Rebate"
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
            <el-input placeholder="Please input your username" v-model="loginForm.username" size="small"></el-input>
          </div>
        </div>

        <div class="account-item">
          <div class="ai-key">
            Password
          </div>
          <div class="ai-val">
            <el-input placeholder="Please input a password" auto-complete="new-password" v-model="loginForm.password" show-password width="80%"></el-input>
          </div>
        </div>

        <div class="sign-in-dialog-btn">
          <el-button type="primary" @click="goLogin" size="small">Sign in</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="sign-in-dialog-tips">
          <span>New to 100 Rebate ? </span>
          <el-button type="text" @click="handleCreateAccount">Create an account</el-button>
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
  username: '',
  password: '',
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
      location.reload();
    },
    handleCreateAccount() {
      this.handleCloseSignIn();
      this.$router.push('/register');
    },
  },
};
</script>
<style lang="scss">
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
</style>
