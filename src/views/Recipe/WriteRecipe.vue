<template>
  <div class="container">
    <div>
      <div style="margin: 10px;">
        <p style="margin-bottom: 5px;">标题：</p>
        <el-input  v-model="inputTitle" placeholder="请输入标题"></el-input>
      </div>

      <div style="margin: 10px">
        <p style="margin-bottom: 5px;">摘要：</p>
        <el-input  type="textarea" :rows="4" v-model="inputDesc" placeholder="请输入摘要"></el-input>
      </div>


    </div>
    <el-tag type="warning">编辑框支持伸缩哦，出现问题请刷新再尝试！</el-tag>
    <TinymceEditor ref="editor"
                   v-model="content"
                   :disabled="disabled">
    </TinymceEditor>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="refresh">刷新</el-button>
      <el-button type="danger" @click="clear">清空</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>




    <el-dialog
      title="请选择菜谱类型"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
        <el-radio-group v-model="typeId" v-for="typeItem in recipeTypes" :key="typeItem.recipeTypeId">
          <el-radio-button :label="typeItem.recipeTypeId">{{typeItem.recipeTypeName}}</el-radio-button>
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

  export default {
    name: 'WriteRecipe',
    components: { TinymceEditor },
    data () {
      return {
        inputTitle: '',
        inputDesc:'',
        content: '',
        disabled: false,
        typeId: '',
        recipeTypes:[],
        dialogVisible:false
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
        this.dialogVisible=true;
      },
      releaseConfirm(){
        console.log(123)
          if(this.typeId != null && this.typeId !== ''){
            this.$confirm('确定上传当前内容？', '验证', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {

              this.$axios.get('/api/admin/writeRecipe',{
                params:{
                  title:this.inputTitle,
                  recipeDesc:this.inputDesc,
                  recipeTypeId:this.typeId,
                  content:this.content
                }
              }).then(res=>{
                console.log(res)
                if (res.data.status==='success'&&res.data.data==='success'){
                  this.$message({
                    type: 'success',
                    message: '上传成功!'
                  })
                  this.$router.push('/Recipe')
                }else{
                  this.$message.error(res.data.data.errMsg);
                }
              }).catch(err=>{
                this.$message.error('不知道啥原因上传失败...');
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消上传'
              })
            });
            this.dialogVisible=false;
          }
      },
      getRecipeTypes(){
        this.$axios.get('/api/admin/getRecipeTypes')
          .then(res=>{
            console.log(res);
            this.recipeTypes=res.data.data;
        })
      },
      writeRecipe() {
        this.$axios.get('/api/admin/writeRecipe', {
          params: {
            recipeId: this.recipedetail.recipeId
          }
        }).then(res => {
          let obj = res.data.data

        }).catch(err => {
          console.log(err)
        })
      },
      handleClose(){
        this.dialogVisible=false;
      }
    },
    created () {
      this.getRecipeTypes();
    }
  }
</script>

<style scoped>

</style>
