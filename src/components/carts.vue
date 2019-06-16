<template>
  <div>
    <template>
      
    </template>
  </div>
</template>
<script>
export default {
  created(){
    this.getCart();
  },
  data(){
    return{
      goodsDetail:{},
      userCart:{}
    }
  },
  methods:{
    async getCart(){
      const user_id = JSON.parse(localStorage.getItem('token')).user_id;
      const res = await this.$http.post(`getCart/${user_id}`);
      console.log(res);
      const {data:{code}} = res;
      if(code===200){
        this.userCart = res.data.userCart;
        this.goodsDetail = res.data.goodsDetail;
      }
    }
  }
}
</script>
<style>

</style>


