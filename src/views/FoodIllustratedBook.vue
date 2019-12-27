<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>食品图鉴</h3>
      </div>
      <div>

        <el-button type="primary" icon="el-icon-edit" @click="writeIllustratedBook">添加图鉴</el-button>
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
        <el-tab-pane v-for="label in labels" :key="label.id" :label="label.label" :name="label.label"></el-tab-pane>
        <div class="container">
          <!--列表-->
          <el-row>
            <el-col :span="5" v-for="item in items" :key="item.id" :offset="1">
              <el-card :body-style="{ padding: '0px' ,margin:'10px'}">
                <img :src="item.img" class="image card-img">
                <div style="padding: 14px;">
                  <span>{{item.title}}</span>
                  <div>
                    <p class="line-limit-length">{{item.summary}}</p>

                    <el-button type="text" class="button" @click="itemClick(item.id)">了解详情
                    </el-button>
                  </div>
                </div>
              </el-card>
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
    name: 'FoodIllustratedBook',
    data () {
      return {
        items: [
          {
            id: 'a',
            img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg',
            title: '枸杞',
            summary: '枸杞属（Lycium）来源于希腊语lykion，指的...'
          },
          {
            id: 'b',
            img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg',
            title: '枸杞',
            summary: '枸杞属（Lycium）来源于希腊语lykion，指的...'

          },
          {
            id: 'c',
            img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg',
            title: '枸杞',
            summary: '枸杞属（Lycium）来源于希腊语lykion，指的...'
          },
          {
            id: 'd',
            img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg',
            title: '枸杞',
            summary: '枸杞属（Lycium）来源于希腊语lykion，指的...'
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
            label: '其他',
            name: '其他'
          }

        ],
        activeName2: '肉禽蛋类',
        currentPage4: 1,
        input5: ''
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
      },
      writeIllustratedBook () {
        this.$router.push('/write')
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
