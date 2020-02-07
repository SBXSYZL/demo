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
            <el-button type="danger" round @click="deleteArticle()">
              删除
            </el-button>
          </el-col>
          <el-col :span="7">
            <el-button type="danger" round @click="modifyArticle()">
              修改
            </el-button>
          </el-col>
          <el-col :span="7">
            <el-button
              type="danger"
              round
              @click="recheckArticle()">
              重新审核
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--标题-数据-->
    <div style="width: 100%;height:80px;position:relative; ">
      <div style="position:absolute;left: 8px;top:0px">
        <h1 style="text-align: left;margin-top: 15px">{{ title }}</h1>
        <span style="color: skyblue">{{ author }}</span>
        <span style="color: #909399">发布于{{ data }}</span>
        <span style="color: #909399">阅读数{{ viewCnt }}</span>
        <el-tag
          size="small"
          type="danger"
          style="text-align: center;width: 40px;"
        >类型
        </el-tag
        >
        &nbsp;&nbsp;{{ type }}
        <el-tag
          size="small"
          type="danger"
          style="text-align: center;width: 65px"
        >事件地区
        </el-tag
        >
        &nbsp;&nbsp;{{ area }}
      </div>
    </div>
    <!--正文-->
    <div
      class="container"
      v-html="historyMsg"
      style="word-wrap: break-word;word-break: normal;"
    />
    <!--评论-->
    <div class="container" style="margin-top: 5px">
      <div>
        <span style="color: #909399;margin-left: 10px">转发{{ shareCnt }}</span>
        <span>评论{{commentcnt}}</span>
        <div style="display:flex;padding-top: 18px">
          <div style="display: flex;padding-left: 10px;padding-top: 10px;padding-bottom: 20px;margin-right: 15px">
            <el-avatar :size="size" :src="circleUrl"/>
          </div>
          <div class="el-textarea">
            <textarea autocomplete="off" placeholder="想对作者说什么" class="el-textarea__inner"/>
            <el-button type="danger" style="float: right;margin-top: 5px" @click="postComment()">发布</el-button>
          </div>
        </div>
        <el-row
          :span="5"
          v-for="item in items"
          :key="item.id"
          :offset="1"
        >
          <div class="xiangqing-b">
            <div class="xiangqing-b-l">
              <el-avatar :size="size" :src="circleUrl"/>
            </div>
            <div class="xiangqing-b-r">
              <p style="font-size: 18px;"><b>{{item.postUserName}}</b></p>
              <span style="color: #909399;font-size: 10px;">{{item.postDate}}</span>
              <p style="height: auto;min-height: 20px;padding-top: 8px">{{item.commentContent}}</p>
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style scoped>
  span {
    padding-right: 20px;
  }

  .el-textarea__inner {
    resize: none;
    min-height: 80px;
    padding: 15px;
  }

  .xiangqing-b {
    background: #fff;
    padding: 10px;
    overflow: hidden;
    border-bottom: 1px solid #f0f0f0;
  }

  .xiangqing-b-l {
    width: 5%;
    float: left;

  }

  .xiangqing-b-r {
    width: 95%;
    float: left;
  }

  .text1 {
    width: 90%;
    border: 1px solid #c1c1c1;
    border-radius: 4px;
    display: block;
    padding: 7px 8px;
    height: 80px;
    font-size: 14px;
    line-height: 22px;
  }

</style>
<script>
  export default {
    name: 'ForumDetial',
    data() {
      return {
        size: 40,
        shareID: '',
        textarea: '',
        historyMsg: '',
        type: '',
        data: '',
        area: '',
        author: '',
        viewCnt: '',
        shareCnt: '',
        title: "",
        articleId: '',
        articleTypeId: '',
        commentcnt: '',
        items: [],
        answeredUserName: '',
        postUserName: '',
        postDate: '',
        commentContent: '',
        dialogVisible: false,
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
    methods: {
      //获取文章详情
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
          this.historyMsg = res.data.data.content   //文章内容
          this.title = res.data.data.title          //文章标题
          this.articleId = res.data.data.articleId  //文章ID
          this.type = res.data.data.articleTypeName //文章类型名
          this.data = res.data.data.releaseDate     //文章发布时间
          this.area = res.data.data.releaseArea     //文章发布地点
          this.author = res.data.data.author        //文章作者
          this.viewCnt = res.data.data.viewCnt      //阅读数
          // this.shareID = res.data.data.shareID
          this.shareCnt = res.data.data.shareCnt    //转发数
          this.commentcnt = res.data.data.commentsMap.pageRows    //评论数
          this.items = res.data.data.commentsMap.list       //评论内容数组
        }).catch(err => {
          console.log(err)
        })
      },
      //删除文章
      deleteArticle() {
        this.$axios.get('/api/admin/deleteArticle', {
          params: {
            articleId: this.articleId
          }
        }).then(res => {
          console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.$router.push('/Forum')
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(() => {

        });
        this.dialogVisible = false;
      },
      //重审文章
      recheckArticle() {
        this.$axios.get('/api/admin/articleReReview', {
          params: {
            articleId: this.articleId
          }
        }).then(res => {
          console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              type: 'success',
              message: '文章重审'
            });
            this.$router.push('/Forum')
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(() => {

        });
        this.dialogVisible = false;
      },
      //修改文章
      modifyArticle() {
        let Content = this.historyMsg  //文章内容
        let Id = this.articleId        //文章ID
        let Area = this.area           //文章发布地区
        let Title = this.title         //文章标题
        sessionStorage.setItem("content", Content)
        sessionStorage.setItem("id", Id)
        sessionStorage.setItem("area", Area)
        sessionStorage.setItem("title", Title)
        this.$router.push('/WriteForum')
      },
      //原创评论
      // postComment(){
      //   console.log(123)
      //   if (this.articleTypeId != null && this.articleTypeId !== '') {
      //     this.$confirm('确定上传当前内容？', '验证', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'info'
      //     }).then(() => {
      //       let params = new URLSearchParams();
      //       params.append("articleID", this.inputTitle);
      //       params.append("comment", this.getArea);
      //       this.$axios(
      //         {
      //           method: 'post',
      //           url: '/api/admin/writeComment',
      //           data: params
      //         }
      //       ).then(res => {
      //         console.log(res);
      //         if (res.data.status === 'success' && res.data.data === 'success') {
      //           this.$message({
      //             type: 'success',
      //             message: '上传成功!'
      //           });
      //           this.$router.push('/Forum')
      //         } else {
      //           this.$message.error(res.data.data.errMsg);
      //         }
      //       }).catch(err => {
      //         this.$message.error('上传失败');
      //       })
      //
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消上传'
      //       })
      //     });
      //     this.dialogVisible = false;
      //   }
      // },
      goBack() {
        this.$router.back();
      },
    },
    activated() {
      this.getArticleDetail()
    }
  }
</script>

