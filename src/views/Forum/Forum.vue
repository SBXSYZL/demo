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
          <el-tab-pane label="审核通过" name="pass">
            <div style="margin-bottom: 15px">
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
                      <el-button type="danger">重审</el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未审核" name="check">
            <div style="margin-bottom: 15px;">
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
              <el-row
                :span="5" v-for="item in items"
                :key="item.id"
                :offset="1"
                @click.native="checkDetial(item.articleId)">
                <el-card class="box-card" style="margin-top: 10px">
                  <div class="body">
                    <div class="body-l">
                      <h2>{{ item.title }}</h2>
                      <span v-html="item.content" style="height: 100px" />
                    </div>
                    <div class="body-r">
                      <el-button type="danger">驳回</el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="驳回" name="reject">
            <div style="margin-bottom: 15px;">
              <el-input
                placeholder="请输入内容"
                v-model="searchKey"
                class="input-with-select">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getSearchArticle"
                />
              </el-input>
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
                      <el-button type="danger">删除</el-button>
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
              :total="total"
            >
            </el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      items: [],
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      total: 0,
      activeName: 'pass',
      dialogVisible: false
    }
  },
  methods: {
    checkDetial (key) {
      this.$router.push({
        path: '/ForumDetial',
        query: {
          id: key
        }
      })
    },
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
    handleSizeChange (val) {
      this.pageSize = val;
      this.getRecipeList();
    },
    handleCurrentChange (val) {
      this.pageNo = val;
      this.getRecipeList();
    },
    postForum () {
      this.$router.push('/WriteForum')
    },
    handleDelete (index, row) {
      // console.log(index, row);
    },
    //Tabs切换点击事件
    getList (tab, event) {
      if (tab.name == "pass") {
        this.getArticleList();
      } else if (tab.name == "check") {
        this.getReviewArticleList();
      } else {
        this.getTurnDownArticleList();
      }
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
    }
  },
  created()
  {

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
