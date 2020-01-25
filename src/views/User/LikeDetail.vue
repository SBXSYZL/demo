<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div v-if="empty">
      <div class="container nopadding">
        <el-row>
          <el-col :span="16" :offset="4">
            <span>收藏都没有，我太难了！！！</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <span>(╯‵□′)╯︵┻━┻</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else>
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="i in count" class="list-item" :key="i">
          <div class="container">收藏:{{ i }}</div>
        </li>
      </ul>
      <div v-if="loading">
        <div class="container nopadding">
          <el-row>
            <el-col :span="16" :offset="4">
              <span>努力加载中... \ (^o^) /~</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="noMore">
        <div class="container nopadding">
          <el-row>
            <el-col :span="16" :offset="4">
              <span>没有更多了 ╭ (╯^╰) ╮</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      empty: true,
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>