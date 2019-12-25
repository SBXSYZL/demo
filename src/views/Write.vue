<template>
  <div class="container">
    <TinymceEditor ref="editor"
                   v-model="msg"
                   :disabled="disabled"
                   @onClick="onClick">
    </TinymceEditor>
    <div style="text-align: center;margin-top: 20px">
      <el-button type="danger" @click="clear">清空</el-button>
      <el-button type="primary">发布</el-button>
    </div>
    <!--    <button @click="clear">清空内容</button>-->
    <!--    <button @click="disabled = true">禁用</button>-->
  </div>
</template>

<script>
  import TinymceEditor from '../components/Tinymce-editor'

  export default {
    name: 'Write',
    components: { TinymceEditor },
    data () {
      return {
        msg: '',
        disabled: false
      }
    },
    methods: {
      // 鼠标单击的事件
      onClick (e, editor) {
        console.log('Element clicked')
        console.log(e)
        console.log(editor)
      },
      // 清空内容
      clear () {
        this.$refs.editor.clear()
      }
    }
  }
</script>

<style scoped>

</style>
