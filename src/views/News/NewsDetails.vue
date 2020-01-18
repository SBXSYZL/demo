<template>
  <div class="container">
    <div style="float: top">
      <div style="float: left">
        <button @click="go" style="width: 80px;height:40px;background:lightskyblue">返回</button>
      </div>
      <div style="float: right">
        <button style="float: right;width: 80px;height:40px;background:lightskyblue" @click="Delect">删除</button>
        <button style="float: right;width: 80px;height:40px;background:lightskyblue" @click="writeIllustratedBook">修改
        </button>
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
      writeIllustratedBook() {
        this.$router.push('/write')
      },
      Delect() {
      },
      getNewsDetail() {
        let id = this.$route.query.id;
        this.$axios.get('/api/user/getNewsDetail', {
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
    created() {
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
