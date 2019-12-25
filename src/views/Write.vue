<template>
  <div class="container">
    <TinymceEditor ref="editor"
                   v-model="msg"
                   :disabled="disabled"
    >
    </TinymceEditor>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="refresh">刷新</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>
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
      // onClick (e, editor) {
      //   console.log('Element clicked')
      //   console.log(e)
      //   console.log(editor)
      // },
      refresh () {
        this.$router.go(0)
      },
      // 清空内容
      clear () {
        this.$confirm('确定清空所有内容？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.editor.clear()
          this.$message({
            type: 'success',
            message: '清除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          })
        })

      },
      release () {
        this.$confirm('确定上传当前内容？', '验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
          console.log(this.msg)
          this.$router.push('/foodIllustratedBook')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          })
        })
      }
    },
  }
</script>

<style scoped>

</style>
