<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>食谱</h3>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit" @click="writerecipeBook">添加食谱</el-button>
      </div>

    </div>
    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!--标签-->
      <div class="all">
        <el-container :span="5" v-for="item in items" :key="item.id" :offset="1">

            <el-aside width="200px">
              <img :src="item.img" class="image" />
            </el-aside>
            <el-container>
              <el-header>
                <div class="rightcontent">
                  <h1>{{item.title}}</h1>
                  <p>{{item.summary}}</p>
                  <p class="p1">{{item.pingfen}}</p>
                  <p class="p1">{{item.people}}</p>
                </div>

              </el-header>

            <el-main>
              <el-button type="text" class="button" @click="itemClick(item.id)">了解详情
              </el-button>
              <el-button type="text" class="button" @click="itemshanchuClick(item.id)">删除食谱
              </el-button>
            </el-main>
          </el-container>

        </el-container>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Recipe',
  data () {
    return {
      items: [
        {
          id: 'a',
          img: 'http://site.meishij.net/r/208/102/1025708/s1025708_149663916013140.jpg',
          title: '玉米山药炖排骨',
          summary: '豆瓣酱、醋、生抽、蚝油、白沙糖、料',
          pingfen: '综合评分 7.8  （七天内 43 人做过）',
          people: '爱厨房的燕尾蝶'
        },
        {
          id: 'b',
          img: 'http://site.meishij.net/r/208/102/1025708/s1025708_149663916013140.jpg',
          title: '玉米山药炖排骨',
          summary: '豆瓣酱、醋、生抽、蚝油、白沙糖、料豆瓣酱、醋、生抽、蚝油、白沙糖、料',
          pingfen: '综合评分 7.8  （七天内 43 人做过）',
          people: '爱厨房的燕尾蝶'

        },
        {
          id: 'c',
          img: 'http://site.meishij.net/r/208/102/1025708/s1025708_149663916013140.jpg',
          title: '玉米山药炖排骨',
          summary: '豆瓣酱、醋、生抽、蚝油、白沙糖、料',
          pingfen: '综合评分 7.8  （七天内 43 人做过）',
          people: '爱厨房的燕尾蝶'
        },
        {
          id: 'd',
          img: 'http://site.meishij.net/r/208/102/1025708/s1025708_149663916013140.jpg',
          title: '玉米山药炖排骨',
          summary: '豆瓣酱、醋、生抽、蚝油、白沙糖、料',
          pingfen: '综合评分 7.8  （七天内 43 人做过）',
          people: '爱厨房的燕尾蝶'
        }

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
      this.$router.push('/Foodrecipedetails')
    },
    itemshanchuClick (key) {
      alert('删除食谱')
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
    writerecipeBook () {
      this.$router.push('/WriteRecipe')
    }
  }
}
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .all{
    margin-left: 300px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    margin-top: 20px;
  }
  .rightcontent{
    margin-top: 10px;

  }
  .image {
    width: 100%;
    height: 60%;

  }
  .p1{
    font-size: 14px;
    color: #666666;
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
