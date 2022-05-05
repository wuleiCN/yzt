<template>
  <el-dialog
    custom-class="editor-modal"
    :title="!dataForm.id ? '新增生活区设备' : '修改生活区设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="所属项目" prop="projectId">
        <el-select v-model="dataForm.projectId" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生活区" prop="liveAreaId">
        <el-select v-model="dataForm.liveAreaId" filterable style="width:100%" placeholder="请选择生活区" @change="(e) => searchHandle(e, 'liveAreaId')">
          <el-option v-for="(item, index) in communityList" :key="index" :label="item.liveAreaName" :value="item.id">{{ item.liveAreaName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="dataForm.deviceName" placeholder="设备名称" />
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNo">
        <el-select v-model.trim="dataForm.deviceNo" filterable style="width:100%" placeholder="请选择设备编号">
          <el-option v-for="(item, index) in deviceNoList" :key="index" :label="item.deviceNo" :value="item.deviceNo">{{ item.deviceNo }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备厂家" prop="deviceFactory">
        <el-select v-model.trim="dataForm.deviceFactory" style="width:100%" placeholder="请选择设备厂家">
          <el-option v-for="(item, index) in factoryList" :key="index" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进出标识" prop="direction">
        <el-radio-group v-model="dataForm.direction" style="width:100%">
          <el-radio :label="'in'">进</el-radio>
          <el-radio :label="'out'">出</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备IP" prop="deviceIp">
        <el-input v-model="dataForm.deviceIp" placeholder="设备IP" />
      </el-form-item>
      <el-form-item
        v-if="dataForm.deviceFactory === 'hkws'"
        :rules="[
          { required: dataForm.deviceFactory === 'hkws', message: '端口不能为空', trigger: 'blur' }
        ]"
        label="端口"
        prop="port"
      >
        <el-input v-model="dataForm.port" placeholder="端口" />
      </el-form-item>
      <el-form-item
        v-if="dataForm.deviceFactory === 'hkws'"
        :rules="[
          { required: dataForm.deviceFactory === 'hkws', message: '账号不能为空', trigger: 'blur' }
        ]"
        label="账号"
        prop="userName"
      >
        <el-input v-model="dataForm.userName" placeholder="账号" />
      </el-form-item>
      <el-form-item
        v-if="dataForm.deviceFactory === 'hkws'"
        :rules="[
          { required: dataForm.deviceFactory === 'hkws', message: '密码不能为空', trigger: 'blur' }
        ]"
        label="密码"
        prop="passWord"
      >
        <el-input v-model="dataForm.passWord" placeholder="密码" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="btnLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, deviceOptionList } from '@/api/gyc/device'
import { proOptionList } from '@/api/gyc/community'
import { liveAreaList } from '@/api/gyc/unit'
export default {
  props: {
    factoryList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      btnLoading: false,
      proList: [],
      deviceNoList: [],
      communityList: [],
      types: [
        { id: 1, title: '上传' },
        { id: 0, title: '不上传' }
      ],
      dataForm: {
        id: null,
        deviceNo: '',
        projectId: '',
        deviceName: '',
        liveAreaId: '',
        deviceFactory: '',
        direction: '',
        status: '',
        deviceIp: '',
        connectTime: null
      },
      dataRule: {
        projectId: [
          { required: true, message: '所属项目不能为空', trigger: ['blur', 'change'] }
        ],
        deviceName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        liveAreaId: [
          { required: true, message: '生活区不能为空', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '进出标识不能为空', trigger: 'blur' }
        ],
        deviceIp: [
          { required: true, message: '设备IP不能为空', trigger: 'blur' }
        ],
        deviceFactory: [
          { required: true, message: '设备厂家不能为空', trigger: 'blur' }
        ],
        deviceNo: [
          { required: true, message: '设备编号不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z]{1,}$/, message: '设备编号由数字,字母组成', trigger: ['blur', 'change'] }
        ],
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getProOptionList()
        if (this.dataForm.id) {
          this.dataForm = row
          this.dataForm.projectId = row.projectId
          this.getLiveAreaList()
        } else {
          this.communityList = []
          this.dataForm.liveAreaId = ''
        }
        this.fetchDeviceNoList()
      })
    },
    getProOptionList() {
      return new Promise(resolve => {
        proOptionList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 设备编号下拉
    fetchDeviceNoList() {
      deviceOptionList().then((data) => {
        this.deviceNoList = data.result || []
      })
    },
    getLiveAreaList() {
      return new Promise(resolve => {
        liveAreaList({ projectId: this.dataForm.projectId }).then((data) => {
          if (data && data.code === 1000) {
            this.communityList = data.result
            resolve(this.communityList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    searchHandle(val, type) {
      if (type === 'projectId') {
        this.dataForm.liveAreaId = ''
        this.communityList = []
        this.getLiveAreaList()
      }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.btnLoading = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.btnLoading = false
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
  .editor-modal {
    width: 950px;
  }
</style>
