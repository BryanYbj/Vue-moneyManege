<template>
  <div>
    <el-form
      :model="LoginUser"
      status-icon
      :rules="rules"
      ref="login"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="LoginUser.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="LoginUser.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="submit_btn" @click="submitForm('login')">登录</el-button>
      </el-form-item>

      <div class="tiparea">
        <p>
          还没有账号?现在
          <router-link to="/register">注册</router-link>
        </p>
      </div>
    </el-form>
  </div>
</template>

<script>
//安装jwt-decode 用来解析token
//导入jwt - decode
import jwt_decode from 'jwt-decode';
let that = this;
export default {
  name: "",
  props: [""],
  data() {
    return {
      LoginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    submitForm: function(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.LoginUser).then(res =>{
            //登录成功 拿到token
            const { token } = res.data;
            //console.log(res.data);
           
           
            //存储到ls
            localStorage.setItem("eleToken", token);
            //解析token
            const decode = jwt_decode(token);
            console.log(decode);
            //token存储到vuex中
            
            this.$store.dispatch('setAuthenticated',!this.isEmpyy(decode));
            console.log('1');
            this.$store.dispatch('setUser',decode);
            console.log('1');
            
            this.$router.push('/index');
          }
          
          ).catch(res=>{
            console.log(res);
          })
        }
      });
      
    },
    isEmpyy:function(value){
        return(
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)

        )
    }
    
    
  }


};
</script>
<style  scoped>
.demo-ruleForm {
  margin-top: 20px;
  background-color: aliceblue;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea p a {
  color: #409eff;
}
</style>