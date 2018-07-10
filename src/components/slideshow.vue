<template>
  <div class="slide-show" >
    <div class="slide-img">
      <router-link :to={name:slide[nowIndex].href} @mouseover="clearInv()" @mouseout="runInv()"  >
        <transition name="slide-trans">
          <img v-if="isShow" :src="slide[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slide[nowIndex].src">
        </transition>
      </router-link>
    </div>
    <h2>{{ slide[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click=" toGo(preView)" @mouseover="clearInv()" @mouseout="runInv()" >&lt;</li>
      <li v-for="(item,index) in slide"  @click="toGo(index)" @mouseover="clearInv()" @mouseout="runInv()" >
        <a :class="{on:nowIndex==index}">{{ index+1 }}</a>
      </li>
      <li @click="toGo(nexView)" @mouseover="clearInv()" @mouseout="runInv()" >&gt;</li>
    </ul>
  </div>
</template>
<script>
export default{
    data(){
        return{
            nowIndex:0,
            isShow:true,
        }
    },
    props:{//父组件用:slide=XXX,:inv=xxxx传值
        slide:{
          type:Array,
          default:[]
        },
        inv:{
            default:1000
        }
    },
    computed:{
        preView(){
            if(this.nowIndex==0){
                return this.slide.length-1
            }else{
                return this.nowIndex-1
            }
        },
        nexView(){
            if(this.nowIndex==this.slide.length-1){
                return 0
            }else{
                return this.nowIndex+1
            }
        },

    },
    methods:{
      toGo(index){
          this.isShow=false
          setTimeout(()=>{
            this.isShow=true
            this.nowIndex=index
            this.$emit('onChange',index)       //学习用 $emit传index值给父组件
          },10)

      },
      runInv(){
//        console.log(this.inv)
        this.invId=setInterval(()=>{
          this.toGo(this.nexView)

        },this.inv)
      },
      clearInv(){
          clearInterval(this.invId)
      }
//      pre(){
//            if(this.nowIndex==0){
//                this.nowIndex=this.slides.length-1
//            }else{
//              this.nowIndex-=1
//            }
//      },
//      next(){
//      if(this.nowIndex==this.slides.length-1){
//        this.nowIndex=0
//      }else{
//        this.nowIndex+=1
//      }
//      }
    },
    mounted(){
        this.runInv()
    },
//  watch:{
//        inv:'runInv'
//  }
}
</script>
<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height:300px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    text-decoration: underline;
    background: red;
  }
</style>
