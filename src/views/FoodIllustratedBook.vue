<template>
  <div>
    <div class="container">
      <h3>食品图鉴</h3>
    </div>
    <div class="container">
      <!--标签-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane v-for="label in labels" :key="label.id" :label="label.label" :name="label.label"></el-tab-pane>
          <div class="container">
            <!--列表-->
            <el-row>
              <el-col :span="5" v-for="item in items" :key="item.id" :offset="1">
                <el-card :body-style="{ padding: '0px' ,margin:'10px'}">
                  <img :src="item.img" class="image card-img">
                  <div style="padding: 14px;">
                    <span>{{item.title}}</span>
                    <div class="bottom clearfix">
                      {{item.summary}}
                      <el-button type="text" class="button" @click="itemClick(item.id)">了解详情</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBook',
    data () {
      return {
        items: [
          {
            id: 'a',
            img: 'http://5b0988e595225.cdn.sohucs.com/images/20190116/bc7e628e4cfc4da7994e8c1cd7d4e77a.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 'b',
            img: 'https://storage.googleapis.com/www-cw-com-tw/article/201809/article-5b8ccde368b1a.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'

          },
          {
            id: 'c',
            img: 'https://tw.bring-you.info/imgs/2018/11/mukshidonna-4-900x600.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 'd',
            img: 'http://img6.16fan.com/attachments/wenzhang/20172/15/148713753043200ge.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },

        ],
        labels: [
          {
            id: 11,
            label: '肉禽蛋类',
            name: '肉禽蛋类'
          },
          {
            id: 12,
            label: '水产类',
            name: '水产类'
          },
          {
            id: 13,
            label: '蔬菜类',
            name: '蔬菜类'
          },
          {
            id: 14,
            label: '豆类、豆制品',
            name: '豆类、豆制品'
          },
          {
            id: 15,
            label: '五谷杂粮、面类',
            name: '五谷杂粮、面类'
          },
          {
            id: 16,
            label: '果品类',
            name: '果品类'
          },
          {
            id: 17,
            label: '药食两用类',
            name: '药食两用类'
          },
          {
            id: 18,
            label: '调味品、油脂',
            name: '调味品、油脂'
          },
          {
            id: 19,
            label: '调味品、油脂',
            name: '调味品、油脂'
          },
          {
            id: 20,
            label: '其他',
            name: '其他'
          }

        ],
        activeName2: '肉禽蛋类',
        currentPage4: 4
      }
    },
    methods: {
      itemClick (key) {
        this.$router.push('/foodIllustratedBookDetail')
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card-img {
    height: 250px;
    width: 250px;
  }
</style>
