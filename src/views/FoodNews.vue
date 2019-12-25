<template>
  <div>
    <div class="container">
      <h3>食品资讯</h3>
    </div>
    <div class="container">
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
  </div>
</template>

<script>
  export default {
    name: 'FoodNews',
    data () {
      return {
        items: [
          // {
          //   id: 1,
          //   img: 'http://5b0988e595225.cdn.sohucs.com/images/20190116/bc7e628e4cfc4da7994e8c1cd7d4e77a.jpeg',
          //   title: '某条食品资讯',
          //   summary: '该咨询的摘要...'
          // },

        ]
      }
    },
    methods: {
      itemClick (key) {
        this.$router.push('/newsDetails')
      }
    }
  }
</script>

<style scoped>

</style>
