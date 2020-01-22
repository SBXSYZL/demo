<template>
  <div>
    <div class="container" style="display: flex;">
      <div style="width: 90%">
        <h3>食品图鉴</h3>
      </div>
      <div>

        <el-button type="primary" icon="el-icon-edit" @click="writeIllustratedBook">添加图鉴</el-button>
      </div>

    </div>
    <div class="container">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"/>
        </el-input>
      </div>

      <div style="display: flex;margin-left: 85%">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in foodTypes"
            :key="item.foodTypeId"
            :label="item.foodTypeName"
            :value="item.foodTypeName">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBook',
    data() {
      return {
        searchKey: '',
        currentPage4: 1,
        foodTypes: [],

      }
    },
    methods: {
      itemClick(key) {
        this.$router.push('/foodIllustratedBookDetail')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      writeIllustratedBook() {
        this.$router.push('/write')
      },
      getFoodTypes() {
        this.$axios.get('/api/admin/getFoodTypes')
          .then(res => {
            console.log(res)
            this.foodTypes = res.data.data
          }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      this.getFoodTypes();
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
