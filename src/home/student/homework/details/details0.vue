<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">提交作业</h3>
    <div id="detailsBox">
      <div id="detailsHeader">
        <h4 style="height: 30px;">作业题目:</h4>
        <el-input type="textarea"
                  v-model="input"
                  resize="none"
                  readonly
        ></el-input>
      </div>
      <div id="detailsMiddle">
        <h4 style="height: 30px;">我的答案:</h4>
        <el-input
            type="textarea"
            resize="none"
            v-model="textarea"
        ></el-input>
      </div>
      <div id="detailsBrotherFooter">
        <el-button type="primary" style="float: right;" customClass="detailsButton" @click="submit">点击提交</el-button>
      </div>
<!--      <div style="margin-top: 60px;">-->
<!--        <el-upload-->
<!--            list-type="picture-card"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :http-request="updateImg">-->
<!--          <i class="el-icon-plus"></i>-->
<!--        </el-upload>-->
<!--        <el-dialog :visible.sync="dialogVisible">-->
<!--          <img width="100%" :src="dialogImageUrl" alt="">-->
<!--        </el-dialog>-->
<!--      </div>-->
    </div>
  </headers>
</template>

<script>
import axios from "axios";
export default {
  name: "details0",
  data() {
    return {
      input: '',
      textarea: '',
      // dialogImageUrl: '',
      // dialogVisible: false
  };
  },
  created(){
    axios.post('/my/course/homeworktopic',{username:this.$route.params.id,homeworkname:this.$route.query.homework}).then(res=>{
      if(res.data.status===0){
        this.input=res.data.data[0].topic
        console.log('加入成功！')
      }
      if(res.data.status===1){
       console.log('加入失败！')
      }
    })
  },
  methods:{
    left(){
      this.$router.go(-1);
    },
    submit(){
      axios.post('/my/course/submithomework',{usernameuh:this.$route.params.id,homeworknameuh:this.$route.query.homework,answer:this.textarea}).then(res=>{
        console.log(res.data.data)
        if(res.data.status===0){
          this.$message({
            type: 'success',
            message: '提交成功'
          });
        }
        if(res.data.status===1){
          this.$message({
            type: 'error',
            message: '提交失败'
          });
        }
      })
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // updateImg(data){
    //   console.log(1111)
    //   const formData = new FormData()
    //   formData.append('file', data.file)
    //   formData.append('username', this.$route.params.id)
    //   formData.append('homeworkname', this.$route.query.homework)
    //   this.loading = true
    //   return axios({
    //     url: '/my/updateanswer',
    //     method: 'post',
    //     data: formData
    //   })
    // },
    },
}
</script>

<style lang="less">
@import "@/css/index.less";
#detailsBrotherFooter{
  float: right;
  margin-top: 40px;
  height: 100px;
  padding-bottom: 60px;
.el-button--primary{
  width: 80px;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.el-upload__tip{
  height: 20px;
}
.el-upload-list {
    width: 220px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>