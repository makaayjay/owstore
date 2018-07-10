<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>流量分析</h2>
      <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
      </div>
        <div class="sales-board-line-right">
         <counter :min=mins @onChange="onParamChange('buyNum',$event)"></counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品配件：
      </div>
        <div class="sales-board-line-right">
        <multi-choose :chooseParts=productsParts @onChange="onParamChange('buyParts',$event)"></multi-choose>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
      </div>
        <div class="sales-board-line-right">
          <v-selection :selectDate=productsDate @onChange="onParamChange('buyDate',$event)"></v-selection>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品版本：
      </div>
        <div class="sales-board-line-right">
            <v-choose :chooseType=productsType @onChange="onParamChange('buyType',$event)"></v-choose>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
      </div>
        <div class="sales-board-line-right">
          {{productPrice}} 元
              </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
        <div class="sales-board-line-right">
          <div class="button" @click="pay" >
            立即购买
          </div>
        </div>
      </div>
    </div>
    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

      <h3>用户行为指标</h3>
      <ul>
        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
        <li>用户在网站的停留时间；</li>
        <li>用户来源网站（也叫“引导网站”）；</li>
        <li>用户所使用的搜索引擎及其关键词；</li>
        <li>在不同时段的用户访问量情况等。</li>
      </ul>

      <h3>浏览网站方式</h3>
      <ul>
        <li>用户上网设备类型</li>
        <li>用户浏览器的名称和版本</li>
        <li>访问者电脑分辨率显示模式</li>
        <li>用户所使用的操作系统名称和版本</li>
        <li>用户所在地理区域分布状况等</li>
      </ul>
    </div>
    <my-dialog :isShow="isShowPay" @closeDia="onClose">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{buyNum}}</td>
            <td>{{buyType.label}}</td>
            <td>{{buyDate.label}}</td>
            <td><span v-for="item in buyParts">{{item.label}} </span></td>
            <td>{{productPrice}}</td>
          </tr>
        </table>
      <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser @onChange="onChoosenBank($event)"></bank-chooser>
      <div class="button buy-dialog-btn" @click="getPay" >
        确认购买
      </div>
    </my-dialog>
    <!--<my-dialog >-->
      <!--支付失败！-->
    <!--</my-dialog>-->
    <check-dialog :is-check-dialog-show="checkOrder" @close-check-dialog="hideCheckDialog"></check-dialog>
  </div>
</template>

<script>
  import Counter from '../../components/base/counter.vue'
  import MultiChoose from '../../components/base/multiplyChooser.vue'
  import VChoose from '../../components/base/chooser.vue'
  import VSelection from "../../components/base/selection"
  import MyDialog from '../../components/dialog.vue'
  import BankChooser from '../../components/base/banks'
  import Dialog from '../../components/base/checkdialog.vue'
export default{
  components:{
    checkDialog:Dialog,
    Counter,
    MultiChoose,
    VChoose,
    VSelection,
    MyDialog,
    BankChooser,
  },
  data(){
      return{
        checkOrder:false,
        bankId:null,
        orderId:null,
        isShowPay:false,
        buyNum:1,
        buyDate:{},
        buyParts:[],
        buyType:{},
        productPrice:0,
        mins:1,
        max:20,
        productsDate:[
            {
            label: '半年',
            value: 0
            },
            {
              label: '一年',
              value: 1
            },
            {
              label: '三年',
              value: 2
            }
        ],
        productsType:[
          {
            label: '旗舰',
            value: 0
          },
          {
            label: '专业',
            value: 1
          },
          {
            label: '尊享',
            value: 2
          }
        ],
        productsParts:[
          {
            label: '保险',
            value: 0
          },
          {
            label: '维护',
            value: 1
          },
          {
            label: '售后',
            value: 2
          },
          {
            label: '丢失理赔',
            value: 3
          },
        ],
      }
  },
  methods:{
      onParamChange(attr,val){
          this[attr]=val
        console.log(attr,this[attr])
      },
      pay(){
        this.isShowPay=true
        this.getPrice()
      },
      onClose(){
        this.isShowPay=false
      },
      getPrice(){
            var buyPartsArray=[]
            for(var i in this.buyParts){
                buyPartsArray.push(this.buyParts[i].value)
            }
            var regParams={
              buyNumber:this.buyNum,
              buyParts:buyPartsArray.join(','),
              buyDate:this.buyDate.value,
              buyType:this.buyType.value,
            }
            this.$http.post('/api/getPrice',regParams)
             .then((res)=>{
            this.productPrice=res.data.amount
            })

      },
      onChoosenBank(bank){
          this.bankId=bank
          console.log(bank)
      },
      getPay(){
        var buyPartsArray=[]
        for(var i in this.buyParts){
          buyPartsArray.push(this.buyParts[i].value)
        }
        var regParams={
          buyNumber:this.buyNum,
          buyParts:buyPartsArray.join(','),
          buyDate:this.buyDate.value,
          buyType:this.buyType.value,
          bankId:this.bankId
        }
        this.$http.post('/api/createOrder',regParams)
          .then((res)=>{
            this.orderId=res.data.orderId
            console.log(this.orderId)
            this.checkOrder=true
            this.isShowPay=false
          })
      },
    hideCheckDialog(){
      this.checkOrder=false
    }
  },
  mounted(){
      this.buyNum=1,
      this.buyDate=this.productsDate[0],
      this.buyParts=[this.productsParts[0]],
      this.buyType=this.productsType[0],
        this.getPrice()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }
  .buy-dialog-btn {
    margin-top: 20px;
  }
  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .buy-dialog-table td,
  .buy-dialog-table th{
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }
  .buy-dialog-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
  }
</style>
