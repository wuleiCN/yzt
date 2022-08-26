<template>
  <el-dialog
    custom-class="mark-point"
    :title="!show_ ? '新增标记' : '修改标记'"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="90px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="坐标名称" prop="id">
        <el-select
          v-model="dataForm.id"
          clearable
          placeholder="请选择项目名称"
        >
          <el-option
            v-for="(item, index) in proList"
            :key="index"
            :label="item.point"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="X坐标" prop="longitude">
        <el-input v-model.trim="dataForm.longitude" :disabled="true" placeholder="X坐标" />
      </el-form-item>
      <el-form-item label="Y坐标" prop="latitude">
        <el-input v-model.trim="dataForm.latitude" :disabled="true" placeholder="Y坐标" />
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      <el-button v-if="show_" type="danger" @click="delFormSubmit()">删除</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      show_: false,
      dataForm: {
        id: 1,
        point: '',
        longitude: '',
        latitude: ''
      },
      proList: [
        {
          id: 1,
          point: '一号检测点'
        },
        {
          id: 2,
          point: '二号检测点'
        },
        {
          id: 3,
          point: '三号检测点'
        },
        {
          id: 4,
          point: '四号检测点'
        },
        {
          id: 5,
          point: '五号检测点'
        }
      ],
      dataRule: {
        id: [
          { required: true, message: '不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.show_ = row.is
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.id = row.id || null
        this.dataForm.longitude = row.offsetX
        this.dataForm.latitude = row.offsetY
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$emit('refreshDataList', this.dataForm, true)
          this.visible = false
          this.dataForm.id = ''
          this.$message.success('操作成功')
          // saveOrUpdate({ ...this.dataForm }).then((data) => {
          // // saveOrUpdate({ ...this.dataForm }).then((data) => {
          //   if (data && data.code === 1000) {
          //     this.$message({
          //       message: '操作成功',
          //       type: 'success',
          //       duration: 1000,
          //       onClose: () => {
          //         this.visible = false
          //         this.$emit('refreshDataList', this.dataForm.projectId)
          //       }
          //     })
          //   } else {
          //     this.$message.error(data.message)
          //   }
          // })
        }
      })
    },
    delFormSubmit() {
      // this.$emit('refreshDataList', this.dataForm, false)
      // this.visible = false
      this.dataForm.id = 2
      this.$message.error('删除成功')
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .mark-point {
    width: 700px;
    .el-select {
      width: 100%;
    }
  }
</style>
