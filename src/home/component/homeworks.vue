<template>
  <div class="homeworkBoxContent1" >
            <div class="homeworkBoxContent11">
              <slot name="img"><img src="@/assets/2.png"></slot>
            </div>
            <div class="homeworkBoxContent12">
              <div>
                <a><slot name="name"></slot></a>
                <ul style="height: 60px; margin-top: 55px;">
                  <li>
                    <label>截止时间</label>
                    <span><slot name="time">2021-12-19 23:59:59</slot></span>
                  </li>
                </ul>
              </div>
            </div>
    <div class="xg">
      <slot name="xg"></slot>
    </div>
          </div>
</template>

<script>
export default {
  name: "homeworks",
}
</script>

<style lang="less">
@import "@/css/index.less";
.xg{
  width: 25px;
  height: 25px;
  float: right;
  margin-top: 50px;
  margin-right: 100px;
}
</style>