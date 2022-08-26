<template>
  <div>
    <el-dialog
      custom-class="retrieval-add-or-update-modal"
      :title="!dataForm.id ? '新增材料出库单' : '材料出库单详情'"
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
            <el-form-item label="出库数量" prop="exHouseNumber">
              <el-input v-model.number="dataForm.exHouseNumber" :disabled="dataForm.id !== null" clearable placeholder="请输入出库数量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出库场所" prop="exHouseSite">
              <el-input v-model.trim="dataForm.exHouseSite" placeholder="请输入出库场所" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="supplier" label="领用单位" prop="collectCompany">
          <el-input v-model.trim="dataForm.collectCompany" class="supplierName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="领用时间" prop="outHouseTime">
              <el-date-picker
                v-model="dataForm.outHouseTime"
                clearable
                type="datetime"
                placeholder="请输入领用时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="领用人" prop="receiver">
              <el-input v-model.trim="dataForm.receiver" placeholder="请输入领用人" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="supplier" label="备注" prop="remarks">
          <el-input v-model.trim="dataForm.remarks" class="supplierName" type="textarea" autosize placeholder="备注" />
        </el-form-item>
        <el-form-item label="出库单上传" prop="riskLevel">
          <el-upload
            :action="$http.baseUrl('/user/upload')"
            :headers="{
              token: loginInfo.token
            }"
            :limit="3"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.PBG,.BMP"
            :file-list="fileList"
            multiple
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
import { saveOrUpdate } from '@/api/material/materialRetrieval'
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
        exHouseSite: '',
        exHouseNumber: '',
        collectCompany: '',
        materialSpec: '',
        outHouseTime: '',
        receiver: '',
        remarks: '',
        acceptanceSheet: '',
        unit: ''
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
          { required: true, message: '请选择场所名称', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '材料编码不能为空', trigger: 'blur' }
        ],
        exHouseSite: [
          { required: true, message: '出库场所不能为空', trigger: 'blur' }
        ],
        exHouseNumber: [
          { required: true, message: '出库数量不能为空' },
          { type: 'number', message: '必须为数字值' }
        ],
        collectCompany: [
          { required: true, message: '领用单位不能为空', trigger: 'blur' }
        ],
        materialSpec: [
          { required: true, message: '材料规格不能为空', trigger: 'blur' }
        ],
        outHouseTime: [
          { required: true, message: '领用时间不能为空', trigger: 'blur' }
        ],
        receiver: [
          { required: true, message: '领用人不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '计量单位不能为空', trigger: 'blur' }
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
          if (this.dataForm.acceptanceSheet !== '') {
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
    getParameterList() {
      getList({ rows: 9999 }).then(res => {
        if (res.code === 1000 && res.result.records) {
          this.parameterList = res.result.records
          res.result.records.map((v, i) => {
            this.materialOptions.push({ value: '', label: '' })
            this.materialOptions[i].value = this.materialOptions[i].label = v.materialCode
          })
        }
        console.log('param', res)
      })
    },
    selectOption() {
      const s = this.parameterList.find(v => v.materialCode === this.dataForm.materialCode)
      this.dataForm.materialName = s.materialName
      this.dataForm.materialSpec = s.materialSpec || '无'
      this.dataForm.unit = s.unit
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
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.disabled = false
        }
      })
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
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .retrieval-add-or-update-modal {
    width: 950px;
    .el-dialog__body {
      padding-top: 0;
      .el-date-editor, .el-select {
        width: 100%;
      }
    }
  }
</style>
