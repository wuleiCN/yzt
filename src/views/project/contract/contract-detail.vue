<template>
  <div class="contract-detail">
    <el-dialog
      custom-class="contract-editor-modal"
      title="合同模板设置"
      :close-on-click-modal="false"
      :visible.sync="visible1"
    >
      <div style="overflow: auto;height: 700px;">
        <el-form ref="dataForm" :inline="true" :rules="dataRule" :model="dataForm">
          <el-form-item label="模板类型" prop="id">
            <el-select v-model="categoryId" placeholder="请选择" @change="tempChange">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="dataForm.name" clearable placeholder="模板名称" />
          </el-form-item>
          <el-form-item class="">
            <el-button type="primary" @click="saveHandle()">保存</el-button>
            <el-button type="primary" @click="useTempHandle()">使用默认模板</el-button>
          </el-form-item></el-form>
        <div class="contract-category-edit">
          <Uediter ref="ue" :value="ueditor.value" :config="ueditor.config" />
          <el-dialog
            custom-class="contract-keys-modal"
            title="关键词"
            append-to-body
            :close-on-click-modal="false"
            :visible.sync="visible"
          >
            <span v-for="(item, index) in keyList" :key="index" style="cursor: pointer;" @click="getKey(item)" v-html="item + '， '" />
          </el-dialog>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Uediter from '@/components/ueditor'
import { getCategoryList, getTempDetail, detail, tempSaveOrUpdate, getKeyWord } from '@/api/project/contractCategory'
export default {
  components: {
    Uediter
  },
  data() {
    return {
      dat: {
        content: ''
      },
      dataForm: {
        id: null
      },
      dataRule: {
        name: [
          { required: true, message: '模板名称不能为空', trigger: 'blur' },
          { pattern: /^(?=[\S\s]{1,20}$)[\S\s]*/, message: '字符长度不能超过20', trigger: ['blur', 'change'] }
        ]
      },
      categoryId: '',
      keyList: [],
      categoryList: [],
      visible: false,
      visible1: false,
      ueditor: {}
    }
  },
  created() {
    const that = this
    this.ueditor = {
      value: '',
      config: {
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
      this.visible1 = true
      this.projectId = id
      this.$nextTick(() => {
        this.getCategoryList()
        this.getKeyWord()
      })
    },
    showDodal(e) {
      this.visible = true
    },
    getCategoryList() {
      getCategoryList().then(data => {
        this.categoryList = data.result
        this.categoryId = data.result.length ? data.result[0].id : ''
        // console.log(this.$router.history.current)
        this.getTempDetail(this.projectId, this.categoryId)
      })
    },
    getTempDetail(projectId, categoryId) {
      getTempDetail({ projectId, categoryId }).then(data => {
        // console.log(data.result)
        this.dataForm = data.result || {}
        setTimeout(() => {
          this.$refs.ue.editor.setContent(data.result ? data.result.content : '')
        }, 500)
      })
    },
    useTempHandle() {
      detail({ id: this.categoryId }).then(data => {
        setTimeout(() => {
          this.$refs.ue.editor.setContent(data.result.content)
        }, 500)
      })
    },
    saveHandle() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.$refs.ue.getUEContent()) {
            return this.$message.error('请输入内容')
          }
          tempSaveOrUpdate({ ...this.dataForm, content: this.$refs.ue.getUEContent(), projectId: this.projectId, categoryId: this.categoryId }).then(data => {
            this.visible1 = false
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            })
          })
        }
      })
    },
    getKeyWord() {
      getKeyWord({ }).then((data) => {
        this.keyList = data.result
      })
    },
    getKey(item) {
      this.ue.execCommand('insertHtml', `${item}`)
      this.visible = false
    },
    tempChange(categoryId) {
      this.getTempDetail(this.projectId, categoryId)
    }
  }
}
</script>

<style lang="scss">
  .contract-detail {
    .pro-editor-modal {
      width: 500px;
      .el-dialog__body {
        padding: 15px;
      }
    }
    .contract-editor-modal {
      width: 1200px;
      .el-dialog__body {
        padding: 15px;
      }
    }
    .edui-default .edui-editor {
      width: 100% !important;
    }

  }
  .contract-keys-modal {
    width: 500px;
    height: 500px;
    margin-top: 20vh !important;
    .el-dialog__body {
      padding: 15px;
    }
  }
</style>
