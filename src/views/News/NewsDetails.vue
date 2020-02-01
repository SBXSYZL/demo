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
            <el-button type="danger" round @click="DelectNews">删除</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" round @click="writeIllustratedBook">修改</el-button>
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
        <p>{{news.content}}</p>
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
        }
      }
    },
    methods: {
      go() {
        this.$router.push('/foodNews')
      },
      mounted(){
        this.getNewsDetail();
      },
      DelectNews(){},
      writeIllustratedBook() {
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
            this.news.releaseDate = obj.releaseDate;
            this.news.viewCnt = obj.viewCnt;
            this.news.title = obj.title;
            this.news.newsDesc = obj.newsDesc;
            this.news.content = obj.content;
          }
        }).catch(err => {
          console.log(err)
        })
      }

    },
    created(){
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
