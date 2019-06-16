<template>
  <el-row :span="24" id="mph_sarch">
    <el-col :span="4">
      <a href="javascript:;"><img src="@/assets/images/logo.jpg" alt="" style="display:block;"></a>
    </el-col>
    <el-col :span="2"><div class="grid-content"></div></el-col>
    <el-col :span="12">
      <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
      <el-button slot="append" class="searchBtn"  @click="search()"><i class="fa fa-search" style="color:red;font-size:18px"></i></el-button>
    </el-input>
    <img src="@/assets/images/1354.jpg" alt="">
    </el-col>
    <el-col :span="2"><div class="grid-content"></div></el-col>
    <el-col :span="4">
      <img src="@/assets/images/weixin.png" alt="">
    </el-col>        
  </el-row>
</template>
<script>
export default {
  name: "layerSearch",
  data(){
    return {
      searchValue:""
    };
  },
  methods:{
    search(){
      if(this.searchValue === ''){
        this.$message({
          type:'error',
          message:'请输入搜索内容!'
        })
      }else{
        this.$router.push({
          name:'search',
          params:{
            searchValue:this.searchValue
          }
        })
      }
      
    }
  }
}
</script>
<style>

#mph_sarch{
  height: 147px;
}

#mph_sarch .searchInput {
  border:2px solid red;
  margin-top: 34px;
}
#mph_sarch .searchBtn{
  border: transparent;
}
#mph_sarch:nth-child(5){
  margin-top: 10px;
}
</style>


