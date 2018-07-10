<template>
  <div >
  <this-dialog :isShow="isCheckDialogShow">
    <h3>请确认支付</h3>
    <div class="button" @click="checkOrderId">支付成功</div>
    <div class="button">支付失败</div>
  </this-dialog>
    <this-dialog :isShow="successDialog" @closeDia="closegxhg">
      <h3>感谢惠顾！！</h3>
    </this-dialog>
  </div>
</template>
<script>
  import Dialog from '../dialog.vue'
  export default{
      props:{
        isCheckDialogShow:{
           type:Boolean
        },
        orderId:{
            type:[String,Number]
        }
      },
      components: {
      thisDialog: Dialog,
      },
      data(){
      return {
          successDialog:false
      }
      },
      methods:{
          checkOrderId(){
//            this.$http.post('/api/createOrder',)
//              .then((res)=>{
                this.$emit("close-check-dialog")
                this. successDialog=true
//              })
          },
        closegxhg(){
              this.successDialog=false
        }
      }
  }
</script>
<style scoped>
</style>
