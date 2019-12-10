<template>
  <div>
    <el-row>
      <el-col :span="5" v-for="(o, index) in 100" :key="o" :offset="1">
        <el-card :body-style="{ padding: '0px' ,margin:'10px'}">
          <img :src="img" class="image">
          <div style="padding: 14px;">
            <span>{{title}}</span>
            <div class="bottom clearfix">
              {{summary}}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'FoodNews',
    data () {
      return {
        img: 'https://images.chinatimes.com/newsphoto/2018-03-01/900/20180301004735.jpg',
        title: '某条食品资讯',
        summary: '该咨询的摘要'
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
</style>
