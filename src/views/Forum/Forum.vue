<template>
    <div class="container" style="display: flex;height: 100%">
      <div style="width:100%">
        <div style="display:flex;justify-content:flex-end;margin-bottom: 10px">
          <el-button type="danger" @click="postForum()">发布帖子</el-button>
        </div>
        <el-tabs >
          <el-tab-pane label="审核通过">
            <div style="margin-bottom: 15px">
              <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
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
              <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
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
              <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-row :span="5" v-for="item in items" :key="item.id" :offset="1">
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
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
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
          input5: ''
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
