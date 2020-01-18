<template>
    <div class="container" style="display: flex;height: 100%">
      <div style="width:100%">
        <div style="display:flex;justify-content:flex-end;margin-bottom: 10px">
          <el-button type="danger" @click="postForum()">发布帖子</el-button>
        </div>
        <el-tabs >
          <el-tab-pane label="审核通过">
            <div style="margin-bottom: 15px">
              <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="getSearchArticle"/>
              </el-input>
              <el-row :span="5" v-for="item in items" :key="item.id" :offset="1" @click.native="checkDetial(item.articleId)">
                <el-card class="box-card" style="margin-top: 10px">
                  <div class="body">
                    <div class="body-l">
                     <h2>{{item.title}}</h2>
                     <span v-html=item.content style="height: 100px"></span>
                    </div>
                    <div class="body-r">
                      <el-button type="danger">重审</el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>

        <el-tab-pane label="未审核">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="getSearchArticle"/>
              </el-input>
              <el-row :span="5" v-for="item in items" :key="item.id" :offset="1">
                <el-card class="box-card" style="margin-top: 10px">
                  <div class="body">
                    <div class="body-l">
                      <h2>{{item.title}}</h2>
                      <span v-html=item.content style="height: 100px"></span>
                    </div>
                    <div class="body-r">
                      <el-button type="danger">驳回</el-button>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="驳回">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="getSearchArticle"/>
              </el-input>
              <el-row :span="5" v-for="item in items" :key="item.id" :offset="1" @click.native="checkDetial(item.articleId)">
                <el-card class="box-card" style="margin-top: 10px">
                  <div class="body">
                    <div class="body-l">
                      <h2>{{item.title}}</h2>
                      <span v-html=item.content style="height: 100px"></span>
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
              :total="400">
            </el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  export default {
    name:'list',
    data () {
        return {
          items:[],
          pageNo: 1,
          pageSize: 10,
          searchKey: '',
          }

      },
      methods: {
        checkDetial (key)
        {
          this.$router.push({
              path: '/ForumDetial',
              query: {
                      id:key
                  }
            }
          )
        },
        getSearchArticle(){
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
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`)
        },
        postForum(){
          this.$router.push('/WriteForum')
        },
        handleEdit(index, row) {
          // console.log(index, row);
        },
        handleDelete(index, row) {
          // console.log(index, row);
        },
        getArticleList(){
          this.$axios
            .get("/api/user/getArticleList?" + "pageNo=" + this.pageNo + "&pageSize=" + this.pageSize).then(res => {
              // console.log(res)
              this.items=res.data.data.list
          }).catch(err => {
            console.log(err);
          })
        }
      },
    created () {
      this.getArticleList();
    }
  };
</script>
<style scoped>
  .box-card {
    width: 100%;
  }
  .body{
    background:#fff;
    padding:10px;
    overflow: hidden;
  }
  .body-l{
    width: 80%;
    float: left;
  }
  .body-r{
    width: 20%;
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
  }
  span{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
