<template>
  <el-dialog
    custom-class="gyc-community-modal"
    :title="!dataForm.id ? '新增单元' : '修改单元'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item>
        <span style="color:#E6A23C">温馨提示 单元名称格式为：A-01</span>
      </el-form-item>
      <el-form-item label="单元名称：" prop="unitName">
        <el-input v-model.trim="dataForm.unitName" placeholder="单元名称" />
      </el-form-item>
      <el-form-item label="楼层：" prop="floor">
        <el-input v-model.trim="dataForm.floor" :disabled="!!dataForm.id" placeholder="楼层" />
      </el-form-item>
      <el-form-item label="楼层房间数：" prop="roomNums">
        <el-input v-model.trim="dataForm.roomNums" :disabled="!!dataForm.id" placeholder="楼层房间数" />
      </el-form-item>
      <el-form-item label="单元属性:" prop="unitType">
        <el-select v-model="dataForm.unitType" clearable filterable style="width:100%" placeholder="请选择单元属性">
          <el-option v-for="(item, index) in areaUnitTypes" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="责任人：" prop="personLiable">
        <el-input v-model.trim="dataForm.personLiable" placeholder="责任人" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="personLiablePhone">
        <el-input v-model.trim="dataForm.personLiablePhone" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="是否开启:" prop="isOpen">
        <el-radio-group v-model.trim="dataForm.isOpen" style="width:100%">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model.trim="dataForm.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/gyc/unit'
export default {
  data() {
    return {
      visible: false,
      areaUnitTypes: [],
      dataForm: {
        id: '',
        liveAreaId: '',
        unitName: '',
        floor: '',
        unitType: '',
        roomNums: '',
        personLiable: '',
        personLiablePhone: '',
        remark: '',
        isOpen: 1
      },
      dataRule: {
        unitName: [
          { required: true, message: '单元名称不能为空', trigger: 'blur' },
          { pattern: /^[A-Z]{1}[-]{1}[0-9]{2}$/, message: '单元名称格式不正确', trigger: ['blur', 'change'] }
        ],
        floor: [
          { required: true, message: '楼层不能为空', trigger: 'blur' },
          { pattern: /^[1-9][0-9]?$/, message: '楼层格式不正确', trigger: ['blur', 'change'] }
        ],
        roomNums: [
          { required: true, message: '楼层房间数不能为空', trigger: 'blur' },
          { pattern: /^[1-9][0-9]?$/, message: '楼层房间数格式不正确', trigger: ['blur', 'change'] }
        ],
        unitType: [
          { required: true, message: '单元属性不能为空', trigger: 'blur' }
        ],
        personLiable: [
          { required: true, message: '责任人不能为空', trigger: 'blur' }
        ],
        personLiablePhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '联系电话格式不正确', trigger: ['blur', 'change'] }
        ],
        isOpen: [
          { required: true, message: '是否开启不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || ''
      this.areaUnitTypes = row.areaUnitTypes
      this.dataForm.liveAreaId = row.liveAreaId
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        }
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
  .gyc-community-modal {
    width: 600px;
  }
</style>
