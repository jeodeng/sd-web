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

    <div class="register-form" v-if="curStep === 0">
      <el-form :model="formData" label-width="120px" ref="accountsForm" :rules="rules">
        <el-form-item label="Email" prop="email" class="tips">
          <el-input v-model="formData.email" size="small"></el-input>
          <el-tooltip class="item" effect="dark" content="It's also a login account." placement="bottom">
            <el-button icon="el-icon-question" type="text"></el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Password" prop="password" class="password-tips">
          <el-input auto-complete="new-password" v-model="formData.password" show-password width="80%"></el-input>
        </el-form-item>
        <el-form-item label="Nickname" prop="name">
          <el-input v-model="formData.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Facebook Account" prop="facebookId">
          <el-input v-model="formData.facebookId" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Amazon Account" prop="amazonId">
          <el-input v-model="formData.amazonId" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Other Email Address" prop="commonEmail" class="tips">
          <el-input v-model="formData.commonEmail" size="small" type="textarea" :rows="3"></el-input>
          <el-tooltip class="item" effect="dark" content="Multiple mailboxes separated by commas" placement="bottom">
            <el-button icon="el-icon-question" type="text"></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>

      <div class="register-btns">
        <el-button type="primary" size="small" @click="handleRegister">Immediate Registration</el-button>
      </div>
    </div>

    <div class="register-success" v-if="curStep === 1">
      Congratulations on your successful registration as a website user. Your login account is
      <span>{{ username }}</span>
      ，leave this page in 5 seconds...
    </div>
  </div>
</template>

<script>
import { register } from '@/api/user';

function buildFormData() {
  return {
    name: 'dsj',
    email: '345369367@qq.com',
    password: '123456',
    facebookId: '',
    commonEmail: '',
    amazonId: '',
  };
}

export default {
  data() {
    return {
      username: '',
      formData: buildFormData(),
      curStep: 0,
      progressCon: [
        {
          icon: 'el-icon-s-custom',
          desc: 'Set up your account',
        },
        // {
        //   icon: 'el-icon-s-tools',
        //   desc: 'Complete other information',
        // },
        {
          icon: 'el-icon-success',
          desc: 'Success !',
        },
      ],
      rules: { // 验证规则
        username: [
          { required: true, trigger: 'blur', message: 'Please enter your account number.' }
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Please input a password' }
        ],
        name: [
          { required: true, trigger: 'blur', message: 'Please enter your nickname.' }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!(/^[\w.-]+@(?=[a-z\d][^.]*\.)[a-z\d.-]*[^.]$/.test(value))) {
                callback(new Error('Please enter the correct email address'));
              } else {
                callback();
              }
            },
          }
        ],
      },
    };
  },
  created() {
  },
  methods: {
    async handleRegister() {
      const { formData } = this;

      Object.entries(formData).forEach((kv) => {
        if (kv[1] === '') formData[kv[0]] = null;
      });

      await register(formData);
      await this.$store.dispatch('userLogin', {
        username: formData.email,
        password: formData.password,
      });

      this.username = formData.email;
      this.curStep = this.curStep + 1;
      setTimeout(() => {
        this.$router.push('/');
      }, 5000);
    },
  },
};
</script>

<style lang='scss'>
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

    .register-form {
      margin: 20px auto 0;
      width: 600px;

      .el-form-item__content {
        position: relative;
        margin-right: 30px;
        .el-tooltip {
          position: absolute;
          left: calc(100% + 10px);
          top: 0;
        }
      }
    }

    .register-btns {
      text-align: right;
    }

    .register-success {
      margin-top: 20px;
      font-size: 12px;

      span {
        color: #de253f;
        font-weight: 600;
      }
    }
  }
</style>
