<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div v-if="empty">
      <div class="container nopadding">
        <el-row>
          <el-col :span="16" :offset="4">
            <span>这个人太懒！！！就没写过帖子啊！！！</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <span>(╯‵□′)╯︵┻━┻</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else>
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="i in count" class="list-item" :key="i">
          <div
            class="container"
            style="padding-top:20px;padding-left:10px;padding-bottom:0px"
          >
            <el-row>
              <el-col :span="3">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
              </el-col>
              <el-col :span="6">
                <div style="text-align:left">
                  <span class="author">{{ userId }}</span
                  ><br />
                  <span class="datefont">{{
                    articlelist[i - 1].releaseDate
                  }}</span>
                </div>
              </el-col>
              <el-col :span="15"> </el-col>
            </el-row>

            <el-card
              class="box-card"
              shadow="never"
              style="border:0px;width:100%"
            >
              <div slot="header" class="clearfix">
                <span>{{ articlelist[i - 1].title }}</span>
              </div>
              <div
                class="el-card__body"
                v-html="articlelist[i - 1].content"
              ></div>
            </el-card>
            <div slot="bottom " class="clearfix ">
              <el-row type="flex" justify="end">
                <el-col :span="12"> </el-col>
                <el-col :span="3">
                  <el-button
                    icon="el-icon-location-outline icon-size"
                    style="border:0px;"
                    plain
                    >厦门</el-button
                  >
                </el-col>
                <el-col :span="3">
                  <el-button
                    style="border:0px;"
                    icon="el-icon-thumb icon-size"
                    plain
                    >点赞</el-button
                  >
                </el-col>
                <el-col :span="3">
                  <el-button
                    style="border:0px;"
                    icon="el-icon-chat-dot-round icon-size"
                    plain
                    >评论</el-button
                  >
                </el-col>
                <el-col :span="3">
                  <el-button
                    style="border:0px;"
                    icon="el-icon-connection icon-size"
                    plain
                    >分享</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="loading">
        <div class="container nopadding">
          <el-row>
            <el-col :span="16" :offset="4">
              <span>努力加载中... \ (^o^) /~</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="noMore">
        <div class="container nopadding">
          <el-row>
            <el-col :span="16" :offset="4">
              <span>没有更多了 ╭ (╯^╰) ╮</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: -1,
      pageNo: 1,
      pageSize: 2,
      articlelist: [
        {
          articleId: '',
          userId: '',
          articleTypeId: '',
          releaseDate: '',
          title: '',
          content: ''
        }
      ],
      empty: false,
      count: 0,
      total: 1,
      loading: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      size: 40
    }
  },
  computed: {
    noMore () {
      return this.count == 0 ? false : this.count >= this.total;
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    console.log(this.$route);
    this.userId = this.$route.query.id;
    this.$axios.get('/api/admin/getUserArticle', {
      params: {
        "pageNo": this.pageNo,
        "pageSize": this.pageSize,
        "userId": this.userId
      }
    }).then(res => {
      let articlelist = res.data.data.list;
      this.articlelist = articlelist;
      this.total = res.data.data.pageRows;
      if (this.total > 1) {
        this.count = 2;
      }
      else {
        if (this.total == 1) {
          this.count = 1;
        }
      }
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {

    load () {
      this.pageNo += 1;
      this.$axios.get('/api/admin/getUserArticle', {
        params: {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,
          "userId": this.userId
        }
      }).then(res => {
        let articlelist = res.data.data.list;
        if (res.data.data.pageRows != 1) {
          this.loading = true;
          for (let i in articlelist) {
            this.articlelist.push(articlelist[i]);
          }
        }

      }).catch(err => {
        console.log(err);
      })
      setTimeout(() => {

        if (this.count + 2 >= this.total) {
          this.count = this.total;
        }
        else {
          this.count += 2;
        }
        if (this.count == 0) {
          this.empty = true;
        }
        this.loading = false
      }, 2000)


    }
  }
}
</script>
<style>
.datefont {
  color: dimgrey;
  vertical-align: bottom;
  font-size: 10px;
}

.author {
  font-size: 18px;
}

.icon-size {
  font-size: 25px;
}
</style>
