<template>
  <div class="homeworkBoxContent1">
    <div class="homeworkBoxContent11">
      <slot name="img"><img src="@/assets/2.png"></slot>
    </div>
    <div class="homeworkBoxContent12">
      <div>
        <a><slot name="name"></slot></a>
        <span id="outTime">已过时</span>
        <ul style="height: 60px; margin-top: 55px;">
          <li>
            <label>截止时间</label>
            <span><slot name="time">2021-12-19 23:59:59</slot></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeworks0",
}
</script>

<style lang="less">
@import "@/css/index.less";
#outTime{
  margin-left: 20px;
  font-size: 10px;
  color: #9c9c9c;
}
</style>