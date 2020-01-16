<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>食品资讯</h3>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit" style="float: right" @click="writeIllustratedBook">添加资讯</el-button>
      </div>
    </div>

    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!--标签-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <div class="container1">
          <!--列表-->
          <el-row>
            <el-col :span="24" v-for="item in items" :key="item.id">
              <div>
                <div style=" float: left">
                  <img :src="item.img" class="image card-img">
                </div>
                <!--中间-->
                <div style="padding-left: 5px">
                  <h3><span @click="itemClick(item.id)">{{item.title}}</span></h3>
                  <div style="float: left;text-align: center">
                    <p class="line-limit-length">{{item.summary}}</p>
                  </div>
                </div>
                <!--  右边-->
                <div style="float: right">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData4)"
                    type="danger"
                    size="mini"
                  style="color: dodgerblue">
                    删除
                  </el-button>
                </div>
              </div>

            </el-col>
          </el-row>

        </div>
        <!--分页-->
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
    name: 'FoodNews',
    data () {
      return {
        items: [
          {
            id: 1,
            img: 'https://img7.21food.cn/img/newsimg/2019/12/18/1576636317135.jpg',
            title: '台湾防黑心蛋危害食安 元旦起“破壳蛋”禁做液蛋  2019-12-26',
            summary: '中新网12月26日电据台湾“中央社”报道，近年黑心液蛋事件频传，台当局“食药 ...'
          },
          {
            id: 2,
            img: 'https://img7.21food.cn/img/newsimg/2019/12/25/1577241153470.jpg',
            title: '白酒抽检怎让“甜蜜素”成了主角？ 业内：知名酒企躺枪或因管理仍有瑕疵 2019-12-26',
            summary: ' 经济日报-中国经济网北京12月26日讯近来沸沸扬扬的酒鬼酒甜蜜素事件迎来新的 ...'
          },
          {
            id: 3,
            img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg',
            title: '酒鬼酒陷甜蜜素“罗生门” 业内专家：含量甚微 对健康无影响 2019-12-26',
            summary: ' 经济日报-中国经济网12月26日讯岁末将至，正值白酒销售旺季，但白酒板块却遭 ...'
          },
          {
            id: 4,
            img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg',
            title: '国家市场监管总局征求“食品抽检意见” “甜蜜素”被列为白酒抽检重点项目 2019-12-26',
            summary: ' 中国网财经12月25日讯25日，国家市场监管总局发布《关于公开征求2020年 ...'
          },

        ],
      }
    },
    methods: {
      itemClick (key) {
        this.$router.push('/newsDetails')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      writeIllustratedBook () {
        this.$router.push('/write')
      },
      detail(){
        this.$router.push('/newsdetails')

      }

    }
  }

</script>

<style scoped>
  .el-row {
    margin-bottom: 30px;
    height: 5%;
  }

  .el-col {
    border-radius: 14px;
  }

  .card-img {
    width: 200px;
    height: 200px;
  }

  . image {
    width: auto;
    height: 50px;
  }
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


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .line-limit-length {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
