<template>
  <el-dialog
    custom-class="role-modal"
    :title="!dataForm.id ? '新增角色' : `修改角色-${dataForm.name}`"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="角色类型：" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for="(item, index) in userTypes" :key="index" :label="item.id"> {{ item.name }} </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="dataForm.status" style="width:100%" placeholder="请选择状态">
          <el-option label="启用" :value="1"> 启用 </el-option>
          <el-option label="禁用" :value="0"> 禁用 </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/sys/role'
export default {
  data() {
    return {
      visible: false,
      menuList: [],
      dataForm: {
        id: null,
        name: '',
        status: '',
        type: null
      },
      userTypes: [
        { id: 0, name: '集团' },
        { id: 1, name: '公司' },
        { id: 2, name: '项目' },
        { id: 3, name: '参建单位' }
      ],
      loginInfo: JSON.parse(sessionStorage.getItem('result')),
      dataRule: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '角色类型不能为空', trigger: 'blur' }
        ]
      },
      tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
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
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm, userId: this.loginInfo.id }).then((data) => {
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
  .role-modal {
    width: 500px
  }
</style>
