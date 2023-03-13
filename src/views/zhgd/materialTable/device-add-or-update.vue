<template>
  <el-dialog
    custom-class="material-table-model"
    :title="!dataForm.id ? '新增设备' : '修改设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="项目名称">
        <el-select
          v-if="userType === 1 || userType === 0"
          v-model="dataForm.projectId"
          clearable
          filterable
          placeholder="请选择项目名称"
          @change="e => searchHandle()"
        >
          <el-option
            v-for="item in proList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          >
            <span style="float: left">{{ item.projectName }}</span>
          </el-option>
        </el-select>
        <span v-else class="title">{{ proName }}</span>
      </el-form-item>
      <el-form-item label="设备名称" prop="brandName">
        <el-input v-model.trim="dataForm.brandName" placeholder="设备名称" />
      </el-form-item>
      <el-form-item label="设备编号" prop="productName">
        <el-input v-model.trim="dataForm.productName" placeholder="设备编号" />
      </el-form-item>
      <el-form-item label="额定承重t" prop="param">
        <el-input-number v-model.trim="dataForm.param" :precision="2" :step="1" :max="999" placeholder="0.00" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/product'
import { vehicleProList } from '@/api-zhgd/vehicle-monitor'
export default {
  data() {
    return {
      visible: false,
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      proList: [],
      dataForm: {
        id: '',
        projectId: '',
        brandName: '',
        productName: '',
        param: ''
      },
      dataRule: {
        projectId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        param: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    this.proList = await this.vehicleProListHandle()
    if (this.proList.length) {
      this.proName = this.proList[0].projectName
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.id = row.id || null
        if (this.dataForm.id) {
          this.dataForm = row
        }
      })
    },
    // 获取项目列表
    vehicleProListHandle() {
      return new Promise(resolve => {
        vehicleProList().then(data => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          }
        })
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
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
  .material-table-model {
    width: 700px;
  }
</style>
