<template>
  <div>
    <div  class="ss" v-if="nr==='1'">
      <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
    </div>
    <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
      {{nr}}
    </div>
    <homework v-for="item in pageList" :key="item.id">
      <a slot="homeworkname">
        <router-link :to="{name:'details1',query: { homework: item.homeworkname }}">
        {{item.homeworkname}}
        </router-link>
      </a>
      <a slot="score">{{item.score}}</a>
      <span slot="time">{{item.data+' '+item.time}}</span>
    </homework>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "homework4",
  data(){
    return{
      HomeworkList:[],
      nr:'1',
      input:'',
    }
  },
  created(){
    axios.post('/my/course/gethomework1',{username:this.$route.params.id,coursename:this.$route.query.course}).then(res=>{
      console.log(res.data.data)
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='你目前还没有任何作业哦~';
        }else{
          this.HomeworkList=res.data.data
        }
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      return this.HomeworkList.filter((item) => {
        return item.homeworkname.indexOf(this.input) !== -1;
      })
    },
  },
}
</script>
