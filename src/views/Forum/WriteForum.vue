<template>
  <div class="container">
    <div>
      <div style="float: left;width: 100%">
        <el-page-header @back="goBack"/>
      </div>
      <div style="padding-top: 50px">
        <p style="margin-bottom: 5px;">标题：</p>
        <el-input v-model="title" placeholder="请输入标题" style="width:50%"/>
      </div>
      <div style="margin-top: 10px">
        <p style="margin-bottom: 5px;">事件所在地区：</p>
        <el-cascader
          :options="options2"
          @active-item-change="handleItemChange"
          :props="props"
          v-model="area"
        />
      </div>

    </div>
    <el-tag type="warning" style="margin-top: 10px">编辑框支持伸缩哦，出现问题请刷新再尝试！</el-tag>
    <TinymceEditor ref="editor"
                   v-model="content"
                   :disabled="false">
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
  import VDistpicker from 'v-distpicker'

  export default {
    name: 'WriteForum',
    components: {TinymceEditor,VDistpicker },
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
        articleId: '',
        title: '',
        content: '',
        area: '',
        disabled: false,
        articleTypeId: '',
        articleTypes: [],
        dialogVisible: false,
        articleTypeName: '',
      };
    },
    methods: {
      //地区
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
      //回退
      goBack() {
        this.$confirm("返回将不保存页面信息，是否继续?",'提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          sessionStorage.removeItem('content');
          sessionStorage.removeItem('id');
          sessionStorage.removeItem('title');
          sessionStorage.removeItem('area');
          this.$router.push('/Forum');
        }).catch(()=>{
        });
      },
      //获取修改文章请求信息
      getItem(){
        this.content = sessionStorage.getItem("content")
        this.articleId = sessionStorage.getItem("id")
        this.area = sessionStorage.getItem("area")
        this.title = sessionStorage.getItem("title")
      },
      //获取文章类型
      getArticleType() {
        this.$axios.get('/api/admin/getArticleType')
          .then(res => {
            console.log(res);
            this.articleTypes = res.data.data;
          })
      },
      //发布文章
      releaseConfirm() {
        console.log(123)
        if (this.articleTypeId != null && this.articleTypeId !== '') {
          this.$confirm('确定上传当前内容？', '验证', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            let params = new URLSearchParams();
            params.append("title", this.title);
            params.append("postArea", this.area);
            params.append("article", this.content);
            params.append("articleId",this.articleId);
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
      release() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
      }
    },
    created() {
      this.getArticleType();
      this.getItem();
    }
  }
</script>

<style scoped>

</style>
