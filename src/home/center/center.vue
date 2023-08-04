<template v-if="sonRefresh">
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">个人中心</h3>
    <div id="centerHeader">
      <span id="basicInformation" @click="basicInformation" ref="centerRef1">基本资料</span>
      <span id="passwordManagement" @click="passwordManagement" ref="centerRef3">密码管理</span>
      <span id="cancelAccount" @click="cancelAccount" ref="centerRef4">注销账号</span>
    </div>
    <div id="centerHeader1"></div>
    <component :is="change"></component>
  </headers>
</template>

<script>
import basicInformation from "@/home/center/basicInformation";
import passwordManagement from "@/home/center/passwordManagement";
import cancelAccount from "@/home/center/cancelAccount";
export default {
  name: "center",
  data(){
    return{
      change:'basicInformation',
      sonRefresh: true,
      timer:null,
    }
  },
  components:{
    basicInformation,
    passwordManagement,
    cancelAccount
  },
  mounted() {
    this.timer=window.setTimeout(()=>{
      this.$refs.centerRef1.style.borderBottom = '2px solid red'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods:{
    left(){
      this.$router.go(-1);
    },
    basicInformation(){
     this.$refs.centerRef1.style.borderBottom = '2px solid red'
     this.$refs.centerRef3.style.borderBottom = 'none'
     this.$refs.centerRef4.style.borderBottom = 'none'
      this.change='basicInformation'
   },
    passwordManagement(){
      this.$refs.centerRef1.style.borderBottom = 'none'
      this.$refs.centerRef3.style.borderBottom = '2px solid red'
      this.$refs.centerRef4.style.borderBottom = 'none'
      this.change='passwordManagement'
    },
    cancelAccount(){
      this.$refs.centerRef1.style.borderBottom = 'none'
      this.$refs.centerRef3.style.borderBottom = 'none'
      this.$refs.centerRef4.style.borderBottom = '2px solid red'
      this.change='cancelAccount'
    },
  }
}
</script>

<style lang="less">
#left{
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
#centerHeader{
  height: 50px;
  span{
   padding: 15px 0 13px 0;
    line-height: 50px;
    margin-left: 40px;
  }
}
#centerHeader1{
  background: rgb(247, 247, 247);
  height: 20px;
  z-index: 2;
}
</style>