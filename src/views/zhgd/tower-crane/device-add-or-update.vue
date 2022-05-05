<template>
  <el-dialog
    custom-class="zhgd-tower-crane-modal"
    :title="!row.id ? '新增塔吊设备' : '修改塔吊设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="150px" @keyup.enter.native="dataFormSubmit()">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="basic.name">
            <el-input v-model.trim="dataForm.basic.name" placeholder="设备名称" />
          </el-form-item>
          <el-form-item label="安监站备案编号" prop="deviceRecordNumName">
            <el-input v-model.trim="dataForm.deviceRecordNumName" placeholder="安监站备案编号" />
          </el-form-item>
          <el-form-item label="设备型号" prop="basic.model">
            <el-input v-model.trim="dataForm.basic.model" placeholder="设备型号" />
          </el-form-item>
          <el-form-item label="监测设备安装日期" prop="basic.deviceInstallationDate">
            <el-date-picker
              v-model.trim="dataForm.basic.deviceInstallationDate"
              style="width:100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="监测设备安装日期"
            />
          </el-form-item>
          <el-form-item label="设备证书日期" prop="basic.license">
            <el-date-picker
              v-model.trim="dataForm.basic.license"
              style="width:100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="设备证书日期"
            />
          </el-form-item>
          <el-form-item label="设备发证日期" prop="basic.licenseStartDate">
            <el-date-picker
              v-model.trim="dataForm.basic.licenseStartDate"
              style="width:100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="设备发证日期"
            />
          </el-form-item>
          <el-form-item label="制造商" prop="makeFactory">
            <el-input v-model.trim="dataForm.makeFactory" placeholder="制造商" />
          </el-form-item>
          <el-form-item label="供应商名称" prop="supAbbreviation">
            <el-select v-model.trim="dataForm.supAbbreviation" style="width:100%" placeholder="请选择供应商">
              <el-option v-for="(item, index) in supList" :key="index" :label="item.supAbbreviation" :value="item.supAbbreviation">{{ item.supAbbreviation }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前臂长（m）" prop="foreArmLength">
            <el-input v-model.trim="dataForm.foreArmLength" placeholder="前臂长（m）" />
          </el-form-item>
          <el-form-item label="后臂长（m）" prop="rearArmLength">
            <el-input v-model.trim="dataForm.rearArmLength" placeholder="后臂长（m）" />
          </el-form-item>
          <el-form-item label="塔帽高（m）" prop="equipmentHeight">
            <el-input v-model.trim="dataForm.equipmentHeight" placeholder="塔帽高（m）" />
          </el-form-item>
          <el-form-item label="塔臂高（m）" prop="towerArmWeight">
            <el-input v-model.trim="dataForm.towerArmWeight" placeholder="塔臂高（m）" />
          </el-form-item>
          <el-form-item label="钢丝绳倍率" prop="ropeMagn">
            <el-input v-model.trim="dataForm.ropeMagn" placeholder="钢丝绳倍率" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="进场时间" prop="basic.inDate">
            <el-date-picker
              v-model.trim="dataForm.basic.inDate"
              style="width:100%"
              type="date"
              placeholder="进场时间"
            />
          </el-form-item>
          <el-form-item label="出场时间" prop="basic.outDate">
            <el-date-picker
              v-model.trim="dataForm.basic.outDate"
              style="width:100%"
              type="date"
              placeholder="出场时间"
            />
          </el-form-item>
          <el-form-item label="倾斜">
            <el-col :span="11">
              <el-form-item prop="minTilt">
                <el-input v-model.trim="dataForm.minTilt" placeholder="最小值" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="maxTilt">
                <el-input v-model.trim="dataForm.maxTilt" placeholder="最大值" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="力矩">
            <el-col :span="11">
              <el-form-item prop="minLoadMoment">
                <el-input v-model.trim="dataForm.minLoadMoment" placeholder="最小值" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="maxLoadMoment">
                <el-input v-model.trim="dataForm.maxLoadMoment" placeholder="最大值" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item required label="吊重">
            <el-col :span="11">
              <el-form-item prop="minCapacity">
                <el-input v-model.trim="dataForm.minCapacity" placeholder="最小值" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item
                :rules="[
                  { required: true, message: '吊重最大值不能为空', trigger: 'blur' },
                  { validator: numberRule, trigger: 'blur'}
                ]"
                prop="maxCapacity"
              >
                <el-input v-model.trim="dataForm.maxCapacity" placeholder="最大值" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="高度">
            <el-col :span="11">
              <el-form-item prop="minHeight">
                <el-input v-model.trim="dataForm.minHeight" placeholder="最小值" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="maxHeight">
                <el-input v-model.trim="dataForm.maxHeight" placeholder="最大值" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="风速">
            <el-form-item prop="maxWindSpeed">
              <el-input v-model.trim="dataForm.maxWindSpeed" placeholder="最大值" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="幅度">
            <el-col :span="11">
              <el-form-item prop="minRange">
                <el-input v-model.trim="dataForm.minRange" placeholder="最小值" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="maxRange">
                <el-input v-model.trim="dataForm.maxRange" placeholder="最大值" />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, view, deviceUpdate } from '@/api-zhgd/zhgd-tower-crane'
