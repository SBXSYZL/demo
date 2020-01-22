<template>
  <div>
    <div class="container">
      <el-page-header @back="goBack" content="权限管理"> </el-page-header>
    </div>
    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div v-loading="loading">
        <el-table :data="tableData" :height="height" border style="width: 100%">
          <el-table-column
            prop="userId"
            label="用户ID"
            width="180"
          ></el-table-column>
          <el-table-column prop="nickName" label="昵称" width="180">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="180">
          </el-table-column>
          <el-table-column prop="city" label="所在城市" width="180">
          </el-table-column>
          <el-table-column
            prop="credibility"
            label="信誉度"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="authority"
            label="状态"
            :filters="[
              { text: '正常', value: '正常' },
              { text: '封号', value: '封号' }
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
          </el-table-column>
          <el-table-column prop="tag" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.tag === '封禁' ? 'danger' : 'success'"
                @click="handleDelete(scope.$index, scope.row)"
                disable-transitions
                >{{ scope.row.tag }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :total="rows"
          :page-size="pageSize"
          layout="total,->,prev, pager, next, jumper"
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
      loading: true,
      turn: true,
      rows: 1,
      pageNo: 1,
      pageSize: 1,
      height: document.body.clientHeight - 400 <= 100 ? 100 : document.body.clientHeight - 400,
      tableData: []
    }
  },
  mounted () {
    this.$axios.get('/api/admin/getUserList', {
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
          }
          else if (list[i].gender == '0') {
            list[i].gender = '女';
          }
          if (list[i].authority == '1') {
            list[i].authority = '封号';
            list[i].tag = '解封';
          }
          else if (list[i].authority == '0') {
            list[i].authority = '正常';
            list[i].tag = '封禁';
          }
        }

        this.rows = res.data.data.pageCount
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
        }
        else {
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
    }
  },
  methods: {
    goBack () {
      this.$destroy();
      this.$router.push('/userManage');
    },

    handleDelete (index, row) {
      this.open();
      console.log(index, row);
    },

    filterTag (value, row) {
      return row.status === value;
    },

    success () {
      this.$notify({
        title: '成功',
        message: '本次操作xxxx秒后生效',
        type: 'success'
      });
    },

    error () {
      this.$notify.error({
        title: '错误',
        message: '发现未知错误'
      });
    },

    open () {
      this.$confirm('即将对用户进行封禁操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.success();
      }).catch(() => {
        this.$message({
          showClose: true,
          offset: 50,
          type: 'info',
          message: '已取消'
        });
      });
    },

    handleCurrentChange (val) {
      this.loading = true;
      this.$axios.get('http://localhost:8088/admin/getUserList', {
        params: {
          "pageNo": val,
          "pageSize": this.pageSize
        },
      }).then(res => {
        setTimeout(() => {
          this.loading = false;
          let list = res.data.data.list
          for (let i in list) {
            if (list[i].gender == '1') {
              list[i].gender = '男';
            }
            else if (list[i].gender == '0') {
              list[i].gender = '女';
            }
            if (list[i].authority == '1') {
              list[i].authority = '封号';
              list[i].tag = '解封';
            }
            else if (list[i].authority == '0') {
              list[i].authority = '正常';
              list[i].tag = '封禁';
            }
          }
          this.rows = res.data.data.pageCount;
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
