<template>
<div class="personal">
  <div class="personal-title">
    Account Settings
  </div>

  <div class="personal-form">
    <div class="personal-form-item" v-for="key in formKeys" :key="key.key">
      <div class="item">
        <div class="item-name">{{ key.name }}</div>
        <div class="item-val">{{ key.key === 'password' ? '*******' : formData[key.key] }}</div>
      </div>
      <div class="button">
        <el-button type="primary" size="small" @click="handleEdit(key)">Edit</el-button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { updateUsers } from '@/api/user';
import { getToken } from '@/utils/auth'
import storage from '@/utils/storage'

function buildFormData() {
  return {
    name: '',
    email: '',
    password: '',
    facebookId: '',
    commonEmail: '',
    amazonId: '',
  };
}

export default {
  beforeRouteEnter(to, from, next) {
    const token = getToken();

    if (!token) next('/home');
    next();
  },
  data() {
    return {
      formData: buildFormData(),
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
      formKeys: [
        { name: 'Nickname', key: 'name' },
        { name: 'Password', key: 'password' },
        { name: 'Facebook Account', key: 'facebookId' },
        { name: 'Amazon Account', key: 'amazonId' },
        { name: 'Other Email Address', key: 'commonEmail' },
      ],
    };
  },
  mounted() {
    const user = storage.get('user');
    this.formData = {
      ...buildFormData(),
      name: user.name,
      email: user.email,
      facebookId: user.facebookId,
      amazonId: user.amazonId,
      commonEmail: user.commonEmail,
      userId: user.userId,
    };
  },
  methods: {
    async handleEdit(item) {
      const { name, key } = item;
      const { formData } = this;
      const payload = {
        userId: formData.userId,
        [key]: formData[key],
      };

      const { value } = await this.$prompt('', `Please Enter the ${name}`, {
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
      });

      if (!value) {
        return this.$message.error('Please enter the correct content.');
      }

      payload[key] = value;

      try {
        await updateUsers(payload);
        this.$message.success('Successful operation');
      } catch (err) {
        this.$message.success('The operation failed. Please try again later.');
        console.log(err);
      }
    },
  },
};
</script>

<style lang='scss'>
  .personal {
    padding: 32px 0;

    &-title {
      font-weight: 600;
      font-size: 22px;
    }

    &-form {
      margin-top: 20px;
      width: 600px;

      &-item {
        padding: 20px;
        border: 1px solid #ddd;
        border-bottom: none;
        justify-content: space-between;
        display: flex;

        .item {
          font-size: 12px;
          &-name {
            font-weight: 600;
            margin-bottom: 8px;
          }
        }

        .button {
          width: 100px;
          text-align: right;
        }
      }

      &-item:last-child {
        border-bottom: 1px solid #ddd;
      }
    }

    &-btns {
      text-align: right;
    }
  }
</style>
