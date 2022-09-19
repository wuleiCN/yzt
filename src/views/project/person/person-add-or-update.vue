<template>
  <el-dialog
    custom-class="person-modal"
    :title="!id ? '新增项目人员' : '修改项目人员'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="closeHandle"
  >
    <!-- v-if="name" 重置刷新 -->
    <el-tabs v-if="name" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in editableTabs.filter(item => {return id ? true : item.name !== 'certificate-info'})"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <component :is="item.content" :id="id" :ref="item.name" :data="row" :id-code="idCode" />
      </el-tab-pane>
    </el-tabs>
    <span v-if="loginInfo.projectId" slot="footer" class="dialog-footer">
      <el-button :loading="btnLoading" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import baseInfo from './person-base-info'
import certificateInfo from './person-certificate-info'
import contractInfo from './person-contract-info'
import inOutInfo from './person-inOut-info'
import badRecord from './person-bad-record'
import rewardPunish from './person-reward-punish'
import { saveOrUpdate } from '@/api/project/person'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      id: '',
      idCode: '',
      row: {},
      data: {},
      name: 'base-info',
      activeName: 'base-info',
      loginInfo: this.$store.state.user.loginInfo,
      projectId: JSON.parse(sessionStorage.getItem('result')).projectId,
      editableTabs: [
        { title: '人员基本信息', name: 'base-info', content: baseInfo },
        { title: '劳动合同附件', name: 'contract-info', content: contractInfo },
        { title: '进退场及附件', name: 'inOut-info', content: inOutInfo },
        { title: '证书信息', name: 'certificate-info', content: certificateInfo },
        { title: '不良记录', name: 'bad-record', content: badRecord },
        { title: '奖惩记录', name: 'reward-punish', content: rewardPunish }
      ]
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.id = row.id
      this.idCode = row.idCode
      this.row = row
      this.visible = true
      this.btnLoading = false
      this.name = 'base-info'
      this.activeName = 'base-info'
      this.$nextTick(() => {
        if (this.id) {
          this.data = this.$refs['base-info'][0].dataForm
        }
      })
    },
    // 解决弹窗再次打开不加载详情的问题
    closeHandle() {
      this.name = ''
      this.visible = false
    },
    dataFormSubmit() {
      this.$refs['base-info'][0].$refs['dataForm'].validate((valid) => {
        if (valid) {
          let newDataForm = {}
          Object.values(this.$refs).map(item => {
            if (item && item.length) {
              newDataForm = { ...newDataForm, ...item[0].dataForm }
            }
          })
          if (!newDataForm.faceUrl) {
            return this.$message.error('请上传人脸照片')
          }
          if (!newDataForm.empNaticeplace) {
            return this.$message.error('请上传证件头像')
          }
          if (!newDataForm.idphotoScan) { // !newDataForm.idphotoScan
            return this.$message.error('请上传身份证正面照片')
          }
          if (!newDataForm.idphotoScan2) { // !newDataForm.idphotoScan2
            return this.$message.error('请上传身份证反面照片')
          }
          if (newDataForm.startTime && newDataForm.endTime) {
            if (newDataForm.startTime > newDataForm.endTime) {
              return this.$message.error('退场时间不能小于入场时间')
            }
          }
          this.btnLoading = true
          if (!newDataForm.id) { // 后台要求 dataSources = 1 固定
            newDataForm.dataSources = 1
          }
          saveOrUpdate({ ...newDataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.visible = false
              this.btnLoading = false
              this.$emit('refreshDataList')
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
            } else {
              this.btnLoading = false
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    handleClick(tab, event) {
      this.name = tab.name
      const data = this.$refs['base-info'][0].dataForm
      this.$refs['contract-info'][0].init(data)
    }
  }
}
</script>
<style lang="scss">
  .person-modal {
    width: 1000px;
    .el-tabs {
      height: 600px;
      overflow: auto;
      padding-right: 20px;
      .el-tabs__header {
        // position: fixed;
        position: absolute;
        z-index: 999;
        width: 963px;
        background: #fff;
      }
      .el-tabs__content {
        margin-top: 50px;
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #c3c3c3;
      padding-bottom: 10px;
    }
    .el-dialog__body {
      padding: 0 0 0 20px;
    }
  }

</style>
