<template>
  <div class="fillcontain">
    <div>
      <!-- 必须绑定search_data,不然下面无法获取 -->
      <el-form :inline="true" ref="add_data" :model="search_data"> 
        <!-- 按照时间筛选 -->
        <el-form-item label='按照时间筛选:'>
          <el-date-picker
          v-model="search_data.startTime"
          type="datetime"
          placeholder="选择开始时间"          
        ></el-date-picker>
        --
        <el-date-picker
          v-model="search_data.endTime"
          type="datetime"
          placeholder="选择结束时间"          
        ></el-date-picker>
        </el-form-item>
         <el-form-item >
          <el-button type="primary" size="small" icon="view" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <!-- //v-if="user.identity == 'manager'" -->
          <el-button type="primary" size="small" icon="view"  @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        max-height:450
        border
        style="width: 100%"
        v-if="tableData.length >0"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column label="创建日期" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe1" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>


<script>
import Dialog from "../components/Dialog";
export default {
  name: "",
  props: [""],
  data() {
    return {
      search_data:{
        startTime:'',
        endTime:''
      },
      filterTableData:[],
      paginations: {
        page_index: 1, //当前位于那一页
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper"
      },
      tableData: [],
      allTableData: [],
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  //created()的执行是当你进入这个vue的时候执行
  created() {
    this.getProfile();
  },

  components: {
    Dialog
  },

  computed: {
    //计算属性，可以直接获取user,添加权限管理
    //v-if="user.identity == 'manager'" 那个对象要使用这个权限就添加这个语句
    user(){
      return this.$store.getters.user;
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profile/")
        .then(res => {
          // console.log(res.data);
          this.allTableData = res.data;
          this.filterTableData = res.data;

          //设置分页数据
          this.setPaginations();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setPaginations() {
      //分页的属性，
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };

      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        cash: row.cash,
        expend: row.expend,
        remark: row.remark,
        id: index + 1
      };
    },
    handleDelete(index, row) {
      this.$axios
        .get("/api/profile/delete?id=" + (index + 1))
        .then(res => {
          if (res) {
            this.$message({
              message: "数据删除成功",
              type: "success"
            });
            this.getProfile();
          }
        })
        .catch(err => {
          if (res) {
            this.$message({
              message: "数据删除失败",
              type: "success"
            });
          }
        });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      console.log(this.dialog);
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      };
    },
    handleSizeChange(page_size) {
      //切换size
      this.paginations.page_index = 1;
      this.paginations.page_sizes = page_size;
      //遍历
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      //获取当前页
      let index = this.paginations.page_size * (page - 1);
      //数据的总数
      let num = this.paginations.page_size * page;
      //容器
      let tables = [];

      //遍历
      for (let i = index; i < num; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch(){
      //筛选功能
      //判断是否为空 
      if(!this.search_data.startTime || !this.search_data.endTime){
        this.$message({
          type:'warning',
          message:'请选择时间区间'
        });
        this.getProfile();
        return;
      }
      //获取开始和结束时间
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();
      
      console.log(sTime);
      console.log(eTime);
      this.allTableData = this.filterTableData.filter(item =>{
        console.log(item.date)

        let date = new Date(item.date);
        
        let time = date.getTime();
        console.log(time);
        return time>=sTime && time<=eTime;
      })
      //
      this.setPaginations();
    }
  },

  watch: {}
};
</script>
<style  scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>