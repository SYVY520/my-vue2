<template>
  <div class="homeworkBoxContent1">
        <div class="homeworkBoxContent11">
          <slot name="img"><img src="@/assets/2.png"></slot>
        </div>
        <div class="homeworkBoxContent12">
          <div>
            <a><slot name="homeworkname"></slot></a>
            <ul style="height: 60px; margin-top: 55px;">
              <li>
                <label>截止时间</label>
                <span><slot name="time">2021-12-19 23:59:59</slot></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="homeworkBoxContent13">
          <div style="height: 20px;">
            <span>继续努力，下一个学霸就是你！</span>
          </div>
          <div class="homeworkBoxRight">
            <span style="font-size: 26px;color: blue;padding-top: 10px;"><slot name="score"></slot></span>
            <span style="margin-top: 0px;">作业成绩</span>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "homework",
}
</script>

<style lang="less">
@import "@/css/index.less";
.homeworkBoxContent13 {
  float: right;
div {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
span {
  display: block;
  height: 36px;
  text-align: center;
  font-size: 12px;
  color: #bfbfbf;
  margin-right: 0;
  margin-top: 6px;
}
}
}
.homeworkBoxRight {
  width: 100px;
  height: 60px;
  float: right;
  font-size: 14px;
  text-align: right;
  line-height: 40px;
  position: absolute;
}
</style>