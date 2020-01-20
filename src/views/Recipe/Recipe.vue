<template>
  <div>
    <div class="container" style="display: flex;background-color: red;border-radius: 50px;height: 30px;">
      <div style="width: 90%;">
        <h1 style="color: white;">食谱</h1>
      </div>

      <div>
        <el-button type="primary" icon="el-icon-edit" @click="writerecipeBook"
                   style="background-color: white;color: #000000;border-radius: 70px; border-color: white;">添加食谱
        </el-button>
      </div>

    </div>
    <div class="container" style="">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getsearchRecipe"></el-button>
        </el-input>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="成功审核" name="first">
          <!--标签-->
          <div>
            <el-table
              :data="items"
              style="width: 100%" @row-click="itemClick">
              <el-table-column style="width: 80%;position: absolute;">
                <template slot-scope="scope">
                  <div style="height: 200px; margin: 15px;">
                    <div style="width: 100%; ">
                      <h1 >{{scope.row.title}}</h1>
                      <div style="margin-top:20px;">{{scope.row.recipeDesc}}</div>
                      <div style="position: absolute;bottom: 0;">
                        <p>{{scope.row.recipeDate}} </p>
                      </div>


                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column style="width: 180px" width="180px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteNews(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--         删除的弹框-->
            <el-dialog
              title="是否确定删除"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定
            </el-button>
          </span>
            </el-dialog>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNo"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>

          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">待审核</el-tab-pane>
        <el-tab-pane label="驳回" name="third">驳回</el-tab-pane>
      </el-tabs>

    </div>


  </div>
</template>

<script>
  export default {
    name: 'Recipe',
    data() {
      return {
        activeName: 'second',
        items: [],
        searchKey: '',
        pageNo: 1,
        pageSize: 10,
        total: 0,
        dialogVisible: false
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      itemClick(obj) {
        console.log(obj)
        // this.$router.push('/Foodrecipedetails')
        this.$router.push({
          path: '/Foodrecipedetails',
          query: {
            id: obj.recipeId
          }
        })
      },
      itemshanchuClick(key) {
        alert('删除食谱')
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      writerecipeBook() {
        this.$router.push('/WriteRecipe')
      },
      handleClick() {
      },
      handleClose() {
        this.dialogVisible = false;
      },
      deleteNews(row) {
        this.dialogVisible = true;
        this.items.splice(row, 1)
      },

      getRecipeList() {
        this.$axios.get('/api/admin/getRecipeList', {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          console.log(res)
          this.items = res.data.data.list;
          this.total = res.data.data.pageRows
        }).catch(err => {
          console.log(err)
        })
      },
      getsearchRecipe() {
        this.pageNo = 1;
        this.$axios.get('/api/admin/searchRecipe', {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            searchKey: this.searchKey
          }
        }).then(res => {
          console.log("res:")
          console.log(res)
          this.items = res.data.data.list;
        }).catch(err => {
          console.log(err)
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getRecipeList();
      },
      handleCurrentChange(val) {
        this.pageNo=val;
        this.getRecipeList();
      }
    },
    created() {
      this.getRecipeList()
    }
  }
</script>

<style scoped>
  .main {
    background-color: #00D1B2;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    display: flex;
    margin: 50px
  }

  .rightcontent {
    background-color: #F2F2F2;
  }

  .image {
    width: 100%;
    height: 60%;

  }

  .p1 {
    font-size: 14px;
    color: #666666;
    padding: 2px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card-img {
    height: 250px;
    width: 250px;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .line-limit-length {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
