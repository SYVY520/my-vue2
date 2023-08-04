<template>
<div id="cancelAccountBox">
  <el-input
      type="textarea"
      placeholder="请输入注销原因......"
      :autosize="{ minRows: 10, maxRows: 15}"
      resize="none"
      v-model="cancel.textarea">
  </el-input>
    <el-button type="primary" @click="cancelButton">注销</el-button>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "cancelAccount",
  data() {
    return {
      cancel:{
        textarea: '',
        status:'1'
      }
    }
    },
  methods:{
    cancelButton() {
      this.$confirm('此操作将注销账户, 是否继续?', '提示', {
        customClass:'cancelMessage',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/my/updateuserinfo',{status:this.cancel.status,username:this.$route.params.id}).then(res=>{
          if(res.data.status===0) {this.$message({
            message: '注销成功！',
            type: 'success'
          })
            this.$router.replace('/')
          }
          if(res.data.status===1) this.$message({
            message: '注销失败！',
            type: 'error'
          })})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  }
}
</script>

<style lang="less">
#cancelAccountBox{
  margin-left: 30px;
  margin-top: 20px;
  height: 150px;
  width: 600px;
  .el-button{
    margin-top: 80px;
    height: 40px;
    float: right;
  }
}
.cancelMessage{
  height: 105px;
  .el-message-box__message p {
    margin: 9px;
  }
  .el-message-box__header {
    height: 10px;
  }
  .el-message-box__content {
    height: 30px;
  }
  .el-message-box__btns {
    padding: 12px 17px 41px;
    height: 40px;
    .el-button {
      line-height: 0;
    }
    .el-button--small {
      padding: 13px 15px;
    }
  }
}
</style>