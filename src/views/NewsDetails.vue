<template>
  <div>
    <div class="container">
      <h1 style="text-align: center">新闻标题</h1>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewsDetails'
  }
</script>

<style scoped>

</style>
