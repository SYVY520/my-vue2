<template>
  <div id="content1">
    <button id="Button1" class="Button" ref="courseAdminButton1" v-show="this.$route.query.admin==='courseAdmin'" @click="administratorClickCourseAdmin1">未完成</button>
    <button id="Button1" class="Button" ref="teacherButton1"  v-show="this.$route.query.admin==='teacher'" @click="administratorClickTeacher1">未禁用</button>
    <button id="Button1" class="Button" ref="studentButton1" v-show="this.$route.query.admin==='student'" @click="administratorClickStudent1">未禁用</button>
    <button id="Button2" class="Button" ref="courseAdminButton2"  v-show="this.$route.query.admin==='courseAdmin'" @click="administratorClickCourseAdmin2">已完成</button>
    <button id="Button2" class="Button" ref="teacherButton2" v-show="this.$route.query.admin==='teacher'" @click="administratorClickTeacher2">已禁用</button>
    <button id="Button2" class="Button" ref="studentButton2"  v-show="this.$route.query.admin==='student'" @click="administratorClickStudent2">已禁用</button>
    <button id="Button3" class="Button">
      <a v-if="this.$route.query.admin==='courseAdmin'" @click="administratorClickCourseAdmin">加入课程</a>
      <a v-if="this.$route.query.admin==='teacher'" @click="administratorClickTeacher">加入老师</a>
      <a v-if="this.$route.query.admin==='student'" @click="administratorClickStudent">加入学生</a>
    </button>
    <enroll v-if="enroll" ref="enroll" @cancelEnroll="cancelEnroll"/>
    <staff v-if="staff" ref="staff" @cancelStaff="cancelStaff"/>
    <join-class v-if="joinClass" ref="joinClass" @cancelJoinClass="cancelJoinClass"/>
    <router-view/>
  </div>
</template>

<script>
import enroll from "@/home/administrator/enroll";
import staff from "@/home/administrator/staff";
import joinClass from "@/home/administrator/joinClass";
export default {
  name: "adminHeader",
  components: {
    enroll,
    staff,
    joinClass,
  },
  data(){
    return{
      enroll:false,
      staff:false,
      joinClass:false,
      timer:null,
    }
  },
  created() {
    this.timer=window.setTimeout(()=>{
      this.$refs.courseAdminButton1.style.border = '1px solid #ededed'
      this.$refs.teacherButton1.style.border = '1px solid #ededed'
      this.$refs.studentButton1.style.border = '1px solid #ededed'
    },0);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods:{
    administratorClickCourseAdmin1() {
      this.$refs.courseAdminButton1.style.border = '1px solid #ededed'
      this.$refs.courseAdminButton2.style.border = 'none'
      this.$router.push({name:'courseAdmin',query:{admin:'courseAdmin'}})
    },
    administratorClickCourseAdmin2() {
      this.$refs.courseAdminButton1.style.border = 'none'
      this.$refs.courseAdminButton2.style.border = '1px solid #ededed'
      this.$router.push({name:'courseAdmin1',query:{admin:'courseAdmin'}})
    },
    administratorClickTeacher1(){
      this.$refs.teacherButton1.style.border = '1px solid #ededed'
      this.$refs.teacherButton2.style.border = 'none'
      this.$router.push({name:'teacher',query:{admin:'teacher'}})
    },
    administratorClickTeacher2(){
      this.$refs.teacherButton2.style.border = '1px solid #ededed'
      this.$refs.teacherButton1.style.border = 'none'
      this.$router.push({name:'teacher1',query:{admin:'teacher'}})
    },
    administratorClickStudent1(){
      this.$refs.studentButton1.style.border = '1px solid #ededed'
      this.$refs.studentButton2.style.border = 'none'
      this.$router.push({name:'student',query:{admin:'student'}})
    },
    administratorClickStudent2(){
      this.$refs.studentButton2.style.border = '1px solid #ededed'
      this.$refs.studentButton1.style.border = 'none'
      this.$router.push({name:'student1',query:{admin:'student'}})
    },
    administratorClickCourseAdmin() {
      this.joinClass='true'
    },
    administratorClickTeacher() {
      this.staff='true'
    },
    administratorClickStudent() {
      this.enroll='true'
    },
    cancelEnroll(val){
      this.enroll=val;
    },
    cancelStaff(val){
      this.staff=val;
    },
    cancelJoinClass(val){
      this.joinClass=val;
    },
  },
}
</script>

<style>
@import "@/css/index.less";
</style>