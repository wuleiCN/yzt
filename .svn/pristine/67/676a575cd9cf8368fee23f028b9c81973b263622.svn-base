<template>
  <el-dialog
    custom-class="zhgd-elevator-modal"
    :title="!row.id ? '新增升降机设备' : '修改升降机设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">

      <el-form-item label="制作厂家" prop="makeFactory">
        <el-input v-model.trim="dataForm.makeFactory" placeholder="制作厂家" />
      </el-form-item>
      <el-form-item label="设备名称" prop="basicInfo.name">
        <el-input v-model.trim="dataForm.basicInfo.name" placeholder="设备名称" />
      </el-form-item>
      <el-form-item label="最大载重" prop="maxCapacity">
        <el-input v-model.trim="dataForm.maxCapacity" placeholder="最大载重" />
      </el-form-item>
      <el-form-item label="供应商名称" prop="supAbbreviation">
        <el-select v-model.trim="dataForm.supAbbreviation" style="width:100%" placeholder="请选择供应商">
          <el-option v-for="(item, index) in supList" :key="index" :label="item.supAbbreviation" :value="item.supAbbreviation">{{ item.supAbbreviation }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安装位置" prop="installAddress">
        <el-select v-model.trim="dataForm.installAddress" style="width:100%" placeholder="请选择安装位置">
          <el-option v-for="(item, index) in areaTypes" :key="index" :label="item.dictLabel" :value="item.dictLabel">{{ item.dictLabel }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安装日期" prop="installDate">
        <el-date-picker
          v-model.trim="dataForm.installDate"
          style="width:100%"
          type="date"
          placeholder="安装日期"
        />
      </el-form-item>
      <el-form-item label="设备进场时间" prop="basicInfo.inDate">
        <el-date-picker
          v-model.trim="dataForm.basicInfo.inDate"
          style="width:100%"
          type="date"
          placeholder="设备进场时间"
        />
      </el-form-item>
      <el-form-item label="设备出场时间" prop="basicInfo.outDate">
        <el-date-picker
          v-model.trim="dataForm.basicInfo.outDate"
          style="width:100%"
          type="date"
          placeholder="设备出场时间"
        />
      </el-form-item>
      <el-form-item label="设备产权号" prop="propertyNo">
        <el-input v-model.trim="dataForm.propertyNo" placeholder="设备产权号" />
      </el-form-item>
      <el-form-item label="设备型号" prop="basicInfo.model">
        <el-input v-model.trim="dataForm.basicInfo.model" placeholder="设备型号" />
      </el-form-item>
      <el-form-item label="设备档案编号" prop="deviceRecordNumName">
        <el-input v-model.trim="dataForm.deviceRecordNumName" placeholder="设备档案编号" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="dataForm.remark" placeholder="备注" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, view, deviceUpdate } from '@/api-zhgd/zhgd-elevator'
import { getList } from '@/api-zhgd/sys/dict'
import { getList as supplierList } from '@/api-zhgd/sys/supplier'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        projectId: this.$store.state.user.loginInfo.projectId,
        basicInfo: {
          name: '',
          model: '',
          inDate: '',
          outDate: ''
        },
        propertyNo: '',
        maxCapacity: '',
        deviceRecordNumName: '',
        installDate: null,
        remark: '',
        supAbbreviation: '',
        makeFactory: '',
        installAddress: ''
      },
      row: {},
      areaTypes: [],
      supList: [],
      dataRule: {
        basicInfo: {
          name: [
            { required: true, message: '设备名称不能为空', trigger: 'blur' }
          ],
          inDate: [
            { required: true, message: '设备进场时间不能为空', trigger: 'blur' }
          ],
          model: [
            { required: false, message: '设备型号不能为空', trigger: 'blur' }
          ],
          outDate: [
            { required: true, message: '设备出场时间不能为空', trigger: 'blur' }
          ]
        },
        supAbbreviation: [
          { required: true, message: '供应商名称不能为空', trigger: 'blur' }
        ],
        makeFactory: [
          { required: true, message: '厂家不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '备注不能为空', trigger: 'blur' }
        ],
        installAddress: [
          { required: true, message: '安装位置不能为空', trigger: 'blur' }
        ],
        maxCapacity: [
          { required: true, message: '最大载重不能为空', trigger: 'blur' },
          { pattern: /(^[0-9]{1,8}$)|(^[0-9]{1,8}[\.]{1}[0-9]{1,2}$)/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        installDate: [
          { required: true, message: '安装时间不能为空', trigger: 'blur' }
        ],
        deviceRecordNumName: [
          { required: true, message: '设备档案编号不能为空', trigger: 'blur' }
        ],
        propertyNo: [
          { required: true, message: '设备产权号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.row = row
      this.visible = true
      this.getDataList()
      this.getsupplierList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        // this.dataForm.basicInfo = {}
        if (row.id) {
          view({ id: row.id }).then(data => {
            if (data && data.code === 1000) {
              this.dataForm = data.result
              // this.dataForm.projectName = data.result.projectName || ''
              // this.dataForm.basicInfo = data.result.basicInfo || {}
              // this.dataForm.basicInfo.id = data.result.basicInfo.id
            }
          })
        }
      })
    },
    // 获取供应商
    getsupplierList() {
      supplierList({
        isDel: 0
        // 'deviceType': 5
      }).then((data) => {
        if (data && data.code === 1000) {
          this.supList = data.result.records
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
  .zhgd-elevator-modal {
    width: 600px;
  }
</style>
