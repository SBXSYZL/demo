<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>论坛</h3>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit" @click="postForum()">
          发布帖子
        </el-button>
      </div>
    </div>
    <div class="container" style="display: flex;height: 100%">
      <div style="width:100%">
        <el-tabs v-model="activeName" @tab-click="getList">
          <!--搜索框-->
          <el-input
            placeholder="请输入内容"
            v-model="searchKey"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getSearchArticle"
            />
          </el-input>
          <!--选项-->
          <el-button style="margin-right:10px " @click="refresh">刷新</el-button>
          <el-select v-model="articleTypeId" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in ArticleTypes"
              :key="item.articleTypeId"
              :label="item.articleTypeName"
              :value="item.articleTypeId"
              @change="getList">
            </el-option>
          </el-select>
          <el-tab-pane label="审核通过" name="accept">
            <div style="margin-bottom: 15px">
              <el-row
                :span="5"
                v-for="item in items"
                :key="item.id"
                :offset="1"
                @click.native="checkDetial(item.articleId)"
              >
                <el-card class="box-card" style="margin-top: 10px;">
                  <div class="body">
                    <div class="body-l">
                      <h2>{{ item.title }}</h2>
                      <span v-html="item.content" style="height: 100px" />
                    </div>
                    <div class="body-r">
                      <el-button
                        type="danger"
                        @click="recheckArticle(item.articleId)">重审
                      </el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未审核" name="check">
            <div style="margin-bottom: 15px;">
              <el-row
                :span="5"
                v-for="item in items"
                :key="item.id"
                :offset="1"
                @click.native="checkDetial(item.articleId)"
              >
                <el-card class="box-card" style="margin-top: 10px">
                  <div class="body">
                    <div class="body-l">
                      <h2>{{ item.title }}</h2>
                      <span v-html="item.content" style="height: 100px" />
                    </div>
                    <div class="body-r">
                      <el-button
                        type="danger"
                        @click="acceptArticle(item.articleId)"
                        >通过
                      </el-button>
                      <el-button
                        type="danger"
                        @click="rejectArticle(item.articleId)"
                        >驳回
                      </el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="驳回" name="reject">
            <div style="margin-bottom: 15px;">
              <el-row
                :span="5"
                v-for="item in items"
                :key="item.id"
                :offset="1"
                @click.native="checkDetial(item.articleId)"
              >
                <el-card class="box-card" style="margin-top: 10px">
                  <div class="body">
                    <div class="body-l">
                      <h2>{{ item.title }}</h2>
                      <span v-html="item.content" style="height: 100px" />
                    </div>
                    <div class="body-r">
                      <el-button
                        type="danger"
                        @click="recheckArticle(item.articleId)"
                        >重审
                      </el-button>
                      <el-button
                        type="danger"
                        @click="deleteArticle(item.articleId)"
                        >删除
                      </el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>
          <div class="block">
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
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forum',
  data () {
    return {
      items: [],
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      total: 0,
      activeName: 'accept',
      ArticleTypes:[],
      articleTypeId:-1,
      dialogVisible: false,
      name:'',
    }
  },
  methods: {
    //查看文章详情
    checkDetial (key) {
      this.$router.push({
        path: '/ForumDetial',
        query: {
          id: key
        }
      })
    },
    //驳回文章
    rejectArticle (val) {
      this.$confirm('确认驳回该文章?','警告',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$axios.get('/api/admin/articleTurnDown', {
          params: {
            articleId: val
          }
        }).then(res => {
          console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '驳回成功',

            });
            this.$router.push('/Forum')
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(() => {

        });
      })
      this.dialogVisible = false;
    },
    //通过审核
    acceptArticle (val) {
      console.log(this.articleId)
      this.$confirm('确人通过该文章?','警告',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        this.$axios.get('/api/admin/articleReviewOk', {
          params: {
            articleId: val
          }
        }).then(res => {
          console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '审核通过'
            });
            this.$router.push('/Forum')
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(() => {

        });
      })
      this.dialogVisible = false;
    },
    //删除文章
    deleteArticle (val) {
      this.$confirm('确认删除该文章?','警告',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        this.$axios.get('/api/admin/deleteArticle', {
          params: {
            articleId: val
          }
        }).then(res => {
          console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.$router.push('/Forum')
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(() => {

        });
      })
      this.dialogVisible = false;
    },
    //重审文章
    recheckArticle (val) {
      this.$confirm('确认重新审核该文章?','警告',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        this.$axios.get('/api/admin/articleReReview', {
          params: {
            articleId: val
          }
        }).then(res => {
          console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '文章重审'
            });
            this.$router.push('/Forum')
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(() => {

        });
      })
      this.dialogVisible = false;
    },
    //搜索文章
    getSearchArticle () {
      this.pageNo = 1;
      this.$axios.get('/api/admin/searchArticle', {
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
    //发布文章
    postForum () {
      this.$router.push('/WriteForum')
    },
    //Tabs切换点击事件
    getList (tab, event) {
      if (tab.name === "accept") {
        this.getArticleList();
      } else if (tab.name === "check") {
        this.getReviewArticleList();
      } else {
        this.getTurnDownArticleList();
      }
    },
    //获取文章类型
    getArticleTypes(){
      this.$axios.get('/api/admin/getArticleType')
        .then(res => {
          this.ArticleTypes = res.data.data;
          if (this.ArticleTypes.length > 0) {
            this.ArticleTypeId = this.ArticleTypes[0].ArticleTypeId;
            this.getList();
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取审核通过文章列表
    getArticleList () {
      this.$axios.get('/api/admin/getArticleList', {
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
    //获取未审核文章列表
    getReviewArticleList () {
      this.$axios.get('/api/admin/getReviewArticleList', {
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
    //获取驳回文章列表
    getTurnDownArticleList () {
      this.$axios.get('/api/admin/getTurnDownArticleList', {
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
    handleSizeChange (val) {
      this.pageNo = 1;
      this.pageSize = val;
      this.getArticleList();
    },
    handleCurrentChange (val) {
      this.pageNo = val;
      this.getArticleList();
    },
    handleDelete (index, row) {
      // console.log(index, row);
    },
    refresh() {
      this.getList();
    },
    //选项切换
    selectChange() {
      this.getList();
    },
  },
  created () {
    this.getArticleList();
    this.getArticleTypes();
  }
}
</script>
<style scoped>
.box-card {
  width: 100%;
}

.body {
  background: #fff;
  padding: 10px;
  overflow: hidden;
}

.body-l {
  width: 80%;
  float: left;
}

.body-r {
  width: 20%;
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}

span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
