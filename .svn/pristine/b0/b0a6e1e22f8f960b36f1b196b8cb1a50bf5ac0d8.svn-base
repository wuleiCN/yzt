<template>
  <el-dialog
    custom-class="zhgd-video-manager-modal"
    :title="!dataForm.id ? '新增设备' : '修改设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <el-row :gutter="20">
        <el-form-item label="平台类型" prop="isControl">
          <el-radio-group v-model.trim="dataForm.isControl" :disabled="!!dataForm.id" style="width:100%">
            <!-- <el-radio :label="0">视频本地模式</el-radio> -->
            <el-radio :label="2">硬盘录像机</el-radio>
            <el-radio :label="1">萤石云</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备名称" prop="videoName">
          <el-input v-model.trim="dataForm.videoName" placeholder="设备名称" />
        </el-form-item>
        <el-form-item label="区域" prop="area">
          <el-select v-model.trim="dataForm.area" style="width:100%" placeholder="请选择区域">
            <el-option v-for="(item, index) in areaTypes" :key="index" :label="item.dictLabel" :value="item.dictLabel">{{ item.dictLabel }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备序列号"
          prop="videoSn"
        >
          <el-input v-model.trim="dataForm.videoSn" placeholder="设备序列号" />
        </el-form-item>
        <el-form-item
          v-if="dataForm.isControl === 1 || dataForm.isControl === 2"
          label="设备验证码"
          prop="videoCode"
        >
          <el-input v-model.trim="dataForm.videoCode" placeholder="设备验证码" />
          <!-- <div style="color: red">提示:设备必须先激活,设备必须要在线,设备的sn和验证码都必须要正确</div> -->
        </el-form-item>
        <el-form-item
          v-if="dataForm.isControl === 2"
          label="萤石云账号"
          prop="ysAppKey"
        >
          <el-input v-model.trim="dataForm.ysAppKey" placeholder="ysAppKey" />
        </el-form-item>
        <el-form-item
          v-if="dataForm.isControl === 2"
          label="萤石云秘钥"
          prop="ysSecret"
        >
          <el-input v-model.trim="dataForm.ysSecret" placeholder="ysSecret" />
        </el-form-item>
        <el-form-item v-if="dataForm.isControl === 0" label="摄像头Ip" prop=".videoIps.videoIp">
          <el-input v-model.trim="dataForm.videoIps.videoIp" placeholder="摄像头Ip" />
        </el-form-item>
        <el-form-item v-if="dataForm.isControl === 0" label="端口" prop=".videoIps.videoPort">
          <el-input v-model.trim="dataForm.videoIps.videoPort" placeholder="端口" />
        </el-form-item>
        <el-form-item v-if="dataForm.isControl === 0" label="用户名" prop=".videoIps.videoName">
          <el-input v-model.trim="dataForm.videoIps.videoName" placeholder="用户名" />
        </el-form-item>
        <el-form-item v-if="dataForm.isControl === 0" label="密码" prop=".videoIps.videoPassword">
          <el-input v-model.trim="dataForm.videoIps.videoPassword" placeholder="密码" />
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="!dataForm.id || dataForm.isControl === 0" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, update } from '@/api-zhgd/video-device'
import { getList } from '@/api-zhgd/sys/dict'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        devType: 1,
        projectId: this.$store.state.user.loginInfo.projectId,
        isControl: 2,
        videoSn: '',
        videoName: '',
        area: '',
        videoCode: '',
        channelNo: '',
        ysAppKey: '',
        ysSecret: '',
        videoIps: {
          videoIp: '',
          videoPort: '',
          videoName: '',
          videoPassword: ''
        }
      },
      areaTypes: [],
      dataRule: {
        videoIps: {

          videoIp: [
            { required: true, message: '摄像头Ip不能为空', trigger: 'blur' },
            { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: '格式不正确', trigger: ['blur', 'change'] }
          ],
          videoPort: [
            { required: true, message: '端口不能为空', trigger: 'blur' }
          ],
          videoName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          videoPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        },
        videoName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        channelNo: [
          { required: true, message: '通道数不能为空', trigger: 'blur' }
        ],
        ysAppKey: [
          { required: true, message: '萤石云账号不能为空', trigger: 'blur' }
        ],
        ysSecret: [
          { required: true, message: '秘钥不能为空', trigger: 'blur' }
        ],
        videoSn: [
          { required: true, message: '设备序列号不能为空', trigger: 'blur' }
        ],
        videoCode: [
          { required: true, message: '设备验证码不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '区域不能为空', trigger: 'blur' }
        ],
        isControl: [
          { required: true, message: '不能为空', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.getDataList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
          this.$set(this.dataForm, 'videoIps', row.videoIps)
        } else {
          this.$set(this.dataForm, 'videoSn', '')
          this.$set(this.dataForm, 'videoCode', '')
          this.$set(this.dataForm, 'videoIps', {})
        }
      })
    },
    getDataList() {
      getList({
        dictType: 'quyu',
        isDel: 0
      }).then((data) => {
        if (data && data.code === 1000) {
          this.areaTypes = data.result.records
        } else {
          this.areaTypes = []
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const saveOrUpdate = this.dataForm.id ? update : save
          saveOrUpdate({ ...this.dataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .zhgd-video-manager-modal {
    width: 700px;
  }
</style>
