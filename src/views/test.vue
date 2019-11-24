<template>
  <div>
    {{test}}
  </div>
</template>

<script>

  export default {
    name: 'test',
    data () {
      return {
        URL_DEFINE_ROOT: '/local/',
        test: ''
      }
    },
    methods: {
      getTest () {
        this.$axios.get(this.URL_DEFINE_ROOT + 'user/', {}).then(res => {
          console.log(res)
          this.test = res.data.data;
        })
      }
    },
    created () {
      this.getTest()
    }
  }
</script>

<style scoped>

</style>
