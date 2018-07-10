<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" placeholder="请输入注册邮箱" v-model="userNameModel">
        </div>
        <span class="g-form-error"  >{{userErrors.errorText}} </span>
        <span style="color: green" v-if="userErrors.stat">√</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" placeholder="请输入六位密码包含数字与字母" v-model="passwordModel">
        </div>
        <span class="g-form-error">{{passwordErrors.errorText}}</span>
        <span style="color: green" v-if="passwordErrors.stat">√</span>
      </div>
      <div class="g-form-line">
        <p style="color: red">{{errorMessages}}</p>
        <div class="g-form-btn">
          <a class="button" @click=" logIn()">登录</a>
        </div>
      </div>
      <p></p>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return{
            userNameModel:'',
            passwordModel:'',
            errorMessages:''
        }
    },
    computed:{
        userErrors(){
            var stat,errorText
          if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(this.userNameModel)){
              stat=false;
            errorText="请输入正确的邮箱"
          }else {
            stat=true;
            errorText=""
          }
          if(!this.userFlag){//这里userflag没声明会是undefined，那么（！undefined）就是true
            errorText=" "
            this.userFlag=true
          }//毅种循环
          return {
              stat,
            errorText
          }
        },
        passwordErrors(){
          var stat,errorText
          if(!/^[a-z0-9_-]{6,18}$/g.test(this.passwordModel)){
                stat=false;
            errorText="请输入6位密码包含数字和字母"
          }else {
              stat=true;
            errorText=" "
          }
          if(!this.passwordFlag){//这里userflag没声明会是undefined，那么（！undefined）就是true
            errorText=" "
            this.passwordFlag=true
          }//毅种循环
          return {
              stat,
            errorText
          }//返回个函数的对象{errorText：‘ ’，stat：true}
        }
    },
    methods:{
        logIn(){
            if(!this.passwordErrors.stat||!this.userErrors.stat){
                this.errorMessages="请完成表单"
            }else{
              this.errorMessages=""
              console.log(this.$http)
              this.$http.post('api/user.js',)
                .then((res)=>{
                  this.$emit('has-log',res.data)
                },(error)=>{
                  console.log(error)
                })
            }
        }
    }
}
</script>
<style>

</style>
