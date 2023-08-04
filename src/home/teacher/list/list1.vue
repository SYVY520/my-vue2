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
<!--      <a slot="yc"><img src="@/assets/yc.png" @click="yc(item.username)"></a>-->
    </lists>
  </div>
</template>

<script>
import axios from "axios";
import lists from "@/home/teacher/views/lists";
export default {
  name: "list1",
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
    axios.post('/my/course/getstudent0',{coursename:this.$route.query.course,homeworkname:this.$route.query.homework}).then(res=>{
      if(res.data.status===0) {
        if(res.data.data.length===0){
          this.nr='学生已经全部完成作业哦~';
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
  // methods:{
  //   yc(name){
  //     this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
  //       customClass:'headerMessage',
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       axios.post('/my/course/deletecourses',{coursename:this.$route.query.course,username:name}).then(res=>{
  //         if(res.data.status===0) {
  //           this.$message({
  //             type: 'success',
  //             message: '删除成功'
  //           });
  //           window.location.reload();
  //         }
  //         if(res.data.status===1){
  //           this.$message({
  //             type: 'error',
  //             message: '删除失败'
  //           });
  //         }
  //       })
  //     }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '已取消操作'
  //       });
  //     });
  //   }
  // }
}
</script>
