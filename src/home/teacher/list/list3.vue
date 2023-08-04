<template>
  <div>
    <div  class="ss" v-if="nr==='1'">
      <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
    </div>
    <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
      {{nr}}
    </div>
    <lists v-for="item in pageList" :key="item.id">
      <a slot="name">{{item.name}}</a>
      <span slot="class">{{item.class}}</span>
    </lists>
  </div>
</template>

<script>
import axios from "axios";
import lists from "@/home/teacher/views/lists";
export default {
  name: "list3",
  components:{
    lists,
  },
  data(){
    return{
      onHomeworkList:[],
      nr:'1',
      input:'',
    }
  },
  created(){
    axios.post('/my/course/getstudent2',{coursename:this.$route.query.course,taskname:this.$route.query.task}).then(res=>{
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='学生已经全部完成任务哦~';
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
        return item.name.indexOf(this.input) !== -1 || item.class.indexOf(this.input) !== -1;
      })
    },
  },
}
</script>
