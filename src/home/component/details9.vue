<template>
<headers>
  <h3 slot="title">
    <img id="left" src="@/assets/left.png" @click="left">
    <slot name="titles">
      作业详情
    </slot>
  </h3>
  <div id="detailsBox">
    <div id="detailsHeader">
      <h4 style="height: 30px;">作业题目:</h4>
      <el-input type="textarea"
                v-model="input"
                resize="none"
                readonly
      ></el-input>
    </div>
    <div id="detailsMiddle">
      <h4 style="height: 30px;"><slot name="answer">我的答案:</slot></h4>
      <el-input
          type="textarea"
          resize="none"
          v-model="textarea"
          readonly
          ></el-input>
    </div>
    <div id="detailsFooter">
      <h4 style="height: 30px;"><slot name="comments">评语:</slot></h4>
      <div id="score"><h4>分数:{{this.score}}</h4></div>
      <el-input type="textarea"
                v-model="inputFooter"
                resize="none"
                readonly
      ></el-input>
    </div>
  </div>
</headers>
</template>

<script>
import axios from "axios";
export default {
  name: "details9",
  data() {
    return {
      input: '',
      textarea: '',
      inputFooter:'',
      score:''
    }
  },
  created(){
    const name = this.$route.name
    if(name==='details1'){
      axios.post('/my/course/obtainhomework',{username:this.$route.params.id,homeworkname:this.$route.query.homework}).then(res=>{
        if(res.data.status===0){
          this.input=res.data.data[0].topic
          this.textarea=res.data.data[0].answer
          this.inputFooter=res.data.data[0].commentsuh
          this.score=res.data.data[0].score
          console.log('加入成功！')
        }
        if(res.data.status===1){
          console.log('加入失败！')
        }
      })
    }
    if(name==='details3'){
      axios.post('/my/course/obtaintask',{username:this.$route.params.id,homeworkname:this.$route.query.task}).then(res=>{
        console.log(res.data.data)
        if(res.data.status===0){
          this.input=res.data.data[0].topic
          this.textarea=res.data.data[0].answer
          this.inputFooter=res.data.data[0].commentsut
          this.score=res.data.data[0].score
          console.log('加入成功！')
        }
        if(res.data.status===1){
          console.log('加入失败！')
        }
      })
    }
    if(name==='tcdetails1'){
      axios.post('/my/course/obtainhomework',{username:this.$route.query.username,homeworkname:this.$route.query.homework}).then(res=>{
        if(res.data.status===0){
          this.input=res.data.data[0].topic
          this.textarea=res.data.data[0].answer
          this.inputFooter=res.data.data[0].commentsuh
          this.score=res.data.data[0].score
          console.log('加入成功！')
        }
        if(res.data.status===1){
          console.log('加入失败！')
        }
      })
    }
    if(name==='tcdetails0'){
      axios.post('/my/course/obtaintask',{username:this.$route.query.username,homeworkname:this.$route.query.task}).then(res=>{
        if(res.data.status===0){
          this.input=res.data.data[0].topic
          this.textarea=res.data.data[0].answer
          this.inputFooter=res.data.data[0].commentsut
          this.score=res.data.data[0].score
          console.log('加入成功！')
        }
        if(res.data.status===1){
          console.log('加入失败！')
        }
      })
    }
  },
  methods:{
    left(){
      this.$router.go(-1);
    },
  }
}
</script>

<style>
@import "@/css/index.less";
#score{
  margin-left: 450px;
margin-top: -30px;
  height: 30px;
}
#detailsFooter{
  margin-top: 40px;
  height: 180px;
  padding-bottom: 60px;
}
</style>