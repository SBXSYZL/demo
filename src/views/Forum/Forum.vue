<template>
  <div class="container" style="display: flex;height: 100%">
    <div style="width:100%">
      <div style="display:flex;justify-content:flex-end;margin-bottom: 10px">
        <el-button type="danger">发布帖子</el-button>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="审核通过">
          <div style="margin-bottom: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'date', order:  'descending'}"
            >
              <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
                <!--                      <div class="rightcontent">-->
                <!--                        <h1>{{item.title}}</h1>-->
                <!--                        <p>{{item.summary}}</p>-->
                <!--                        <p class="p1">{{item.pingfen}}</p>-->
                <!--                        <p class="p1">{{item.people}}</p>-->
                <!--                      </div>-->

                <!--                    <el-main>-->
                <!--                      <el-button type="text" class="button" @click="itemClick(item.id)">了解详情-->
                <!--                      </el-button>-->
                <!--                      <el-button type="text" class="button" @click="itemshanchuClick(item.id)">删除食谱-->
                <!--                      </el-button>-->
                <!--                    </el-main>-->
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="checkDetial(scope.$index, scope.row)">查看
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>


        <el-tab-pane label="未审核">
          <div style="margin-bottom: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
              </el-table-column>

              <el-table-column
                prop="name"
                label="作者"
                width="180">
              </el-table-column>

              <el-table-column
                prop="title"
                label="标题"
                :formatter="formatter">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="info"
                             size="mini"
                             @click="handleEdit(scope.$index, scope.row)">进入审核
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="驳回">
          <div style="margin-bottom: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
              </el-table-column>

              <el-table-column
                prop="name"
                label="作者"
                width="180">
              </el-table-column>

              <el-table-column
                prop="title"
                label="标题"
                :formatter="formatter">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="info"
                             size="mini"
                             @click="handleEdit(scope.$index, scope.row)">进入审核
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import QS from 'qs'

  export default {
    name: 'list',
    data() {
      return {
        // items: [{
        //     id: 'a',
        //     img: 'http://site.meishij.net/r/208/102/1025708/s1025708_149663916013140.jpg',
        //     title: '玉米山药炖排骨',
        //     summary: '豆瓣酱、醋、生抽、蚝油、白沙糖、料',
        //     pingfen: '综合评分 7.8  （七天内 43 人做过）',
        //     people: '爱厨房的燕尾蝶'
        //   }
        // ],
        items: [],
        input5: "",
        tableData: [],

        URL_DEFINE_ROOT: "/local/",
        pageNo: 1,
        pageSize: 10
      }
    },
    methods: {
      checkDetial(key) {
        this.$router.push('/ForumDetial')
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getArticleList() {
        this.$axios
          .get("/api/user/getArticleList?" + "pageNo=" + this.pageNo + "&pageSize=" + this.pageSize).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.getArticleList();
    }
  };
</script>

<style scoped>

</style>
