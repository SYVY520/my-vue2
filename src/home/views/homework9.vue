<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">我的作业</h3>
    <div id="content1">
      <button id="Button1" class="Button" ref="button1" @click="homeworkClickButton1">未完成</button>
      <button id="Button2"  class="Button" ref="button2" @click="homeworkClickButton2">已完成</button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </headers>
</template>

<script>
export default {
  name: "homework9",
  mounted() {
    this.timer=window.setTimeout(()=>{
      let change=this.$route.name
      if(change==='homework1' ||  change==='homework3')
      this.$refs.button1.style.border = '1px solid #ededed'
      if(change==='homework2' || change==='homework4')
        this.$refs.button2.style.border = '1px solid #ededed'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    left() {
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      if(change==='/homework1/:id')
        this.$router.push('/course1/'+id);
      if(change==='/homework3/:id')
        this.$router.push('/course2/'+id);
    },
    homeworkClickButton1() {
      this.$refs.button1.style.border = '1px solid #ededed'
      this.$refs.button2.style.border = 'none'
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      let course=this.$route.query.course
      if(change==='/homework1/:id')
      this.$router.push('/homework1/'+id+'?course='+course);
      if(change==='/homework3/:id')
      this.$router.push('/homework3/'+id+'?course='+course);
    },
    homeworkClickButton2() {
      this.$refs.button1.style.border = 'none'
      this.$refs.button2.style.border = '1px solid #ededed'
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      let course=this.$route.query.course
      if(change==='/homework1/:id')
      this.$router.push('/homework2/'+id+'?course='+course);
      if(change==='/homework3/:id')
      this.$router.push('/homework4/'+id+'?course='+course);
    },
  }
}
</script>

<style lang="less">
@import "@/css/index.less";
</style>