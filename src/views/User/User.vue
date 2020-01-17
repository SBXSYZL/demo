<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>用户管理</h3>
      </div>
    </div>
    <div v-if="turn" class="container">
      <el-button type="primary" round @click="roleClick">权限管理</el-button>
      <br /><br />
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" :height="height" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
        <el-table-column prop="address" label="所在城市" width="180">
        </el-table-column>
        <el-table-column prop="tel" label="手机号" width="180">
        </el-table-column>
        <el-table-column prop="credibility" label="信誉度"> </el-table-column>
      </el-table>
      <br /><br />
      <el-pagination
        background
        layout="total, ->, prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      turn: true,
      height: document.body.scrollHeight - 450,
      tableData: [{
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '2',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '3',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '4',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '4',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '5',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '6',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        tel: '12345678910',
        credibility: 100
      }]
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.height = document.body.scrollHeight - 450;
        console.log(this.height);
      })()
    }
  },
  methods: {
    roleClick () {
      this.$router.push('/roleManage');
    },
  }
}
</script>