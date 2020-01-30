<template>
  <div class="container">
    <div style="display: flex">
      <div style="float: left;width: 90%">
        <el-page-header @back="goBack"/>
      </div>
      <div style="float: right;width: 10%">
        <el-button type="danger" @click="deleteFood">删除本文</el-button>
      </div>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定删除本文？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="confirmDelete">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBookDetail',
    data() {
      return {
        screen: {
          minHeight: 0
        },
        food: {
          foodId: -1,
          foodTypeName: '',
          foodName: '',
          postUserName: '',
          postDate: '',
          content: ''
        },
        load: true,
        dialogVisible: false
      }
    },
    methods: {
      getScreenHeight() {
        this.screen.minHeight = window.innerHeight - 100 + 'px'
      },
      getFoodDetail() {
        this.$axios.get('/api/admin/getFoodDetail', {
          params: {
            foodId: this.food.foodId
          }
        }).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.data;
            this.food.foodId = data.foodId;
            this.food.foodTypeName = data.foodTypeName;
            this.food.foodName = data.foodName;
            this.food.postUserName = data.postUserName;
            this.food.postDate = data.postDate;
            this.food.content = data.content;
          } else {
            this.$message.error(res.data.data.errMsg);
          }

        }).catch(err => {
          this.$message.error('请求失败...');
        })
        this.load = false;
      },
      goBack() {
        this.$router.back();
      },
      handleClose() {
        this.dialogVisible = false
      },
      deleteFood() {
        this.dialogVisible = true;
      },
      confirmDelete() {
        this.$axios.get('/api/admin/deleteFood', {
          params: {
            foodId: this.food.foodId
          }
        }).then(res => {
          // console.log(res)
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$router.back();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          } else {
            this.$message.error(res.data.data.errMsg);
          }
        }).catch(err => {
          this.$message.error('请求失败...');
        })
        this.dialogVisible = false
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
