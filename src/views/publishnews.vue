<template>
  <div class="">
    <el-form :model="Form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="Form.title"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-input
        type="text"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="text">
      </el-input>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "punlishnews",
    data(){
      return{
        form:{
          title: '',
          date1: '',
        }

      }
    },
    methods:{
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>
