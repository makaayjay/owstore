<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <Vselection :selectDate="products" @onChange="productChange"></Vselection>
      </div>
      <div class="order-list-option">
        <div> 起始日期：
        <datepicker language="zh" :value="starDate.date"></datepicker>
        </div>
        <div> 结束日期：
        <datepicker language="zh" :value="endDate.date"></datepicker>
        </div>
      </div>
      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
      <div class="button order-button" @click="getOrderList">
        查询
      </div>
    </div>
    <div class="order-list-table">
        <table>
          <tr><th v-for="head in tableHeads">{{head.label}}</th></tr>
          <tr  v-for="item in orderTableData" ><td v-for="head in tableHeads">{{item[head.key]}}</td></tr>
        </table>
      <div class="table-pagenation">
        <!-- <v-pagenation :total="total" :pageSize="pageSize" @on-change="pageChange"></v-pagenation>   -->
      </div>
    </div>
  </div>
</template>
<script>

  import Datepicker from 'vuejs-datepicker';
 import Vselection from '../../components/base/selection.vue'
  export default{
     components:{
       Vselection,
       Datepicker
     },
    data(){
         return{
           starDate:{
               date:new Date()
           },
           endDate:{
             date:new Date()
           },
           query:'',
           orderTableData:[],
             products:[
               {
                 label: '数据统计',
                 value: 0
               },
               {
                 label: '数据预测',
                 value: 1
               },
               {
                 label: '流量分析',
                 value: 2
               },
               {
                 label: '广告发布',
                 value: 3
               }
               ],
           tableHeads: [
             {
               label: '订单号',
               key: 'orderId'
             },
             {
               label: '购买产品',
               key: 'product'
             },
             {
               label: '版本类型',
               key: 'version'
             },
             {
               label: '有效时间',
               key: 'period'
             },
             {
               label: '购买日期',
               key: 'date'
             },
             {
               label: '数量',
               key: 'buyNum'
             },
             {
               label: '总价',
               key: 'amount'
             }
           ],
         }
    },
    watch:{
        query(){
            console.log(this.query)
        }
    },
    methods:{
      productChange(pObj){
          this.productId=pObj.value
        console.log(this.productId)
        console.log(this.starDate)
      },
      getOrderList(){
          let tableData={
              query:this.query,
              starDate:this.starDate,
              endDate:this.endDate
          }
          this.$http.post('getTableData',tableData)
            .then((res)=>{

                   this.orderTableData=res.data.list
              console.log(this.orderTableData)

            })
      }
    }
 }
</script>
<style scoped>
  .order-wrap {
    width: 1000px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }
  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }
  .order-list-option {
    display: inline-block;
    padding-left: 5px;
  }
  .order-list-option div {
    padding-left: 0;
    display: inline-block;
  }
  .order-list-table {
    margin-top: 20px;
  }
  .order-list-table table {
    width: 100%;
    background: #fff;
  }
  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }
  .order-list-table th.active {
    background: #35495e;
  }
  .order-button{
    display: inline-block;
    float: right;
    padding: 8px 20px;
  }
  .table-pagenation {
    padding: 15px;
    text-align: right;
  }
</style>
