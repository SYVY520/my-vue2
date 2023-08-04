<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">互评任务</h3>
    <div id="content1">
      <button id="Button1" class="Button" ref="button1" @click="homeworkClickButton1" >进行中</button>
      <button id="Button2" class="Button" ref="button2" @click="homeworkClickButton2" >已完成</button>
    </div>
    <div><router-view/></div>
  </headers>
</template>

<script>
export default {
  name: "task",
  mounted() {
    this.timer=window.setTimeout(()=>{
      let change=this.$route.name
      if(change==='task1' ||  change==='task3')
        this.$refs.button1.style.border = '1px solid #ededed'
      if(change==='task2' || change==='task4')
        this.$refs.button2.style.border = '1px solid #ededed'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    left(){
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      if(change==='/task1/:id')
        this.$router.push('/course1/'+id);
      if(change==='/task3/:id')
        this.$router.push('/course2/'+id);
    },
    homeworkClickButton1(){
      this.$refs.button1.style.border = '1px solid #ededed'
      this.$refs.button2.style.border = 'none'
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      let course=this.$route.query.course
      if(change==='/task1/:id')
        this.$router.push('/task1/'+id+'?course='+course);
      if(change==='/task3/:id')
        this.$router.push('/task3/'+id+'?course='+course);
    },
    homeworkClickButton2(){
      this.$refs.button1.style.border = 'none'
      this.$refs.button2.style.border = '1px solid #ededed'
      let id=this.$route.params.id
      let change=this.$route.matched[1].path
      let course=this.$route.query.course
      if(change==='/task1/:id')
        this.$router.push('/task2/'+id+'?course='+course);
      if(change==='/task3/:id')
        this.$router.push('/task4/'+id+'?course='+course);
    },
  }

}
</script>

<style>
@import "@/css/index.less";
</style>