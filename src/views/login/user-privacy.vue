<template>
  <el-dialog
    title="用户使用协议"
    :visible.sync="dialogVisible"
    custom-class="privacy-dialog"
  >
    <p>
      <span style="line-height: 1" />
    </p>
    <p style="text-align: justify">
      &nbsp;&nbsp;&nbsp;<span style="font-size: 16px">&nbsp;</span><span
        style="font-size: 16px"
      >本产品尊重并保护所有使用网络服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，会按照本隐私权政策的规定使用和披露您的个</span><span
        style="font-size: 16px"
      >人信息。但将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另</span><span
        style="font-size: 16px"
      >有规定外，在未征得您事先许可的情况下，本产品不会将这些信息对外披</span><span
        style="font-size: 16px"
      >露或向第三方提供。本产品会不时更新本隐私权政策。您在同意本产品网</span><span
        style="font-size: 16px"
      >络服务使用协议之时，即视为您已经同意本隐私权政策全部内容。</span><span style="font-size: 16px">本隐私</span><span
        style="font-size: 16px"
      ><span
        style="font-size: 16px"
      >权政策属于本产品网络服务使用协议不可分割的一部分。</span></span>
    </p>
    <p>
      &nbsp;&nbsp;&nbsp;<span style="font-size: 16px">&nbsp;</span><span style="font-size: 16px; line-height: 1">1.适用范围</span>
    </p>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;a)在您注册本产品帐号时，您根据本产品要求提供的个人注册信息（商家应法律法规要求需公示的企业名称及相关工商注册信息除外）；</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;b)在您使用本产品网络服务，或访问本产品平台网页时，本产品自动接收并记录的您的浏览器和iphone或者ipad上的信息，包括但不限于您的IP地址、浏览&nbsp;
      器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;c)本产品通过合法途径从商业伙伴处取得的用户个人数据。您了解并同意，以下信息不适用本隐私权政策：</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;d)您在使用本产品平台提供的搜索服务时输入的关键字信息；隐私政策</span><br>
    <p>
      <span style="font-size: 16px">&nbsp; &nbsp;2.信息使用</span>
    </p>
    <span
      style="font-size: 16px"
    >&nbsp; &nbsp; &nbsp;
      &nbsp;a)本产品不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本产品（含本产品关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</span>
    <br>
    <span
      style="font-size: 16px"
    >&nbsp; &nbsp; &nbsp;
      &nbsp;b)本产品亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本产品平台用户如从事上述活动，一经发现，本产品有权立即
      终止与该用户的服务协议。</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;c)为服务用户的目的，本产品可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本产品合作</span><span
      style="font-size: 16px"
    >伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。</span><br>
    <p>
      <span style="font-size: 16px"> &nbsp; &nbsp; 3.信息披露</span>
    </p>
    <p>
      <span style="line-height: 1; font-size: 16px" />
    </p>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;在如下情况下，本产品将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp; &nbsp;a)经您事先同意，向第三方披露；</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;c)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;d)如您出现违反中国有关法律、法规或者本产品服务协议或相关规则的情况，需要向第三方披露；</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;e)如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</span>
    <br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;f)在本产品平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本产品有权决定向该用户提供其交易对</span><span
      style="font-size: 16px"
    >方的联络方式等必要信息，以促成交易的完成或纠纷的解决。</span>
    <br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;g)其它本产品根据法律、法规或者网站政策认为合适的披露。</span>
    <br>
    <br>
    <span style="font-size: 16px">
      &nbsp; &nbsp;
      4.信息存储和交换本产品收集的有关您的信息和资料将保存在本产品及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本产品
      收集信息和资料所在地的境外并在境外被访问、存储和展示。</span>
    <p>
      <span style="font-size: 16px"> &nbsp; &nbsp; 5.Cookie的使用</span>
    </p>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;a)在您未拒绝接受cookies的情况下，本产品会在您的手机上设定或取用cookies，以便您能登录或使用依赖于cookies的本产品平台服务或功能。本产品使用cookies可为您提供更加周到的个性化服务，包括推广服务。</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;b)您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录</span><span
      style="font-size: 16px"
    >或使用依赖于cookies的本产品网络服务或功能。</span>
    <br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;c)通过本产品所设cookies所取得的有关信息，将适用本政策。</span>
    <p>
      <span style="font-size: 16px"> &nbsp; &nbsp; &nbsp;6.信息安全</span>
    </p>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;a)本产品帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本产品将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      &nbsp;b)在使用本产品网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥</span><span
      style="font-size: 16px"
    >善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本产品用户名及密码发生泄露，请您立即联络本产品服，以便采取相应措施</span>
    <br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      c)本产品收集到的您在发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；</span>
    <br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      d)违反法律规定或违反规则行为及已对您采取的措施。</span>
    <p>
      <span style="font-size: 16px"> &nbsp; &nbsp;7.本隐私政策的更改</span>
    </p>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      a)如果决定更改隐私政策，我们会在本政策中，以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。</span><br>
    <span style="font-size: 16px">
      &nbsp; &nbsp; &nbsp;
      b)留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，会通过网站通知的形式告知。使用方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。</span>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.privacy-dialog {
  .el-dialog__body {
    padding-top: 10px;
    height: 500px;
    overflow-y: auto;
  }
}
</style>
