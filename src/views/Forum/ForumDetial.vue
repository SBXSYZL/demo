<template>
  <div>
    <div class="container" style="min-width:600px">
      <div style="width: 100%;display: flex;">
        <div style="float: left;width: 60%">
          <el-page-header @back="goBack" />
        </div>

        <div style="justify-content: space-between">
          <el-row :gutter="10">
            <el-col :span="8"
              ><el-button type="danger" round>删除</el-button></el-col
            >
            <el-col :span="8">
              <el-button type="danger" round>修改</el-button>
            </el-col>
            <el-col :span="8"
              ><el-button type="danger" round>重新审核</el-button></el-col
            >
          </el-row>
        </div>
      </div>
      <!--标题-数据-->
      <div style="display: flex;justify-content: center;margin-top: 15px">
        <div style="display: flex;">
          <h2>{{ title }}</h2>
        </div>
      </div>
    </div>
    <!--正文-->
    <div class="container" v-html="historyMsg" />
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
      title: "",
      articleId: -1
    }
  },
  methods: {
    getArticleDetail () {
      this.articleId = this.$route.query.id;
      console.log(this.articleId)
      this.$axios
        .get("/api/user/getArticleDetail",
          {
            params: {
              articleId: this.articleId
            }
          }).then(res => {
            console.log(res)
            this.historyMsg = res.data.data.content
            this.title = res.data.data.title
          }).catch(err => {
            console.log(err)
          })
    },
    goBack () {
      this.$router.push('/Forum');
    },
  },
  created () {
    this.getArticleDetail()
  }
}
</script>

