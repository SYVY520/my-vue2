<template v-if="sonRefresh">
  <div style="background: rgba(0,0,0,.7);z-index: 99999;position:absolute;width: 1050px;height: 100%;">
    <div id="numberBox">
      <el-form :rules="rules"
               ref="numberForm"
               :model="numberForm">
        <h3 class="numberTitle">更改手机号</h3>
        <el-form-item  prop="number" style="height: 50px;">
          <el-input  style="height: 50px;"   id="numberRadius" type="tel" auto-complete="false" v-model="numberForm.number" placeholder="请输入手机号" autofocus="autofocus"></el-input>
        </el-form-item>
        <el-form-item  prop="code" style="height: 50px;">
          <el-input id="numberRadius" type="text" auto-complete="false" v-model="numberForm.code" placeholder="请输入验证码" style="width: 180px;margin-right: 10px;margin-bottom: 5px;"></el-input>
          <button style="float: right; width: 80px;background: none;border: none;font-size: 15px">获取验证码</button>
        </el-form-item>
        <el-button id="numberRadius" type="primary" style="width:40%;float: left;" @click="submitGo" v-loading.fullscreen.lock="fullscreenLoading">取消</el-button>
        <el-button id="numberRadius" type="primary" style="width:40%;float: right;" @click="submitNumber" v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "number",
  data() {
    var number = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号'));
      } else{
        var ab = /^[1][3,4,5,7,8][0-9]{9}$/
        if (ab.test(value) === false) {
        return   callback(new Error('请输入正确电话号码'));
      }else{
          callback();
        }
      }
    };
    return {
      numberForm: {
        number: '',
        code: '',
      },
      sonRefresh: true,
      checked: true,
      rules: {
        number: [{validator:number, trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  inject:['courseClickButton1'],
  methods: {
    submitGo(){
         let number = false;
         this.$emit('cancel',number);
    },
    submitNumber() {
      this.$refs.numberForm.validate((valid) => {
        if (valid) {
          axios.post('/my/updateuserinfo',{number:this.numberForm.number,username:this.$route.params.id}).then(res=>{
            console.log(res.data.status)
            if(res.data.status===0) {this.$message({
              message: '更新成功！',
              type: 'success'
            })
              this.submitGo()
              window.location.reload()
            }
            if(res.data.status===1) this.$message({
              message: '更新失败！',
              type: 'error'
            })})
        } else {
          this.$message({
            message: '请输入正确内容',
            type: 'error'
          });
          return false;
        }
      })
    }

  }
}
</script>

<style lang="less">
#numberBox{
  position: absolute;
  border-radius: 20px;
  background-clip: padding-box;
  margin-left: 350px;
  margin-top: 80px;
  width: 350px;
  height:260px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 15px #cac6c6;
  z-index: 20;
}
.numberTitle {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  height:30px;
}
.numberRemember {
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
#numberRadius{
  border-radius: 24px;
  height:48px;
  font-size:14px;
}
</style>