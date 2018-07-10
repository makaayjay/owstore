<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <template v-for="product in productlist">
        <h3>{{product.title}}</h3>
        <ul>
          <li v-for="list in product.list"><a :href="list.url">{{list.name}}</a><span v-if="list.hot" class="hot-tag">HOT</span></li>
        </ul>
        <div v-if="!product.last" class="br"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slide=slides :inv="slidesSpeed" @onChange="doSth"></slide-show>
      <input v-model="slidesSpeed"/>
      <div class="index-board-list">
        <div
          v-for="(item,index) in boardList"
             class="index-board-item"
             :class="[{'line-last': index % 2 !==0},'index-board-'+item.id]">
          <!--//index偶数的时候-->
          <div class="index-board-item-inner" >
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
              <a class="button" @click="toDetail(item.toKey)">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import slideShow from "../components/slideshow.vue"
export default{
     components:{
         slideShow,
     },
    mounted(){
      axios.get('api/getNewsList')
        .then((res) => {
          console.log(res)
          this.newsList = res.data.list
        })
        .catch(function (error) {
        console.log(error);
      })
      var me=this //函数的this指向全局，箭头函数的this指向实例。
      axios.get('api/getProductList')
        .then(function (res) {
          console.log(res)
          me.productlist=res.data
        })
        .catch((err)=>{
          console.log(err)
        })
      axios.get('api/getBoardList')
        .then((res)=>{
          this.boardList=res.data
        })
    },
    methods:{
      doSth(index){//从子组件取到index值
//          console.log("onchang run!")
        console.log(index)
      },
      toDetail(href){
          this.$router.push({path:'/detail/'+href
          })
      }
    },
    data(){
        return{
              slidesSpeed:1500,
              slides: [
                {
                  src: require('../assets/slideShow/pic1.jpg'),//图片通过script引入要用require
                  title: 'xxx1',
                  href: 'analysis'
                },
                {
                  src: require('../assets/slideShow/pic2.jpg'),
                  title: 'xxx2',
                  href: 'count'
                },
                {
                  src: require('../assets/slideShow/pic3.jpg'),
                  title: 'xxx3',
                  href: 'publish'
                },
                {
                  src: require('../assets/slideShow/pic4.jpg'),
                  title: 'xxx4',
                  href: 'forecast'
                }
              ],
            newsList:[],
            boardList: [],
            productlist:{}
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {

    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .index-board-button .button{
    display: block;
    width: 120px;
    height: 40px;
    background: #4fc08d;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
