<template>
  <el-row class="theme" :span="24">
    <el-col :span="4"><div class="grid-content">主题市场</div></el-col>
    <el-col :span="4"><div class="grid-content">4</div></el-col>
    <el-col :span="4"><div class="grid-content">4</div></el-col>
    <el-col :span="4"><div class="grid-content">4</div></el-col>
    <el-col :span="4"><div class="grid-content">4</div></el-col>
    <el-col :span="4"><div class="grid-content">4</div></el-col>
  </el-row>
</template>
<script>
export default {
  name: "layerTheme",
}
</script>
<style>
.theme{
  height: 36px;
}
.theme .grid-content{
  background-color: #ef025a;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  line-height:35px;
}
</style>


