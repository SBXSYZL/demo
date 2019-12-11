<template>
  <div>
    <div class="container">
      <h3>食谱</h3>
    </div>
    <div class="container">
      <el-row>
        <el-col :span="5" v-for="item in items" :key="item.id" :offset="1">
          <el-card :body-style="{ padding: '0px' ,margin:'10px'}">
            <img :src="item.img" class="image card-img">
            <div style="padding: 14px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                {{item.summary}}
                <el-button type="text" class="button">了解详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Recipe',
    data () {
      return {
        items: [
          {
            id: 1,
            img: 'http://5b0988e595225.cdn.sohucs.com/images/20190116/bc7e628e4cfc4da7994e8c1cd7d4e77a.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 2,
            img: 'https://storage.googleapis.com/www-cw-com-tw/article/201809/article-5b8ccde368b1a.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'

          },
          {
            id: 3,
            img: 'https://tw.bring-you.info/imgs/2018/11/mukshidonna-4-900x600.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 4,
            img: 'http://img6.16fan.com/attachments/wenzhang/20172/15/148713753043200ge.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },

          {
            id: 1,
            img: 'http://5b0988e595225.cdn.sohucs.com/images/20190116/bc7e628e4cfc4da7994e8c1cd7d4e77a.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 2,
            img: 'https://storage.googleapis.com/www-cw-com-tw/article/201809/article-5b8ccde368b1a.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'

          },
          {
            id: 3,
            img: 'https://tw.bring-you.info/imgs/2018/11/mukshidonna-4-900x600.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 4,
            img: 'http://img6.16fan.com/attachments/wenzhang/20172/15/148713753043200ge.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },

          {
            id: 1,
            img: 'http://5b0988e595225.cdn.sohucs.com/images/20190116/bc7e628e4cfc4da7994e8c1cd7d4e77a.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 2,
            img: 'https://storage.googleapis.com/www-cw-com-tw/article/201809/article-5b8ccde368b1a.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'

          },
          {
            id: 3,
            img: 'https://tw.bring-you.info/imgs/2018/11/mukshidonna-4-900x600.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 4,
            img: 'http://img6.16fan.com/attachments/wenzhang/20172/15/148713753043200ge.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },

          {
            id: 1,
            img: 'http://5b0988e595225.cdn.sohucs.com/images/20190116/bc7e628e4cfc4da7994e8c1cd7d4e77a.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 2,
            img: 'https://storage.googleapis.com/www-cw-com-tw/article/201809/article-5b8ccde368b1a.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'

          },
          {
            id: 3,
            img: 'https://tw.bring-you.info/imgs/2018/11/mukshidonna-4-900x600.jpg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },
          {
            id: 4,
            img: 'http://img6.16fan.com/attachments/wenzhang/20172/15/148713753043200ge.jpeg',
            title: '某条食品资讯',
            summary: '该咨询的摘要...'
          },

        ]
      }
    },
    methods: {}
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
</style>
