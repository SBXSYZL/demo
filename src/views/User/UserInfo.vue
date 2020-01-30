<template>
  <div>
    <div class="container ">
      <el-page-header @back="goBack" content="用户主页" />
    </div>

    <div class="container nopadding">
      <el-container>
        <el-aside width="380px">
          <el-card class="box-card container" shadow="hover">
            <div
              class="el-card__body imglayout"
              @click="openInfo = true"
              style="cursor:pointer"
            >
              <el-avatar :size="size" :src="circleUrl" />
              <br />
              <span class="font2">ID:{{ info.userId }}</span
              ><br />
              <span class="font1">昵称：{{ info.nickName }}</span>
            </div>

            <!-- 个人资料弹窗 -->
            <el-dialog title="个人资料信息" :visible.sync="openInfo">
              <el-row>
                <el-divider content-position="left"
                  ><h4>基本资料</h4></el-divider
                >
              </el-row>
              <el-row>
                <el-avatar :size="size" :src="circleUrl" />
                <span class="font2"> ID:{{ info.userId }}</span>
              </el-row>

              <el-row
                ><span class="font1">昵称：{{ info.nickName }}</span></el-row
              >
              <el-row
                ><span class="font1">性别：{{ info.gender }}</span></el-row
              >
              <el-row
                ><span class="font1">国籍：{{ info.country }}</span></el-row
              >
              <el-row
                ><span class="font1">所在城市：{{ info.city }}</span></el-row
              >
              <el-row
                ><span class="font1">电话：{{ info.tel }}</span></el-row
              >
              <el-row
                ><span class="font1"
                  >信誉度：{{ info.credibility }}</span
                ></el-row
              >
              <el-row
                ><span class="font1"
                  >账号状态：{{ info.authority }}</span
                ></el-row
              >
            </el-dialog>
            <!-- -END- -->

            <el-divider />
            <el-row type="flex" justify="space-around">
              <el-col :span="3">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="发帖数"
                  placement="top"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    style="height:50px;width:50px"
                  />
                </el-tooltip>
              </el-col>

              <el-col :span="3">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="收藏数"
                  placement="top"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-star-off"
                    circle
                    style="height:50px;width:50px;"
                  />
                </el-tooltip>
              </el-col>

              <el-col :span="3">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="信誉度"
                  placement="top"
                >
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    circle
                    style="height:50px;width:50px"
                  />
                </el-tooltip>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="2"
                ><span style="height:50px;width:50px;" class="font1"
                  >19</span
                ></el-col
              >
              <el-col :span="2"
                ><span style="height:50px;width:50px;" class="font1"
                  >20</span
                ></el-col
              >
              <el-col :span="2"
                ><span style="height:50px;width:50px" class="font1"
                  >100</span
                ></el-col
              >
            </el-row>
            <div class="el-card__body font1">
              <router-link :to="{ name: 'article' }">
                <el-button type="text font1">查看帖子</el-button>
              </router-link>
              <el-divider />
              <router-link :to="{ name: 'like' }">
                <el-button type="text font1">查看收藏</el-button>
              </router-link>
            </div>
          </el-card>
        </el-aside>
        <el-container>
          <el-header>
            <div class="container noright">
              <div style="margin-bottom: 15px;">
                <el-input placeholder="请输入内容">
                  <el-button slot="append" icon="el-icon-search" />
                </el-input>
              </div>
            </div>
          </el-header>
          <el-main style="margin-top:50px">
            <transition name="el-zoom-in-top" mode="out-in">
              <keep-alive>
                <router-view />
              </keep-alive>
            </transition>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      info: {},
      openInfo: false,
      turn1: true,
      turn2: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      size: 70
    }
  },
  created () {
    this.userId = this.$route.query.id
  },
  activated () {
    this.$axios.get('/api/admin/takeUserInfo', {
      params: {
        'userId': this.$route.query.id
      }
    }).then(res => {
      let info = res.data.data;
      if (info.authority === 1) {
        info.authority = '正常';
      } else {
        info.authority = '封号';
      }
      if (info.gender === 1) {
        info.gender = '男';
      } else {
        info.gender = '女';
      }
      this.info = info;
    }).catch(err => {
      console.log(err);
    });

    console.log(this.$route);
  },

  methods: {
    goBack () {
      this.$router.back()
    },
    goArticle () {
      this.$router.push('articleDetail');
    },
    goLike () {
      this.$router.push('likeDetail');
    },
  },
}
</script>
<style>
.text {
  font-size: 14px;
  text-align: center;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 25%;
  min-width: 300px;
}

.nopadding {
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgba(0, 0, 0, 0);
  border: 0px;
}

.imglayout {
  text-align: center;
  background: #07c4a8;
  padding-top: 40px;
}

.font1 {
  font-size: 18px;
  text-align: center;
}

.font2 {
  color: dimgrey;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
  text-align: center;
}
</style>
