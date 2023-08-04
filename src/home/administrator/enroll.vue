<template>
<div id="enrollBox">
<div id="enrollBoxContent">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入学号"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="class">
      <el-input v-model="ruleForm.class" autocomplete="off" placeholder="请输入班级"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
      <el-button @click="resetForm('ruleForm')" style="float: right;">重置</el-button>
    </el-form-item>
  </el-form>
  <div style="margin-top:-70px;padding-left: 345px;width: 40px;height: 40px;"><el-button type="text" style="color:blue;" @click="login"><i class="el-icon-close"></i></el-button></div>
</div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "enroll",
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'));
      } else {
        callback();
      }
    };
    var checkClass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('班级不能为空'));
      } else {
        callback();
      }
    };
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      } else {
            callback();
          }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name:'',
        class:'',
        username:'',
        password: '',
        checkPass: '',
        identity:'student',
      },
      fullscreenLoading: false,
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        class: [
          { validator: checkClass, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    login(){
      let enroll = false;
      this.$emit('cancelEnroll',enroll);
    },
    submitUserList(){
      axios.post('/api/register',this.ruleForm).then(res=>{
        console.log(res.data.status)
        if(res.data.status===0)
        {
          this.$message({
            message: '创建成功！',
            type: 'success'
          });
          let enroll = false;
          this.$emit('cancelEnroll',enroll);
          window.location.reload();
        }
        if(res.data.status===1)
        {
          this.$message({
            message: '创建失败！',
            type: 'error'
          });
        }
      })
      this.fullscreenLoading = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.submitUserList()
        } else {
          this.fullscreenLoading = true;
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
#enrollBox{
  padding: 52px 341px;
  background: rgba(0,0,0,.7);
  z-index: 99999;
  position:absolute;
  width: 1050px;
  height: 100%;
}
#enrollBoxContent{
  width: 370px;
  height: 380px;
  background: white;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 0 25px #cac6c6;
  border: 1px solid #eaeaea;
  .el-form{
    margin-top: 20px;
    height: 40px;
    width: 300px;
    .el-input__inner{
      border-radius:20px;
    }
  }
}
</style>