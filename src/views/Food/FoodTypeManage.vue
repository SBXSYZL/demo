<template>
  <div>
    <div class="container">
      <h3>食品类型管理</h3>
    </div>
    <div class="container">
      <div style="float: right">
        <el-button type="primary" icon="el-icon-edit" @click="addFoodType">新增食品类型</el-button>
      </div>
      <div>
        <el-table
          :data="foodTypes"
          style="width: 100%">
          <el-table-column
            label="序号"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.foodTypeId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            style="text-align: center"
            label="食品类型名称"
            width="300">
            <template slot-scope="scope">
              <span> {{ scope.row.foodTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--              <el-button-->
              <!--                size="mini"-->
              <!--                @click="handleEdit(scope.$index, scope.row)">编辑-->
              <!--              </el-button>-->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--删除食品类型确认弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定删除本类型？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancleDelete">取 消</el-button>
    <el-button type="primary" @click="confirmDelete">确 定</el-button>
  </span>
    </el-dialog>
    <!--创建新食品类型弹窗-->
    <el-dialog title="新增食品类型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="食品类型名称" :label-width="formLabelWidth">
          <el-input v-model="form.foodTypeName" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAddFoodType">取 消</el-button>
        <el-button type="primary" @click="confirmAddFoodType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "FoodTypeManage",
    data() {
      return {
        foodTypes: [],
        dialogVisible: false,
        willDeleteId: '',
        form: {
          foodTypeName: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible: false
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(row)
        this.dialogVisible = true;
        this.willDeleteId = row.foodTypeId;
      },
      confirmDelete() {
        this.$axios.get('/api/admin/deleteFoodType', {
          params: {
            foodTypeId: this.willDeleteId
          }
        }).then(res => {
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getFoodTypes()
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(err => {
          this.$message.error(err.data.data.errMsg);
        });
        this.dialogVisible = false;
        this.willDeleteId = -1
      },
      cancleDelete() {
        this.dialogVisible = false;
        this.willDeleteId = -1
      },
      //获取所有食品类型
      getFoodTypes() {
        this.$axios.get('/api/admin/getFoodTypes')
          .then(res => {
            console.log(res)
            this.foodTypes = res.data.data;
          })
      },
      handleClose(done) {
        this.dialogVisible = false;
      },
      addFoodType() {
        this.dialogFormVisible = true;
      },
      confirmAddFoodType() {
        this.$axios.get('/api/admin/createFoodType', {
          params: {
            foodTypeName: this.form.foodTypeName
          }
        }).then(res => {
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '创建成功!'
            })
            this.getFoodTypes()
          } else {
            this.$message({
              showClose: true,
              message: res.data.data.errMsg,
              type: 'error',
              duration: 500
            });
          }
        }).catch(err => {
          this.$message({
            showClose: true,
            message: err.data.data.errMsg,
            type: 'error',
            duration: 500
          });
        })

        this.dialogFormVisible = false;
        this.form.foodTypeName = '';
      },
      cancleAddFoodType() {
        this.form.foodTypeName = '';
        this.dialogFormVisible = false
      }
    },
    activated() {
      this.getFoodTypes()
    }
  }
</script>

<style scoped>

</style>
