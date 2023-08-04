<template>
  <div>
    <div id="courseContentHeader">
      <h3><slot name="title">标题</slot></h3>
    </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "headers"
}
</script>

<style lang="less">
#courseContentHeader {
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ededed;
  margin: auto;
    h3 {
      line-height: 60px;
      margin-left: 10px;
    }
}
</style>