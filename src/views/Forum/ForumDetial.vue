<template>
  <div>
    <div class="container" v-html="historyMsg">

    </div>
  </div>

</template>

<script>
  export default {
    name: 'ForumDetial',
    data () {
      return {
        historyMsg: '<div style="display: flex">' +
          '<div style="width: 80%" align="center">' +
          '<h1 align="center">标题</h1><br><hr/>' +
          '<div style="padding: 10px">' +
          '<p align="center">作者：</p>' +
          '<p align="center">发布时间：</p>' +
          '《每日经济新闻》记者了解到，此次会议对于今年交通运输工作作出全面总结。会议披露，预计2019年全年完成交通固定资产投资32135亿元，预计新增铁路8000公里、公路33万公里，高等级航道385公里、民用运输机场5个，邮政快递服务网点和智能投递终端建设加快。北京大兴国际机场正式投运；实现上海、南京、杭州等主要城市间1.5小时快速通达。' +
          '记者还注意到，在社会高度关注的2020年交通基础设施投资建设情况方面，此次会议明确，2020年，交通运输将完成铁路投资8000亿元，公路水路投资1.8万亿元，民航投资900亿元。在2019年实现具备条件的乡镇和建制村通硬化路基础上，2020年实现具备条件的乡镇和建制村通客车。集装箱铁水联运量增长12%以上。乡镇快递网点覆盖率达到98%。全面完成“十三五”规划各项目标任务。' +
          '</div>' +
          '</div>'+
          '</div><el-button type="success" plain>成功按钮</el-button>'

      }
    }
  }
</script>

