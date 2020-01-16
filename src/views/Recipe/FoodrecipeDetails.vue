<template>
  <div class="container">
    <div class="container" v-html="historyMsg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foodrecipedetails',
  data () {
    return {
      historyMsg:
          '<style>'+
            'p{display: inline;}'+
          '</style>'+
          '<div class="hole" style="display:flex;">'+
            '<div class="img">'+
            '<img src="https://s1.st.meishij.net/r/208/102/1025708/s1025708_152645059891511.jpg" width="300px" height="400px" />'+
            '</div>'+
            '<div class="main" style="flex-direction:row;">'+
              '<div class="info-1" style="display: flex;">'+
              '<p class="title" style="max-width: 288px;height: 44px;padding: 38px 0px;line-height: 44px; margin-top: 45px;"><a style="margin-left: 30px;padding: 0;border: 0;font-size: 30px;vertical-align: baseline;background: transparent;">蔓越莓排骨</a></p>'+
              '<span style="margin-top: 60px;margin-left: 200px;font-size: 20px;background-color: antiquewhite;text-align: center;width: 130px;height: 40px;vertical-align: middle;background-color: #ff4400;"><p style="padding:2px;font-size: 20px;color:white;font-weight: bold;">收藏（1001）</p></span>'+
              '<span style="margin-top: 60px;font-size: 20px; background-color: silver;width: 180px;height: 40px;vertical-align: middle;"><p style="margin-left: 20px;padding:2px;font-size: 20px;color:#999;font-weight: bold;">分享到：</p></span>'+
              '</div>'+
              '<div class="info-2" style="flex-direction:column;">'+
              '<ul style="list-style-type: none;margin: 0;padding: 0;overflow: hidden;">'+
                '<li style="float: left;background-color: #4CAF50;margin-left: 20px;width: 65px;height: 40px;border-color: 1px black"><a style="display: block;color: #666;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 15px;font-weight: bold;color: white;" class="active" href="#home">主页</a></li>'+
                '<li style="float: left;background-color: #4CAF50;margin-left: 20px;width: 65px;height: 40px;border-color: 1px black"><a style="display: block;color: #666;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 15px;font-weight: bold;color: white;" href="#news">新闻</a></li>'+
                '<li style="float: left;background-color: #4CAF50;margin-left: 20px;width: 65px;height: 40px;border-color: 1px black"><a style="display: block;color: #666;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 15px;font-weight: bold;color: white;" href="#contact">联系</a></li>'+
                '<li style="float: left;background-color: #4CAF50;margin-left: 20px;width: 65px;height: 40px;border-color: 1px black"><a style="display: block;color: #666;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 15px;font-weight: bold;color: white;" href="#about">关于</a></li>'+
                '<li style="float: left;background-color: #4CAF50;margin-left: 20px;width: 65px;height: 40px;border-color: 1px black"><a style="display: block;color: #666;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 15px;font-weight: bold;color: white;" href="#contact">联系</a></li>'+
                '<li style="float: left;background-color: #4CAF50;margin-left: 20px;width: 65px;height: 40px;border-color: 1px black"><a style="display: block;color: #666;text-align: center;padding: 14px 16px;text-decoration: none;font-size: 15px;font-weight: bold;color: white;" href="#about">关于</a></li>'+
              '</ul>'+
              '</div>'+
              '<div class="info3" style="    border-bottom: 1px solid #eee;overflow: hidden;">'+
              	'<ul class="clearfix">'+
              		'<li style="float: left;height: 58px;border-right: 1px solid #eee;padding: 18px 0px 18px 20px;border-bottom: 1px solid #eee;"><strong style="font-size: 12px;color: #999;line-height: 18px;display: block;height: 18px;">工艺</strong><a id="tongji_gy" href="javascript:;" class="big" style="text-decoration: none;display: block;font-size: 34px;color: #ff3232;font-family: Microsoft Yahei;line-height: 70px;width: 100px;" >蒸</a></li>'+
              		'<li style="float: left;height: 58px;border-right: 1px solid #eee;padding: 18px 0px 18px 20px;border-bottom: 1px solid #eee;"><strong style="font-size: 12px;color: #999;line-height: 18px;display: block;height: 18px;">工艺</strong><a id="tongji_gy" href="javascript:;" class="big" style="text-decoration: none;display: block;font-size: 24px;color: #ff3232;font-family: Microsoft Yahei;line-height: 70px;width: 300px;" >蒸</a></li>'+
              		'<li style="float: left;height: 58px;border-right: 1px solid #eee;padding: 18px 0px 18px 20px;border-bottom: 1px solid #eee;"><strong style="font-size: 12px;color: #999;line-height: 18px;display: block;height: 18px;">工艺</strong><a id="tongji_gy" href="javascript:;" class="big" style="text-decoration: none;display: block;font-size: 24px;color: #ff3232;font-family: Microsoft Yahei;line-height: 70px;width: 300px;" >蒸</a></li>'+

              	'</ul>'+
              	'<ul class="clearfix">'+
              		'<li style="float: left;height: 58px;border-right: 1px solid #eee;padding: 18px 0px 18px 20px;border-bottom: 1px solid #eee;"><strong style="font-size: 12px;color: #999;line-height: 18px;display: block;height: 18px;">工艺</strong><a id="tongji_gy" href="javascript:;" class="big" style="text-decoration: none;display: block;font-size: 34px;color: #ff3232;font-family: Microsoft Yahei;line-height: 70px;width: 100px;" >蒸</a></li>'+
              		'<li style="float: left;height: 58px;border-right: 1px solid #eee;padding: 18px 0px 18px 20px;border-bottom: 1px solid #eee;"><strong style="font-size: 12px;color: #999;line-height: 18px;display: block;height: 18px;">工艺</strong><a id="tongji_gy" href="javascript:;" class="big" style="text-decoration: none;display: block;font-size: 24px;color: #ff3232;font-family: Microsoft Yahei;line-height: 70px;width: 300px;" >蒸</a></li>'+
              		'<li style="float: left;height: 58px;border-right: 1px solid #eee;padding: 18px 0px 18px 20px;border-bottom: 1px solid #eee;"><strong style="font-size: 12px;color: #999;line-height: 18px;display: block;height: 18px;">工艺</strong><a id="tongji_gy" href="javascript:;" class="big" style="text-decoration: none;display: block;font-size: 24px;color: #ff3232;font-family: Microsoft Yahei;line-height: 70px;width: 300px;" >蒸</a></li>		'+
              	'</ul>'+

              '</div>'+

            '</div>'+
          '</div>'+
          '<div class="content2" style="width: 800px;height: 1000px;background-color: antiquewhite; border: 1 black solid;margin-top: 0.625rem;">'+
          	'<h1 >蔓越莓排骨</h1>'+
          	'<hr />'+
            '<div>'+
          	'<p style="color: red;display : inline;font-size: 40px;">1.</p>'+
          	'<p>核桃入微波炉高火1分钟，或烤箱150度烤5-8分钟，放入袋子里用木棒敲成碎末</p>'+
          	'<img style="width: 300px;height: 300px;" src="https://s1.st.meishij.net/rs/156/194/5111156/n5111156_146268786480610.jpg" />'+
            '</div>'+
            '<div>'+
            '<p style="color: red;display : inline;font-size: 40px;">2.</p>'+
            '<p>烤好出炉，散发着核桃和咖啡的清香</p>'+
            '<br>'+
            '<img style="width: 300px;height: 300px;" src="https://s1.st.meishij.net/rs/156/194/5111156/n5111156_146268831439076.jpg" />'+

            '</div>'+
          '</div>'
    }
  }

}

</script>

<style scoped>

</style>
