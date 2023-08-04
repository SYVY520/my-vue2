<template>
  <div class="listsBoxContent1" >
    <div class="listsBoxContent11">
      <slot name="img"><img src="@/assets/student.png"></slot>
    </div>
    <div class="listsBoxContent12">
      <div>
        <a><slot name="name"></slot></a>
      </div>
      <span style="font-size: 13px;color: #777777;"><slot name="class"></slot></span>
    </div>
    <div class="yc">
      <slot name="yc"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "lists",
}
</script>

<style lang="less">
.listsBoxContent1 {
  height: 70px;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 #ededed;
  padding: 10px 30px;
  box-sizing: border-box;
  margin: 0;
}
.listsBoxContent11 {
  float: left;
  width: 50px;
  height: 50px;
  background: #F7F9FE;
  padding:10px 10px;
}
.listsBoxContent12 {
  margin-left: 20px;
  float: left;
  height:30px;
  width: 605px;
  div{
    a {
      max-width: 450px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #2a2a2a;
      font-weight: 700;
      text-decoration: none;
    }
  }
}
.yc{
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 150px;
  margin-top: 20px;
}
</style>