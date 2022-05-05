<template>
  <el-dialog
    :title="!dataForm.id ? '新增地区' : '修改地区'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px">
      <el-form-item label="全称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="全称" />
      </el-form-item>
      <el-form-item label="简称" prop="areaName">
        <el-input v-model="dataForm.areaName" placeholder="简称" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/sys/area'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        fullName: '',
        areaName: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '全称不能为空', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '简称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    init(row) {
      this.dataForm.id = row.id || null
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
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            })
            this.visible = false
            this.$emit('refreshDataList')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      max-width: 460px;
    }
    &__icon-list {
      min-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
