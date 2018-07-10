<template>
  <div>
    <ul>
      <li v-for="(item,index) in chooseType" @click="active(index)" :class="{act:nowIndex===index}">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>
<script>
export default{
    props:{
        chooseType:{
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
            nowIndex:0,
        }
  },
  methods:{
      active(index){
          this.nowIndex=index
//          console.log(this.chooseType[index])
          this.$emit('onChange',this.chooseType[index])
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

