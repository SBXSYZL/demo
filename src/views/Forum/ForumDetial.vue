<template>

  <div class="container" style="min-width:600px">
    <!--顶部按钮-->
    <div style="width: 100%;display: flex;">
      <!--左侧按钮 回退-->
      <div style="float: left;width: 82%">
        <el-page-header @back="goBack"/>
      </div>
      <!--右侧按钮 删除/修改/重新审核-->
      <div style="justify-content: space-between;">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-button type="danger" round>删除</el-button>
          </el-col>
          <el-col :span="7">
            <el-button type="danger" round>修改</el-button>
          </el-col>
          <el-col :span="7">
            <el-button type="danger" round>重新审核</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--标题-数据-->
    <div style="width: 100%;height:80px;position:relative; ">
      <div style="position:absolute;left: 8px;top:0px">
        <h1 style="text-align: left;margin-top: 15px">{{title}}</h1>
        <span style="color: skyblue">{{author}}</span>
        <span style="color: #909399">发布于{{data}}</span>
        <span style="color: #909399">阅读数{{viewCnt}}</span>
        <el-tag size="small" type="danger" style="text-align: center;width: 40px;">类型</el-tag>
        &nbsp;&nbsp;{{type}}
        <el-tag size="small" type="danger" style="text-align: center;width: 65px">事件地区</el-tag>
        &nbsp;&nbsp;{{area}}
      </div>
    </div>

    <!--正文-->
    <div class="container" v-html="historyMsg"
         style="word-wrap: break-word;word-break: normal;"/>
    <!--评论-->
    <div class="container" style="margin-top: 5px">
      <div>
        <span style="color: #909399;">转发{{shareCnt}}</span>
        <span>评论25</span>
      </div>
    </div>
  </div>

</template>
<style scoped>
  span {
    padding-right: 20px;
  }
</style>
<script>
  export default {
    name: 'ForumDetial',
    data() {
      return {
        historyMsg: '',
        type:'',
        data:'',
        area:'',
        author:'',
        viewCnt:'',
        shareCnt:'',
        title: "",
        articleId: -1
      }
    },
    methods: {
      getArticleDetail() {
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
          this.type = res.data.data.articleTypeName
          this.data = res.data.data.releaseDate
          this.area = res.data.data.releaseArea
          this.author = res.data.data.author
          this.viewCnt = res.data.data.viewCnt
          this.shareCnt = res.data.data.shareCnt
        }).catch(err => {
          console.log(err)
        })
      },
      goBack() {
        this.$router.back();
      },
    },
    created() {
      this.getArticleDetail()
    }
  }
</script>

