<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">修改信息</h3>
    <div id="modifyPeopleBox">
      <div id="modifyPeopleBoxContent">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名">
            <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入修改后的姓名"></el-input>
          </el-form-item>
          <el-form-item label="班级" v-if="identity==='student'">
            <el-input v-model="ruleForm.class" autocomplete="off" placeholder="请输入修改后的班级"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份">
            <el-radio-group v-model="identity">
              <el-radio :label="'student'">学生</el-radio>
              <el-radio :label="'teacher'">教师</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </headers>
</template>

<script>
import axios from "axios";
export default {
  name: "modifyPeople",
  data() {
    var validatePass = (rule, value, callback) => {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name:'',
        username:'',
        password:'',
        checkPass:'',
        class:'',
      },
      fullscreenLoading: false,
      status:1,
      identity:'student',
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    axios.post('/my/course/viewpeople',{username:this.$route.query.username}).then(res=>{
      console.log(res.data.status)
      if(res.data.status===0) {
        this.ruleForm.name=res.data.data[0].name
        this.ruleForm.class=res.data.data[0].class
        this.ruleForm.username=res.data.data[0].username
        this.status=res.data.data[0].status
        this.identity=res.data.data[0].identity
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    submitUserList(){
      if(this.ruleForm.password===''){
        axios.post('/my/course/updatepeople',{name:this.ruleForm.name,username:this.ruleForm.username,class:this.ruleForm.class,status:this.status,identity:this.identity}).then(res=>{
          console.log(res.data.status)
          if(res.data.status===0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            window.location.reload();
          }
          if(res.data.status===1)
          {
            this.$message({
              message: '修改失败！',
              type: 'error'
            });
          }
        })
        this.fullscreenLoading = false;
      }else{
        axios.post('/my/course/updatepeople',{name:this.ruleForm.name,username:this.ruleForm.username,status:this.status,identity:this.identity,password:this.ruleForm.password}).then(res=>{
          console.log(res.data.status)
          if(res.data.status===0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            window.location.reload();
          }
          if(res.data.status===1)
          {
            this.$message({
              message: '修改失败！',
              type: 'error'
            });
          }
        })
        this.fullscreenLoading = false;
      }
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
  }
}
</script>

<style lang="less">
@import "@/css/index.less";
#modifyPeopleBox{
  margin: auto;
  padding: 20px 20px;
}
#modifyPeopleBoxContent{
  width: 370px;
  height: 320px;
  background: white;
.el-form{
  margin-top: 20px;
  height: 40px;
  width: 400px;
}
  .el-radio__inner {
    margin: 10px 10px;}
}
</style>

