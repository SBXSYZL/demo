<template>
  <div class="container">
    <div>
      <div style="float: left;width: 100%">
        <el-page-header @back="goBack"/>
      </div>
      <div style="padding-top: 50px">
        <p style="margin-bottom: 5px;">标题：</p>
        <el-input v-model="inputTitle" placeholder="请输入标题" style="width:50%"/>
      </div>
      <div style="margin-top: 10px">
        <p style="margin-bottom: 5px;">事件所在地区：</p>
        <el-cascader
          :options="options2"
          @active-item-change="handleItemChange"
          :props="props"
          v-model="getArea"
        />
      </div>

    </div>
    <el-tag type="warning" style="margin-top: 10px">编辑框支持伸缩哦，出现问题请刷新再尝试！</el-tag>
    <TinymceEditor ref="editor"
                   v-model="article"
                   :disabled="disabled">
    </TinymceEditor>
    <div style="text-align: center;margin-top: 20px;">
      <el-button @click="refresh">刷新</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>


    <!--类型弹窗-->
    <el-dialog
      title="请选择帖子类型"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-radio-group v-model="articleTypeId" v-for="typeItem in articleTypes" :key="typeItem.articleTypeId">
        <el-radio-button :label="typeItem.articleTypeId">{{typeItem.articleTypeName}}</el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="releaseConfirm">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import TinymceEditor from '../../components/Tinymce-editor'
  import QS from 'qs'

  export default {
    name: 'WriteForum',
    components: {TinymceEditor},
    data() {
      return {
        options2: [
          {
            label: '江苏',
            cities: []
          },
          {
            label: '浙江',
            cities: []
          }],
        props: {
          value: 'label',
          children: 'cities'
        },
        inputTitle: '',
        article: '',
        getArea: '',
        disabled: false,
        articleTypeId: '',
        articleTypes: [],
        dialogVisible: false,
        articleTypeName: ''
      };
    },
    methods: {
      handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
      },
      refresh() {
        this.$router.go(0)
      },
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
      },
      goBack() {
        this.$router.push('/Forum');
      },
      release() {
        this.dialogVisible = true;
      },
      releaseConfirm() {
        console.log(123)
        if (this.articleTypeId != null && this.articleTypeId !== '') {
          this.$confirm('确定上传当前内容？', '验证', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            let params = new URLSearchParams();
            params.append("title", this.inputTitle);
            params.append("postArea", this.getArea);
            params.append("articleTypeId", this.articleTypeId);
            params.append("article", this.article);
            this.$axios(
              {
                method: 'post',
                url: '/api/admin/writeArticle',
                data: params
              }
            ).then(res => {
              console.log(res);
              if (res.data.status === 'success' && res.data.data === 'success') {
                this.$message({
                  type: 'success',
                  message: '上传成功!'
                });
                this.$router.push('/Forum')
              } else {
                this.$message.error(res.data.data.errMsg);
              }
            }).catch(err => {
              this.$message.error('上传失败');
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
      getArticleType() {
        this.$axios.get('/api/admin/getArticleType')
          .then(res => {
            console.log(res);
            this.articleTypes = res.data.data;
          })
      },
      // writeArticle() {
      //   this.$axios.get('/api/admin/writeArticle', {
      //     params: {
      //       recipeId: this.recipedetail.recipeId
      //     }
      //   }).then(res => {
      //     let obj = res.data.data
      //
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // },
      handleClose() {
        this.dialogVisible = false;
      }
    },
    created() {
      this.getArticleType();
      // this.writeArticle();
    }
  }
</script>

<style scoped>

</style>
