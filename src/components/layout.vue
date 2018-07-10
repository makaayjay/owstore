<template>
  <div>
    <div class="app-header">
      <div class="header-content">
        <router-link to='/'>
        <img src="../assets/logo.png"/>
        </router-link>
        <div class="header-text">
          <ul>
            <li>{{userLogName}}</li>
            <li v-if="userLogName!=''">丨</li>
            <li v-if="userLogName!=''"><a @click="quitLog">退出</a></li>
            <li v-if="userLogName!=''">丨</li>
            <li v-if="userLogName==''"><a @click="showRegDialog">注册</a></li>
            <li v-if="userLogName==''">丨</li>
            <li v-if="userLogName==''"><a @click="showLogDialog">登录</a></li>
            <li v-if="userLogName==''">丨</li>
            <li><a @click="showAboutDialog">关于</a></li>
          </ul>
        </div>
      </div>
     </div>
    <div class="app-content">
      <router-view>
      </router-view>
    </div>
    <div class="app-footer">
      <div class="contect"><p>2018@qiaoshuai</p></div>
    </div>
    <my-dialog :isShow="isShowAboutDialog" @closeDia="closeDialog('isShowAboutDialog')">
      <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。</p>
    </my-dialog>
    <my-dialog :isShow="isShowLogDialog" @closeDia="closeDialog('isShowLogDialog')">
   <log-form @has-log="sucessLog"></log-form>
    </my-dialog>
    <my-dialog :isShow="isShowRegDialog" @closeDia="closeDialog('isShowRegDialog')">
      <reg-form></reg-form>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
import RegForm from './regForm.vue'
import LogForm from './logForm.vue'
  export default{
    components:{
     myDialog:Dialog,
      RegForm,
      LogForm
    },
    data(){
        return{
            isShowAboutDialog:false,
            isShowLogDialog:false,
            isShowRegDialog:false,
            userLogName:''
        }
    },
    methods:{
        showAboutDialog(){
          this.isShowAboutDialog=true
        },
        showLogDialog(){
          this.isShowLogDialog=true
        },
        showRegDialog(){
          this.isShowRegDialog=true
        },
        closeDialog(arr){
              this[arr]=false//传入
        },
       sucessLog(data){
            console.log(data[0].userName)
            this.userLogName=data[0].userName
            this.closeDia('isShowLogDialog')
      },
      quitLog(){
           this.userLogName=''
           console.log(this.userLogName)
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    cursor:pointer;
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
.app-header{
  width: 100%;
  height: 100px;
  background: #2B2B2B	;
  color: grey;
}
.header-content{
  width: 900px;
  height: 100%;
  margin: 0 auto;
}
  .header-content img{
    width: 50px;
    height: 50px;
    margin: 25px 0;
  }
  .header-text{
    float: right;
  }
.header-text ul{
  margin-top: 70px;
}
  .header-text ul li{
    display: block;
    width: auto;
    margin:0 5px;
    float: left;
  }
  .app-footer{
    width: 100%;
    height: 80px;
    background: #F5F5F5;
    position: fixed;
    bottom:0;
    left: 0;
  }
  .contect p{
    height: auto;
    width: 70px;
    margin: 30px auto;
    display: block;
    color: grey;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .g-form {

  }
  .g-form-line {
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .g-form-btn {
    padding-left: 100px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
