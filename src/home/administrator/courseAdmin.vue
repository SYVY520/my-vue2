<template>
  <div>
    <div  class="ss">
      <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
    </div>
    <lists v-for="item in page" :key="item.id" v-if="input===''">
      <a slot="name">
        <router-link :to="{name:'modifyCourse',query: { course: item.coursename }}">{{item.coursename}}</router-link>
      </a>
    </lists>
    <lists v-for="item in pageList" :key="item.id" v-if="input!==''">
      <a slot="name">
        <router-link :to="{name:'modifyCourse',query: { course: item.coursename }}">{{item.coursename}}</router-link>
      </a>
    </lists>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lists from "@/home/teacher/views/lists";
export default {
  name: "courseAdmin",
  components:{
    lists,
  },
  data(){
    return{
      courseList:[],
      page:[],
      total:0,
      currentPage: 1,
      input:'',
    }
  },
  created(){
    axios.post('/my/course/admincourse',{status:0}).then(res=>{
      if(res.data.status===0) {
        this.courseList=res.data.data
        this.total=res.data.data.length
        this.page = this.courseList.slice(0, 10)
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      this.total=0;
      return this.courseList.filter((item) => {
        if(item.coursename.indexOf(this.input) !== -1){
         this.total= this.total+1;
        }
        return item.coursename.indexOf(this.input) !== -1;
      })
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.page = this.courseList.slice((val-1)*10, val*10)
    },
  },
}
</script>
<style lang="less">
@import "@/css/index.less";
</style>
