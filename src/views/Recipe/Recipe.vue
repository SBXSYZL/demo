<template>
  <div>
    <div class="container" style="display: flex;background-color: red;border-radius: 50px;height: 30px;">
      <div style="width: 90%;">
        <h1 style="color: white;">食谱</h1>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit" @click="writerecipeBook" style="background-color: white;color: #000000;border-radius: 70px; border-color: white;">添加食谱</el-button>
      </div>

    </div>
    <div class="container" style="">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!--标签-->
      <div>

        <el-container :span="5" v-for="item in items" :key="item.id" :offset="1">
          <el-aside width="200px">
            <img :src="item.img" style="width: 150px;height: 150px;margin-top: 20px;margin-left: 50px;"/>
          </el-aside>
          <el-main>
            <div class="rightcontent" style="width: 700px;height: 150px;margin-top: 0px;" >
              <div>
                <h1 @click="itemClick(item.id)" style="padding: 5px;margin-left: 8px;">{{item.title}}</h1>
              <p @click="itemClick(item.id)" style="margin-left: 8px;padding: 5px;">{{item.summary}}</p>

              <p class="p1" @click="itemClick(item.id)" style="margin-left: 8px;padding: 5px;">{{item.pingfen}}</p>
              <p class="p1" @click="itemClick(item.id)" style="margin-left: 8px;">{{item.people}}</p>
              </div>
              <div style="height: 10px;line-height: 10px;">
                <el-button type="text" class="button" @click="itemshanchuClick(item.id)">删除食谱</el-button>
              </div>

            </div>
          </el-main>
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
  .main{
    background-color: #00D1B2;
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
    margin-left: 600px;
    background: orangered;
    width: 65PX;
    height: 25px;
    margin-bottom: 20px;
    color: white;

  }
  .rightcontent{
    background-color: #F2F2F2;
  }
  .image {
    width: 100%;
    height: 60%;

  }
  .p1{
    font-size: 14px;
    color: #666666;
    padding: 2px;
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
