<template>
  <div class="container" style="height: 100%;position: absolute">
    <div>
      <el-page-header @back="goBack"/>
      <el-button type="danger" @click="collectRecipe()">收藏</el-button>
    </div>
    <div style="height: auto">
      <p>食谱详情getRecipeDetail</p>
      <div class="recipeId">
        <p class="p1">recipeId:{{recipedetail.recipeId}}</p>
        <p class="p2">{{recipedetail.recipeDate}}</p>
      </div>

      <div class="postuserid">
        <p class="p1">postUserId:{{recipedetail.postUserId}}</p>

      </div>
      <div>
        <p class="p1">recipeDesc:{{recipedetail.recipeDesc}}</p>
      </div>
      <div>{{recipedetail.recipeTypeId}}</div>
      <div>{{recipedetail.title}}</div>
      <div v-html="recipedetail.recipeContent"></div>
      <div>{{recipedetail.status}}</div>
      <div>{{recipedetail.viewCnt}}</div>

    </div>
    <div style="float: right;margin:20px;bottom: 0">
      <el-button type="danger" @click="evalRecipe(1)">喜欢</el-button>
      <el-button type="danger" @click="evalRecipe(0)">不喜欢</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Foodrecipedetails',
    data() {
      return {
        recipedetail: {
          recipeId: '',
          postUserId: '',
          recipeDesc: '',
          recipeDate: '',
          recipeTypeId: '',
          title: '',
          recipeContent: '',
          status: '',
          viewCnt: '',
        }
      }
    },

    methods: {
      goBack () {
        this.$router.push('/Recipe');
      },
      getRecipeDetail() {
        let id = this.$route.query.id;
        console.log(id)
        this.$axios.get('/api/admin/getRecipeDetail', {
          params: {
            recipeId: id
          }
        }).then(res => {
          let obj = res.data.data
          this.recipedetail.recipeId = obj.recipeId
          this.recipedetail.postUserId = obj.postUserId
          this.recipedetail.recipeDesc = obj.recipeDesc
          this.recipedetail.recipeDate = obj.recipeDate
          this.recipedetail.recipeTypeId = obj.recipeTypeId
          this.recipedetail.title = obj.title
          this.recipedetail.recipeContent = obj.recipeContent
          this.recipedetail.status = obj.status
          this.recipedetail.viewCnt = obj.viewCnt
        }).catch(err => {
          console.log(err)
        })
      },
      evalRecipe(key) {
        this.$axios.get('/api/admin/evalRecipe', {
          params: {
            eva: key,
            recipeId: this.recipedetail.recipeId
          }
        }).then(res => {
          let obj = res.data.data
          if (res.data.status === 'success' && res.data.data === 'success') {
            this.$message({
              message: '评价成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.data.errMsg,
              type: 'warning'
            });
          }


        }).catch(err => {
          console.log(err)
        })
      },
      collectRecipe() {
        this.$axios.get('/api/admin/collectRecipe', {
          params: {
            recipeId: this.recipedetail.recipeId
          }
        }).then(res => {
          let obj = res.data.data

        }).catch(err => {
          console.log(err)
        })
      }


    },
    created() {
      this.getRecipeDetail()
    }

  }

</script>

<style scoped>
  .recipeId{
    display: flex;

  }
  .p1{
       size: 40px;
       color: #1a1a1a;
       font-weight: bold;

     }
  .p2{
    size: 40px;
    color: #1a1a1a;
    font-weight: bold;
    margin-left: 1000px;
  }
</style>
