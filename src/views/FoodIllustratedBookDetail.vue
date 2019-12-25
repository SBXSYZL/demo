<template>
  <div class="container">
    <div class="container">
      <div style="display: flex">
        <div style="width: 80%">

          <h1>枸杞</h1>
          <div style="padding: 10px">
            <h2>简介：</h2>
            {{introduction}}
            <h2>植物学史：</h2>
            <div v-html="historyMsg">123</div>
          </div>

        </div>
        <div>
          <div style="text-align: right;width: 20%">
            <img style="height: 300px;width: 300px"
                 src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=520577fdf41fbe090853cb460a096756/cdbf6c81800a19d895f0cc8e35fa828ba71e464d.jpg"/>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoodIllustratedBookDetail',
    data () {
      return {
        introduction: '枸杞，是茄科、枸杞属植物。枸杞是商品枸杞子、植物宁夏枸杞、中华枸杞等枸杞属物种的统称。人们日常食用和药用的枸杞子多为宁夏枸杞的果实“枸杞子”，且宁夏枸杞是唯一载入《2010年版中国药典》的品种。宁夏枸杞在中国栽培面积最大，主要分布在中国西北地区。其它地区常见的品种为中华枸杞及其变种。宁夏中宁枸杞获评农产品气候品质类国家气候标志。 [1]如果“枸杞”指的是商品“枸杞子”，则基本是指来源于宁夏枸杞的干燥成熟果实；如果“枸杞”指的是除西北以外地区的野生枸杞植物，则基本是植物枸杞或者北方枸杞。',
        historyMsg: '<h3>学名历史</h3>' +
          '枸杞属（Lycium）来源于希腊语lykion，指的是一种多刺植物，该植物发现于土耳其西北部的古老城市吕底亚（Lycia）。 [2] ' +
          '<h4>宁夏枸杞</h4>' +
          '（Lycium barbarumL.）的种加词barbarum在拉丁语里解释为“药用的”。L.为卡尔·冯·林奈（Carl von Linné）的英文缩写。' +
          '<h4>中华枸杞</h4>' +
          '（Lycium chinenseMill.）的种加词chinense是指该物种发现于中国，最早发现于中国台湾，与中国地区最常见的枸杞为一个种，现有北方枸杞变种。（Mill.为命名人缩写）' +
          '<h4>名称来源</h4>' +
          '枸杞这个名称始见于中国二千多年前的《诗经》。明代的药物学家李时珍云：“枸杞，二树名。此物棘如枸之刺，茎如杞之条，故兼名之。”' +
          '道书言：千载枸杞，其形如犬，故得枸名，未审然否？颂曰：仙人杖有三种：一是枸杞；一是菜类，叶似苦苣；一是枯死竹竿之色黑者也。' +
          '“Wolfberry”是枸杞最常见的英文名，其来源并不十分明确，也许由于其属名Lycium的混淆音与Lycos类似，而Lycos有Wolf的意思，所以被叫做Wolfberry。而另一个英文名“Goji Berry”是自21世纪以来的叫法，即中国枸杞进入国际市场，越来越多的欧洲人认识到了枸杞，所以来自于枸杞的拼音gǒuqǐ。' +
          '<h2>民间历史</h2>' +
          '<div style="display: flex">' +
          '<div style="width: 80%;text-align: left">' +
          '<h3>别名</h3>' +
          '\'在中国枸杞有很多民间叫法，如苟起子、枸杞红实、甜菜子、' +
          '          \'野生黑果枸杞' +
          '          \'野生黑果枸杞(7张)' +
          '          \' 西枸杞、狗奶子、红青椒、枸蹄子、枸杞果、地骨子、枸茄茄、红耳坠、血枸子、枸地芽子、枸杞豆、血杞子、津枸杞。在宁夏枸杞主产区，宁夏省中宁县，农民们习惯称呼枸杞为“茨”，茨即蒺藜。这是由于野生枸杞与蒺藜相似，常被混采作烧柴，在民间把“茨”当作枸杞的俗名叫惯了。' +
          '          \'在中宁农村，枸杞园称为茨园，枸杞树称为茨树，枸杞枝称为茨条。于是，盛产枸杞的中宁农村又被称为茨乡，富有中宁地方色彩的文化也往往被冠以茨乡的称号，如茨乡戏、茨乡歌谣等。但是，在药材领域里，枸杞即枸杞子，不用茨果，茨实等称谓. </div>' +
          '<div style="width: 20%;text-align: right"><img style="width: 200px;height: 200px" src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=751aa446c73d70cf58f7a25f99b5ba65/50da81cb39dbb6fd584213590724ab18972b37b7.jpg"></div>' +
          '</div>' +

          '<h3>历史传说</h3>' +
          '盛唐时代，据说有一天，丝绸之路来了一帮西域商贾，傍晚在客栈住宿，见有一女子斥责一老者。商人上前责问：“你何故这般打骂老人？”那女子道：“我训自己的孙子，与你何干？”闻者皆大吃一惊。原来，此女子已200多岁，老汉也已是九旬之人。他受责打是因为不肯遵守族规服用草药，弄得未老先衰、两眼昏花。商人惊诧之余忙向女寿星讨教高寿的秘诀？女寿星见使者一片真诚，便告诉他自己四季服用枸杞。后来枸杞传入中东和西方，被那里的人誉为东方神草。'
      }
    }
  }

</script>

<style scoped>

</style>
