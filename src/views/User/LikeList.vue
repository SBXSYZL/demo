<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div v-if="empty">
      <div class="container nopadding">
        <el-row>
          <el-col :span="16" :offset="4">
            <span>收藏都没有，我太难了！！！</span>
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
            style="padding-top:20px;padding-left:10px;padding-bottom:0px;min-width:400px"
            @click="goDetail(likelist[i - 1].recipeId)"
          >
            <el-row style=" padding-left:15px;">
              <el-col :span="24">
                <el-avatar :src="circleUrl" style=" float: left"></el-avatar>
                <div style="text-align:left;padding-left: 60px;">
                  <span class="author">作者：{{ name }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="datefont"
                    >收藏日期：{{ likelist[i - 1].recipeDate }}</span
                  >
                </div>
              </el-col>
            </el-row>

            <el-card
              class="box-card"
              shadow="never"
              style="border:0px;width:100%"
            >
              <div slot="header" class="clearfix">
                <span>{{ likelist[i - 1].title }}</span>
              </div>
              <div
                class="el-card__body"
                v-html="likelist[i - 1].recipeDesc"
              ></div>
            </el-card>
            <!-- <div slot="bottom " class="clearfix ">
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
            </div> -->
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
      empty: false,
      userId: -1,
      name: '',
      pageNo: 1,
      pageSize: 2,
      likelist: [
        {
          recipeId: '',
          recipeDesc: '',
          recipeDate: '',
          title: ''
        }
      ],
      count: 0,
      total: 1,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      size: 40,
      loading: false
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
    this.userId = this.$route.query.id;
    this.name = this.$route.query.name;
    this.$axios.get('/api/admin/getUserLike', {
      params: {
        "pageNo": this.pageNo,
        "pageSize": this.pageSize,
        "userId": this.userId
      }
    }).then(res => {
      let likelist = res.data.data.list;
      this.likelist = likelist;
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
    goDetail (val) {
      this.$router.push({ path: '/LikeDetail', query: { id: val } });
    },
    load () {
      this.pageNo += 1;
      this.$axios.get('/api/admin/getUserLike', {
        params: {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,
          "userId": this.userId
        }
      }).then(res => {
        let likelist = res.data.data.list;
        if (res.data.data.pageRows != 1) {
          this.loading = true;
          for (let i in likelist) {
            this.likelist.push(likelist[i]);
          }
        }

      }).catch(err => {
        console.log(err);
      })
      setTimeout(() => {
        this.loading = false
        if (this.count + 2 >= this.total) {
          this.count = this.total;
        }
        else {
          this.count += 2;
        }
        if (this.count == 0) {
          this.empty = true;
        }

      }, 2000)
    }
  }
}
</script>