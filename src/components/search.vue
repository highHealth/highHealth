<template>
  <div>
    <template>
      <div>查找结果如下</div>
      <el-row style="padding: 10px 20px;" :gutter="40">
          <el-col :span="6" v-for="item in searchGoods" :key="item.goods_id" id="goods">
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
    </template>
  </div>
</template>
<script>
export default {
  created(){
    this.getSearchValue();
  },
  data(){
    return {
      searchGoods:[]
    }
  },
  methods:{
    async getSearchValue(){
      const searchValue = this.$route.params.searchValue;
      const res = await this.$http.get(`searchGoods/${searchValue}`);
      console.log(res);
      this.searchGoods = res.data.searchGoods;
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
  }
}
</script>
<style>
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


