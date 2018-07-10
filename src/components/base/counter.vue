<template>
  <div  class="counter-component">
    <div class="btn" @click="minus">-</div>
    <div class="int">
    <input type="text" v-model='number' @keyup="fixNumber" >
    </div>
    <div class="btn" @click="add">+</div>
    <div class="mess"><p>{{message}}</p></div>
  </div>
</template>
<script>
export default{
    data(){
        return{
          number: this.min,
          message:''
        }
    },
  props:{
        min:{
            type:Number,
            default:1
        },
        max:{
            type:Number,
            default:99
        }
  },
  watch:{
        number(){
            this.$emit('onChange',this.number)
        }
  },
  methods:{
        fixNumber(){
            let fix=this.min;
            if(this.number==0){
                this.message='请填写宝贝数量'
            }
          if (typeof this.number !== 'number') {
            fix = Number(this.number.replace(/\D/g, ''))
            this.message=''
          }
          else {
            fix = this.number
          }
            if(this.number>this.max||this.number<this.min){
              this.message="输入数量与库存不符"
            }
            this.number=fix
        },
        add(){
            if(this.number>=this.max){
                return
            }else{
            this.number ++
            }
        },
        minus(){
          if(this.number<=this.min){
            return
          }else {
            this.number--
          }
        },
  }
}
</script>
<style scoped>
  .mess{
    position: absolute;
    left: 100px;
    width: 300px;
    height: 25px;
    line-height: 25px;
    vertical-align: middle;
  }
  .counter-component {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  input{
    border: none;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    margin: 0;
    width: 40px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin: 0;
    padding: 0;
  }
  .int{
    float: left;
  }

  .btn{
    cursor: pointer;
    text-align: center;
    width: 20px;
    border: 1px solid #e3e3e3;
    line-height: 25px;
    height: 25px;
    float: left;
  }
  .btn:hover{
    background: #4fc08d ;
    color: white;
  }
</style>
