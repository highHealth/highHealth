<template>
  <div style="height:100%;">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span=20><h2>个人中心页</h2></el-col>
          <el-col :span="2"><a href @click.prevent="mph()">商城首页</a></el-col>
          <el-col :span="2"><a href @click.prevent="loginout()">退出登录</a></el-col>          
        </el-row>
        
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="persondetail"
            class="el-menu-vertical-demo"
            :router="true"
            >
            <el-menu-item index="persondetail">
              <i class="el-icon-menu"></i>
              <span>个人信息</span>
            </el-menu-item>
            <el-menu-item index="invited">
              <i class="el-icon-document"></i>
              <span>邀请团队</span>
            </el-menu-item>
            <el-menu-item index="carts">
              <i class="el-icon-document"></i>
              <span>购物车</span>
            </el-menu-item>
            <el-menu-item index="userorder">
              <i class="el-icon-setting"></i>
              <span>订单</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
  
</template>

<script>

export default {
  created(){
    this.showFirst();
  },
  data() {
    return {};
  },
  methods: {
    //商城首页
    mph(){
      this.$router.push({
        name:'home'
      })
    },
    //退出登录
    loginout(){
      localStorage.clear();
      this.mph();
      console.log(localStorage.getItem('token'));
    },
    showFirst(){
      this.$router.push({
        name:'persondetail'
      })
    }
  }
};
</script>

<style>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
