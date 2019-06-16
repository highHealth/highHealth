<template>
  <div style="backgroundColor:#f4f4f4;">
    <div class="info">
      <el-row id="info-wrap" :span="24">
        <el-col :span="2">中国大陆</el-col>
        <el-col :span="2"><a href class="login" @click.prevent="handleLogin()">亲！请登录</a></el-col>
        <el-col :span="2"><a href @click.prevent="handleSigninUp()">免费注册</a></el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col> 
        <el-col :span="2"><a href @click.prevent="person()">我的淘宝</a></el-col>
        <el-col :span="2">
          <i class="fa fa-shopping-cart" style="color:red"></i>
          购物车
        </el-col>
        <el-col :span="2"><i class="fa fa-star"></i> 收藏夹</el-col>
        <el-col :span="2"><i class="fa fa-tasks"></i> 商品分类</el-col>         
      </el-row>
    </div>
    <div id="wrap">
      <!-- 顶部图标和搜索框 -->
      <div>
        <layerSearch></layerSearch>
      </div>
      <!-- 主题市场 -->
      <div style="overflow:hidden">
        <layerTheme></layerTheme>
      </div>
      <!-- 商品分类 -->
      <div>
        <layerGoodsCate></layerGoodsCate>
      </div>
      <div style="marginTop:10px;" class="goodsLayer">
        <p><i class="fa fa-heart"></i><span>热卖单品</span></p>
        <el-row style="padding: 10px 20px;" :gutter="40">
          <el-col :span="6" v-for="item in goods" :key="item.goods_id" id="goods">
            <el-card :body-style="{ padding: '0px' }">
              <a href @click.prevent="showGoodsDetail(item.goods_id)"><img :src="item.goods_small_logo" class="image"></a>
              <div style="padding: 14px;" class="goodsDetail">
                <a href  @click.prevent="showGoodsDetail(item.goods_id)"><span>{{item.goods_name}}</span></a>
                <div>
                  <span style="color:red;">￥</span>
                  <em style="fontSize:22px;color:red;">{{item.goods_price}}</em>
                  <span style="float:right;color: #999;font-size: 10px;marginTop:10px;">月销量{{item.goods_weight}}笔</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import layerSearch from "@/components/home/layerSearch.vue";
Vue.component(layerSearch.name, layerSearch);

import layerTheme from "@/components/home/layerTheme.vue";
Vue.component(layerTheme.name, layerTheme);

import layerGoodsCate from "@/components/home/layerGoodsCate.vue";
Vue.component(layerGoodsCate.name, layerGoodsCate);
export default {
  beforeCreated() {},
  created() {
    this.getGoods();
  },
  data() {
    return {
      goods: []
    };
  },
  methods: {
    //处理登陆
    handleLogin() {
      this.$router.push({
        path: "/login",
        // query:{
        //   activeName:'login'
        // }
      });
    },
    //处理注册页
    handleSigninUp(){
      this.$router.push({
        path:"/login",
        // query:{
        //   activeName:'signup'
        // }
      })
    },
    //  获取商品
    async getGoods() {
      const res = await this.$http.get(`getGoods`);
      console.log(res);
      const { data: { code, msg, data } } = res;
      if (code == 200) {
        this.goods = data;
      } else {
        this.$Message.error(msg);
      }
    },
    //跳转到商品详情页
    showGoodsDetail(good_id){
      //console.log(good_id);
      this.$router.push({
        name:'goodsDetail',
        path: "/goodsDetail",
        params:{
          good_id:good_id
        }
      });
    },
    //跳转到个人中心页
    person(){
      if(localStorage.getItem("token")===null){
        this.$message({
          type:"error",
          message:'请先登录!'
        });
      }else{
        const user_id = JSON.parse(localStorage.getItem("token")).user_id;
        this.$router.push({
          name:"person"
        })
      }
      
    }
  }
};
</script>
<style>
.info {
  width: 100%;
  background: #f5f5f5;
  overflow: hidden;
}
.info #info-wrap {
  margin: 0 auto;
  width: 1190px;
  height: 36px;
  line-height: 35px;
  text-align: center;
}
#info-wrap .login {
  color: #ef025a;
}
#wrap {
  width: 1190px;
  margin: 0 auto;
  background-color: #ffffff;
}
#wrap > * {
  width: 100%;
}

#wrap .goodsLayer p {
  background-color: #ef025a;
  color: #ffffff;
  font-size: 18px;
  padding: 5px 20px;
}
.image {
  width: 100%;
  display: block;
}
#goods {
  border: 1px solid #ffffff;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 390px;
}
#goods:hover {
  border: 1px solid red;
}
.goodsDetail a {
  word-break:break-all;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
  color: #666;
  font-size: 14px;
}
</style>