import { getList } from '@/api/project/project'
import { getList as supplierList } from '@/api-zhgd/sys/supplier'
export default {
  data() {
    const numberRule = (rule, value, callback) => {
      if (Number(value) > this.dataForm.minCapacity) {
        if (Number(value) > 0) {
          callback()
        } else {
          callback(new Error('请输入大于零的正整数'))
        }
      } else {
        callback(new Error('不能小于等于吊重最小值'))
      }
    }
    return {
      numberRule,
      visible: false,
      supList: [],
      dataForm: {
        id: null,
        deviceRecordNumName: '',
        mnufacturerBusiness: '',
        foreArmLength: '',
        rearArmLength: '',
        equipmentHeight: '',
        towerArmWeight: '',
        ropeMagn: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        projectName: '',
        makeFactory: '',
        maxCapacity: '',
        minTilt: '',
        maxTilt: '',
        minLoadMoment: '',
        maxLoadMoment: '',
        minCapacity: '',
        minHeight: '',
        maxHeight: '',
        minWindSpeed: '',
        maxWindSpeed: '',
        minRange: '',
        maxRange: '',
        supAbbreviation: '',
        basic: {
          model: '',
          name: '',
          inDate: '',
          deviceInstallationDate: '',
          license: '',
          licenseStartDate: '',
          outDate: ''
        }
      },
      row: {},
      dataRule: {
        makeFactory: [
          { required: true, message: '制造商不能为空', trigger: 'blur' }
        ],
        minCapacity: [
          { required: true, message: '吊重最小值不能为空', trigger: 'blur' }
        ],
        supAbbreviation: [
          { required: true, message: '设备进场时间不能为空', trigger: 'blur' }
        ],
        deviceRecordNumName: [
          { required: true, message: '安监站备案编号不能为空', trigger: 'blur' }
        ],
        basic: {
          model: [
            { required: true, message: '设备名称不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '设备型号不能为空', trigger: 'blur' }
          ],
          inDate: [
            { required: true, message: '进场时间不能为空', trigger: 'blur' }
          ],
          outDate: [
            { required: true, message: '出场时间不能为空', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.row = row
      this.visible = true
      this.getProList()
      this.getsupplierList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (row.id) {
          view({ id: row.id }).then(data => {
            if (data && data.code === 1000) {
              this.dataForm = data.result
              // this.dataForm.projectName = data.result.projectName || ''
              // this.dataForm.basic = data.result.basic || {}
              // this.dataForm.basic.id = data.result.basic.id
            }
          })
        }
      })
    },
    // 获取供应商
    getsupplierList() {
      supplierList({
        isDel: 0
        // 'deviceType': 4
      }).then((data) => {
        if (data && data.code === 1000) {
          this.supList = data.result.records
        }
      })
    },
    getProList() {
      getList({}).then(data => {
        if (data && data.code === 1000) {
          this.proList = data.result.records // projectName
          if (this.dataForm.projectId && this.proList.length) this.dataForm.projectName = this.proList.filter(item => item.id === this.dataForm.projectId)[0].projectName
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const saveOrUpdate = this.dataForm.id ? deviceUpdate : save
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
  .zhgd-tower-crane-modal {
    width: 1000px !important;
    .line {
      text-align: center;
    }
  }
</style>
