<template>
  <!-- 顶部业务组件 -->
  <div class="header">
    <div class="header-btns">
      <div class="main">
        <div class="left">
          <div class="left-logo" @click="handleHome">
            <img src="../assets/LOGO.png" alt="">
            <!-- <h3>100 Rebate</h3>
            <p>Giveaway and Free Sample</p> -->
          </div>
        </div>
        <div class="right">
          <el-button class="nav" type="text" size="small" @click="handleFAQ">FAQ</el-button>
          <el-button class="nav" type="text" size="small" @click="handleContact">Contact Us</el-button>
          <div class="right-search">
            <div class="search-box">
              <div class="el-icon-search"></div>
              <input class="input" type="text" v-model="searchName" placeholder="search...">
              <div class="el-icon-search btn" @click="handleSearch"></div>
            </div>
          </div>
          <el-dropdown trigger="click" @command="handleClickNation" size="small">
            <span class="el-dropdown-link">
              {{ country === '' ? 'Country' : curCountry.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in countryKeys"
                :key="item.key"
                :command="item.key">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="small" @click="handleSignIn" v-if="!token">Sign in</el-button>
          <el-button size="small" type="primary" class="border" @click="handleSignUp()" v-if="!token">Sign up</el-button>
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
    <div class="header-navigator">
      <el-button
        v-for="item in navigatorKeys"
        :key="item.key"
        type="text"
        size="small"
        @click="() => handleNavigator(item.key)">
        {{ item.name }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getDics } from '@/api/common'
import storage from '@/utils/storage'

export default {
  data() {
    return {
      searchName: '',
      countryKeys: [],
      personalKeys: [
        { key: '0', name: 'Settings' },
        { key: '1', name: 'Sign Out', divided: true },
      ],
      navigatorKeys: [
        { key: '0', name: 'Categories' },
        { key: '1', name: 'Lightning Deal' },
        { key: '2', name: 'Deal in 7 Days' },
        { key: '3', name: 'VIP Club' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'token',
      'name',
      'country',
    ]),
    curCountry() {
      const { country, countryKeys } = this;
      const item = this.countryKeys.find(i => i.key === country);

      return item || countryKeys[0];
    },
  },
  async mounted() {
    const user = storage.get('user');
    await this.getCountryKeys();

    if (user) {
      const item = this.countryKeys.find(i => i.key === user.country);
      if (item) this.handleClickNation(user.country);
    }
  },
  methods: {
    handleClickNation(key) {
      this.$store.commit('SET_COUNTRY', key);
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
    async getCountryKeys() {
      const { data } = await getDics('country_type');
      this.countryKeys = Object.entries(data).map((kv) => ({ key: kv[0], name: kv[1] }));
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
    handleContact() {
      this.$router.push('/contact');
    },
    handleSearch() {
      this.$router.push({ path: '/category', query: { searchName: this.searchName }});
    },
    handleFAQ() {
      this.$router.push({ path: '/faq' });
    },
    handleNavigator(key) {
      switch (key) {
        case '0':
          this.$router.push('/category');
          break;
        default:
          this.$router.push({ path: '/category', query: { activeType: key }})
          break;
      }
    },
  },
};
</script>
<style lang='scss'>
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;

    .header-btns {
      font-size: 12px;
      background: #000;
      height: 65px;
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

      .left {
        .left-logo {
          cursor: pointer;
          user-select: none;
          width: 160px;
          h3 {
            font-size: 22px;
            font-style: italic;
            font-weight: 600;
            padding-bottom: 2px;
          }
          p {
            font-size: 12px;
          }

          img {
            width: 100%;
          }
        }
      }

      .right {
        .right-search {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          align-items: center;
          margin: 0 24px;

          .search-box {
            width: 365px;
            background: #fff;
            border: 2px solid #43d6ac;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 38px;
            box-sizing: border-box;
            box-shadow: 2px 2px 2px 0px rgba(255, 255, 255, 0.34);

            .el-icon-search {
              flex: 1;
              max-width: 30px;
              min-width: 30px;
              font-size: 12px;
              text-align: center;
              color: #000;
            }

            .el-icon-search.btn {
              max-width: 60px;
              min-width: 60px;
              color: white;
              background-color: #43d6ac;
              height: 100%;
              border-radius: 30px;
              line-height: 34px;
              font-size: 18px;
              cursor: pointer;
              margin-right: -1px;
            }

            .input {
              padding-right: 10px;
              flex: 1;
              border: none;
              font-size: 14px;
              background: transparent;
            }
          }
        }
      }

      .el-button {
        box-sizing: border-box;
        font-size: 12px;
        padding: 8px 24px;
        font-weight: 600;
        user-select: none;

        &.nav {
          color: #f2f6fc;
          padding: 0;
          margin-right: 10px;
        }
      }
    }

    .header-navigator {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #cbcbcb;
      background: #fff;

      .el-button {
        font-size: 16px;
        color: #606266;
        font-weight: 500;
        margin: 0 34px;
      }
    }

    .el-select > .el-input {
      width: 130px;
    }

    .el-dropdown {
      margin-right: 18px;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #f3f3f3;
      user-select: none;
    }

    .el-dropdown-link:hover {
      color: #e4e4e4;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>
