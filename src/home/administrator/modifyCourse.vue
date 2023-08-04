<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">修改信息</h3>
    <div id="modifyPeopleBox">
      <div id="modifyPeopleBoxContent">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名" prop="username">
            <el-input v-model="ruleForm.coursename" autocomplete="off" disabled ></el-input>
          </el-form-item>
          <el-form-item label="教师" prop="username">
            <el-input v-model="ruleForm.teacher" autocomplete="off" placeholder="请输入修改后的教师"></el-input>
          </el-form-item>
          <el-form-item label="邀请码" prop="username">
            <el-input v-model="ruleForm.code" autocomplete="off" placeholder="请输入修改后的邀请码"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="0">未完成</el-radio>
              <el-radio :label="1">已完成</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="deleteForm('ruleForm')" style="float: right;">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </headers>
</template>

<script>
import axios from "axios";
export default {
  name: "modifyCourse",
  data() {
    return {
      ruleForm: {
        teacher:'',
        coursename:'',
        code:'',
      },
      fullscreenLoading: false,
      status:'',
    };
  },
  created() {
    axios.post('/my/course/viewcourse',{coursename:this.$route.query.course}).then(res=>{
      console.log(res.data.status)
      console.log(res.data.data)
      if(res.data.status===0) {
        this.ruleForm=res.data.data[0]
        this.status=res.data.data[0].status
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  methods: {
    left() {
      this.$router.push({name:'courseAdmin',query:{admin:'courseAdmin'}})
    },
    submitUserList(){
      axios.post('/my/course/updatecourse',{coursename:this.$route.query.course,teacher:this.ruleForm.teacher,status:this.status,code:this.ruleForm.code}).then(res=>{
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
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.submitUserList()
        } else {
          this.$message({
            message: '修改错误！',
            type: 'error'
          });
        }
      });
    },
    deleteForm(){
      axios.post('/my/course/deletecourse',{coursename:this.$route.query.course}).then(res=>{
        console.log(res.data.status)
        if(res.data.status===0){
          this.$message({
            message: '删除成功！',
            type: 'error'
          });
          window.location.reload();
        }
        if(res.data.status===1)
        {
          this.$message({
            message: '删除失败！',
            type: 'error'
          });
        }
      })
      this.fullscreenLoading = false;
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
  .el-input__inner {
    background-color: white;
    color: black;
  }
}
</style>