<template>
  <div>
    <template>
    <P>商品名:{{goodsDetail.goods_name}}</P>
    <div>
      <el-button type="primary" @click="openBuy(goodsDetail.cat_three_id)">立即购买</el-button>
      <el-button type="danger" @click="openCart(goodsDetail.cat_three_id)">添加购物车</el-button>
      <h3>商品详细信息</h3>
      <div id="goods_introduce"></div>
    </div>   
    <!-- 添加购物车提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleCart"
      width="30%"
     >
      商品数量：<el-input-number v-model="num" :min="1" :max="max" label="商品数量"></el-input-number>
      <br>
      商品属性：
      <div v-if="goodsAttr.length!=0">
        <el-radio-group v-model="radio">
          <el-radio-button :label="item" v-for="item in goodsAttr" :key="item">{{item}}</el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCart = false">取 消</el-button>
        <el-button type="primary" @click="addCart(goodsDetail.goods_id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 立即购买提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleBuy"
      width="30%"
     >
      商品数量：<el-input-number v-model="num" :min="1" :max="max" label="商品数量"></el-input-number>
      <br>
      商品属性：
      <el-radio-group v-model="radio">
        <el-radio-button :label="item" v-for="item in goodsAttr" :key="item">{{item}}</el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleBuy = false">取 消</el-button>
        <el-button type="primary" @click="buyNow(goodsDetail.goods_id)">确 定</el-button>
      </span>
    </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  created() {
    this.getGoodsDetail();
  },
  data() {
    return {
      goodsDetail: {},
      dialogVisibleCart: false,
      dialogVisibleBuy:false,
      num: 1,
      max: 100,
      goodsAttr:[],
      radio:''
    };
  },
  methods: {
    //商品展现
    async getGoodsDetail() { 
      //根据商品的id获取商品详细信息
      const res = await this.$http.get(
        `goodsDetail/${this.$route.params.good_id}`
      );
      console.log(res);
      this.goodsDetail = res.data.goodsDetail;
      document.getElementById(
        "goods_introduce"
      ).innerHTML = this.goodsDetail.goods_introduce;
    },
    //点击添加购物车
    openCart(cat_three_id){
      this.dialogVisibleCart = true;
      this.getGoodsAttr(cat_three_id);
    },
    //点击立即购买
    openBuy(cat_three_id) {
      this.dialogVisibleBuy = true;
      this.getGoodsAttr(cat_three_id);
    },
    //根据商品分类id获取商品属性
    async getGoodsAttr(cat_three_id) {
      const res = await this.$http.get(`goodsAttr/${cat_three_id}`);
      console.log(res);
      const {data:{code,goodsAttr}}=res;
      if(code === 200){
        this.goodsAttr = goodsAttr[0].attr_vals.split(',');
      }
    },
    //添加购物车
    async addCart(goods_id){
      this.dialogVisibleCart = false;
      const user_id = JSON.parse(localStorage.getItem('token')).user_id;
      const formData = {
        user_id:user_id,
        goods_id:goods_id,
        goods_num:this.num,
        goods_attr:this.radio
      }
      const res = await this.$http.post(`addCart`,formData);
      const {data:{code,msg}}=res;
      if(code===200){
        this.$message({
          type:'success',
          message:"添加购物车成功"
        })
      }
    },
    //立即购买
    buyNow(goods_id){
      this.dialogVisibleCart = false;
      const formData = {
        goods_id:goods_id,
        goods_num:this.num,
        goods_attr:this.radio
      }
      this.$router.push({
        name: "orderNow",
        path:'/orderNow',
        params: {
          formData:formData
        }
      });
    }


  }
};
</script>
<style>
</style>


