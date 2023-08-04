<template v-if="sonRefresh">
   <headers>
     <h3 slot="title">课程信息</h3>
     <div id="content1">
       <button id="Button1" class="Button" ref="button1" @click="courseClickButton1" >未完成</button>
       <button id="Button2" class="Button" ref="button2" @click="courseClickButton2" >已完成</button>
       <button id="Button3" class="Button" ref="button3" @click="courseClickButton3" >加入课程</button>
     </div>
     <div><router-view/></div>
   </headers>
</template>

<script>
import axios from "axios";
export default {
  name: "course",
  data(){
    return {
      sonRefresh: true,
    }
  },
  mounted() {
    this.timer=window.setTimeout(()=>{
      let change=this.$route.name
      if(change==='course1')
      this.$refs.button1.style.border = '1px solid #ededed'
      if(change==='course2')
        this.$refs.button2.style.border = '1px solid #ededed'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    courseClickButton1() {
      this.$refs.button1.style.border = '1px solid #ededed'
      this.$refs.button2.style.border = 'none'
      let id =this.$route.params.id;
      this.$router.push('/course1/'+id);

    },
    courseClickButton2() {
      this.$refs.button1.style.border = 'none'
      this.$refs.button2.style.border = '1px solid #ededed'
      let id =this.$route.params.id;
      this.$router.push('/course2/'+id);
    },
    courseClickButton3() {
      this.$prompt('请输入课程邀请码', '提示', {
        customClass: 'courseMessage',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        axios.post('/my/course/course',{username:this.$route.params.id,code:value}).then(res=>{
          console.log(res.data.data)
          if(res.data.status===0) {
            this.$message({
              type: 'success',
              message: '加入成功'
            });
            window.location.reload()
          }
          if(res.data.status===1) {
            this.$message({
              type: 'error',
              message: '加入失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
  }
}
</script>

<style lang="less">
@import "@/css/index.less";
.courseMessage{
  height: 161px;
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
    padding: 65px 17px 41px;
    height: 40px;
    .el-button {
      line-height: 0;
    }
    .el-button--small {
      padding: 13px 15px;
    }
  }
  .el-message-box__errormsg {
    margin-top: 13px;
  }
}
</style>