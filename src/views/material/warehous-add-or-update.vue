<template>
  <div>
    <el-dialog
      custom-class="warehous-add-or-update-modal"
      :title="!dataForm.id ? '新增材料入库单' : '材料入库单信息'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="cancel"
    >
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
        <el-row>
          <el-col :span="12">
            <el-form-item label="材料名称" prop="materialName">
              <el-input v-model.trim="dataForm.materialName" placeholder="材料名称" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="材料规格" prop="materialSpec">
              <el-input v-model.trim="dataForm.materialSpec" placeholder="请输入材料编码" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="材料编码" prop="materialCode">
              <el-select v-model="dataForm.materialCode" placeholder="材料编码" :disabled="dataForm.id !== null" @change="selectOption()">
                <el-option
                  v-for="item in materialOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计量单位" prop="unit">
              <el-input v-model.trim="dataForm.unit" placeholder="计量单位" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入库数量" prop="inHouseNumber">
              <el-input v-model.number="dataForm.inHouseNumber" :disabled="dataForm.id !== null" clearable placeholder="请输入入库数量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放场地" prop="storageSite">
              <el-input v-model.trim="dataForm.storageSite" placeholder="请输入存放场地" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="supplier" label="供应商名称" prop="supplierName">
          <el-input v-model.trim="dataForm.supplierName" class="supplierName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入库时间" prop="inHouseTime">
              <el-date-picker
                v-model="dataForm.inHouseTime"
                type="datetime"
                clearable
                placeholder="请输入入库时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库人员" prop="inHouseUser">
              <el-input v-model.trim="dataForm.inHouseUser" placeholder="入库人员" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="supplier" label="备注" prop="riskLevel">
          <el-input v-model.trim="dataForm.riskLevel" class="supplierName" type="textarea" autosize placeholder="备注" />
        </el-form-item>
        <el-form-item label="验收单上传" prop="riskLevel">
          <el-upload
            :action="$http.baseUrl('/user/upload')"
            :headers="{
              token: loginInfo.token
            }"
            :limit="3"
            multiple
            list-type="picture-card"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.PBG,.BMP"
            :file-list="fileList"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="userType !== 2 || disabled" @click="dataFormSubmit()">确定</el-button>
        <el-button type="info" style="margin-left: 30px;" @click="cancel()">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdate } from '@/api/material/materialWarehous'
import { getList } from '@/api/material/parameterSite'
export default {
  data() {
    return {
      visible: false,
      disabled: false,
      dataForm: {
        id: null,
        materialName: '',
        materialCode: '',
        materialSpec: '',
        inHouseUser: '',
        inHouseNumber: '',
        inHouseTime: '',
        supplierName: '',
        storageSite: '',
        unit: '',
        acceptanceSheet: ''
      },
      parameterList: [],
      materialOptions: [],
      fileList: [],
      loginInfo: this.$store.state.user.loginInfo,
      dialogImageUrl: '',
      dialogVisible: false,
      userType: JSON.parse(sessionStorage.getItem('result')).userType,
      projectList: [],
      dataRule: {
        materialName: [
          { required: true, message: '场所名称不能为空', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '材料编码不能为空', trigger: 'blur' }
        ],
        materialSpec: [
          { required: true, message: '材料规格不能为空', trigger: 'blur' }
        ],
        inHouseUser: [
          { required: true, message: '入库人员不能为空', trigger: 'blur' }
        ],
        inHouseNumber: [
          { required: true, message: '入库数量不能为空' },
          { type: 'number', message: '必须为数字值' }
        ],
        inHouseTime: [
          { required: true, message: '请选择入库时间', trigger: 'blur' }
        ],
        supplierName: [
          { required: true, message: '供应商名称不能为空', trigger: 'blur' }
        ],
        storageSite: [
          { required: true, message: '存放场地不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '状态不能计量单位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getParameterList()
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.disabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = { ...row }
          if (this.dataForm.acceptanceSheet) {
            var arr = this.dataForm.acceptanceSheet.split(',')
            setTimeout(() => {
              arr.map((v, i) => {
                const obj = { url: v }
                this.fileList.push(obj)
              })
            }, 200)
          }
        }
      })
    },
    getParameterList() {
      getList({ rows: 9999 }).then(res => {
        if (res.code === 1000 && res.result.records) {
          this.parameterList = res.result.records
          res.result.records.map((v, i) => {
            this.materialOptions.push({ value: '', label: '' })
            this.materialOptions[i].value = this.materialOptions[i].label = v.materialCode
          })
        }
      })
    },
    selectOption() {
      const s = this.parameterList.find(v => v.materialCode === this.dataForm.materialCode)
      this.dataForm.materialName = s.materialName
      this.dataForm.materialSpec = s.materialSpec || '无'
      this.dataForm.unit = s.unit
    },
    handleRemove(file, fileList) {
      this.dataForm.acceptanceSheet = ''
      fileList.map(v => {
        this.dataForm.acceptanceSheet === '' ? this.dataForm.acceptanceSheet = v.url : this.dataForm.acceptanceSheet += ',' + v.url
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed() {
      this.$message.error('文件超出个数,只允许上传三个文件')
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        this.disabled = true
        if (valid) {
          saveOrUpdate(this.dataForm).then(res => {
            if (res.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }
          })
        } else {
          this.disabled = false
        }
      })
    },
    handleSuccess(res, file) {
      if (res.code === 1000) {
        this.dataForm.acceptanceSheet === '' ? this.dataForm.acceptanceSheet = res.result : this.dataForm.acceptanceSheet += ',' + res.result
        console.log(this.dataForm.acceptanceSheet)
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message.error(res.message)
      }
    },
    beforeUpload(file) {
      const fileType = file.name.split('.')[file.name.split('.').length - 1]
      const isLt100M = file.size / 1024 / 1024 < 500
      // console.log(file, this.limit, fileType, ['jpg', 'png'].includes(fileType))
      if (!['jpg', 'png', 'jpeg', 'bmp', 'JPG', 'JPEG', 'PBG', 'BMP'].includes(fileType)) {
        this.$message.error('只能上传图片')
        return false
      }
      if (!isLt100M) {
        this.$message.error('上传大小不能超过 500MB!')
      }
      return isLt100M
    },
    cancel() {
      this.fileList = []
      // this.dataForm = {}
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .warehous-add-or-update-modal {
    width: 950px;
    .el-dialog__body {
      padding-top: 0;
      .el-date-editor, .el-select {
        width: 100%;
      }
    }
  }
</style>
