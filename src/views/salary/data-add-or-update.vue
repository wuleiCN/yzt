<template>
  <el-dialog
    custom-class="salary-data-modal"
    title="员工薪资设置1"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item
        v-for="(item, index) in dataForm.headerList"
        :key="index"
        :rules="[
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '格式不正确', trigger: ['blur', 'change'] }
        ]"
        :label="item.name"
        :prop="'headerList.' + index + '.value'"
      >
        <!-- {{ item }} -->
        <el-input v-model.trim="item.value" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/salary/data'
export default {
  data() {
    return {
      visible: false,
      data: [],
      dataForm: {
        headerList: []
      },
      ids: [],
      dataRule: {
        code: [
          { required: true, message: '方案代码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(headerList, ids, month, row) {
      this.ids = ids
      this.month = month
      this.dataForm.headerList = headerList.map(item => {
        if (row) {
          this.$set(item, 'value', row[item.code])
        } else {
          this.$set(item, 'value', '')
        }
        return item
      }) || []

      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      const params = {}
      this.dataForm.headerList.map(item => {
        params[item.code] = +item.value || 0
      })
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({ ...params, ids: this.ids, month: this.month }).then((data) => {
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
  .salary-data-modal {
    width: 800px;
  }
</style>
