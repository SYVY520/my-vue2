<template>
  <dl class="courseContent">
    <dd class="courseContent1">
      <div class="courseContent11">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp8.itc.cn%2Fimages01%2F20210308%2Fde2e4ae367264e9c9a340fb8a56069ee.jpeg&refer=http%3A%2F%2Fp8.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672126869&t=80a3ffbe9a792161937c4e1ffaeb55b7" class="courseImg">
      </div>
    </dd>
    <dt class="courseContent2">
      <div class="courseLeft">
        <div class="courseName">
          <slot name="course">course</slot>
        </div>
        <div class="teacherName">
          <slot name="teacher">teacher</slot>
        </div>
      </div>
      <div class="courseRight">
        <ul>
          <li class="courseRight1">
            <div class="courseRight2">
              <div class="courseRightSon1">
                <slot name="tjImg"></slot>
              </div>
              <span class="courseRightSon2">
                <slot name="tj"></slot>
              </span>
            </div>
          </li>
          <li class="courseRight1">
            <div class="courseRight2">
              <div class="courseRightSon1">
                <slot name="homeworkImg"></slot>
              </div>
              <span class="courseRightSon2">
                <slot name="homework"></slot>
              </span>
            </div>
          </li>
          <li class="courseRight1">
            <div class="courseRight2">
              <div class="courseRightSon1">
                <slot name="taskImg"></slot>
              </div>
              <span class="courseRightSon2">
                <slot name="task"></slot>
              </span>
            </div>
          </li>
          <li class="courseRight1">
              <div class="sc">
                <slot name="sc"></slot>
              </div>
          </li>
        </ul>
      </div>
    </dt>
  </dl>
</template>

<script>
export default {
  name: "course0",
}
</script>

<style lang="less">
.courseContent {
  height: 120px;
  padding: 15px 30px;
  margin: 0;
  border-bottom: 1px solid #ededed;
}
.courseContent1 {
  width: 170px;
  height: 90px;
  float: left;
  padding: 0;
  margin: 0;
  cursor: pointer;

.courseContent11 {
  border-radius: 2px;
  margin: 0 10px 0 0;
  position: relative;
  background: #cac6c6;

.courseImg {
  border-radius: 4px;
  width: 160px;
  height: 90px;
}
}
}
.courseContent2 {
  float: left;
  width: 820px;
  position: relative;
}
.courseLeft {
  float: left;
  cursor: pointer;

.courseName {
  max-width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #2a2a2a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.teacherName {
  max-width: 100%;
  height: 18px;
  line-height: 18px;
  margin-top: 4px;
  font-size: 12px;
  color: #2a2a2a;
}
}
.courseRight {
  position: absolute;
  right: 60px;
  top: 18px;

.courseRight1 {
  float: left;
  margin: 0 25px;
  list-style: none;

.courseRight2 {
  position: relative;
  text-align: center;
  cursor: pointer;

.courseRightSon1 {
  width: 32px;
  height: 32px;
  margin-left: 8px;
}

.courseRightSon2 {
  display: block;
  font-size: 12px;
  color: #9c9c9c;
  padding: 10px 0 0 0;
}
}
}
}
.sc{
  width: 25px;
  height: 25px;
  margin-top: 10px;
}
</style>