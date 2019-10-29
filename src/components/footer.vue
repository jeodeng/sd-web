<template>
  <!-- 底部footer组件 -->
  <div class="footer">
    <procedures ref="aaa"></procedures>
    <div class="footer-main">
      <div class="left">
        <div class="left-navigator">
          <span v-for="item in navigators" :key="item.key">{{ item.name }}</span>
        </div>
        <h4>Follow Us :</h4>
        <div class="left-icons">
          <svg-icon :icon-class="icon.icon" v-for="icon in icons" :key="icon.icon" />
        </div>
      </div>
      <div class="right">
        <p>Subscribe</p>
        <p>Never miss the latest products and saving</p>
        <div>
          <el-input placeholder="Please enter your email" v-model="email">
            <el-button type="primary" slot="append" icon="el-icon-message"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <p class="copyright" @click="test">Copyright © 2019 100R, Inc. or its affiliates</p>
  </div>
</template>
<script>
import procedures from '@/components/procedures.vue';

export default {
  components: {
    procedures,
  },
  data() {
    return {
      navigators: [
        { name: 'About 100 Rebate', key: '0' },
        { name: 'FAQ', key: '1' },
      ],
      icons: [
        { icon: 'facebook' },
        { icon: 'email' },
      ],
      email: '',
    };
  },
  activated() {
  },
  mounted() {
  },
  methods: {
    test() {
      console.log(this.$refs.aaa.$el.clientWidth);
    }
  },
};
</script>
<style lang='scss'>
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;

    .footer-main {
      box-sizing: border-box;
      background-color: #000;
      height: 160px;
      padding: 40px 0px 24px;
      color: #fff;
      display: flex;
      justify-content: space-around;
      font-size: 14px;

      .left {

        .left-navigator {
          span {
            display: inline-block;
            margin-right: 26px;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .left-icons {
          position: relative;
          left: -8px;
          .svg-icon {
            font-size: 22px;
            margin-right: 10px;
            cursor: pointer;
          }
        }

        h4 {
          margin: 14px 0;
        }
      }

      .right {
        p {
          margin-bottom: 10px;
        }

        .el-input {
          width: 346px;
        }

        .el-input-group__append {
          .el-button {
            background-color: #43d6ac;
            border-radius: 0;
            color: #fff;
            height: 38px;
            padding-top: 0;
            padding-bottom: 0;
            line-height: 38px;
            font-size: 20px;
            position: relative;
            top: 1px;
          }
        }
      }
    }

    .procedures {
      box-shadow: 0px -1px 4px 0px #DCDCDC;
      background: #fff;
    }

    .copyright {
      font-size: 12px;
      color: #666666;
      position: absolute;
      bottom: 0;
      text-align: center;
      line-height: 24px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
