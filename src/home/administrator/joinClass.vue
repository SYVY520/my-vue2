<template>
  <div id="joinClass">
    <div id="joinClassBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>
        <el-form-item label="课程老师" prop="teacher"><el-input v-model="ruleForm.teacher"></el-input></el-form-item>
        <el-form-item><el-button type="primary" @click="submitForm('ruleForm')" >创建课程</el-button>
          <el-button @click="resetForm('ruleForm')" >重置</el-button>
          <el-button @click="submitGo" >取消</el-button></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "joinClass",
  data() {
    return {
      ruleForm: {
        name: '',
        teacher:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '请输入课程老师', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitGo(){
      let joinClass = false;
      this.$emit('cancelJoinClass',joinClass);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/my/course/publishcourse',{coursename:this.ruleForm.name,teacher:this.ruleForm.teacher}).then(res=>{
            console.log(res.data.data)
            if(res.data.status===0) {
              this.$message({
                type: 'success',
                message: '创建成功'
              });
              let joinClass = false;
              this.$emit('cancelJoinClass',joinClass);
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
#joinClass{
  background: rgba(0,0,0,.7);
  z-index: 100;
  position:absolute;
  width: 1050px;
  height: 100%;
  padding: 100px 275px;
}
#joinClassBox{
  background: white;
  height: 230px;
  width: 400px;
  border-radius: 10px;
  padding: 20px 0;
  .el-form-item{
    height: 50px;
    width: 380px;
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
  .el-button{
    height: 40px;
  }
}
</style>