<template>
  <el-dialog
    custom-class="zhgd-sys-dict-modal"
    :title="!dataForm.id ? '新增车辆设备' : '修改车辆设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">

      <!-- <el-form-item label="设备编号：" prop="deviceId">
        <el-input v-model.trim="dataForm.deviceId" placeholder="设备编号" />
      </el-form-item> -->
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model.trim="dataForm.deviceName" placeholder="设备名称" />
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
      <!-- <el-form-item label="进出方向" prop="inOut">
        <el-radio-group v-model.trim="dataForm.inOut" style="width:100%">
          <el-radio :label="1">进</el-radio>
          <el-radio :label="2">出</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="摄像头类型" prop="devType">
        <el-radio-group v-model.trim="dataForm.devType" style="width:100%">
          <el-radio :label="1">地面库</el-radio>
          <el-radio :label="2">地库</el-radio>
        </el-radio-group>
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
import { save, update } from '@/api-zhgd/vehicle-device'
import { getList } from '@/api-zhgd/sys/dict'
import { getSupplier as supplierList } from '@/api-zhgd/sys/supplier'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        // deviceId: '',
        supAbbreviation: '',
        projectId: this.$store.state.user.loginInfo.projectId,
        deviceName: '',
        installDate: null,
        remark: '',
        inOut: 1,
        devType: 1,
        installAddress: ''
      },
      supList: [],
      areaTypes: [],
      dataRule: {
        // deviceId: [
        //   { required: true, message: '设备编号不能为空', trigger: 'blur' }
        // ],
        remark: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        installAddress: [
          { required: true, message: '安装位置不能为空', trigger: 'blur' }
        ],
        installDate: [
          { required: true, message: '安装时间不能为空', trigger: 'blur' }
        ],
        supAbbreviation: [
          { required: true, message: '供应商不能为空', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        inOut: [
          { required: true, message: '进出方向不能为空', trigger: 'blur' }
        ],
        devType: [
          { required: true, message: '摄像头类型不能为空', trigger: 'blur' }
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
      this.getsupplierList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        } else {
          // this.dataForm.dictType = row.dictType
        }
      })
    },
    getsupplierList() {
      supplierList({
        isDel: 0
        // 'deviceType': 1
      }).then((data) => {
        if (data && data.code === 1000) {
          this.supList = data.result
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
  .zhgd-sys-dict-modal {
    width: 600px;
  }
</style>
