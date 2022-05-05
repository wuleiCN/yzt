<template>
  <el-dialog
    custom-class="contract-editor-modal"
    :title="!dataForm.id ? '新增合同类型' : '修改合同类型'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-form-item label="合同类型名称" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="合同类型名称" />
      </el-form-item>
      <el-form-item label="类型" prop="contractType">
        <el-radio-group v-model="dataForm.contractType" style="width:100%">
          <el-radio :label="1">进场</el-radio>
          <el-radio :label="2">退场</el-radio>
          <el-radio :label="3">安全培训</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="模板内容" prop="content">
        <Uediter ref="ue" :value="ueditor.value" :config="ueditor.config" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <el-dialog
      custom-class="contract-category-keys-modal"
      title="关键词"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="visible1"
    >
      <span v-for="(item, index) in keyList" :key="index" @click="getKey(item)" v-html="item + '， '" />
    </el-dialog>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, detail, getKeyWord } from '@/api/project/contractCategory'
import Uediter from '@/components/ueditor'
export default {
  components: {
    Uediter
  },
  data() {
    return {
      visible: false,
      dat: {
        content: ''
      },
      keyList: [],
      visible1: false,
      ueditor: {},
      dataForm: {
        id: null,
        name: '',
        contractType: '',
        content: ''
      },
      dataRule: {
        name: [
          { required: true, message: '合同类型名称不能为空', trigger: 'blur' },
          { pattern: /^(?=[\S\s]{1,20}$)[\S\s]*/, message: '字符长度不能超过20', trigger: ['blur', 'change'] }
        ],
        contractType: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const that = this
    this.ueditor = {
      value: '',
      config: {
        initialFrameWidth: 800,
        zIndex: 1000000,
        initialFrameHeight: 420,
        contextMenu: [
          { label: '合同关键字', cmdName: 'cleardoc',
            icon: 'aligntd',
            exec: function() {
              that.showDodal()
              that.ue = this
            }
          }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.getKeyWord()
      this.dataForm.id = id
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          detail({ id }).then(res => {
            this.dataForm = res.result
            setTimeout(() => {
              this.$refs.ue.editor.setContent(res.result.content)
            }, 500)
          })
        } else {
          setTimeout(() => {
            this.$refs.ue.editor.setContent('')
          }, 500)
        }
      })
    },
    showDodal(e) {
      this.visible1 = true
    },
    getKeyWord() {
      getKeyWord({ }).then((data) => {
        this.keyList = data.result
      })
    },
    getKey(item) {
      this.ue.execCommand('insertHtml', `${item}`)
      this.visible1 = false
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm, content: this.$refs.ue.getUEContent() }).then((data) => {
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
.contract-editor-modal {
  width: 1100px;
}
.contract-category-keys-modal {
  width: 500px;
  height: 500px;
  margin-top: 20vh !important;
  .el-dialog__body {
    padding: 15px;
  }
}
</style>
