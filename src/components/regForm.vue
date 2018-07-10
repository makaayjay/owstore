<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <label class="label">邮箱 </label>
      <p class="control has-icon has-icon-right">
        <input name="email" v-validate="'required|email'" data-vv-delay="500" placeholder="Email">
        <i v-show="errors.has('email')" class="fa fa-warning"></i>
        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
      </p>
    </div>
    <div class="column is-12">
      <label class="label">密码</label>
      <p class="control has-icon has-icon-right">
        <input name="password" v-validate="'required|alpha_num'" data-vv-delay="500"  type="text" placeholder="密码">
        <i v-show="errors.has('password')" class="fa fa-warning"></i>
        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      </p>
    </div>
  </div>
</template>
<script>
  export default {

    data: () => ({
      email: '',
      name: '',
      phone: '',
      url: ''
    }),
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            alert('Form Submitted!');
            return;
          }
          alert('Correct them errors!');
        });
      }
    }
  };
</script>
<style>

</style>
