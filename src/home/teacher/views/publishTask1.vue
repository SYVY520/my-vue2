<template>
  <div id="publishTask">
    <div id="publishTaskBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
        <el-form-item><el-button type="primary" @click="submitForm('ruleForm')" style="margin-top: 15px;">修改任务</el-button>
          <el-button @click="resetForm('ruleForm')" style="margin-top: 15px;">重置</el-button>
          <el-button @click="submitGo" style="margin-top: 15px;">取消</el-button></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "publishTask",
  props:['data'],
  data() {
    return {
      ruleForm: {
        date1: '',
        date2: '',
      },
      rules: {
        date1: [
          {  required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          {  required: true, message: '请选择时间', trigger: 'change' }
        ],
      }
    };
  },
  created(){
    axios.post('/my/course/hdtask',{taskname:this.data}).then(res=>{
      if(res.data.status===0) {
        let str = res.data.data[0].time
        let arr = str.split(" ")
        this.ruleForm.date1=arr[0]
        this.ruleForm.date2=arr[1]
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  methods: {
    submitGo(){
      let number = false;
      this.$emit('cancel',number);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/my/course/xgtask',{taskname:this.data,time:this.ruleForm.date1+' '+this.ruleForm.date2}).then(res=> {
            if (res.data.status === 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              window.location.reload()
            }
            if (res.data.status === 1) {
              this.$message({
                type: 'error',
                message: '修改失败'
              });
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '修改错误'
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
#publishTask{
  background: rgba(0,0,0,.7);
  z-index: 100;
  position:absolute;
  width: 1050px;
  height: 100%;
  padding: 100px 275px;
}
#publishTaskBox{
  background: white;
  height: 200px;
  width: 500px;
  border-radius: 10px 10px 10px 10px;
  padding: 30px 0;
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