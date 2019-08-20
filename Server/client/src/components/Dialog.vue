<template>
  <div class="dialog">
    <!-- :visible='true'  显示或者隐藏-->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-rscape="false"
      :model-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item  label="收支类型">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype,index) in format_type_list"
                :key="index"
                :lable="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="describe" label="收支描述">
            <el-input type="describe" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>

          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type='primary' @click="onSubmite('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  //props:[''],属性传值的形式
  //将数据提升
  props: {
    dialog: Object,
    formData:Object
  },
  data() {
    return {
      
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules:{
        describe:[
          {
            required:true,
            message:'收支描述不能为空',
            trigger:'blur'
          }
        ],
        income:[
          {
            required:true,
            message:'收入不能为空',
            trigger:'blur'
          }

        ],
        expend:[
          {
            required:true,
            message:'支出不能为空',
            trigger:'blur'
          }
        ],
        cash:[
          {
             required:true,
            message:'金额不能为空',
            trigger:'blur'
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
    onSubmite(form){
      //验证数据是否合法 this.$refs[form].validate
      this.$refs[form].validate(valid =>{
        if(valid){
          //console.log(this.formData);
          const url = this.dialog.option == 'add' ? 'add':'edit';
          this.$axios.post('/api/profile/'+url,this.formData)
          .then(res =>{
            //添加成功
            this.$message({
              message:'数据添加成功',
              type:'success'
            });

            //成功后隐藏对话框
            this.dialog.show = false;

            //自动刷新Fund List 界面
            //调用$emit对象，给他添加一个事件，让他的父级组件来执行，就是
            //Fundlist 里面的<Dialog>组件
            this.$emit('update');
          })
          .catch(err =>{
            console.log(err)
          })
        }
      })
    }
  },

  watch: {}
};
</script>
<style  scoped>
</style>