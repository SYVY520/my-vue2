<template>
  <headers>
    <h3 slot="title"><img id="left" src="@/assets/left.png" @click="left">学生成绩统计</h3>
    <div  class="ss" style="margin-top: 10px;">
      <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
    </div>
    <lists v-for="item in pageList" :key="item.id">
      <a slot="name">
        <router-link :to="{name:'tj',query: {course:coursename,username: item.username,identity:'teacher' }}">{{item.name}}</router-link>
      </a>
      <span slot="class">{{item.class}}</span>
    </lists>
  </headers>
</template>

<script>
import axios from "axios";
import lists from "@/home/teacher/views/lists";
export default {
  name: "tctj",
  components:{
    lists,
  },
  data(){
    return{
      onHomeworkList:[],
      nr:'1',
      input:'',
      coursename:this.$route.query.course,
    }
  },
  created(){
    axios.post('/my/course/getstudent9',{coursename:this.$route.query.course}).then(res=>{
      if(res.data.status===0) {
          this.onHomeworkList=res.data.data
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
  methods:{
    left(){
      this.$router.go(-1);
    },
    // yc(name){
    //   this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
    //     customClass:'headerMessage',
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     axios.post('/my/course/deletecourses',{coursename:this.$route.query.course,username:name}).then(res=>{
    //       if(res.data.status===0) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功'
    //         });
    //         window.location.reload();
    //       }
    //       if(res.data.status===1){
    //         this.$message({
    //           type: 'error',
    //           message: '删除失败'
    //         });
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消操作'
    //     });
    //   });
    // }
  }
}
</script>