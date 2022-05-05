<template>
  <el-dialog
    custom-class="print-ic-modal"
    title="证卡打印预览"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div id="icard" class="ic-wrap" style="border: 1px solid #000;width: 335px;height: 213px;font-weight: 700">
      <div style="position: relative;border-bottom: 1px solid #000;height:40px;line-height: 40px; text-align: center;">
        <span style="margin-left:10px;position: absolute;left: 15px;top:5px;width:30px;height:30px;border:1px solid #000;">
          <img v-show="dataForm.cardLogo" :src="dataForm.cardLogo" style="width:30px;height:30px;" alt="">
        </span>
        <span>{{ dataForm.headName || '暂无数据' }}</span>
      </div>
      <div style="text-align: center;padding: 3px 0 0px">{{ dataForm.projectShortName }}</div>
      <div style="position: relative;">
        <div style="display: flex">
          <div>
            <img style="height: 110px;width: 90px;margin:7px 0 0 10px" :src="dataForm.empNaticeplace" alt="证件照">
          </div>
          <div style="padding: 0 10px;font-size: 12px;">
            <div style="line-height: 25px">姓名：{{ dataForm.empName }}</div>
            <div style="line-height: 25px">工种：{{ dataForm.jobNameTitle }}</div>
            <div style="line-height: 25px">编号：{{ dataForm.jobNo }}</div>
            <div style="line-height: 25px">单位：{{ dataForm.constructionShortName }}</div>
            <div style="line-height: 25px">安全教育：<span style="color:#4c9655;">合格</span></div>
          </div>
          <div>
            <div style="width:65px;height:65px;margin-top:50px;position: absolute;right:10px">
              <div id="qrcode" ref="qrcode" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <img :src="dataUrl" alt="">
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="!isDisabled" type="primary" @click="printHandle()">打 印</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { printCard } from '@/api/project/person'
import QRCode from 'qrcodejs2'
import { myPrint } from '@/utils/index'
export default {
  data() {
    return {
      myPrint,
      qrcode: null,
      link: '',
      dataForm: {
        cardLogo: '',
        headName: ''
      },
      loginInfo: JSON.parse(sessionStorage.getItem('result')),
      dataUrl: '',
      visible: false,
      isDisabled: false
    }
  },
  methods: {
    init(row, tempId) {
      this.visible = true
      this.isDisabled = this.loginInfo.userType === 2
      this.$nextTick(() => {
        this.$refs.qrcode.innerHTML = ''
        this.link = this.$http.erweimaUrl(`/#/ic-worker?id=${row.id}`)
        this.qrcodeHandle()
        printCard([row.id]).then((data) => {
          this.dataForm = data.result && data.result.length ? data.result[0] : {}
        })
      })
    },
    qrcodeHandle() {
      this.qrcode = new QRCode('qrcode', {
        width: 65, // 二维码宽度，单位像素
        height: 65, // 二维码高度，单位像素
        text: this.link // 生成二维码的链接
      })
      setTimeout(() => {
        this.erweima = this.$refs.qrcode.innerHTML
      }, 0)
    },
    printHandle() {
      this.context = `
        <div id="icard" class="ic-wrap" style="width: 335px;height: 213px;font-weight: 700">
          <div style="position: relative;border-bottom: 1px solid #000;height:40px;line-height: 40px; text-align: center;">
            <span style="margin-left:10px;position: absolute;left: 15px;top:5px;width:30px;height:30px;border:1px solid #000;">
              <img src="${this.dataForm.cardLogo}" style="width:30px;height:30px;" alt="">
            </span>
            <span>${this.dataForm.headName}</span>
          </div>
          <div style="text-align: center;padding: 3px 0 0px">${this.dataForm.projectShortName}</div>
          <div style="position: relative;">
            <div style="display: flex">
              <div>
                <img style="height: 110px;width: 90px;margin:7px 0 0 10px" src="${this.dataForm.empNaticeplace}" alt="证件照">
              </div>
              <div style="padding: 0 10px;font-size: 12px;">
                <div style="line-height: 25px">姓名：${this.dataForm.empName}</div>
                <div style="line-height: 25px">工种：${this.dataForm.jobNameTitle}</div>
                <div style="line-height: 25px">编号：${this.dataForm.jobNo}</div>
                <div style="line-height: 25px">单位：${this.dataForm.constructionShortName}</div>
                <div style="line-height: 25px">安全教育：<span style="color:#4c9655;">合格</span></div>
              </div>
              <div>
                <div style="width:65px;height:65px;margin-top:50px;position: absolute;right:10px">
                  ${this.erweima}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      myPrint(this.context)
    }
  }
}
</script>

<style lang="scss">
.print-ic-modal {
  width: 360px;
  .el-dialog__body {
    padding: 15px 10px 0;
  }
}
</style>
