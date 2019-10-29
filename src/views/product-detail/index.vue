<template>
<div class="contact">
  <div class="contact-title">
    Detail
  </div>

  <div class="contact-list">
    <div class="contact-list-item" v-for="item in keys" :key="item.name">
      <div class="icon">
        <i :class="item.icon"></i>
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="value">{{ item.val }}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      keys: [
        { name: 'Email', val: 'xxxxxxx@qq.com', icon: 'el-icon-message' },
        { name: 'Phone', val: '100000000', icon: 'el-icon-phone-outline' },
        { name: 'Facebook', val: 'xxxxxxxxxx', icon: 'el-icon-user' },
      ],
    };
  },
};
</script>

<style lang='scss'>
  .contact {
    padding: 32px 0;

    &-title {
      text-align: center;
      font-weight: 600;
      font-size: 28px;
      margin-bottom: 40px;
    }

    .contact-list {
      display: flex;
      justify-content: center;

      .contact-list-item {
        width: 300px;
        height: 160px;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;

        > div {
          cursor: pointer;
          margin-bottom: 20px;
          transition: .3s;
        }

        .icon {
          font-size: 50px;
          color: #43d6ac;
        }

        .name {
          font-size: 22px;
          font-weight: 600;
        }

        .value {
          font-size: 18px;
        }
      }

      .contact-list-item:hover {
        .icon {
          font-size: 58px;
        }

        .name {
          font-size: 26px;
        }

        .value {
          font-size: 22px;
        }
      }
    }
  }
</style>
