<template>
  <div class="container">
    <div>
      <div style="float: left;width: 100%">
        <el-page-header @back="goBack"/>
      </div>
      <div style="margin: 10px;">
        <p style="margin-bottom: 5px;">标题：</p>
        <el-input v-model="inputTitle" placeholder="请输入标题" />
      </div>

      <div style="margin: 10px">
        <p style="margin-bottom: 5px;">摘要：</p>
        <el-input
          type="textarea"
          :rows="4"
          v-model="inputDesc"
          placeholder="请输入摘要"
        />
      </div>
    </div>
    <el-tag type="warning">编辑框支持伸缩哦，出现问题请刷新再尝试！</el-tag>
    <TinymceEditor ref="editor" v-model="content" :disabled="disabled">
    </TinymceEditor>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="refresh">刷新</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>

    <el-dialog
      title="是否发布"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="releaseConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from '../../components/Tinymce-editor'

export default {
  name: "WriteNews",
  components: { TinymceEditor },
  data () {
    return {
      inputTitle: '',
      inputDesc: '',
      content: '',
      disabled: false,
      title: '',
      newsId: '',
      dialogVisible: false
    }
  },
  methods: {
    //刷新
    refresh () {
      this.$router.go(0)
    },
    //返回
      goBack() {
        this.$confirm("返回将不保存页面信息，是否继续?",'提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          sessionStorage.removeItem('content');
          sessionStorage.removeItem('newsId');
          sessionStorage.removeItem('title');
          sessionStorage.removeItem('content');
          this.$router.push('/FoodNews');
        }).catch(()=>{
        });
      },
    //获取修改文章请求信息
    getItem(){
      this.content = sessionStorage.getItem("content")     //文章内容
      this.newsId = sessionStorage.getItem("id")           //文章id
      this.inputDesc = sessionStorage.getItem("newsDesc")   //文章摘要
      this.inputTitle = sessionStorage.getItem("title")    //文章标题
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
    //发布
    release () {
      this.dialogVisible = true;
    },
    releaseConfirm () {
      console.log(123)
      if (this.title != null) {
        this.$confirm('确定上传当前内容？', '验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("title", this.inputTitle);
          params.append("newsDesc", this.inputDesc);
          params.append("content", this.content)
          this.$axios({
            method: 'post',
            url: '/api/admin/writeNews',
            data: params
          }).then(res => {
            console.log(res);
            if (res.data.status === 'success' && res.data.data === 'success') {
              this.$message({
                type: 'success',
                message: '上传成功!'
              });
              this.$router.push('/FoodNews')
            } else {
              this.$message.error(res.data.data.errMsg);
            }
          }).catch(err => {
            this.$message.error('不知道啥原因上传失败...');
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          })
        });
        this.dialogVisible = false;
      }
    },
    // writeNews() {
    //   this.$axios.get('/api/admin/writeNews', {
    //     params: {
    //       newsId: this.NewsDetails.newsId
    //     }
    //   }).then(res => {
    //     let obj = res.data.data
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    handleClose () {
      this.dialogVisible = false;
    }
  },
  activated() {
   // this.writeNews();
   this.getItem();
  }
}
</script>
<style scoped>
</style>
