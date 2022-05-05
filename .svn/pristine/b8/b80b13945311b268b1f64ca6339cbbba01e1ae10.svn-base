<template>
  <el-dialog
    custom-class="ic-set-modal"
    title="证卡设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="公司名称" prop="headName">
        <el-input v-model.trim="dataForm.headName" placeholder="公司名称" />
      </el-form-item>
      <el-form-item label="logo上传" prop="cardLogo">
        <my-upload ref="myUpload" v-permit="'project_person_btn_import'" :is-show="true" :limit="'image'" :title="'点击上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'cardLogo')" />
      </el-form-item>
      <el-form-item label="模板预览">
        <div id="icard" class="ic-wrap" style="border: 1px solid #000;width: 335px;height: 213px;font-weight: 700">
          <div style="position: relative;border-bottom: 1px solid #000;height:40px;line-height: 40px; text-align: center;">
            <span style="margin-left:10px;position: absolute;left: 15px;top:5px;width:30px;height:30px;border:1px solid #000;">
              <img v-show="dataForm.cardLogo" :src="dataForm.cardLogo" style="width:30px;height:30px;" alt="">
            </span>
            <span>{{ dataForm.headName || 'XXXXXXXXXXXXXXXXXXX' }}</span>
          </div>
          <div style="text-align: center;padding: 3px 0 0px">XXXXXXXXXXXXXX一期</div>
          <div>
            <div style="display: flex">
              <div>
                <img style="width: 100px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAACMCAMAAACTbt0bAAAAsVBMVEUAAAAA//cA//cA//YA//cA//cA//UA//YA//QA//cA//YA//YA//cA//cA//YA/+4A//YA//YA//cA//cA//YA//YA//YA//8A//cA//YA//YA//YA//YA//gA//YA//cA//cA//YA//YA//cA//cA//YA//cA//cA//cA//YA//YA//cA//YA//cA//YA//YA//cA//YA//cA//cA//cA//YA//YA//YA//YA//YA//aSU1/lAAAAOnRSTlMA+/gD8SIGFQ7167DEERkJ7ice2JePTwvf0c1zNSxnPL5d5ElDqp4v27qBa8iKYrSihnfUplTnk29sjCsSPgAABe5JREFUaN7tWtmyojAQJSAiiIAKLiiCiqLirnfj/z9stpopO0GzEKecqjkP9+GW4YTuk96C8h+3MMZvo2M4ePfMmjW7HE7TuKMpz0IjPi9Cq4CofWftGU8grWejbQ0VpTC7QdqQS+em1/fiEWrrqUTKetr0ChrU7b4lia+9rBUsQOu0LkMqn6uCFd6HXv31FqjgwHBejU7rrQo+WOdGFbWMvIIXaNERd1+gFgKwI1G+ZSGGYSZmTx8VgtgKiXVyz56zcL3wT8HxsB3c+0nT4OfrWWWKsIZBqjst94cFGoY+PtszVKoc7qgzHhQkupu4jxs+miSohHHDK5hDQWCwKXeNsR+SpvV6fII5IeIJQft+Wh5dSGu0eQjnNWL9/GGS1ZvEDpcckdzZ4qsT2mE2ljhjjd2o2gZbrF4d6qL+CLeK7bASxhbGt+uzbPMNZxyxKmaJSdx3xULFxWE8gpZg2NAwbaufbMuwGHphD4z9K1y6ZdqqvuIRG0RnCJ3BtHYPd3msV4j4R42hBG2CJe9jhQctGyYWBndEUDIfGmeSUYFsJgwWBSsGbd6oDw20oO/3AyzwuduUNxNIvEM99QloU94UXnQG4AEx36FYCZR80KZUJ8Y1EGREaiFAGGg0F4Cf7wUIIw9smRaHN0DVkUhXboMatU/RzBE0CiL1ZR84cdbiiTNdRxHAEuzZoGxvDXK2UE+7A4QUnTds4PG+COEZFHttCmEokikgcnRLGL3YGz7Bhy+m0iecwxeLNFgsncqNpfRssRAgnPJlC70L8qGAahZ8+bCecBelEM4APCCmLghg0VaxpgkdugukVm1X7fXqUsmV9wv2FnK7J5H+cJWxG7SJ94dCHbDNWg27PlcHDHt8kTz8hfAeX3iKwTRVIKcY4nMav0W3S07OacQnUaipU8fV5CSq0qwtTB/P2hYls7ZXnibKnpeKT4RTYiKc5ZUnwlDkEN7Qn9/MvOON/Y5Kp+wCFe0I0af6935id/7uvcUwEruZ8QX57EwRQ/9kCtChpvhtl5Z7/HxX4x+6PxS5If3n7oA5b7ll3eMvLLphZ6OWIg16YNJfsBvMDSlsWvRxYTuQZrjRtcp0WWCxCxUNTpFWia7tzwo+DD7a4pTGF0gIrG/5JehLd26LJQxkz10BPgecPz7Ulg6392K7qAI71vjMObGKarAmPGZt+eYjH6mqaprm97+PfGz6Brv77ucI65L4eTqO2no7Gqe5n1wsdDe46qx95frOnu1gH+NqMOJ9YN+xx5atGo5K5YJWy7SllQuslS5Xpe8ZspQ32bCMLswf20fPwzLKIf0d22HZN2QTugCMyVYllyYOLROV2LM7abFpe9IlF68NylyA1OVOZ0+cO/L4Xh/ttr5DhN9jjStAER5BuweVx7SG//qg81YHB6IXnt5v0vDkZ+74C5XWDtfObHxPZwm+t8+6SFrbmLhUjXL744MBM1fEMMIYUfkkOn7H+D414aYE08J7XH7hAKCeK5RDXyZ9mjVVId+mSh2tnbGnkUp1sBB6dJUqcI9YUCVC3BnBH+hVq3VsdnrGc2AXH1xVRQ8Kp9vBlIzpuF69B8JO2Yh4QbgdYdCfSU5lzKkiA1MTWO32FRtrmMMqNur0p2bAwepckYO5CoSY3ZNM0pBE2EjuyMZNsKggCzB6Je6fPAjCdmhIIzRC4l6JvP5BJ0UeTuDJ+z+XMcC3Y4mE4xo+BydfPOlLJOwnZRE8A649KzJxBnLMwGdMxCGUfxRz4EJwCysL0Yz8Tq5+AL1yQyphA9zyHOo/HRtyfiwgfq8f9sk0spNMuIMpiqi3US6ZMEdEDZ56t6lwLplwfpsUvRQUHyCHyEIGnt4jQrrXlkzY9ohEtAdza10yoe4RXzt+gn7XkUzogJ7482cfAAJNSzJhC1wMfhEXsFdXMqF7IEQT3ewBTRTJ0E639st+/muEQK8qFfDjjpH2K8BeVRAJJGP6R6fNxu+Qnv/chXmIlCdA6w1/BbFr5+Z4vu38r7ShPAd6YFvd69RV/uMp+AYfYBenOLkw7QAAAABJRU5ErkJggg==" alt="证件照">
              </div>
              <div style="padding: 0 10px;font-size: 13px;">
                <div style="line-height: 25px">姓名：XXX</div>
                <div style="line-height: 25px">工种：XX</div>
                <div style="line-height: 25px">编号：XXX</div>
                <div style="line-height: 25px">单位：XXXX</div>
                <div style="line-height: 25px">安全教育：<span style="color:#4c9655;">合格</span></div>
              </div>
              <div>
                <div style="width:100px;height:100px;border:1px solid #000;margin-top:20px" />
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button :disabled="!isDisabled" type="primary" @click="icSaveOrUpdateHandle">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyUpload from '@/components/upload'
import { getCardSetMsg, icSaveOrUpdate } from '@/api/project/person'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      dataForm: {
        headName: '',
        cardLogo: ''
      },
      loginInfo: JSON.parse(sessionStorage.getItem('result')),
      dataRule: {
        headName: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        cardLogo: [
          { required: true, message: 'logo不能为空', trigger: 'blur' }
        ]
      },
      visible: false,
      isDisabled: false
    }
  },
  methods: {
    init() {
      this.visible = true
      this.isDisabled = this.loginInfo.userType === 2
      this.$nextTick(() => {
        this.getCardSetMsgHandle()
      })
    },
    getCardSetMsgHandle() {
      getCardSetMsg().then(res => {
        this.dataForm = res.result || {}
      })
    },
    icSaveOrUpdateHandle() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          icSaveOrUpdate({ ...this.dataForm, projectId: this.loginInfo.projectId }).then((data) => {
            if (data && data.code === 1000) {
              this.visible = false
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    }
  }
}
</script>

<style lang="scss">
.ic-set-modal {
  width: 500px;
  .el-dialog__body {
    padding: 15px 10px 0;
  }
  .temp-name {
    color: #1890ff;
  }
}

</style>
