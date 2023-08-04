<template>
    <div>
      <div  class="ss" v-if="nr==='1'">
        <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
      </div>
      <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
        {{nr}}
      </div>
      <homeworks v-for="item in pageList" :key="item.id" v-if="item.status===1">
        <a slot="name">
          <router-link :to="{name:'details0',query: { homework: item.homeworkname }}">
          {{item.homeworkname}}
            </router-link>
        </a>
        <span slot="time">{{item.data+' '+item.time}}</span>
      </homeworks>
      <homeworks0 v-for="item in pageList" :key="item.id" v-if="item.status===0">
        <a slot="name">{{item.homeworkname}}</a>
        <span slot="time">{{item.data+' '+item.time}}</span>
      </homeworks0>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "homework1",
  data(){
    return{
      onHomeworkList:[],
      nr:'1',
      input:'',
    }
  },
  created(){
    axios.post('/my/course/revisehomework').then(res=>{
      if(res.data.status===0) console.log('读取信息成功！')
      else console.log('读取信息失败！')
    })
    axios.post('/my/course/gethomework0',{username:this.$route.params.id,coursename:this.$route.query.course}).then(res=>{
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='你目前还没有任何作业哦~';
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
}
</script>
