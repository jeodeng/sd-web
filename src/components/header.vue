<template>
  <!-- 顶部业务组件 -->
  <div class="header">
    <div class="user-btns">
      <div class="main">
        <div class="left">
          <el-button type="text" size="small" @click="handleHome" :style="{ color: '#fff' }">Welcome！</el-button>
        </div>
        <div class="right">
          <el-button type="text" size="small">Help</el-button>
          <el-button type="text" size="small" @click="handleSignIn">Sign in</el-button>
          <el-button type="text" size="small" class="border" @click="handleSignUp()">Sign up</el-button>
          <el-dropdown trigger="click" @command="handleClickNation">
            <span class="el-dropdown-link">
              {{ curNation === '' ? '语言' : nationKeys.find(i => i.key === curNation).name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="nation in nationKeys"
                :key="nation.key"
                :command="nation.key">{{ nation.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
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
    };
  },
  activated() {
  },
  mounted() {
  },
  methods: {
    handleClickNation(key) {
      this.curNation = key;
    },
    handleSignIn() {
      this.$store.commit('toggleLogin', true);
    },
    handleSignUp() {
      this.$router.push('/register');
    },
    handleHome() {
      this.$router.push('/');
    },
  },
};
</script>
<style lang='less'>
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
