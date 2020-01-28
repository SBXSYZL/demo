<template>
  <div class="container">
    <!--标题-->
    <div style="width: 100%;margin-top: 15px;margin-bottom: 20px">
      <el-input
        placeholder="请输入食品名称"
        v-model="params.title"
        clearable>
      </el-input>
    </div>
    <!--下拉选择-->
    <div style="width: 100%">
      <el-select v-model="params.foodTypeId" placeholder="请选择食品类型" style="width: 100%">
        <el-option
          v-for="item in foodTypes"
          :key="item.foodTypeId"
          :label="item.foodTypeName"
          :value="item.foodTypeId">
        </el-option>
      </el-select>
    </div>
    <!--富文本-->
    <div>
      <el-tag type="warning">编辑框支持伸缩哦，出现问题请刷新再尝试！</el-tag>
      <TinymceEditor ref="editor"
                     v-model="params.content"
                     :disabled="disabled">
      </TinymceEditor>
      <div style="text-align: center;margin-top: 20px">
        <el-button @click="refresh">刷新</el-button>
        <el-button type="danger" @click="clear">清空</el-button>
        <el-button type="primary" @click="release">发布</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import TinymceEditor from '../../components/Tinymce-editor'

  export default {
    name: 'Write',
    components: {TinymceEditor},
    data() {
      return {
        disabled: false,
        foodTypes: [],
        params: {
          title: '',
          foodTypeId: '',
          content: ''
        }
      }
    }
    ,
    methods: {
      refresh() {
        this.$router.go(0)
      }
      ,
      // 清空内容
      clear() {
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

      }
      ,
      release() {
        this.$confirm('确定上传当前内容？', '验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let p = new URLSearchParams();
          p.append("foodName", this.params.title);
          p.append("foodTypeId", this.params.foodTypeId);
          p.append("content", this.params.content);
          console.log(this.params.title)
          console.log(p)

          this.$axios(
            {
              method: 'post',
              url: '/api/admin/writeFood',
              data: p
            }
          ).then(res => {
            if (res.data.status === 'success' && res.data.data === 'success') {
              this.$message({
                type: 'success',
                message: '上传成功!'
              })
            } else {

              this.$message({
                showClose: true,
                message: '上传失败',
                type: 'error',
                duration: 500
              });

            }
          }).catch(err => {
            console.log(err)
            this.$message({
              showClose: true,
              message: err.data.data.errMsg,
              type: 'error'
            });
          });
          this.$router.push('/foodIllustratedBook')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          })
        })
      }
      ,
      getFoodTypes() {
        this.$axios.get('/api/admin/getFoodTypes', {})
          .then(res => {
            this.foodTypes = res.data.data
          }).catch(err => {
          this.$message.error('获取食品类型失败');
        })
      }
    }
    ,
    activated() {
      this.getFoodTypes();
    }
  }
</script>

<style scoped>

</style>
