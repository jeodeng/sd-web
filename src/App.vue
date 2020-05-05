<template>
  <div id="app">
  <!-- Wrapper -->
    <div id="wrapper">

      <!-- Main -->
        <div id="main">
          <!-- Contact -->
            <article id="contact" class="active">
              <h2 class="major">{{ title }}</h2>
              <form method="post" action="#">
                <div class="fields">
                  <div class="field third">
                    <label class="name">Full Name</label>
                    <el-input v-model="form.fullName"></el-input>
                  </div>
                  <div class="field third">
                    <label class="name">Contact Email</label>
                    <el-input v-model="form.contactEmail"></el-input>
                  </div>
                  <div class="field third">
                    <label class="name">Phone Number</label>
                    <el-input v-model="form.phoneNumber"></el-input>
                  </div>
                  <div class="field third">
                    <label class="name">Country</label>
                    <el-select v-model="form.country">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="field third">
                    <label class="name">City</label>
                    <el-input v-model="form.city"></el-input>
                  </div>
                  <div class="field third">
                    <label class="name">State</label>
                    <el-input v-model="form.state"></el-input>
                  </div>
                  <div class="field">
                    <label class="name">Address</label>
                    <el-input v-model="form.address"></el-input>
                  </div>
                  <div class="field half">
                    <label class="name">Zip Code</label>
                    <el-input v-model="form.zipCode"></el-input>
                  </div>
                  <div class="field">
                    <label class="name">Whether to accept adult products ?</label>
                    <div :style="{ textAlign: 'left' }">
                      <el-radio v-model="form.whetherAcceptAdultProducts" label="YES">YES</el-radio>
                      <el-radio v-model="form.whetherAcceptAdultProducts" label="NO">NO</el-radio>
                    </div>
                  </div>
                </div>
                <ul class="actions">
                  <li>
                    <input id="submit" type="button" value="Send Message" class="primary" @click="submit">
                  </li>
                  <li>
                    <input id="reset" type="button" value="Reset" @click="reset">
                  </li>
                </ul>
              </form>
            </article>
        </div>
    </div>

    <!-- BG -->
    <div id="bg"></div>
  </div>
</template>

<script>
import { postInformation } from '@/api/common';

function initForm() {
  return {
    fullName: '',
    contactEmail: '',
    country: 'United States',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    whetherAcceptAdultProducts: 'YES',
  };
}

export default {
  name: 'App',
  data() {
    return {
      title: 'Information',
      form: initForm(),
      options: [
        { value: 'United States', label: 'United States' },
        { value: 'Japan', label: 'Japan' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Italy', label: 'Italy' },
        { value: 'France', label: 'France' },
      ],
    };
  },
  created() {
    const str = window.location.hash.substr(1);
    if (str) this.title = str;
  },
  methods: {
    async submit() {
      const checkResult = this.checkForm(this.form);
      if (checkResult) {
        this.$message({
          message: checkResult,
          type: 'error',
        });

        return;
      }

      const form = this.form;

      const payload = {
        adress: form.address,
        city: form.city,
        contact_email: form.contactEmail,
        country: form.country,
        full_name: form.fullName,
        phone: form.phoneNumber,
        state: form.state,
        accept_adult: form.whetherAcceptAdultProducts,
        zip_code: form.zipCode,
      };

      try {
        await postInformation(payload);
        this.$message({
          message: 'SUCCESS',
          type: 'success',
        });

        this.reset();
      } catch (error) {
        this.$message({
          message: error.errorMsg || 'System error, please try again later',
          type: 'error',
        });
      }
    },
    reset() {
      this.form = initForm();
      console.log(this.form, 'reset');
    },
    checkForm(data) {
      const config = {
        country: 'Country',
        address: 'Address',
        city: 'City',
        state: 'State',
        zipCode: 'Zip Code',
        phoneNumber: 'Phone Number',
        whetherAcceptAdultProducts: 'yes',
        contactEmail: 'Contact Email',
        fullName: 'Full Name',
      };

      let tips = '';

      Object.entries(config).forEach((kv) => {
        const [k, v] = kv;

        if (!data[k]) {
          tips = `Please Enter Your "${v}"`;
        }
      });

      return tips;
    },
  },
};
</script>

<style>
@import 'App.css';

#app {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.el-select .el-input__inner:focus,
.el-select .el-input.is-focus .el-input__inner {
  border-color: #fff !important;
}

.el-select {
  width: 100%;
}

.el-radio {
  color: #fff !important;
}
</style>
