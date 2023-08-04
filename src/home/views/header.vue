<template>
  <div style="position: relative;">
    <div id="headerHeader">
      <div id="headerHeader1">
        <div class="headerTitle" @click="goTo" @mouseover="mouseoverTitle" ref="mouseoverTitleRef">云课程</div>
        <span @mouseover="headerMouseoverImg" @mouseout="headerMouseoutImg" id="headerMouse">
          <span id="headerName">{{this.information.nickname}}</span>
          <span><img :src=this.information.user_pic id="headerImg"></span>
          <div id="headerButton" ref="button">
            <button @click="headerButtonClick1" id="headerButtonSon" ref="buttonSon1" @mouseover="headerMouseoverButton1"
                    @mouseout="headerMouseoutButton1">个人中心
            </button>
            <button @click="headerButtonClick2" id="headerButtonSon" ref="buttonSon2" @mouseover="headerMouseoverButton2"
                    @mouseout="headerMouseoutButton2">登出系统
            </button>
          </div>
        </span>
      </div>
    </div>
    <div style="height: 40px;background: #f7f7f7; width: 100%"></div>
    <div id="headerFooter">
      <div id="headerContent">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "header0",
  data() {
    this.sonRefresh= false;
    this.$nextTick(() => {
      this.sonRefresh= true;
    });
    return {
      information:{
        username:this.$route.params.id,
        nickname:'gfhdg1111',
        user_pic:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
      },
    }
  },
  created(){
    axios.post('/my/getuserinfo',this.information).then(res=>{
      if(res.data.status===0) {
        this.information=res.data.data
        if(res.data.data.nickname==null) this.information.nickname=res.data.data.username
        if(res.data.data.user_pic==null) this.information.user_pic='https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        if(res.data.data.user_pic!=null) this.information.user_pic=res.data.data.user_pic
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  methods: {
   goTo(){
     if(this.$route.name==='courseAdmin')
       this.$router.push({name:'courseAdmin',query:{admin:'courseAdmin'}})
     else{
       let id =this.$route.params.id;
       this.$router.push('/course1/'+id);
     }
   },
    mouseoverTitle(){
      this.$refs.mouseoverTitleRef.style.cursor='pointer'
    },
    headerMouseoverImg() {
      this.$refs.button.style.display = 'block';
    },
    headerMouseoutImg() {
      this.$refs.button.style.display = 'none'
    },
    headerMouseoverButton1() {
      this.$refs.buttonSon1.style.color = 'dodgerblue'
    },
    headerMouseoutButton1() {
      this.$refs.buttonSon1.style.color = 'black'
    },
    headerMouseoverButton2() {
      this.$refs.buttonSon2.style.color = 'dodgerblue'
    },
    headerMouseoutButton2() {
      this.$refs.buttonSon2.style.color = 'black'
    },
    headerButtonClick1() {
      let id =this.$route.params.id;
      this.$router.push('/center/'+id);
    },
    headerButtonClick2() {
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        customClass:'headerMessage',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.removeItem('tokenStr');
        window.sessionStorage.removeItem('user');
        this.$router.replace('/')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
}
}
</script>

<style lang="less">
#headerHeader {
  position: relative;
  width: 100%;
  height: 80px;
  background: lightblue;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
}
#headerHeader1 {
  position: absolute;
  height: 80px;
  width: 1050px;
  margin-left: 227px;
}
.headerTitle {
  position: absolute;
  line-height: 80px;
  left: 10px;
  font-size: 30px;
  font-family: 华文彩云;
  color: darkblue;
}
#headerMouse{
  width: 200px;
  height: 70px;
  float: right;
  margin-right: 20px;
}
#headerImg {
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
  margin-top: 25px;
}
#headerName {
  float: right;
  line-height: 80px;
  right: 24px;
}
#headerButton {
  height: 82px;
  width: 100px;
  position: absolute;
  right: 30px;
  top: 60px;
  background: white;
  border-radius: 10px;
  border: 1px solid lightskyblue;
  box-shadow: 0 0 25px #cac6c6;
  line-height: 40px;
  text-align: center;
  display: none;
  z-index: 10;
}
#headerButtonSon {
  height: 0;
  border: none;
  background: none;
}
.headerMessage{
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
#headerFooter {
  background: #f7f7f7;
  position: relative;
  width: 100%;
  border-color: rgba(0, 0, 0, 0);
}
#headerContent {
  width: 1050px;
  margin: auto;
  background: white;
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
}
</style>