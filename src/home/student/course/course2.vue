<template v-if="sonRefresh">
  <div>
    <div  class="ss" v-if="nr==='1'">
      <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select" type="text"></el-input>
    </div>
    <div  v-if="nr!=='1'" style="margin-left: 300px;margin-top: 100px;font-size: 40px;color: cadetblue">
      {{nr}}
    </div>
    <course0 v-for="item in pageList" :key="item.id" >
      <a slot="course">{{item.coursename}}</a>
      <a slot="teacher">{{item.teacher}}</a>
      <a slot="tjImg">
        <router-link  v-if="identity==='teacher'" :to="{name:'tctj',query: { course: item.coursename,status:0 }}"><img src="@/assets/tj.png"></router-link>
        <router-link v-if="identity==='student'"  :to="{name:'tj',query: { course: item.coursename,status:0 }}"><img src="@/assets/tj.png"></router-link>
      </a>
      <a slot="tj">
        <router-link v-if="identity==='teacher'" :to="{name:'tctj',query: { course: item.coursename,status:0 }}" style="text-decoration: none;color: #2a2a2a;">成绩统计</router-link>
        <router-link v-if="identity==='student'" :to="{name:'tj',query: { course: item.coursename,status:0 }}" style="text-decoration: none;color: #2a2a2a;">成绩统计</router-link>
      </a>
      <a slot="homeworkImg">
        <router-link v-if="identity==='teacher'" :to="{name:'tchomework',query: { course: item.coursename,status:1 }}"><img src="@/assets/2.png"></router-link>
        <router-link v-if="identity==='student'" :to="{name:'homework3',query: { course: item.coursename,status:1 }}"><img src="@/assets/2.png"></router-link>
      </a>
      <a slot="homework">
        <router-link v-if="identity==='teacher'" :to="{name:'tchomework',query: { course: item.coursename,status:1 }}" style="text-decoration: none;color: #2a2a2a;">我的作业</router-link>
        <router-link v-if="identity==='student'" :to="{name:'homework3',query: { course: item.coursename,status:1 }}" style="text-decoration: none;color: #2a2a2a;">我的作业</router-link>
      </a>
      <a slot="taskImg">
        <router-link v-if="identity==='teacher'" :to="{name:'tctask',query: { course: item.coursename,status:1 }}"><img src="@/assets/1.png"></router-link>
        <router-link v-if="identity==='student'" :to="{name:'task3',query: { course: item.coursename,status:1 }}"><img src="@/assets/1.png"></router-link>
      </a>
      <a slot="task">
        <router-link v-if="identity==='teacher'" :to="{name:'tctask',query: { course: item.coursename,status:1 }}" style="text-decoration: none;color: #2a2a2a;">互评任务</router-link>
        <router-link v-if="identity==='student'" :to="{name:'task3',query: { course: item.coursename,status:1 }}" style="text-decoration: none;color: #2a2a2a;">互评任务</router-link>
      </a>
      <a slot="sc" @click="sc(item.coursename)">
        <img src="@/assets/sc.png" >
      </a>
    </course0>
  </div>
</template>

<script>
import course0 from "@/home/component/course0";
import axios from "axios";
export default {
  name: "course2",
  data(){
    return {
      sonRefresh: true,
      courseList: [],
      identity:'teacher',
      nr:'1',
      input:'',
    }
  },
  components:{
    course0,
  },
  created(){
    axios.post('/my/course/getcourse',{status:1,username:this.$route.params.id}).then(res=>{
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='你目前还没有任何课程哦~';
        }else{
          this.courseList=res.data.data
          this.identity=res.data.identity
        }
      }
      if(res.data.status===1) console.log('读取信息失败！')
    })
  },
  computed: {
    pageList() {
      return this.courseList.filter((item) => {
        return item.coursename.indexOf(this.input) !== -1;
      })
    },
  },
  methods:{
    sc(name){
      this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        customClass:'headerMessage',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/my/course/deletecourses',{coursename:name,username:this.$route.params.id}).then(res=>{
          if(res.data.status===0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            window.location.reload();
          }
          if(res.data.status===1){
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  },
}
</script>
