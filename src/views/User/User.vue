<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>用户管理</h3>
      </div>
      <el-button type="primary" round @click="roleClick">权限管理</el-button>
    </div>
    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div v-loading="loading">
        <el-table
          :data="tableData"
          :height="height"
          border
          style="width: 100%"
          @row-click="infoClick"
        >
          <el-table-column prop="userId" label="用户ID" width="180">
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" width="180">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="180">
          </el-table-column>
          <el-table-column prop="city" label="所在城市" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="手机号" width="180">
          </el-table-column>
          <el-table-column prop="credibility" label="信誉度"></el-table-column>
        </el-table>
        <br />
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="rows"
          layout="total, ->, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      rows: 1,
      pageNo: 1,
      pageSize: 1,
      height: document.body.clientHeight - 400 <= 100 ? 100 : document.body.clientHeight - 400,
      loading: true,
      tableData: []
    }
  },
  mounted () {
    this.$axios.get('http://localhost:8088/admin/getUserList', {
      params: {
        "pageNo": this.pageNo,
        "pageSize": this.pageSize
      },
    }).then(res => {
      setTimeout(() => {
        this.loading = false;

        let list = res.data.data.list
        for (let i in list) {
          if (list[i].gender == '1') {
            list[i].gender = '男';
          } else if (list[i].gender == '0') {
            list[i].gender = '女';
          }
        }

        this.rows = res.data.data.pageCount;
        this.tableData = list;
      }, 500)

    }).catch(err => {
      setTimeout(() => {
        this.loading = false;
      }, 500)
      //console.log(err);
    })

    window.onresize = () => {
      return (() => {
        if (document.body.scrollHeight - 400 >= 100) {
          this.height = document.body.scrollHeight - 400;
        } else {
          this.height = 100;
        }
      })()
    }
  },
  watch: {
    height (val) {
      if (!this.timer) {
        this.height = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    },
  },
  methods: {
    roleClick () {
      this.$destroy();
      this.$router.push('/roleManage');
    },
    infoClick (row, event, column) {
      //this.$router.push({ name: 'userInfo', params: { userId: row.userId } });
      this.$router.push('/userInfo/' + row.userId);
    },
    handleCurrentChange (val) {
      this.loading = true;
      this.$axios.get('http://localhost:8088/admin/getUserList', {
        params: {
          "pageNo": val,
          "pageSize": this.pageSize
        }
      }).then(res => {
        setTimeout(() => {
          this.loading = false;
          let list = res.data.data.list
          for (let i in list) {
            if (list[i].gender == '1') {
              list[i].gender = '男';
            } else if (list[i].gender == '0') {
              list[i].gender = '女';
            }
          }
          this.rows = res.data.data.pageRows;
          this.tableData = list;
        }, 200)
      }).catch(err => {
        setTimeout(() => {
          this.loading = false;
        }, 200)
        //console.log(err);
      })
    }
  }
}
</script>
