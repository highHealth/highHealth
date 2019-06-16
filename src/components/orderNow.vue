<template>
  <div>
    <h3>立即购买订单页</h3>
    <template>
      <h4>商品名：{{goodsMess.goods_name}}</h4>
      <p>数量：{{orderMess.goods_num}}</p>
      <p>属性：{{orderMess.goods_attr}}</p>
      <p>单价：{{goodsMess.goods_price}}</p>
      <img :src="goodsMess.goods_small_logo" class="image">
      <div>
        <el-radio-group v-model="radio">
          <el-radio :label="item" v-for="item in userAddr" :key="item.cgn_id">
            <p>地址：{{item.cgn_address}}</p>
            <p>收件人：{{item.cgn_name}}</p>
            <p>收件人电话：{{item.cgn_tel}}</p>
          </el-radio><br>
        </el-radio-group>
        <i class="el-icon-circle-plus-outline" style="font-size:32px;" @click="dialogVisible=true"></i>
      </div>
      <!-- 添加新地址 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>添加新地址</span>
        <el-form :label-position="labelPosition" label-width="80px" :model="formData">
          <el-form-item label="收件人">
            <el-input v-model="formData.cgn_name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.cgn_tel"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formData.cgn_address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewAddr()">确 定</el-button>
        </span>
      </el-dialog>
      <div style="border:1px solid red;width:600px;height:200px;">
        <div v-if="radio">送至：{{radio.cgn_address}}<br>{{radio.cgn_name}}收<br>电话：{{radio.cgn_tel}}</div>
        <div v-else-if="JSON.stringify(radio) == '{}'">
          <p>请选择收货地址</p>
        </div>
        <p style="font-size:30px;color:red;">总价：{{price}}</p>
        <el-button type="danger">提交订单</el-button>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  created(){
    this.getOrderMess();
    this.getUserAddr();
  },
  data(){
    return{
      orderMess:{},
      goodsMess:{},
      radio:{},
      userAddr:[],
      dialogVisible: false,
      labelPosition: 'right',
      formData:{
        cgn_name:'',
        cgn_tel:'',
        cgn_address:''
      },
      price:0
    }
  },
  methods:{
    //购买商品信息
    async getOrderMess(){
      this.orderMess = this.$route.params.formData;
      if(this.orderMess === null){
        this.$router.push({
          name:'home'
        })
      }else{
        const res = await this.$http.get(`goodsDetail/${this.orderMess.goods_id}`);
        const {data:{code,goodsDetail}}=res;
        if(code === 200){
          this.goodsMess = goodsDetail;
          this.price = this.orderMess.goods_num*this.goodsMess.goods_price;
        }
      }
    },
    //购买地址信息
    async getUserAddr(){
      const user_id = JSON.parse(localStorage.getItem('token')).user_id;
      const res = await this.$http.post(`getUserAddr/${user_id}`);
      console.log(res);
      const {data:{code,userAddr}}=res;
      if(code===200){
        this.userAddr = userAddr;
      }
    },
    //添加新地址
    async addNewAddr(){
      this.dialogVisible = false;
      const user_id = JSON.parse(localStorage.getItem('token')).user_id;
      this.formData.user_id = user_id;
      const res = await this.$http.post(`addNewAddr`,this.formData);
      //console.log(res);
      const {data:{code}} = res;
      if(code===200){
        this.getUserAddr();
      }else{
        this.$message({
          type:'error',
          message:"地址添加失败!"
        })
      }
    }
  }
}
</script>

