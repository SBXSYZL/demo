<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>论坛</h3>
      </div>
    </div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <el-tabs type="border-card">
          <el-tab-pane label="审核通过">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
              >
                <el-table-column
                  prop="date"
                  label="日期"
                  sortable
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="作者"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="title"
                  label="标题"
                  :formatter="formatter">
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="checkDetial(scope.$index, scope.row)">查看</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未审核">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
              >
                <el-table-column
                  prop="date"
                  label="日期"
                  sortable
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="作者"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="title"
                  label="标题"
                  :formatter="formatter">
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="info"
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">进入审核</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-tabs>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name:'list',
    data () {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            title: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            title: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            title: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            title: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods: {
        checkDetial (key) {
          this.$router.push('/ForumDetial')
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      }
  };
</script>

<style scoped>

</style>
