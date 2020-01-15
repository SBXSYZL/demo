<template>
  <div style="height:100%;width: 100%">
    <div style="height: 100%" class="bg-img">
      <div style="height:100%;display: flex;align-items: center;" class="bg">
        <div class="img-card" style="display: flex;flex-direction: column;justify-content: center">
          <div style="text-align: center;align-content: center;align-items: center">
            <!--            <img src="../assets/hamburger.50e4091.png"/>-->
            <h1><span style="color: #ffffff;">为了您和您家人的健康</span></h1>
            <h3><span style="color: #00ff00;">--请多关注绿色食品</span></h3>
          </div>

        </div>
        <div class="container login-card">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
              <el-input v-model="form.account" style="width: 320px" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item align="center">
              <el-button style="width: 80%" type="primary" @click="Login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        form: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      Login () {
        this.$router.replace('foodNews')
      }
    }
  }
</script>

<style scoped>
  .bg-img {
    background-image: url("../../assets/test1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .img-card {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .login-card {
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    margin: 50px;
  }

  .bg {
    background-color: rgba(0, 0, 0, 0.7);

  }


</style>
