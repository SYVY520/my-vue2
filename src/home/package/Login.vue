<template v-if="sonRefresh">
  <div id="loginHome">
    <div id="loginBox">
      <el-form :rules="rules"
               ref="loginForm"
               :model="loginForm">
        <h3 class="loginTitle">用户登录</h3>
        <el-form-item  prop="username" style="height: 50px;">
          <el-input   class="loginRadius" type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名" autofocus="autofocus"></el-input>
        </el-form-item>
        <el-form-item  prop="password" style="height: 50px;">
          <el-input class="loginRadius" type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item  prop="captcha" style="height: 50px;">
          <el-input class="loginRadius" type="text" auto-complete="false" v-model="loginForm.captcha" placeholder="点击图片，更换验证码" style="width: 175px;margin-right: 10px;margin-bottom: 5px;"></el-input>
          <img :src="captchaUrl" @click="updateCaptcha" class="el-from-item__content" style="float: right;">
        </el-form-item>
        <el-checkbox  style="height: 10px;float: left;margin-top: 0;" v-model="checked" class="loginRemember">记住我</el-checkbox>
        <div style="width: 278px;margin-top: 50px;height: 50px;">
          <el-button class="loginRadius" type="primary" style="width:100%; float: right;margin-top: 10px;"  @click="submitLogin" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
        </div>
        </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      captchaUrl:'',
      userList:{},
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      sonRefresh: true,
      fullscreenLoading: false,
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        captcha: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  mounted(){
    this.captchaUrl = '/api/captcha'
  },
  watch:{
$route(){
  this.$router.go();
}
  },
  methods: {
    updateCaptcha(){
      this.captchaUrl = '/api/captcha?' + new Date();// 接口
    },
     getUserList(){
       axios.post('/api/login',this.loginForm).then(res=>{
         if (window.localStorage.getItem('token')) {
           axios.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
         }
         if(res.data.code===0){
           this.updateCaptcha()
           this.$message({
             message: '验证码错误！',
             type: 'error'
           });
           this.fullscreenLoading = false;
         }
         if(res.data.status===0) {
           if(res.data.data[0].identity==='admin')
           this.$router.push('/courseAdmin/' + this.loginForm.username+'?admin=courseAdmin')
           if(res.data.data[0].identity==='teacher')
             this.$router.push('/course1/' + this.loginForm.username)
             if(res.data.data[0].identity==='student')
               this.$router.push('/course1/' + this.loginForm.username)
           this.fullscreenLoading = false;
         }
         if(res.data.status===1) {this.$message({
           message: '登录失败！',
           type: 'error'
         });
           this.fullscreenLoading = false;
         }
     })
    },
     submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.getUserList()
        } else {
          this.$message({
            message: '请输入所有内容',
            type: 'error'
          });
          return false;
        }
      })
      }
    },
}
</script>

<style lang="less">
#loginHome{
  background: #f7f7f7;
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}
#loginBox{
  position: absolute;
  border-radius: 20px;
  background-clip: padding-box;
  margin-left: 600px;
  margin-top: 150px;
  width: 350px;
  height:380px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  height:30px;
}
.loginRemember {
  text-align: left;
  margin: -10px 0px 20px 0px;
}
.el-message{
  height: 45px;
  .el-from-item__content {
    align-items: center;
    line-height: 48px;
  }
}
.loginRadius{
  border-radius: 24px;
  height:48px;
  font-size:14px;
}
</style>

