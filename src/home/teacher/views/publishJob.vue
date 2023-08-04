<template>
<div id="publishJob">
<div id="publishJobBox">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="作业名称" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>
    <el-form-item label="截止时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker  value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.date1" style="width: 150px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker  placeholder="选择时间" value-format="HH:mm:ss" v-model="ruleForm.date2" style="width: 150px;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="作业内容" prop="desc"><el-input type="textarea" v-model="ruleForm.desc" resize="none" :autosize="{ minRows: 12,maxRows: 12}"></el-input></el-form-item>
    <el-form-item><el-button type="primary" @click="submitForm('ruleForm')" style="margin-top: 205px;">创建作业</el-button>
                  <el-button @click="resetForm('ruleForm')" style="margin-top: 205px;">重置</el-button>
                  <el-button @click="submitGo" style="margin-top: 205px;">取消</el-button></el-form-item>
  </el-form>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "publishJob",
  data() {
    return {
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入作业名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        date1: [
          {  required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          {  required: true, message: '请选择时间', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitGo(){
      let number = false;
      this.$emit('cancel',number);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/my/course/publishjob',{homeworkname:this.ruleForm.name,course:this.$route.query.course,data:this.ruleForm.date1,time:this.ruleForm.date2,topic:this.ruleForm.desc}).then(res=>{
            console.log(res.data.data)
            if(res.data.status===0) {
              this.$message({
                type: 'success',
                message: '创建成功'
              });
              let number = false;
              this.$emit('cancel',number);
              window.location.reload();
            }
            if(res.data.status===1) {
              this.$message({
                type: 'error',
                message: '创建失败'
              });
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '创建错误'
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

<style lang="less">
#publishJob{
  background: rgba(0,0,0,.7);
  z-index: 100;
  position:absolute;
  width: 1050px;
  height: 100%;
  padding: 100px 275px;
}
#publishJobBox{
  background: white;
  height: 500px;
  width: 500px;
  border-radius: 10%;
  padding: 20px 0;
  .el-form-item{
    height: 50px;
    width: 480px;
    .el-input--prefix .el-input__inner {
      width: 150px;
    }
    .el-date-picker__header--bordered {
     z-index: 101;
    }
    .has-seconds{
      z-index: 101;
      height: 20px;
    }
  }
}
.el-date-picker__header {
  height: 0;
}
.el-date-picker table {
  height: 38px;
  margin: 30px 0;
}
.el-picker-panel{
  height: 310px;
}
.el-time-panel{
  height: 220px;
}
.el-time-panel__footer {
  margin: -3px 0;
  z-index: 99999;
}
.el-time-panel__content {
  height: 190px;
}
.el-date-editor--time{
  width: 300px;
}
</style>