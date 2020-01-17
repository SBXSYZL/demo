<template>
  <div class="container">
    <div class="container" v-html="recipe.recipeContent">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Foodrecipedetails',
    data() {
      return {
        historyMsg: '',
        recipe: {
          recipeId: '',
          releaseDate: '',
          viewCnt: '',
          recipeDate: '',
          recipeContent: ''
        }
      }
    },

    methods: {
      getRecipeDetail() {
        let id = this.$route.query.id;
        this.$axios.get('/api/user/getRecipeDetail', {
          params: {
            recipeId: id
          }
        }).then(res => {
          console.log(res);
          let obj = res.data.data;
          this.recipe.recipeId = obj.recipeId;
          this.recipe.recipeDesc = obj.recipeDesc;
          this.recipe.title = obj.title;
          this.recipe.recipeDate = obj.recipeDate;
          this.recipe.recipeContent = obj.recipeContent;
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

</style>
