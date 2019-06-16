<template>
  <div class="container">
    <div class="wrap">
      <el-row :span="24">
        <a href="#" class="bs">
          <img src="@/assets/images/login2.jpg" alt="">
        </a>
      </el-row>
      <el-row :span="24" id="main">
        <el-col :span="10">
          <img src="@/assets/images/login1.jpg" alt="">
        </el-col>     
          <!-- 登陆or注册 -->
          <el-col id="login" :span="10">
            
              <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                
                  <el-tab-pane label="登陆" name="login">
                    <el-form status-icon :model="formLogin">
                      <el-form-item></el-form-item>
                      <el-form-item>
                        <i class="fa fa-user-circle-o icon"></i>
                        <el-input v-model="formLogin.user_email" type="text" placeholder="邮箱" title="请输入账号" id="form-input"></el-input>
                      </el-form-item>
                      <el-form-item></el-form-item>
                      <el-form-item>
                        <i class="fa fa-key fa-fw icon"></i>
                        <el-input v-model="formLogin.user_pwd" type="password" placeholder="密码" id="form-input"></el-input>
                      </el-form-item>
                      <el-form-item></el-form-item>
                      <el-button type="danger" class="btn" @click.prevent="login()">立即登录</el-button>
                      <el-form-item>
                        <el-row :span="24">
                          <el-col :span="12">
                            <a href="" type="danger" style="color:red">忘记密码?</a>
                            </el-col>
                          <el-col :span="12"><a href="" style="float:right">注册</a></el-col>
                        </el-row>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                
                
                <el-tab-pane label="注册" name="signup">
                  <el-form status-icon :model="formSignin" :rules="rules" ref="formSignin">
                  <el-form-item></el-form-item>
                    <el-form-item 
                      prop="user_email"
                      :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                      ]">
                      <i class="fa fa-user-circle-o icon"></i>
                      <el-input v-model="formSignin.user_email" type="text" placeholder="请输入邮箱" title="请输入账号" id="form-input"></el-input>
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <el-form-item prop="pass">
                      <i class="fa fa-id-card icon"></i>
                      <el-input v-model="formSignin.nick_name" type="text" placeholder="请输入昵称" id="form-input"></el-input>
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <el-form-item prop="pass">
                      <i class="fa fa-key fa-fw icon"></i>
                      <el-input v-model="formSignin.user_pwd" type="password" placeholder="请输入密码" id="form-input"></el-input>
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <el-form-item prop="checkPass">
                      <i class="fa fa-key fa-fw icon"></i>
                      <el-input type="password" v-model="formSignin.checkPass" placeholder="请再次输入密码" id="form-input"></el-input>
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <el-button type="danger" class="btn" @click.prevent="signin()">立即注册</el-button>
                    <el-form-item>
                    </el-form-item>
                    </el-form>
                </el-tab-pane>
                
              </el-tabs>
            
          </el-col>    
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    //this.getParams();
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formSignin.checkPass !== "") {
          this.$refs.formSignin.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formSignin.user_pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formLogin: {
        user_email: "",
        user_pwd: ""
      },
      formSignin: {
        user_email: "",
        nick_name:"",
        user_pwd: "",
        checkPass: ""
      },
      activeName: "login",
      rules: {
        user_pwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // getParams(){
    //   console.log(this.$router.query.activeName);
    //   //this.activeName = this.$router.params.activeName;
    // },
    // watch:{
    //   '$route': 'getParams'
    // },
    //不想在{}内部获取异步操作的结果
    //在异步操作方法前面加await
    //在距离异步操作方法最近的外层函数前面加async
    async login() {
      const res = await this.$http.post(`login`, this.formLogin);
      console.log(res);
      //解构赋值取数据
      const { data: { code, msg,user } } = res;
      console.log(res);
      if (code === 200) {
        localStorage.setItem("token",JSON.stringify(user));
        //成功后跳转到home组件
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error(msg);
      }
    },
    handleClick(tab, event) {
      
    },
    async signin() {
      delete this.formSignin.checkPass;
      const res = await this.$http.post(`signin`, this.formSignin);
      console.log(res);
    }
  }
};
</script>
<style>
.container {
  width: 100%;
  height: 100%;
  background-color: #cecccf;
}
.container .wrap {
  width: 1016px;
  margin: 0 auto;
  background-color: #ffffff;
}
.container .wrap .bs {
  display: block;
}
#main {
  padding: 20px 70px;
}
#login input {
  position: relative;
  padding: 0 30px;
}
#form-input::-webkit-input-placeholder {
  color: #000;
  font-size: 14px;
  line-height: 50px;
}
.icon {
  position: absolute;
  top: 14px;
  left: 10px;
  z-index: 1;
}
#login {
  width: 400px;
  margin-left: 60px;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 460px;
}
.el-tabs__active-bar {
  background-color: red;
}
#tab-login,
#tab-signin {
  color: #999;
}
.el-tabs__item.is-active {
  color: red;
}
.el-tabs__item:hover {
  color: red;
}
#login .btn {
  width: 100%;
}
</style>


