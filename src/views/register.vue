<template>
  <div class="register">
    <div class="register-title">
      Sign Up
    </div>
    <div class="register-desc">
      The best way to get free Amazon product
    </div>
    <div class="register-progress">
      <div class="register-progress-item" v-for="(item, ind) in progressCon" :key="ind" :class="{ active: ind === curStep }">
        <div class="register-progress-item-info">
          <div class="register-progress-item-icon" :class="{ finish: curStep === progressCon.length - 1 }">
            <i :class="item.icon"></i>
          </div>
          <h5>{{ `Step ${ind + 1}：` }}</h5>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curStep: 0,
      progressCon: [
        {
          icon: 'el-icon-s-custom',
          desc: 'Set up your account',
        },
        {
          icon: 'el-icon-s-tools',
          desc: 'Complete other information',
        },
        {
          icon: 'el-icon-success',
          desc: 'Waiting for confirmation of customer service',
        },
      ],
    };
  },
};
</script>

<style lang='less'>
  .register {
    padding: 32px 0;

    .register-title {
      font-size: 45px;
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -1px;
      color: #24292e;
    }

    .register-desc {
      margin: 8px 0;
      font-size: 21px;
      font-weight: 300;
      color: #586069;
    }

    .register-progress {
      display: table;
      width: 100%;
      padding: 0;
      margin: 30px auto 0;
      overflow: hidden;
      list-style: none;
      border: 1px solid #dfe2e5;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(27,31,35,.05);
      box-sizing: border-box;

      .register-progress-item {
        display: table-cell;
        padding: 10px 15px;
        padding-left: 48px;
        color: #c6cbd1;
        background-color: #fafbfc;
        border-left: 1px solid #dfe2e5;
        box-sizing: border-box;
        position: relative;
        min-width: 290px;
        vertical-align: middle;

        &:first-child {
          border-left: 0;
        }

        .register-progress-item-icon {
          position: absolute;
          left: -38px;
          top: 2px;
          font-size: 26px;
        }

        .register-progress-item-info {
          position: relative;
          font-size:14px;
          font-weight:600;
          line-height:21px;
          list-style-image:none;
          list-style-position:outside;
          list-style-type:none;
          overflow-wrap:break-word;
          text-align:left;
          text-size-adjust:100%;
        }
      }

      .register-progress-item.active {
        color: #24292e;
        background-color: #fff;

        .register-progress-item-icon {
          color: #0366d6;

          &.finish {
            color: #419645;
          }
        }
      }
    }
  }
</style>
