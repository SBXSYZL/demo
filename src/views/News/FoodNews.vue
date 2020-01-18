<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>食品资讯</h3>
      </div>
      <div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          style="float: right"
          @click="writeIllustratedBook"
          >添加资讯</el-button
        >
      </div>
    </div>

    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input
          placeholder="请输入内容"
          v-model="searchKey"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getSearchNews"
          />
        </el-input>
      </div>
      <!--标签-->
      <div>
        <el-table :data="items" style="width: 100%" @row-click.stop="itemClick">
          <el-table-column style="width: 80%;position: absolute;">
            <template slot-scope="scope">
              <div style="height: 100px; margin: 15px;">
                <div style="width: 100%; ">
                  <h2>{{ scope.row.title }}</h2>
                  <div style="margin-top:10px;">{{ scope.row.newsDesc }}</div>
                  <div style="position: absolute;bottom: 0;">
                    <p>{{ scope.row.releaseDate }}</p>
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
                @click="deleteNews(scope.row)"
                >删除</el-button
              >
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
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
    <!--    分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FoodNews',
  data () {
    return {
      items: [],
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      dialogVisible: false,
    }
  },
  methods: {
    itemClick (key) {
      this.$router.push({
        path: '/newsDetails',
        query: {
          id: key
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    methods: {
      itemClick (obj) {
        // this.$router.push('/Foodrecipedetails')
        this.$router.push({
          path: '/NewsDetails',
          query: {
            id: obj.newsId
          }
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      writeIllustratedBook () {
        this.$router.push('/WriteNews')
      },
      searchNews () {
        this.$router.push('')
      },
      handleClick () {
      },
      handleClose () {
        this.dialogVisible = false;
      },
      deleteNews (row) {
        this.dialogVisible = true;
        this.items.splice(row, 1)
      },

      getNewsList () {
        this.$axios.get('/api/user/getNewsList', {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          console.log(res)
          this.items = res.data.data.list;
        }).catch(err => {
          console.log(err)
        })
      },
      getSearchNews () {
        this.pageNo = 1;
        this.$axios.get('/api/admin/searchNews', {
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
        this.getNewsList();
      },
      handleCurrentChange (val) {
        this.pageNo = val;
        this.getNewsList();
      },
    },
    created () {
      // this.$router.go(0);
      this.getNewsList();
    },
    detail () {
      this.$router.push('/newsdetails')

    },
    search () {
      this.$router.push('')
    },
    handleClick () {
    },
    deleteRow (val, data) {
    },

    getNewsList () {
      this.$axios.get('/api/user/getNewsList', {
        params: {
          pageNo: 1,
          pageSize: 10
        }
      }).then(res => {
        console.log(res)
        this.items = res.data.data.list;
      }).catch(err => {
        console.log(err)
      })
    },
    getSearchNews () {
      this.$axios.get('/api/user/searchNews', {
        params: {
          pageNo: 1,
          pageSize: 10,
          searchKey: 1
        }
      }).then(res => {
        console.log(res)
        this.input = res.data.data.list;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created () {
    this.getNewsList();
    this.getSearchNews();
  },

}

</script>

<style scoped>
.el-row {
  margin-bottom: 30px;
  height: 5%;
}

.el-col {
  border-radius: 14px;
}

.card-img {
  width: 200px;
  height: 200px;
}

.image {
  width: auto;
  height: 50px;
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
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
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
