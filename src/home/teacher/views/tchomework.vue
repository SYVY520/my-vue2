<template v-if="sonRefresh">
    <headers>
      <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">我的作业</h3>
      <div id="content1"><button id="tchomeworkButton3" class="Button" ref="button3" @click="tchomeworkClickButton3" v-if="status==0">发布作业</button></div>
      <publishJob  v-if="number" ref="number" @cancel="cancel"/>
      <publishJob1  v-if="number1" ref="number" @cancel="cancel" :data="xgData"/>
      <div>
        <div  class="ss" v-if="nr==='1'">
          <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
        </div>
        <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
          {{nr}}
        </div>
        <homeworks v-for="item in pageList" :key="item.id">
          <a slot="name"><router-link :to="{name:'list1',query: {course:item.course,homework: item.homeworkname,status:status}}">{{item.homeworkname}}</router-link></a>
          <span slot="time">{{item.data+' '+item.time}}</span>
          <a slot="xg"><img src="@/assets/xg.png" @click="xg(item.homeworkname)" v-if="status==0"></a>
        </homeworks>
      </div>
    </headers>
</template>

<script>
import publishJob from "@/home/teacher/views/publishJob";
import publishJob1 from "@/home/teacher/views/publishJob1.vue";
import axios from "axios";
export default {
  name: "tchomework",
  data(){
    return {
      sonRefresh: true,
      number:false,
      number1:false,
      onHomeworkList:[],
      nr:'1',
      input:'',
      xgData:'1',
      status:this.$route.query.status,
    }
  },
  components:{
    publishJob,
    publishJob1,
  },
  created(){
    axios.post('/my/course/gethomework',{username:this.$route.params.id,coursename:this.$route.query.course}).then(res=>{
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='你目前还没有发布任何作业哦~';
        }else{
          this.onHomeworkList=res.data.data
        }
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      return this.onHomeworkList.filter((item) => {
        return item.homeworkname.indexOf(this.input) !== -1;
      })
    },
  },
  methods: {
    left(){
      let id=this.$route.params.id
      let status=this.$route.query.status
      if(status==0)
      this.$router.push('/course1/'+id);
      if(status==1)
        this.$router.push('/course2/'+id);
    },
    tchomeworkClickButton3(val) {
      this.number='true'
    },
    cancel(val){
      this.number=val;
      this.number1=val;
    },
    xg(name){
      this.xgData=name
      this.number1='true'
    }
  }
}
</script>

<style lang="less">
#tchomeworkButton3 {
  color: white;
  margin-left: 900px;
  background: cornflowerblue;
}
.tchomeworkMessage{
  height: 161px;
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
    padding: 65px 17px 41px;
    height: 40px;
    .el-button {
      line-height: 0;
    }
    .el-button--small {
      padding: 13px 15px;
    }
  }
  .el-message-box__errormsg {
    margin-top: 13px;
  }
}
</style>