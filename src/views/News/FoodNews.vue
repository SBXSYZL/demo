<template>
  <div>
    <div class="container" style="display: flex">
      <div style="width: 90%">
        <h3>食品资讯</h3>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit" style="float: right" @click="writeIllustratedBook">添加资讯</el-button>
      </div>
    </div>

    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">{{input.searchKey}}
          <el-button slot="append" icon="el-icon-search" @click="searchNews"/>
        </el-input>
      </div>
      <!--标签-->
      <div>
        <el-table
          :data="items"
          style="width: 100%"
          @row-click="itemClick"
        >
          <el-table-column style="width: 80%;position: absolute;">
            <template slot-scope="scope" >
              <div style="height: 100px; margin: 15px;">
                <div style="width: 100%; ">
                  <h2 >{{scope.row.title}}</h2>
                  <div style="margin-top:10px;">{{scope.row.newsDesc}}</div>
                  <div style="position: absolute;bottom: 0;" >
                    <p>{{scope.row.releaseDate}} </p>
                  </div>


                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column style="width: 180px" width="180px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deletenew(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
<!--    分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'FoodNews',
    data () {
      return {
        items: [],
        pageNo:1,
        pageSize:10,
        input:''

      }
    },
    methods: {
      itemClick(obj) {
        // this.$router.push('/Foodrecipedetails')
        this.$router.push({
          path: '/NewsDetails',
          query: {
            id:obj.newsId
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      writeIllustratedBook() {
        this.$router.push('/WriteNews')
      },
      searchNews(){
        this.$router.push('')
      },
      handleClick() {
      },
      deletenew(row) {
        if(window.confirm("是否确定删除？")) {
          this.items.splice(row, 1)
        }
      },

      getNewsList() {

        this.$axios.get('/api/user/getNewsList', {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          console.log(res)
          this.items = res.data.data.list;
        }).catch(err => {
          console.log(err)
        })
      },
      getSearchNews() {
        this.$axios.get('/api/user/searchNews', {
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            searchKey: this.input
          }
        }).then(res => {
          console.log(res)
          this.input = res.data.data.list;
        }).catch(err => {
          console.log(err)
        })
      },
      getDeleteNews(){
        this.$axios.get('/api/user/deleteNews',{
          "params":{
            "newsId":1
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getWriteNews(){
        this.$axios.get('/api/user/WriteNews',{
          params:{
            content:'adadad',
            newsDesc:'ada',
            title:a,
          }
        }).then(res => {
          console.log(res)
          this.items = res.data.data.list;
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      // this.$router.go(0);
      this.getNewsList();
    },

  }

</script>

<style scoped>
  .el-row {
    margin-bottom: 30px;
    height: 5%;
  }

  .el-col {
    border-radius: 14px;
  }

  .card-img {
    width: 200px;
    height: 200px;
  }

  . image {
    width: auto;
    height: 50px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .line-limit-length {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
