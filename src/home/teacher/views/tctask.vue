<template v-if="sonRefresh">
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">我的任务</h3>
    <div>
      <publishTask1  v-if="number" ref="number" @cancel="cancel" :data="xgData"/>
      <div  class="ss" v-if="nr==='1'">
        <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
      </div>
      <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
        {{nr}}
      </div>
      <homeworks v-for="item in pageList" :key="item.id">
        <a slot="name"><router-link :to="{name:'list3',query: {course:item.course,task: item.taskname,status:status}}">{{item.taskname}}</router-link></a>
        <span slot="time">{{item.time}}</span>
        <img src="@/assets/1.png" slot="img">
        <a slot="xg"><img src="@/assets/xg.png" @click="xg(item.taskname)" v-if="status==0"></a>
      </homeworks>
    </div>
  </headers>
</template>

<script>
import axios from "axios";
import publishTask1 from "@/home/teacher/views/publishTask1.vue";
export default {
  name: "tctask",
  data(){
    return {
      sonRefresh: true,
      onTaskList:[],
      nr:'1',
      input:'',
      number:false,
      xgData:'1',
      status:this.$route.query.status,
    }
  },
  components:{
    publishTask1,
  },
  created(){
    axios.post('/my/course/gettask',{username:this.$route.params.id,coursename:this.$route.query.course}).then(res=>{
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='你目前还没有发布任何任务哦~';
        }else{
          this.onTaskList=res.data.data
        }
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      return this.onTaskList.filter((item) => {
        return item.taskname.indexOf(this.input) !== -1;
      })
    },
  },
  methods: {
    cancel(val){
      this.number=val;
    },
    left(){
      let id=this.$route.params.id
      if(this.status==0)
        this.$router.push('/course1/'+id);
      if(this.status==1)
        this.$router.push('/course2/'+id);
    },
    xg(name){
      this.xgData=name
      this.number='true'
    }
  }
}
</script>
