<template>
  <el-row :span="24">
    <el-col :span="18">
      <el-container>
        <el-aside style="width:250px" class="aside">
          <ul>
            <li v-for="cates in goodsCates" :key="cates.cat_id">
              <a href="javascript:;">{{cates.cat_name}}<i>|</i><i class="fa fa-angle-right" style="float:right;"></i></a>
            </li>
          </ul>
        </el-aside>
        <el-main class="slidePics">
          <el-carousel  style="width:590px;height:470px;">
            <el-carousel-item v-for="pics in slidePics" :key="pics.id" style="width:590px;height:470px;">
              <a href="javascript:;"><img :src="pics.slide_pic"></a>
            </el-carousel-item>
          </el-carousel>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="6">
      <template>
      <!-- 如果用户未登陆 -->
      <div class="loginOut" v-if="user===null">
        <div><img src="@/assets/images/head.jpg" alt=""></div>
        <p>Hi,登陆后可以查看自己的会员等级哟！</p>
        <div>
          <el-button type="primary" size="small" class="btn" @click="loginIn()">登陆</el-button>
          <el-button type="danger" size="small" class="btn">注册</el-button>
        </div>
      </div>
      <!-- 如果用户登陆了 -->
      <div class="loginIn" v-else-if="user">
        <div><img src="" alt=""></div>
        <h3 style="text-align:center;">Hi,亲爱的{{user.user_name}}</h3>
        <el-button type="danger"  size="medium" class="btn" @click="loginout()">退出登陆</el-button>
      </div>
      </template>
      <!-- 公告专区 -->
      <div class="info">
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="1" id="menuItem">公告</el-menu-item>
          <el-menu-item index="2" id="menuItem">规则</el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "layerGoodsCate",
  beforeCreate() {},
  created() {
    this.loginChange();
    this.getCates();
    this.getSlidePics();
  },
  data() {
    return {
      goodsCates: [],
      slidePics:[],
      activeIndex: '1',
      user:{}
    };
  },
  methods: {
    async getCates() {
      const res = await this.$http.get(`goodscates`);
      //console.log(res);
      this.goodsCates = res.data.data;
    },
    async getSlidePics(){
      const res = await this.$http.get(`slidePics`);
      //console.log(res);
      this.slidePics = res.data.data;
    },
    //处理登陆
    loginIn(){
      this.$router.push({
        name:"login"
      })
    },
    //退出登录
    loginout(){
      localStorage.clear();
      this.$router.go(0);
    },
    //
    loginChange(){
      this.user = JSON.parse(localStorage.getItem('token'));
      console.log(this.user);
    }
  }
};
</script>
<style>
.aside ul {
  border: 2px solid #ef025a;
  border-top: none;
  padding-top: 5px;
  padding-bottom: 3px;
  font-size: 14px;
  color: #fff;
}
.aside ul li{
  margin: 5px 10px;
  height: 29px;
}
.loginOut{
  padding: 20px 20px;
}
.loginOut>*{
  margin: 10px 0;
}
.loginOut:first-child{
  text-align: center;
}
.btn{
  width: 90px;
}
#menuItem{
  height: 30px;
  line-height: 30px;
  border-bottom: 2px solid #ef025a;
}
</style>


