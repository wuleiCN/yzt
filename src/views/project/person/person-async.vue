<template>
  <el-dialog
    custom-class="async-modal"
    title="同步设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-form-item label="人员类型" prop="thirdCategory">
        <el-select v-model.trim="dataForm.thirdCategory" style="width:100%" clearable placeholder="人员类型">
          <el-option v-for="(item, index) in list3" :key="index" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工种/岗位" prop="thirdJobTypeName">
        <el-select v-model.trim="dataForm.thirdJobTypeName" style="width:100%" clearable placeholder="工种/岗位">
          <el-option v-for="(item, index) in list1" :key="index" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工种" prop="thirdJobName">
        <el-select v-model.trim="dataForm.thirdJobName" style="width:100%" clearable placeholder="工种">
          <el-option v-for="(item, index) in list2" :key="index" :label="item.title" :value="item.tag"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { asynDetail, asyncSaveOrUpdate } from '@/api/project/person'
export default {
  data() {
    return {
      visible: false,
      list1: [],
      list2: [],
      list3: [],
      dataForm: {
        thirdCategory: '',
        thirdJobTypeName: '',
        thirdJobName: ''
      },
      dataRule: {
        thirdCategory: [
          { required: true, message: '请选择人员类型', trigger: 'blur' }
        ],
        thirdJobTypeName: [
          { required: true, message: '请选择工种', trigger: 'blur' }
        ],
        thirdJobName: [
          { required: true, message: '请选择工种/岗位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    init(platformName, id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.id = id
        this.optionList('JOB_TYPENAME_SZZJJ')
        this.optionList('JOB_NAME_SZZJJ')
        this.optionList('EMP_TYPR_SZZJJ')
      })
    },
    optionList(category) {
      asynDetail({ category }).then(data => {
        if (category === 'JOB_TYPENAME_SZZJJ') this.list1 = data.result
        if (category === 'JOB_NAME_SZZJJ') this.list2 = data.result
        if (category === 'EMP_TYPR_SZZJJ') this.list3 = data.result
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          asyncSaveOrUpdate({ ...this.dataForm, id: this.id }).then((data) => {
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
.async-modal{
  width: 600px;
}
</style>
