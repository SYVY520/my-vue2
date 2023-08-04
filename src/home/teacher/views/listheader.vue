<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">学生完成情况</h3>
    <div id="content1">
      <button id="Button1" class="Button" ref="button1" @click="listClickButton1">未完成</button>
      <button id="Button2" class="Button" ref="button2" @click="listClickButton2">已完成</button>
      <button id="listButton4" class="Button" ref="button4" @click="listClickButton4" v-if="this.$route.name==='list1' || this.$route.name==='list2'|| this.$route.name==='list5'">已批改</button>
      <button id="listButton3" class="Button" ref="button3" @click="listClickButton3" v-if="(this.$route.name==='list1' || this.$route.name==='list2' || this.$route.name==='list5')&this.$route.query.status==0">发布互评任务</button>
    </div>
    <publishTask  v-if="number" ref="number" @cancel="cancel"/>
    <div><router-view></router-view></div>
  </headers>
</template>

<script>
import axios from "axios";
import publishTask from "@/home/teacher/views/publishTask";
export default {
  name: "listheader",
  data(){
    return {
      number:false,
    }
  },
  components:{
    publishTask,
  },
  mounted() {
    this.timer=window.setTimeout(()=>{
      let change=this.$route.name
      if(change==='list1' ||  change==='list3')
        this.$refs.button1.style.border = '1px solid #ededed'
      if(change==='list2' || change==='list4')
        this.$refs.button2.style.border = '1px solid #ededed'
      if(change==='list5')
        this.$refs.button4.style.border = '1px solid #ededed'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    cancel(val){
      this.number=val;
    },
    left() {
      let id=this.$route.params.id
      let change=this.$route.name
      let course=this.$route.query.course
      let status=this.$route.query.status
      if(change==='list1'||change==='list2'||change==='list5')
      this.$router.push('/tchomework/'+id+'?course='+course+'&status='+status);
      if(change==='list3'||change==='list4')
        this.$router.push('/tctask/'+id+'?course='+course+'&status='+status);
    },
    listClickButton1() {
      this.$refs.button1.style.border = '1px solid #ededed'
      this.$refs.button2.style.border = 'none'
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      let course=this.$route.query.course
      let homework=this.$route.query.homework
      let task=this.$route.query.task
      let status=this.$route.query.status
      if(change==='/list1/:id')
      {
        this.$refs.button4.style.border = 'none'
        this.$router.push('/list1/'+id+'?course='+course+'&homework='+homework+'&status='+status);
      }
      if(change==='/list3/:id')
        this.$router.push('/list3/'+id+'?course='+course+'&task='+task+'&status='+status);
    },
    listClickButton2() {
      this.$refs.button1.style.border = 'none'
      this.$refs.button2.style.border = '1px solid #ededed'
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      let course=this.$route.query.course
      let homework=this.$route.query.homework
      let task=this.$route.query.task
      let status=this.$route.query.status
      if(change==='/list1/:id')
      {
        this.$refs.button4.style.border = 'none'
        this.$router.push('/list2/'+id+'?course='+course+'&homework='+homework+'&status='+status);
      }
      if(change==='/list3/:id')
        this.$router.push('/list4/'+id+'?course='+course+'&task='+task+'&status='+status);
    },
    listClickButton4() {
      this.$refs.button1.style.border = 'none'
      this.$refs.button2.style.border = 'none'
      this.$refs.button4.style.border = '1px solid #ededed'
      let id=this.$route.params.id
      let course=this.$route.query.course
      let homework=this.$route.query.homework
      let status=this.$route.query.status
        this.$router.push('/list5/'+id+'?course='+course+'&homework='+homework+'&status='+status);
    },
    listClickButton3(val) {
      this.number='true'
    }
  }
}
</script>

<style lang="less">
@import "@/css/index.less";
#listButton3 {
  width: 90px;
  color: white;
  margin-left: 520px;
  background: cornflowerblue;
}
#listButton4 {
  color: black;
  background: white;
  margin-left: 20px;
}
.listMessage{
  height: 105px;
  .el-message-box__message p {
    margin: 9px;
  }
  .el-message-box__header {
    height: 10px;
  }
  .el-message-box__content {
    height: 30px;
  }
  .el-message-box__btns {
    padding: 12px 17px 41px;
    height: 40px;
    .el-button {
      line-height: 0;
    }
    .el-button--small {
      padding: 13px 15px;
    }
  }
}
</style>