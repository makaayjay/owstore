<template>
  <div>
    <ul>
      <li v-for="(item,index) in chooseParts" @click="active(index)" :class="{act:nowIndex.indexOf(index)!==-1}"><!--nowindex里有传进来的index为true-->
        {{item.label}}
      </li>
    </ul>
  </div>
</template>
<script>
export default{
    props:{
        chooseParts:{
            type:Array,
          default:[
            {
                label:'text',
                value:0
            }
          ]
        }
    },
  data(){
        return{
            nowIndex:[0],
        }
  },
  methods:{
      active(index){
          if(this.nowIndex.indexOf(index)==-1){
              this.nowIndex.push(index)
//            console.log(index)
//            console.log(this.nowIndex)
          }else{
            var inx=this.nowIndex.indexOf(index)//这个理论看vue1.0的$remove；寻找index在nowIndex里的位置
//            console.log(inx)
//            console.log(this.nowIndex)
            this.nowIndex.splice(inx,1)
          }
//        console.log(this.nowIndex)
        var collection=[]
        for(var i in this.nowIndex){
          var ine=this.nowIndex[i]   //取的是nowIndex【i】位置的 值 ！
          collection.push(this.chooseParts[ine])
        }
//        console.log(collection)
          this.$emit('onChange',collection)
      }
  }
}
</script>
<style scoped>
  div {
    position: relative;
    display: inline-block;
  }
li{
  /*height: 25px;*/
  /*line-height: 25px;*/
  text-align: center;
  display: inline-block;
  margin: 0 5px 0 0;
  border: 1px solid #DAD8D8;
  padding: 7px 15px;
  border-radius: 3px;
  cursor: pointer;
}
  li:hover{
    background: #4fc08d;
    color: white;
  }
  .act{
    background: #4fc08d;
    color: white;
  }
</style>

