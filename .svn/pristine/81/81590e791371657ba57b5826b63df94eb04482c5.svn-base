<template>
  <el-dialog
    custom-class="device-add-or-update-modal"
    :title="!dataForm.id ? '新增考勤设备' : '修改考勤设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="所属项目" prop="projectId">
        <el-select v-model="dataForm.projectId" filterable style="width:100%" placeholder="请选择所属项目">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="dataForm.deviceName" placeholder="设备名称" />
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNo">
        <!-- <el-input v-model="dataForm.deviceNo" placeholder="设备编号" /> -->
        <el-select v-model.trim="dataForm.deviceNo" filterable style="width:100%" placeholder="请选择设备编号">
          <el-option v-for="(item, index) in deviceNoList" :key="index" :label="item.deviceNo" :value="item.deviceNo">{{ item.deviceNo }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备厂家" prop="deviceFactory">
        <el-select v-model.trim="dataForm.deviceFactory" style="width:100%" placeholder="请选择设备厂家">
          <el-option v-for="(item, index) in factoryList" :key="index" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
          <!-- <el-option label="YZTYF" value="yf"> YZTYF </el-option>
          <el-option label="YZTHW" value="hw"> YZTHW </el-option>
          <el-option label="YZTAHYT" value="ahyt"> YZTAHYT </el-option>
          <el-option label="YZTSYD" value="syd"> YZTSYD </el-option>
          <el-option label="YZTXYD" value="xyd"> YZTXYD </el-option>
          <el-option label=" YZTQY" value="qy">  YZTQY </el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="进出标识" prop="direction">
        <el-radio-group v-model="dataForm.direction" style="width:100%">
          <el-radio :label="'in'">进</el-radio>
          <el-radio :label="'out'">出</el-radio>
          <el-radio :label="'none'">不分进出</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="dataForm.direction === 'none'" label="上班时间段" prop="startRange">
        <el-time-picker
          v-model="dataForm.startRange"
          style="width:100%"
          is-range
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        />
      </el-form-item>
      <el-form-item v-if="dataForm.direction === 'none'" label="下班时间段" prop="endRange">
        <el-time-picker
          v-model="dataForm.endRange"
          style="width:100%"
          is-range
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        />
      </el-form-item> -->
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
      <!-- <el-form-item v-if="dataForm.id" label="状态" prop="status">
        <el-select v-model="dataForm.status" style="width:100%" placeholder="请选择">
          <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="btnLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, projectSelectList, deviceOptionList } from '@/api/project/device'
// import { projectsDetail } from '@/api/project/team'
import { parseTime } from '@/utils'
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
      types: [
        { id: 1, title: '上传' },
        { id: 0, title: '不上传' }
      ],
      proList: [],
      deviceNoList: [],
      loginInfo: this.$store.state.user.loginInfo,
      dataForm: {
        id: null,
        // startRange: [new Date(2021, 9, 10, 7, 0, 0), new Date(2021, 9, 10, 9, 0, 0)],
        // endRange: [new Date(2021, 9, 10, 17, 0, 0), new Date(2021, 9, 10, 19, 0, 0)],
        deviceName: '',
        projectId: '',
        deviceNo: '',
        deviceFactory: '',
        direction: '',
        // status: '',
        deviceIp: '',
        userName: '',
        passWord: '',
        connectTime: null
      },
      dataRule: {
        companyName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        startRange: [
          { required: true, message: '上班时间段不能为空', trigger: 'blur' }
        ],
        endRange: [
          { required: true, message: '下班时间段不能为空', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '所属项目不能为空', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' },
          { pattern: /^(?=[\S\s]{1,30}$)[\S\s]*/, message: '字符长度不能超过30', trigger: ['blur', 'change'] },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '设备名称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        direction: [
          { required: true, message: '进出标识不能为空', trigger: 'blur' }
        ],
        deviceIp: [
          { required: true, message: '设备IP不能为空', trigger: 'blur' }
          // { pattern: /^(?=[\S\s]{1,20}$)[\S\s]*/, message: '字符长度不能超过20', trigger: ['blur', 'change'] }
        ],
        deviceFactory: [
          { required: true, message: '设备厂家不能为空', trigger: 'blur' }
        ],
        deviceNo: [
          { required: true, message: '设备编号不能为空', trigger: 'blur' },
          { pattern: /^(?=[\S\s]{1,100}$)[\S\s]*/, message: '字符长度不能超过100', trigger: ['blur', 'change'] }
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
        // let start
        // if (row.startRange) {
        //   const stime = row.startRange.split('-')[0].split(':')
        //   const etime = row.startRange.split('-')[1].split(':')
        //   start = [new Date(2021, 9, 10, +stime[0], +stime[1], +stime[2]), new Date(2021, 9, 10, +etime[0], +etime[1], +etime[2])]
        // } else {
        //   start = [new Date(2021, 9, 10, 7, 0, 0), new Date(2021, 9, 10, 9, 0, 0)]
        // }
        // let end
        // if (row.endRange) {
        //   const stime = row.endRange.split('-')[0].split(':')
        //   const etime = row.endRange.split('-')[1].split(':')
        //   end = [new Date(2021, 9, 10, +stime[0], +stime[1], +stime[2]), new Date(2021, 9, 10, +etime[0], +etime[1], +etime[2])]
        // } else {
        //   end = [new Date(2021, 9, 10, 17, 0, 0), new Date(2021, 9, 10, 19, 0, 0)]
        // }
        if (this.dataForm.id) {
          this.dataForm = row
          // this.$set(this.dataForm, 'startRange', start)
          // this.$set(this.dataForm, 'endRange', end)
        }
        this.getproSelectList(this.loginInfo.projectId)
        this.fetchDeviceNoList()
      })
    },
    // 根据loginInfo.projectId为参数获取所属项目中文名
    // getProjectsDetail(id) {
    //   projectsDetail({ id }).then((data) => {
    //     this.$set(this.dataForm, 'projectName', data.result.projectName)
    //   })
    // },
    // 所属项目下拉
    getproSelectList(id) {
      projectSelectList({ id }).then((data) => {
        this.proList = data.result || []
        if (this.proList.length === 1) this.$set(this.dataForm, 'projectId', this.proList[0].id)
      })
    },
    // 设备编号下拉
    fetchDeviceNoList() {
      deviceOptionList().then((data) => {
        this.deviceNoList = data.result || []
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let { startRange, endRange } = this.dataForm
          if (startRange && startRange.length) {
            if (typeof startRange[0] === 'object') {
              startRange = parseTime(startRange[0], '{h}:{i}:{s}') + '-' + parseTime(startRange[1], '{h}:{i}:{s}')
            } else {
              startRange = startRange[0] + '-' + startRange[1]
            }
          }
          if (endRange && endRange.length) {
            if (typeof endRange[0] === 'object') {
              endRange = parseTime(endRange[0], '{h}:{i}:{s}') + '-' + parseTime(endRange[1], '{h}:{i}:{s}')
            } else {
              endRange = endRange[0] + '-' + endRange[1]
            }
          }
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm }).then((data) => {
          // saveOrUpdate({ ...this.dataForm, startRange, endRange }).then((data) => {
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
  .device-add-or-update-modal {
    width: 600px;
  }
</style>
