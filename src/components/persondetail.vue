<template>
  <div>
    <template>
      <h3>用户:{{user.user_name}}你好</h3>
      <p>会员等级：{{userGrade.grade_info}}</p>
      <p>积分信息：
        <a href="">获取金额：{{userIntegral.mon_integral}}</a>
        <a href="">通用积分：{{userIntegral.com_integral}}</a>
        <a href="">消费积分：{{userIntegral.con_integral}}</a></p>
    </template>
  </div>
</template>
<script>
export default {
  created() {
    this.getPersonMess();
    this.getUserIntegral()
  },
  data(){
    return {
      user:{},
      userIntegral:{},
      userGrade:''
    }
  },
  methods:{
    //获取用户信息
    async getPersonMess() {
      const user_id = JSON.parse(localStorage.getItem("token")).user_id;
      //console.log(user_id);
      const res = await this.$http.get(`userMess/${user_id}`);
      console.log(res);
      this.user = res.data.user;
      this.userGrade = res.data.user_grade;
    },
    //获取用户积分
    async getUserIntegral(){
      const user_id = JSON.parse(localStorage.getItem("token")).user_id;
      const res = await this.$http.post(`UserIntegral/${user_id}`);
      console.log(res);
      this.userIntegral = res.data.userIntegral;
    },
    // //获取用户会员名
    // async getUserGrade(){
    //   const res = await this.$http.get(`getUserGrade/${this.userGrade}`);
    //   console.log(res);
    // }
  }
}
</script>
<style>

</style>