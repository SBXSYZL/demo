<template>
  <div :style="getScreenHeight">
    <div class="container" style="display: flex;min-height: 20%">
      <div style="width: 90%">
        <h3>食品图鉴</h3>
      </div>
      <div style="display:flex">
        <el-button type="primary" plain @click="foodTypeManage">食品类型管理</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="writeIllustratedBook">添加图鉴</el-button>
      </div>
    </div>
    <div class="container" style="min-height: 80%">
      <!--搜索框-->
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="searchStatus.searchKey" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"/>
        </el-input>
      </div>
      <!--选项-->
      <div style="display: flex;margin-left: 85%">
        <el-button style="margin-right:10px " @click="refresh">刷新</el-button>
        <el-select v-model="params.foodTypeId" placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in foodTypes"
            :key="item.foodTypeId"
            :label="item.foodTypeName"
            :value="item.foodTypeId"
            @change="getFoodList">
          </el-option>
        </el-select>
      </div>
      <hr style="margin: 5px">
      <!--卡片-->
      <div v-loading="load" style="margin-top: 10px;">
        <el-row>
          <el-col :span="5" v-for="item in foodList" :key="item.foodId" style="margin: 10px">
            <el-card :body-style="{ padding: '0px',minHeight:'300px',marginTop:'5px',margin:'5px'}"
                     @click.native="itemClick(item.foodId)">
              <img :src=item.foodPreviewImg class="image" height="220" alt="">
              <div style="padding: 14px;">
                <span>{{item.foodName}}</span>
                <div class="bottom clearfix">
                  <time class="time line-limit-length">{{item.content}}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-pagination
          style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBook',
    data() {
      return {
        screen: {
          height: 0
        },
        searchStatus: {
          isSearch: false,
          searchKey: ''
        },
        foodTypes: [],
        total: 0,
        foodList: [],
        load: true,
        params: {
          foodTypeId: -1,
          pageNo: 1,
          pageSize: 10,
          searchKey: ''
        }
      }
    },
    methods: {
      //获取屏幕高度
      getScreenHeight() {
        this.screen.height = window.innerHeight - 50 + 'px';
      },
      //卡片点击事件
      itemClick(id) {
        this.$router.push({
          path: '/foodIllustratedBookDetail',
          query: {
            id: id
          },
          meta: {
            keepAlive: false
          }
        })
      },
      //页面数据量变化事件
      handleSizeChange(pageSize) {
        this.params.pageNo = 1;
        this.params.pageSize = pageSize;
        this.getFoodList()
      },
      //页面变化事件
      handleCurrentChange(pageNo) {
        this.params.pageNo = pageNo;
        this.getFoodList()
      },
      //编写食品图鉴
      writeIllustratedBook() {
        this.$router.push('/writeFood')
      },
      //获取所有食品类型
      getFoodTypes() {
        this.$axios.get('/api/admin/getFoodTypes')
          .then(res => {
            this.foodTypes = res.data.data;
            if (this.foodTypes.length > 0) {
              this.params.foodTypeId = this.foodTypes[0].foodTypeId;
              this.getFoodList();
            } else {
              this.load = false
            }
          }).catch(err => {
          this.$message.error(err.data.data.errMsg);
        })
      },
      //获取食品图鉴列表
      getFoodList() {
        this.load = true;
        let url = '';
        if (!this.searchStatus.isSearch) {
          url = '/api/admin/getFoodList';
        } else {
          url = '/api/admin/searchFoodList'
          this.params.searchKey = this.searchStatus.searchKey;
        }
        this.$axios.get(url, {params: this.params})
          .then(res => {
            // console.log(res);
            this.foodList = res.data.data.list;
            //去除html标记
            try {
              for (let i in this.foodList) {
                this.foodList[i].content = this.foodList[i].content.replace(/<\/?.+?\/?>/g, "")
              }
            } catch (exception) {
              // console.log(exception.toString())
            }

            this.total = res.data.data.pageRows;
            this.load = false;
          })
          .catch(err => {
            this.load = false;
            // console.log("err", err)
            // this.$message.error(err.data.data.errMsg);
          })
      },
      //搜索
      search() {

        if (this.searchStatus.searchKey.length > 0) {
          this.searchStatus.isSearch = true;
          this.getFoodList();
        } else {
          this.$notify({
            title: '警告',
            message: '请输入搜索内容',
            type: 'warning',
            duration: 1000
          });
        }

      },
      //选项切换
      selectChange() {
        this.getFoodList();
      },
      //刷新页面
      refresh() {
        this.getFoodList();
      },
      foodTypeManage() {
        this.$router.push('/foodTypeManage')
      }
    },
    created() {
      this.getFoodTypes();
      this.getScreenHeight();
    }

  }
</script>

<style scoped>
  .line-limit-length {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card-img {
    height: 250px;
    width: 250px;
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
