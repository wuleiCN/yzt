<template>
  <el-dialog
    custom-class="news-modal"
    :title="!dataForm.id ? '新增新闻文章' : '修改新闻文章'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="项目名称" prop="projectId">
        <el-select v-model="dataForm.projectId" filterable style="width:100%" placeholder="请选择项目名称">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章名称" prop="title">
        <el-input v-model.trim="dataForm.title" placeholder="文章名称" />
      </el-form-item>
      <el-form-item label="文章内容" prop="dataForm">
        <vue-ueditor-wrap v-model="dataForm.content" :config="editorConfig" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/statistic-dashboard-data/news'
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
import { projectSelectList } from '@/api/project/device'
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      proList: [],
      editorConfig: {
        zIndex: 1000000,
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
        UEDITOR_HOME_URL: '/static/ueditor/',
        // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: this.$http.baseUrl('/ueditor/main')
        // serverUrl: 'http://192.168.1.176/yzt-provider/ueditor/main'
      },
      visible: false,
      dataForm: {
        id: null,
        title: '',
        projectId: '',
        content: ''
      },
      dataRule: {
        name: [
          { required: true, message: '文章名称不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.getproSelectList()
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = { ...this.dataForm, ...row }
        }
      })
    },
    // 所属项目下拉
    getproSelectList(id) {
      projectSelectList({ id }).then((data) => {
        this.proList = data.result || []
        if (this.proList.length === 1) this.$set(this.dataForm, 'projectId', this.proList[0].id)
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
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
  .news-modal {
    width: 1000px;
  }
</style>
