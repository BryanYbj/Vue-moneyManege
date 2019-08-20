<template>
  <div>
    <el-form
      :model="registerUser"
      status-icon
      :rules="rules"
      ref="regist"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item label="选择身份" >
        <el-select v-model="registerUser.identity" placeholder='请选择身份'>
          <el-option label="管理员" value="manager"></el-option>
          <el-option label="员工" value="employee"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="submit_btn" @click="submitForm('regist')">提交</el-button>
       
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let that = this;
export default {
  name: "",
  props: [""],
  data() {
    var validatePass2 = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        registerUser:{
            name:'',
            email:'',
            password:'',
            password2:'',
            identity:'',
        },
        rules:{
          name:[{
            required:true,
            message:"用户名不能为空",
            trigger:"blur"
          },{
            min:2,
            max:30,
            message:"长度在2到30个字符之间",
            trigger:"blur"
          }],
          email:[{
            type:'email',
            required:true,
            message:"邮箱格式不正确",
            trigger:"blur"

          }],
        password:[
          {
            required:true,
            message:'密码不能为空',
            trigger:'blur'
          },
          {
            min:6,
            max:30,
            message:"长度在6到30个字符之间",
            trigger:"blur"
        },
        
        ],
        password2:[
          {
            required:true,
            message:'密码不能为空',
            trigger:'blur'
          },
          {
            min:6,
            max:30,
            message:"长度在6到30个字符之间",
            trigger:"blur"
        },
        {validator:validatePass2,trigger:"blur"}
        ],
        }
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    
  },

  methods: {
    submitForm:function(formname){
      this.$refs[formname].validate((valid) => {
          if (valid) {
      
            this.$axios.post('/api/users/register',this.registerUser)
            .then(res =>{
              //注册成功
              this.$message({
                message:'账号注册成功',
                type:'success'
              });
            })
            this.$router.push('/login');
          } 
        });
      
    }
  },

  watch: {}
};
</script>
<style  scoped>
    .demo-ruleForm{
        margin-top: 20px;
        background-color: aliceblue;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }
    .submit_btn{
        width:100%;
    }
</style>