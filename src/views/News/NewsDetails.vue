<template>
  <div class="container">
    <div style="width: 100%;display: flex;">
      <!--左侧按钮-->
      <div style="float: left;width: 82%">
        <el-page-header @back="go"/>
      </div>
      <!--右侧按钮-->
      <div style="justify-content: space-between;">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-button type="danger" round @click="DelectNews(news.newsId)">删除</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" round @click="modifyNews()">修改</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="container" style="float: bottom">
      <div class="top">
        <h2 style="text-align: center"/>{{news.title}}
      </div>
      <div>
        <p style="text-align: center">{{news.releaseDate}}</p>
      </div>
      <div style="float: bottom">
        <p style="float: left">{{news.content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'NewsDetails',
    data() {
      return {
        news: {
          newsId: '',
          releaseDate: '',
          viewCnt: '',
          title: '',
          newsDesc: '',
          content: ''
        },
        dialogVisible:false,
      }
    },
    methods: {
      go() {
        this.$router.push('/foodNews')
      },
      mounted(){
        this.getNewsDetail();
      },
      //删除新闻
      DelectNews(val){
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
                message: '删除成功'
              });
              this.$router.push('/foodNews')
            } else {
              this.$message.error(res.data.data.errMsg);
            }
          }).catch(() => {

          });
        })
        this.dialogVisible = false;
      },
      //修改新闻
     modifyNews() {
       let Id = this.news.newsId          //文章ID
       let title =this.news.title          //文章标题
       let Content = this.news.content    //文章内容
       let Date = this.news.releaseDate          //文章发布时间
       let Desc = this.news.newsDesc        //文章摘要
       sessionStorage.setItem("newsId",Id)
       sessionStorage.setItem("title",title)
       sessionStorage.setItem("content",Content)
       sessionStorage.setItem("releaseDate",Date)
       sessionStorage.setItem("newsDesc",Desc)
       this.$router.push('/WriteNews')
      },

      getNewsDetail() {
        let id = this.$route.query.id;
        console.log(id)
        this.$axios.get('/api/admin/getNewsDetail', {
          params: {
            newsId: id
          }
        }).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            let obj = res.data.data;
            this.news.newsId = obj.newsId;
            this.news.releaseDate = obj.releaseDate; //发布日期
            this.news.viewCnt = obj.viewCnt;
            this.news.title = obj.title;     //新闻标题
            this.news.newsDesc = obj.newsDesc;   //新闻摘要
            this.news.content = obj.content;   //新闻内容
          }
        }).catch(err => {
          console.log(err)
        })
      }

    },
    activated(){
      this.getNewsDetail()
    },

  }
</script>

<style scoped>
  .top {
    text-align: center;
    height: auto;
    width: auto;
  }
</style>
