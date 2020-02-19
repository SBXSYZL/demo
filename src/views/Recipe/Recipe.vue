<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>食谱</h3>
      </div>
      <div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          style="float: right"
          @click="writerecipeBook"
          >添加食谱
        </el-button>
      </div>
    </div>
    <div class="container" style="">
      <div style="margin-bottom: 15px;">
        <el-input
          placeholder="请输入内容"
          v-model="searchKey"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getsearchRecipe"
          ></el-button>
        </el-input>
      </div>
      <el-tabs v-model="activeName" @tab-click="getLists">
        <el-button type="text" name="first" @click="first" >通过审核</el-button>
        <el-button type="text" name="second" @click="second">未审核</el-button>
        <el-button type="text" name="third" @click="third">驳回</el-button>
<!--        <el-tab-pane label="通过审核" name="first" @click="first">-->
<!--          -->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="未审核" name="second" @click="second">-->
<!--          -->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="驳回" name="third" @click="third">-->
<!--          -->
<!--        </el-tab-pane>-->


        <div>
          <el-table
            :data="items"
            style="width: 100%"
            @row-click="itemClick"
          >
            <el-table-column style="width: 80%;position: absolute;">
              <template slot-scope="scope">
                <div style="height: 200px; margin: 15px;">
                  <div style="width: 100%; ">
                    <h1>{{ scope.row.title }}</h1>
                    <h1>{{ scope.row.recipeId }}</h1>
                    <div style="margin-top:20px;">
                      {{ scope.row.recipeDesc }}
                    </div>
                    <div style="position: absolute;bottom: 0;">
                      <p>{{ scope.row.recipeDate }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column style="width: 180px" width="180px" >
              <template slot-scope="scope"   >
                <el-button :style="{ display: visiblesuccess }"
                size="mini"
                  type="danger"
                  @click="tongguoshenhe(scope.row.recipeId)"
                  >通过审核
                </el-button>
              </template>
            </el-table-column>
            <el-table-column style="width: 180px" width="180px">
              <template slot-scope="scope">
                <el-button :style="{ display: visiblebohui }"
                  size="mini"
                  type="danger"
                  @click="bohui(scope.row.recipeId)"
                  >驳回
                </el-button>
              </template>
            </el-table-column>
            <el-table-column style="width: 180px" width="180px">-->
              <template slot-scope="scope">
                <el-button :style="{ display: visiblereview }"
                  size="mini"
                  type="danger"
                  @click="Reshenhe(scope.row.recipeId)"
                  >重新审核
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>

<!--        <el-tab-pane label="成功审核" name="first">-->
<!--          &lt;!&ndash;标签&ndash;&gt;-->
<!--          <div>-->
<!--            <el-table-->
<!--              :data="items"-->
<!--              style="width: 100%"-->
<!--              @row-click.native="itemClick"-->
<!--            >-->
<!--              <el-table-column style="width: 80%;position: absolute;">-->
<!--                <template slot-scope="scope">-->
<!--                  <div style="height: 200px; margin: 15px;">-->
<!--                    <div style="width: 100%; ">-->
<!--                      <h1>{{ scope.row.title }}</h1>-->
<!--                      <h1>{{ scope.row.recipeId }}</h1>-->
<!--                      <div style="margin-top:20px;">-->
<!--                        {{ scope.row.recipeDesc }}-->
<!--                      </div>-->
<!--                      <div style="position: absolute;bottom: 0;">-->
<!--                        <p>{{ scope.row.recipeDate }}</p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--            &lt;!&ndash;         删除的弹框&ndash;&gt;-->

<!--            <el-pagination-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--              :current-page="1"-->
<!--              :page-sizes="[10, 20, 30, 40]"-->
<!--              :page-size="pageSize"-->
<!--              layout="total, sizes, prev, pager, next, jumper"-->
<!--              :total="total"-->
<!--            >-->
<!--            </el-pagination>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="待审核" name="second">-->
<!--          <div>-->
<!--            <el-table-->
<!--              :data="items"-->
<!--              style="width: 100%"-->
<!--              @row-click.native="itemClick"-->
<!--            >-->
<!--              <el-table-column style="width: 80%;position: absolute;">-->
<!--                <template slot-scope="scope">-->
<!--                  <div style="height: 200px; margin: 15px;">-->
<!--                    <div style="width: 100%; ">-->
<!--                      <h1>{{ scope.row.title }}</h1>-->
<!--                      <h1>{{ scope.row.recipeId }}</h1>-->
<!--                      <div style="margin-top:20px;">-->
<!--                        {{ scope.row.recipeDesc }}-->
<!--                      </div>-->
<!--                      <div style="position: absolute;bottom: 0;">-->
<!--                        <p>{{ scope.row.recipeDate }}</p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column style="width: 180px" width="180px">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="tongguoshenhe(scope.row.recipeId)"-->
<!--                    >通过审核-->
<!--                  </el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column style="width: 180px" width="180px">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="bohui(scope.row.recipeId)"-->
<!--                    >驳回-->
<!--                  </el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->

<!--            <el-pagination-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--              :current-page="1"-->
<!--              :page-sizes="[10, 20, 30, 40]"-->
<!--              :page-size="pageSize"-->
<!--              layout="total, sizes, prev, pager, next, jumper"-->
<!--              :total="total"-->
<!--            >-->
<!--            </el-pagination>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="驳回" name="third">-->
<!--          <div>-->
<!--            <el-table-->
<!--              :data="items"-->
<!--              style="width: 100%"-->
<!--              @row-click.native="itemClick"-->
<!--            >-->
<!--              <el-table-column style="width: 80%;position: absolute;">-->
<!--                <template slot-scope="scope">-->
<!--                  <div style="height: 200px; margin: 15px;">-->
<!--                    <div style="width: 100%; ">-->
<!--                      <h1>{{ scope.row.title }}</h1>-->
<!--                      <h1>{{ scope.row.recipeId }}</h1>-->
<!--                      <div style="margin-top:20px;">-->
<!--                        {{ scope.row.recipeDesc }}-->
<!--                      </div>-->
<!--                      <div style="position: absolute;bottom: 0;">-->
<!--                        <p>{{ scope.row.recipeDate }}</p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column style="width: 180px" width="180px">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="Reshenhe(scope.row.recipeId)"-->
<!--                    >重新审核-->
<!--                  </el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->

<!--            <el-pagination-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--              :current-page="1"-->
<!--              :page-sizes="[10, 20, 30, 40]"-->
<!--              :page-size="pageSize"-->
<!--              layout="total, sizes, prev, pager, next, jumper"-->
<!--              :total="total"-->
<!--            >-->
<!--            </el-pagination>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recipe',
  data () {
    return {
      visiblesuccess: 'none',
      visiblebohui: 'none',
      visiblereview: 'none',
      activeName: 'second',
      items: [],
      searchKey: '',
      recipeId: '',
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false
    }
  },
  methods: {

    tongguoshenhe (val) {
      console.log(this.recipeId)
      this.$axios.get('/api/admin/recipeReviewOk', {
        params: {
          recipeId: val
        }
      }).then(res => {
        console.log(1)
        console.log(res)
        if (res.data.status === 'success' && res.data.data === 'success') {
          this.$message({
            type: 'success',
            message: '通过审核'
          });
          this.$router.push('/Recipe')
        } else {
          this.$message.error(res.data.data.errMsg);
        }
      }).catch(() => {

      });
      this.dialogVisible = false;
      console.log(122)

    },
    bohui (val) {
      this.$axios.get('/api/admin/recipeTurnDown', {
        params: {
          recipeId: val
        }
      }).then(res => {
        console.log(1)
        console.log(res)
        if (res.data.status === 'success' && res.data.data === 'success') {
          this.$message({
            type: 'success',
            message: '成功驳回'
          });
          this.$router.push('/Recipe')
        } else {
          this.$message.error(res.data.data.errMsg);
        }
      }).catch(() => {

      });
      this.dialogVisible = false;
      console.log(122)
    },
    Reshenhe (val) {
      this.$axios.get('/api/admin/recipeReReview', {
        params: {
          recipeId: val
        }
      }).then(res => {
        console.log(1)
        console.log(res)
        if (res.data.status === 'success' && res.data.data === 'success') {
          this.$message({
            type: 'success',
            message: '已重新审核'
          });
          this.$router.push('/Recipe')
        } else {
          this.$message.error(res.data.data.errMsg);
        }
      }).catch(() => {

      });
      this.dialogVisible = false;
      console.log(122)
    },
    itemClick (row, event, column) {

      this.$router.push({ path: '/Foodrecipedetails', query: { id: row.recipeId } });
      // this.$router.push({
      //   path: '/Foodrecipedetails',
      //   query: {
      //     id: obj.recipeId
      //   }
      // })
    },
    itemshanchuClick (key) {
      alert('删除食谱')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    writerecipeBook () {
      this.$router.push('/WriteRecipe')
    },
    handleClose () {
      this.dialogVisible = false
    },
    first () {
      this.visiblesuccess = 'none'
      this.visiblebohui = 'none'
      this.visiblereview = ''
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 500)
      this.getRecipeList()
    },
    second () {
      this.visiblesuccess = ''
      this.visiblebohui = ''
      this.visiblereview = 'none'
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 500)
      this.getReviewRecipeList()
    },
    third () {
      this.visiblesuccess = 'none'
      this.visiblebohui = 'none'
      this.visiblereview = ''
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 500)
      this.getTurnDownRecipeList()
    },
    getLists (tag, event) {
      if (tag.name === 'first') {
        this.pageNo = 1
        this.getRecipeList()
      } else if (tag.name === 'second') {
        this.pageNo = 1
        this.getReviewRecipeList()
      } else {
        this.pageNo = 1
        this.getTurnDownRecipeList()
      }
    },
    getRecipeList () {
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
    getReviewRecipeList () {
      this.$axios.get('/api/admin/getReviewRecipeList', {
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
    getTurnDownRecipeList () {
      this.$axios.get('/api/admin/getTurnDownRecipeList', {
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
    getsearchRecipe () {
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
    handleSizeChange (val) {
      this.pageSize = val;
      this.getRecipeList();
    },
    handleCurrentChange (val) {
      this.pageNo = val;
      this.getRecipeList();
    }

  },
  created () {
    this.getReviewRecipeList()
  }
}
</script>

<style scoped>
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
