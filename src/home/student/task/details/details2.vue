<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">互评任务</h3>
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
        <h4 style="height: 30px;">他的答案:</h4>
        <el-input
            type="textarea"
            resize="none"
            v-model="textarea"
            readonly
        ></el-input>
      </div>
      <div id="detailsFooter">
        <h4 style="height: 30px;"><slot>我的评语:</slot></h4>
        <el-input type="textarea"
                  v-model="inputFooter"
                  resize="none"
        ></el-input>
      </div>
      <div id="detailsScore">
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
              label="分数"
              prop="age"
              style="margin-left: -50px;"
              :rules="[
      { required: true, message: '分数不能为空'},
      { type: 'number', message: '分数必须为数字值'}
    ]">
            <el-input v-model.number="numberValidateForm.age" autocomplete="off" style="width: 100px;"></el-input>
            <el-button type="primary" @click="submitForm('numberValidateForm')" style="margin-left: 20px;">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </headers>
</template>

<script>
import axios from "axios";
export default {
  name: "details2",
  data() {
    return {
      numberValidateForm: {
        age: ''
      },
      input: '',
      textarea: '',
      inputFooter:'',
      username:'',
    }
  },
  created(){
    axios.post('/my/course/task',{username:this.$route.params.id,homeworkname:this.$route.query.task}).then(res=>{
      console.log(res.data.data)
      if(res.data.status===0){
        this.input=res.data.data[0][0].topic
        this.textarea=res.data.data[1][0].answer
        this.username=res.data.data[1][0].usernameuh
        console.log('加入成功！')
      }
      if(res.data.status===1){
        console.log('加入失败！')
      }
    })
  },
  methods:{
    left(){
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/my/course/updatetask',{usernameut:this.username,approver:this.$route.params.id,tasknameut:this.$route.query.task,commentsut:this.inputFooter,score:this.numberValidateForm.age}).then(res=>{
            console.log(res.data.data)
            if(res.data.status===0){
              this.$message({
                type: 'success',
                message: '提交成功'
              });
            }
            if(res.data.status===1){
              this.$message({
                type: 'error',
                message: '提交失败'
              });
            }
          })
        }else {
          this.$message({
            type: 'error',
            message: '提交错误！'
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
@import "@/css/index.less";
</style>


