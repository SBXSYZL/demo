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
        >添加资讯
        </el-button
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
          <el-button slot="append" icon="el-icon-search" @click="getSearchNews"
          />
        </el-input>
      </div>
      <!--标签-->
      <div>
        <el-table :data="items" style="width: 100%" @row-click="itemClick">
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
              <el-button size="mini" type="danger"
                         @click.stop="DeleteNews(scope.row.newsId)">删除
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!--         删除的弹框-->
<!--        <el-dialog-->
<!--          title="是否确定删除"-->
<!--          :visible.sync="dialogVisible"-->
<!--          width="30%"-->
<!--          :before-close="handleClose"-->
<!--        >-->
<!--          <span>确定删除本条新闻？</span>-->
<!--          <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="CancleDelete">取 消</el-button>-->
<!--            <el-button type="primary" @click="confirmDelete">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->
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
    <div>
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script>
  import {dialog} from 'element-ui'

  export default {
    name: 'FoodNews',
    data() {
      return {
        items: [],
        pageNo: 1,
        pageSize: 10,
        searchKey: '',
        title: '',
        WillDeleteId:' ',
        dialogFormVisible: false,
        dialogVisible: false,
        isRouterAlive:true
      }
    },
    provide(){
      return {
        reload:this.reload
      }
    },
    methods: {
      itemClick(obj) {
        console.log(obj)
        this.$router.push({
          path: '/NewsDetails',
          query: {
            id: obj.newsId
          }
        })
      },
      handleClose(done) {
        this.dialogVisible = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      writeIllustratedBook() {
        this.$router.push('/WriteNews')
      },
      handleClick() {
      },
      handleClose() {
        this.dialogVisible = false;
      },
      reload(){
        this.isRouterAlive=false
        this.$nextTick(function () {
           this.isRouterAlive=true
        })
     },
      //删除新闻
     DeleteNews(val){
       this.$confirm('确认删除该文章?','警告',{
         confirmButtonText:'确认',
         cancelButtonText:'取消',
         type:'warning'
       }).then(()=> {
         this.$axios.get('/api/admin/deleteNews', {
           params: {
            newsId: val
           }
         }).then(res => {
           console.log(res)
           if (res.data.status === 'success' && res.data.data === 'success') {
             this.$message({
               type: 'success',
               message: '删除成功',
             });
             this.getNewsList()
             this.$router.push('/foodNews')
           } else {
             this.$message.error(res.data.data.errMsg);
           }
         }).catch(() => {

         });
       })
       this.dialogVisible = false;
       // location.reload();
     },
      //新闻列表
      getNewsList() {
        this.$axios.get('/api/admin/getNewsList', {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          console.log("res:")
          console.log(res)
          this.items = res.data.data.list;
        }).catch(err => {
          console.log(err)
        })
      },
      //搜索新闻
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
      handleSizeChange(val) {
        this.pageSize = val;
        this.getNewsList();
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getNewsList();
      },
    },
   created() {
      this.getNewsList();
    }
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
