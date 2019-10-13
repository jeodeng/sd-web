<template>
  <!-- 顶部业务组件 -->
  <div class="header">
    <div class="user-btns">
      <div class="main">
        <div class="left">
          <el-button type="text" size="small" @click="handleHome" :style="{ color: '#fff' }">Welcome！{{ name }}</el-button>
        </div>
        <div class="right">
          <el-button type="text" size="small">Help</el-button>
          <el-button type="text" size="small" @click="handleSignIn" v-if="!token">Sign in</el-button>
          <el-button type="text" size="small" class="border" @click="handleSignUp()" v-if="!token">Sign up</el-button>
          <el-dropdown trigger="click" @command="handleClickNation" size="small">
            <span class="el-dropdown-link">
              {{ curNation === '' ? 'Language' : nationKeys.find(i => i.key === curNation).name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in nationKeys"
                :key="item.key"
                :command="item.key">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" @command="handleClickPersonal" v-if="token" size="small">
            <span class="el-dropdown-link">
              Account
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" size="small">
              <el-dropdown-item
                v-for="item in personalKeys"
                :key="item.key"
                :command="item.key"
                :divided="item.divided">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      search: '',
      curNation: '',
      nationKeys: [
        { key: '0', name: '中国' },
        { key: '1', name: '法国' },
        { key: '2', name: '意大利' },
      ],
      personalKeys: [
        { key: '0', name: 'Settings' },
        { key: '1', name: 'Sign Out', divided: true },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'token',
      'name'
    ]),
  },
  mounted() {
  },
  methods: {
    handleClickNation(key) {
      this.curNation = key;
    },
    async handleClickPersonal(key) {
      switch (key) {
        case '0':
          this.$router.push('/personal');
          break;
        case '1':
          await this.$store.dispatch('userLoginOut');
          this.$message.success('Exit from current account');
          location.reload();
          break;
        default: break;
      }
    },
    handleSignIn() {
      this.$store.commit('toggleLogin', true);
    },
    handleSignUp() {
      this.$router.push('/register');
    },
    handleHome() {
      this.$router.push('/home');
    },
  },
};
</script>
<style lang='scss'>
  .header {
    width: 100%;
    height: 36px;

    .user-btns {
      font-size: 12px;
      background: #000;
      height: 100%;
      color: #f2f6fc;

      .main {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .left, .right {
        display: flex;
        align-items: center;
      }

      .el-button {
        color: #ccc;
        box-sizing: border-box;

        &:hover {
          color: #f5f7fa;
        }
      }

      .el-button.border {
        border: 1px solid #ccc;
        padding: 4px 6px;
        border-radius: 0;
        transition: .3s;

        &:hover {
          text-decoration: none;
          border-color: #f5f7fa;
        }
      }

      .el-button--text {
        padding: 0;
      }
    }

    .el-select > .el-input {
      width: 130px;
    }

    .el-dropdown {
      margin-left: 18px;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #cecece;
      font-size: 12px;
      line-height: 16px;
    }

    .el-dropdown-link:hover {
      color: #e4e4e4;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>
