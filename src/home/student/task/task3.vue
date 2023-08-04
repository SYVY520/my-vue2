<template>
    <div>
      <div  class="ss" v-if="nr==='1'">
        <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
      </div>
      <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
        {{nr}}
      </div>
      <homeworks0 v-for="item in pageList" :key="item.id">
        <a slot="name">{{item.taskname}}</a>
        <span slot="time">{{item.time}}</span>
        <img src="@/assets/1.png" slot="img">
      </homeworks0>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "task3",
  data(){
    return{
      noTaskList:[],
      nr:'1',
      input:'',
    }
  },
  created(){
    axios.post('/my/course/gettask0',{username:this.$route.params.id,coursename:this.$route.query.course}).then(res=>{
      console.log(res.data.data)
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='你目前还没有任何任务哦~';
        }else{
          this.noTaskList=res.data.data
        }
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      return this.noTaskList.filter((item) => {
        return item.taskname.indexOf(this.input) !== -1;
      })
    },
  },
}
</script>
