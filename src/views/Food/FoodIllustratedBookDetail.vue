<template>
  <div class="container">
    <div style="float: left;width: 100%">
      <el-page-header @back="goBack"/>
    </div>
    <div :style="screen">
      <!--标题-->
      <h1>{{food.foodName}}</h1>
      <!--标签-->
      <div style="display: flex;margin-top: 15px">
        <el-tag type="danger">作者</el-tag>
        <p style="margin: auto 6px;color: #a4a4a4">
          {{food.postUserName}}</p>
        <p style="margin: auto 6px;color: #a4a4a4">最后发布于{{food.postDate}}</p>
        <el-tag type="success">食品类型</el-tag>
        <p style="margin: auto 6px;color: #a4a4a4">{{food.foodTypeName}}</p>

      </div>
      <hr style="margin-top: 5px;margin-bottom: 5px">
      <div style="margin-top: 30px" v-loading="load" v-html="food.content"/>


    </div>
    <div style="margin-top: auto">
      <hr>
      <p style="text-align: center">一不小心滑到底了哦...</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBookDetail',
    data() {
      return {
        screen: {
          height: 0
        },
        food: {
          foodId: -1,
          foodTypeName: '',
          foodName: '',
          postUserName: '',
          postDate: '',
          content: ''
        },
        load: true
      }
    },
    methods: {
      getScreenHeight() {
        this.screen.height = window.innerHeight - 100 + 'px'
      },
      getFoodDetail() {

        this.$axios.get('/api/admin/getFoodDetail', {
          params: {
            foodId: this.food.foodId
          }
        }).then(res => {
          console.log(res)
          let data = res.data.data;
          this.food.foodId = data.foodId;
          this.food.foodTypeName = data.foodTypeName;
          this.food.foodName = data.foodName;
          this.food.postUserName = data.postUserName;
          this.food.postDate = data.postDate;
          this.food.content = data.content;
        }).catch(err => {
          console.log(err)
        })
        this.load = false;
      },

      goBack() {
        this.$route.meta.isBack = true;
        this.$router.back();

      }
    },

    activated() {
      this.food.foodId = this.$route.query.id;
      this.food.foodTypeName = '';
      this.food.foodName = '';
      this.food.postUserName = '';
      this.food.postDate = '';
      this.food.content = '';
      this.getFoodDetail();
      this.getScreenHeight();
    }
  }

</script>

<style scoped>
  .footer {
  }
</style>
