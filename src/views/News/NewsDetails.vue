<template>
  <div class="container" v-html="news">
  </div>

</template>

<script>
  export default {
    name: 'NewsDetails',
    data() {
      return {
        news: "<p><strong>asdaddsdfdsfa</strong></p> <p>dsjaknfjdshbfkjnksdhfshfkjncvkjs<img src=\"http://39.98.110.191:8088/20200114/20200114231819111.jpg\" alt=\"\" width=\"557\" height=\"185\" /></p> <p><img src=\"http://39.98.110.191:8088/20200114/20200114231819073.jpg\" alt=\"\" width=\"1061\" height=\"726\" /></p> <p>sdndjfhsdkjhsjkdfjks</p> <p>&nbsp;</p>"
      }
    },
    methods:{
      
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
