<template>
  <div class="container" style="min-width:600px">
    <!--顶部按钮-->
    <div style="width: 100%;display: flex;">
      <!--左侧按钮 回退-->
      <div style="float: left;width: 82%">
        <el-page-header @back="goBack" />
      </div>
    </div>

    <!--标题-数据-->
    <div style="width: 100%;height:80px;position:relative; ">
      <div style="position:absolute;left: 8px;top:0px">
        <h1 style="text-align: left;margin-top: 15px">{{ info.title }}</h1>
        <span style="color: skyblue">{{ info.author }}</span>
        <span style="color: #909399">发布于{{ info.releaseDate }}</span>
        <span style="color: #909399">阅读数{{ info.viewCnt }}</span>
        <el-tag
          size="small"
          type="danger"
          style="text-align: center;width: 40px;"
          >类型</el-tag
        >
        &nbsp;&nbsp;{{ info.articleTypeName }}
        <el-tag
          size="small"
          type="danger"
          style="text-align: center;width: 65px"
          >事件地区</el-tag
        >
        &nbsp;&nbsp;{{ info.releaseArea }}
      </div>
    </div>

    <!--正文-->
    <div
      class="container"
      v-html="info.content"
      style="word-wrap: break-word;word-break: normal;"
    />
    <!--评论-->
    <div class="container" style="margin-top: 5px">
      <div>
        <span style="color: #909399;">转发：{{ info.shareCnt }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>评论：{{ comment.totail }}</span>
      </div>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in comment.totail" class="infinite-list-item" :key="i">
          <el-divider></el-divider>
          <div class="container Area">
            <el-row>
              <el-col :span="24">
                <el-avatar :src="circleUrl" style=" float: left"></el-avatar>
                <div style="text-align:left;padding-left: 60px;">
                  <span class="author">{{
                    comment.list[i - 1].postUserName
                  }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="datefont"
                    >评论日期：{{ comment.list[i - 1].postDate }}</span
                  >
                </div>
              </el-col>
            </el-row>

            <el-card
              class="box-card"
              shadow="never"
              style="border:0px;width:100%"
            >
              <div
                class="el-card__body"
                v-html="comment.list[i - 1].commentContent"
              ></div>
              <div style="float: right">
                <el-button type="text">回复</el-button>
              </div>
            </el-card>
          </div>
        </li>
      </ul>
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
  data () {
    return {
      info: [{
        content: '',
        articleTypeName: '',
        releaseDate: '',
        releaseArea: '',
        author: '',
        viewCnt: '',
        shareCnt: '',
        title: "",
        articleId: -1
      }],
      comment: {
        totail: 0,
        list: []
      },
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    getArticleDetail () {
      this.$axios.get("/api/admin/getArticleDetail",
        {
          params: {
            articleId: this.articleId
          }
        }).then(res => {
          this.info = res.data.data;
          //this.comment.totail = 25;
        }).catch(err => {
          console.log(err)
        })
    },
    getComment () {
      this.$axios.get("/api/admin/getArticleComment",
        {
          params: {
            articleId: this.articleId,
            pageNo: '1'
          }
        }).then(res => {
          this.comment.list = res.data.data.list;
          this.comment.totail = res.data.data.pageRows;
          console.log(this.comment);
          //this.comment.totail = 25;
        }).catch(err => {
          console.log(err)
        })
    },
    goBack () {
      this.$router.back();
    },
    load () { },
    disabled () {
      return this.count >= this.comment.totail;
    }

  },
  activated () {
    this.articleId = this.$route.query.id;
    console.log(this.articleId);
    this.getArticleDetail();
    this.getComment();
  }
}
</script>
<style>
.Area {
  padding-top: 20px;
  padding-left: 10px;
  padding-bottom: 0px;
  min-width: 440px;
  border: 0px;
}
</style>

