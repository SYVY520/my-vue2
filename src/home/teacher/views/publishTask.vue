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
        <span style="color: crimson;font-size: 14px;margin-left: 100px;">该作业的互评任务仅可发布一次，请慎重考虑</span>
        <el-form-item><el-button type="primary" @click="submitForm('ruleForm')" style="margin-top: 15px;">创建任务</el-button>
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
  methods: {
    submitGo(){
      let number = false;
      this.$emit('cancel',number);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/my/course/usertask', {taskname: this.$route.query.homework}).then(res => {
            if (res.data.status === 0) {
              axios.post('/my/course/publishtask',{taskname:this.$route.query.homework,course:this.$route.query.course,time:this.ruleForm.date1+' '+this.ruleForm.date2}).then(res=> {
                if (res.data.status === 1) {
                  this.$message({
                    type: 'error',
                    message: '任务已存在'
                  });
                }
                else{
                  this.$message({
                    type: 'success',
                    message: '创建成功'
                  });
                  let number = false;
                  this.$emit('cancel', number);
                }
              })
            }
            if (res.data.status === 1) {
              this.$message({
                type: 'error',
                message: '完成作业学生人数少于2人！'
              });
            }
          })
        }
        else {
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