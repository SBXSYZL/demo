<template>
  <div class="container">
    <div class="container">
      <p>食谱详情getRecipeDetail</p>
      {{recipedetail.recipeId}}
      <div>{{recipedetail.postUserId}}</div>
      <div>{{recipedetail.recipeDesc}}</div>
      <div>{{recipedetail.recipeDate}}</div>
      <div>{{recipedetail.recipeTypeId}}</div>
      <div>{{recipedetail.title}}</div>
      <div>{{recipedetail.recipeContent}}</div>
      <div>{{recipedetail.status}}</div>
      <div>{{recipedetail.viewCnt}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foodrecipedetails',
  data () {
    return {
      historyMsg: '',
      input5: '',
      recipedetail: {
        recipeId: '',
        postUserId:'',
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
    getRecipeDetail () {
      this.$axios.get('/api/user/getRecipeDetail', {
        params: {
          recipeId: 1
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
    }


  },
  created () {
    this.getRecipeDetail()
  }

}

</script>

<style scoped>

</style>
