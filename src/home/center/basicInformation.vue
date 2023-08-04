<template>
  <div>
    <div style="position: absolute;" ref="backBox">
      <div id="basicInformationBox">
        <div id="basicInformationImg">
          <div id="modifyAvatarBox">
            <div id="changeImg">
              <img :src="information.user_pic">
            </div>
            <div>
              <el-upload
                  class="upload-demo"
                  :http-request="updateImg"
                  :show-file-list="false"
                  >
                <el-button  style="background: none;margin-top: 5px;color: #409EFF; border: none;margin-left: -10px;">修改头像</el-button>
                <div slot="tip" class="el-upload__tip" style="width: 1000px;margin-left: -50px;">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
          </div>
        </div>
        <div id="basicInformationContent">
          <div id="basicInformationLeft">
            <div>账号</div>
            <div v-if="information.identity==='student'">班级</div>
            <div>昵称</div>
            <div>性别</div>
            <div>手机号</div>
          </div>
          <div id="basicInformationRight">
            <div>{{this.$route.params.id}}</div>
            <div v-if="information.identity==='student'">{{information.class}}</div>
            <el-input v-model="information.nickname" style="margin-top: -20px;margin-left: -16px;" :disabled="change"></el-input>
            <div style="height: 40px;width: 200px; margin-top: 10px;">
              <el-radio-group v-model="sex">
                <el-radio  :label="0">女</el-radio>
                <el-radio  :label="1">男</el-radio>
              </el-radio-group>
            </div>
            <el-input style="margin-top: -8px;margin-left: -16px;" v-model="information.number" disabled></el-input>
          </div>
          <div id="basicInformationButton" ref="basicInformationButton"><el-button type="text" style="color: #409EFF;" @click="basicInformationButton">更改</el-button></div>
          <div id="basicInformationChange"><el-button type="text" style="color: #409EFF;" @click="basicInformationChange">修改</el-button></div>
          <div id="basicInformationSave"><el-button type="text" style="color: #409EFF;" @click="basicInformationSave">保存</el-button></div>
        </div>
      </div>
    </div>
      <number  v-if="number" ref="number" @cancel="cancel"/>
  </div>
</template>

<script>
import number from "@/home/center/number";
import axios from "axios";
export default {
  name: "basicInformation",
  data() {
    return {
      image: false,
      number:false,
      change:true,
      loading:false,
      sex:'1',
      information:{
        username:this.$route.params.id,
        nickname:'',
        number:'1111111111',
        user_pic:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        identity:'',
        class:''
      },
    };
  },
  components:{
    number,
  },
  created() {
    axios.post('/my/getuserinfo',this.information).then(res=>{
        if(res.data.status===0) {
          this.information=res.data.data
          this.sex=res.data.data.sex
          if(this.information.identity==='student'){
            this.$refs.basicInformationButton.style.marginTop='155px';
          }
          if(res.data.data.user_pic==null) this.information.user_pic='https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        }
        if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  methods: {
    getBasicInformation() {
      axios.post('/my/updateuserinfo', this.information).then(res => {
        console.log(res.data.status)
        if (res.data.status === 0) {
          this.$message({
            message: '更新成功！',
            type: 'success'
          })
          this.information = res.data.data
        }
        if (res.data.status === 1) this.$message({
          message: '更新失败！',
          type: 'error'
        })
      })
    },
    basicInformationChange() {
      this.change = false
    },
    basicInformationSex() {
      axios.post('/my/updateuserinfo', {sex: this.sex, username: this.information.username}).then(res => {
        console.log(res.data.status)
        if (res.data.status === 0) {
          this.$message({
            message: '更新成功！',
            type: 'success'
          })
          this.information = res.data.data
        }
        if (res.data.status === 1) this.$message({
          message: '更新失败！',
          type: 'error'
        })
      })
    },
    basicInformationSave() {
      this.change = true
      this.getBasicInformation()
      this.basicInformationSex()
      window.location.reload()
    },
    cancel(val) {
      this.number = val;
    },
    basicInformationButton() {
      this.number = 'true'
    },
    updateImg(data){
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('username', this.information.username)
      this.loading = true
      window.location.reload()
      return axios({
        url: '/my/updateimg',
        method: 'post',
        data: formData
      })
    }
  }
}
</script>

<style lang="less">
#basicInformationBox {
  margin-top: 20px;
  margin-left: 30px;
  height: 300px;
  width: 600px;
  padding: 25px 0;
}
#basicInformationImg {
  width: 150px;
  height: 150px;
  float: left;
}
#basicInformationContent {
  float: left;
  width: 300px;
  height: 250px;
  margin-left: 20px;
}
#basicInformationLeft {
  float: left;
  height: 40px;
  width: 65px;
}
#basicInformationRight {
  float: left;
  height: 40px;
  width: 100px;
  .el-radio__input{
    height: 14px;
    .el-radio{
      width: 60px;
      float: left;
      vertical-align: middle;
    }
  }
  .el-input__inner{
    border: none;
    color: black;
    background: white;
    line-height: 40px;
    width: 132px;
  }
}
#basicInformationButton{
  margin-left: 20px;
  margin-top: 112px;
  float: left;
  width: 40px;
  height: 40px;
}
#basicInformationChange{
  margin-left: 60px;
  margin-top: 150px;
  width: 40px;
  height: 40px;
}
#basicInformationSave{
  margin-left: 110px;
  margin-top: -100px;
  width: 40px;
  height: 40px;
}
#modifyAvatarBox {
  margin-left: 40px;
  height: 30px;
  width: 83px;
  margin-top: 10px;
  color: cornflowerblue;
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
#changeImg{
  width: 150px;
  height: 150px;
  border: 1px dashed #8c939d;
  margin-left: -40px;
  margin-top: -10px;
}
</style>