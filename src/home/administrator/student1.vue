<template>
  <div>
    <div  class="ss">
      <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
    </div>
    <lists v-for="item in page" :key="item.id" v-if="input===''">
      <a slot="name">
        <router-link :to="{name:'modifyPeople',query: { username: item.username }}">{{item.name}}</router-link>
      </a>
    </lists>
    <lists v-for="item in pageList" :key="item.id" v-if="input!==''">
      <a slot="name">
        <router-link :to="{name:'modifyPeople',query: { username: item.username }}">{{item.name}}</router-link>
      </a>
    </lists>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
          @size-change="handleSizeChange"
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
  name: "student1",
  components:{
    lists,
  },
  data(){
    return{
      studentList:[],
      total:'',
      currentPage: 1,
      page:[],
      input:'',
    }
  },
  created(){
    axios.post('/my/course/adminpersonnel',{status:1,identity:'student'}).then(res=>{
      console.log(res.data.data)
      if(res.data.status===0) {
        this.studentList=res.data.data
        this.total=res.data.data.length
        this.page = this.studentList.slice(0, 10)
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      this.total=0;
      return this.studentList.filter((item) => {
        if(item.name.indexOf(this.input) !== -1){
          this.total= this.total+1;
        }
        return item.name.indexOf(this.input) !== -1;
      })
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.page = this.studentList.slice((val-1)*10, val*10)
    }
  },
}
</script>
<style lang="less">
@import "@/css/index.less";
</style>
