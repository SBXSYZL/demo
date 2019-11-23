<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <Sidebar/>
      </el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // @ is an alias to /src

  import Sidebar from '../components/Sidebar'
  import Header from '../components/Header'

  export default {
    name: 'home',
    components: { Header, Sidebar }
  }
</script>
<style>
  .el-header, .el-footer {
    background-color: #535b63;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #535b63;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
