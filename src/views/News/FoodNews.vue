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
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!--标签-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <div class="container1">
          <!--列表-->
          <el-row>
            <el-col :span="24" v-for="item in items" :key="item.id">
              <div>
<!--                <div style=" float: left">-->
<!--                  <img :src="item.img" class="image card-img">-->
<!--                </div>-->
                <!--中间-->
                <div style="float: left" >
                  <h3><span @click="itemClick(item.id)">{{item.title}}</span></h3>
                  <div style="float:left;text-align: center">
                    <p class="line-limit-length">{{item.newsDesc}}</p>
                  </div>
                  <div style="padding-top: 30px">
                    <p style="align-content: center">{{item.releaseDate}}</p>
                  </div>
                </div>

                <!--  右边-->
                <div style="float: right">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData4)"
                    type="danger"
                    size="mini"
                  style="color: dodgerblue">
                    删除
                  </el-button>
                </div>
              </div>

            </el-col>
          </el-row>

        </div>
        <!--分页-->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodNews',
    data () {
      return {
        items: [],
        input5:'',
        activeName2:'',
        currentPage4:1,
        pageNo:1,
        pageSize:10
      }
    },
    methods: {
      itemClick (key) {
        this.$router.push({
          path:'/newsDetails',
          query:{
            id:key
          }
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      writeIllustratedBook () {
        this.$router.push('/write')
      },
      detail(){
        this.$router.push('/newsdetails')

      },
      handleClick(){},
      deleteRow(val,data){},

      getNewsList(){
        this.$axios.get('/api/user/getNewsList',{
          params:{
            pageNo:1,
            pageSize:10
          }
        }).then(res=>{
          console.log(res)
          this.items=res.data.data.list;
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
      this.getNewsList();
    }
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
