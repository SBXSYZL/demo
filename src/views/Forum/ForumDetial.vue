<template>
  <div>
<!--标题-数据-->
    <div class="container">
      <div style="width: 100%">
        <!--按钮-->
        <div style="display: flex;justify-content: flex-start">
          <el-button type="danger"></el-button>
        </div>
        <div style="display: flex;justify-content: flex-end">
          <el-button type="danger"></el-button>
        </div>
      </div>
      <h>{{title}}</h>
    </div>
<!--正文-->
    <div class="container" v-html="historyMsg"/>
<!--评论-->
    <div></div>
  </div>

</template>

<script>
  export default {
    name: 'ForumDetial',
    data () {
      return {
        historyMsg: '',
        title:"",
        articleId:-1

      }
    },
    methods:{
      getArticleDetail(){
        this.articleId=this.$route.query.id;
        console.log(this.articleId)
        this.$axios
          .get("/api/user/getArticleDetail",
            {
              params:{
                articleId:this.articleId
              }
            }).then(res=>{
              console.log(res)
          this.historyMsg=res.data.data.content
          this.title=res.data.data.title
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created () {
      this.getArticleDetail()
    }
  }
</script>

