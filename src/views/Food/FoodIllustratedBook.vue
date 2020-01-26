<template>
  <div :style="getScreenHeight">
    <div class="container" style="display: flex;min-height: 20%">
      <div style="width: 90%">
        <h3>食品图鉴</h3>
      </div>
      <div>

        <el-button type="primary" icon="el-icon-edit" @click="writeIllustratedBook">添加图鉴</el-button>
      </div>

    </div>
    <div class="container" style="min-height: 80%">
      <!--搜索框-->
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"/>
        </el-input>
      </div>
      <!--选项-->
      <div style="display: flex;margin-left: 85%">
        <el-select v-model="selectedItem" placeholder="请选择" @change="selectChange">
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
      <div v-loading="load" style="margin-top: 10px">
        <el-row>
          <el-col :span="5" v-for="item in foodList" :key="item.foodId">
            <el-card :body-style="{ padding: '0px' }" @click.native="itemClick(item.foodId)">
              <img :src=item.foodPreviewImg class="image">
              <div style="padding: 14px;">
                <span>{{item.foodName}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{item.content}}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
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
        searchKey: '',
        currentPage: 1,
        foodTypes: [],
        selectedItem: '',
        currentDate: new Date(),
        pageNo: 1,
        pageSize: 10,
        total: 0,
        foodList: [],
        load: true
      }
    },
    methods: {
      getScreenHeight() {
        this.screen.height = window.innerHeight - 50 + 'px';
        console.log(this.screen.height)
      },
      itemClick(id) {
        console.log(id)
        this.$router.push({
          path: '/foodIllustratedBookDetail',
          query: {
            id: id
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
        this.$router.push('/writeFood')
      },
      getFoodTypes() {
        this.$axios.get('/api/admin/getFoodTypes')
          .then(res => {
            this.foodTypes = res.data.data;
            this.selectedItem = this.foodTypes[0].foodTypeId;
            this.getFoodList();
          }).catch(err => {
          console.log(err)
        })
      },
      getFoodList() {
        let that = this;
        let foodTypeId = null;
        foodTypeId = that.selectedItem;
        console.log(that.selectedItem);
        this.$axios.get('/api/admin/getFoodList', {
          params: {
            foodTypeId: foodTypeId,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          console.log(res);
          this.foodList = res.data.data.list;
          this.total = res.data.data.pageRows;
          this.load = false;
        }).catch(err => {
          this.load = false;
          this.$message.error('加载失败...');
        })
      },
      selectChange() {
        this.getFoodList();
      }
    },
    created() {
      this.getFoodTypes();
      this.getScreenHeight();
    }
  }
</script>

<style scoped>
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
