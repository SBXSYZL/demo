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
      <br /><br />
      <el-table  :data="tableData" :height="height" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
        <el-table-column prop="name" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
        <el-table-column prop="address" label="所在城市" width="180">
        </el-table-column>
        <el-table-column prop="credibility" label="信誉度" width="180" sortable>
        </el-table-column>
        <el-table-column prop="status" label="状态" :filters="[{ text: '正常', value: '正常' }, { text: '封号', value: '封号' }]"
        :filter-method="filterTag" filter-placement="bottom-end">
        </el-table-column>
        <el-table-column prop="status" label="操作" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.tag === '封禁' ? 'danger' : 'success'"
              @click="handleDelete(scope.$index, scope.row)"
              disable-transitions
              >{{ scope.row.tag }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br /><br />
      <el-pagination
        background
        layout="total,->,prev, pager, next, jumper"
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
      height: document.body.scrollHeight - 400,
      tableData: [{
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
      }, {
        id: '2',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 50,
        tag: '封禁'
      }, {
        id: '3',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '封号',
        credibility: 100,
        tag: '解封'
      }, {
        id: '4',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
      }, {
        id: '4',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '封号',
        credibility: 100,
        tag: '解封'
      }, {
        id: '5',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
      }, {
        id: '6',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '封号',
        credibility: 100,
        tag: '解封'
      }, {
        id: '1',
        name: '王小虎',
        sex: '男',
        address: '上海市',
        status: '正常',
        credibility: 100,
        tag: '封禁'
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
    goBack () {
      this.$router.push('/userManage');
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    filterTag(value, row) {
        return row.status === value;
    },
  }
}
</script>
