<template>
<div id="passwordBox">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="旧密码" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="nemPwd">
      <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "passwordManagement",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      else  callback();
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
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username:this.$route.params.id,
        password: '',
        newPwd: '',
        checkPass: '',
      },
      rules: {
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        password: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(1)
          axios.post('/my/updatepwd',{newPwd:this.ruleForm.newPwd,password:this.ruleForm.password,username:this.ruleForm.username}).then(res=>{
            console.log(res.data.status)
            if(res.data.status===0) this.$message({
              message: '更新成功！',
              type: 'success'
            })
            if(res.data.status===1) this.$message({
              message: '更新失败！',
              type: 'error'
            })
          if(res.data.status===2) this.$message({
            message: '原密码错误！',
            type: 'error'
          })

      });
    }
        else {
          console.log('error submit!!');
          return false;}
  })
}
  }
}
</script>

<style lang="less">
#passwordBox{
  height: 100px;
  margin-left: 10px;
  margin-top: 20px;
  .el-form{
    height: 40px;
    width: 400px;
    .el-button{
      float: right;
    }
  }
  .el-input__inner{
    width: 300px;
  }
}
</style>