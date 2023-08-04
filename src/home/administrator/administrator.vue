<template v-if="sonRefresh">
  <headers>
    <h3 slot="title">我的管理</h3>
    <div id="administratorHeader">
      <span id="basicInformation" @click="courseAdmin" ref="administratorRef1">课程管理</span>
      <span id="passwordManagement" @click="teacher" ref="administratorRef3">教师管理</span>
      <span id="cancelAccount" @click="student" ref="administratorRef4">学生管理</span>
    </div>
    <div id="administratorHeader1"></div>
    <router-view ref="child"/>
  </headers>
</template>

<script>
export default {
  name: "administrator",
  data(){
    return{
      sonRefresh: true,
      timer:null,
    }
  },
  mounted() {
    this.timer=window.setTimeout(()=>{
      if(this.$route.name==='courseAdmin')
        this.$refs.administratorRef1.style.borderBottom = '2px solid red'
      if(this.$route.name==='teacher')
        this.$refs.administratorRef3.style.borderBottom = '2px solid red'
      if(this.$route.name==='student')
        this.$refs.administratorRef4.style.borderBottom = '2px solid red'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods:{
    courseAdmin(){
      this.$refs.administratorRef1.style.borderBottom = '2px solid red'
      this.$refs.administratorRef3.style.borderBottom = 'none'
      this.$refs.administratorRef4.style.borderBottom = 'none'
      this.$refs.child.administratorClickCourseAdmin1()
      this.$router.push({name:'courseAdmin',query:{admin:'courseAdmin'}})
    },
    teacher(){
      this.$refs.administratorRef1.style.borderBottom = 'none'
      this.$refs.administratorRef3.style.borderBottom = '2px solid red'
      this.$refs.administratorRef4.style.borderBottom = 'none'
      this.$refs.child.administratorClickTeacher1()
      this.$router.push({name:'teacher',query:{admin:'teacher'}})
    },
    student(){
      this.$refs.administratorRef1.style.borderBottom = 'none'
      this.$refs.administratorRef3.style.borderBottom = 'none'
      this.$refs.administratorRef4.style.borderBottom = '2px solid red'
      this.$refs.child.administratorClickStudent1()
      this.$router.push({name:'student',query:{admin:'student'}})
    },
}
}
</script>

<style lang="less">
#administratorHeader{
  height: 50px;
  span{
    padding: 15px 0 13px 0;
    line-height: 50px;
    margin-left: 40px;
  }
}
#administratorHeader1{
  background: rgb(247, 247, 247);
  height: 20px;
  z-index: 2;
}
</style>