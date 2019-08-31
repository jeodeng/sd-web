<template>
  <!-- 顶部业务组件 -->
  <div class="header">
    <div class="user-btns">
      <div class="main">
        <div class="left">
          <span>欢迎你！</span>
        </div>
        <div class="right">
          <el-button type="text" size="small">Help</el-button>
          <el-button type="text" size="small">登录</el-button>
          <el-button type="primary" size="small">注册</el-button>
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
      height: 32px;
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
        color: #fff;
      }

      .el-button--text {
        padding: 0;
      }

      .el-button--primary {
        padding: 4px 12px;
        border: 1px solid #fff;
        background-color: transparent;
        border-radius: 0;
      }
    }

    .el-select > .el-input {
      width: 130px;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #888;
    }

    .el-dropdown-link:hover {
      color: #409eff;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>
