<template>
  <div class="container">
    <div class="container" v-html="historyMsg">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBookDetail',
    data() {
      return {
        historyMsg: ''

      }
    }
  }

</script>

<style scoped>

</style>
