<template>
  <el-dialog
    custom-class="carousel-modal"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="closeHandle"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="项目名称" prop="projectId">
        <el-select v-model="dataForm.projectId" filterable style="width:100%" placeholder="请选择项目名称">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属看板" prop="model">
        <!-- <el-input-number v-model.number="dataForm.model" label="所属看板" /> -->
        <el-select v-model="dataForm.model" style="width: 100%" clearable placeholder="请选择所属看板">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上传类型：" prop="type">
        <el-radio-group v-model.trim="dataForm.type" style="width:100%">
          <el-radio :label="1">图片</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否启用：" prop="isEnable">
        <el-radio-group v-model.trim="dataForm.isEnable" style="width:100%">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sortNum">
        <el-input-number v-model="dataForm.sortNum" controls-position="right" :min="0" label="排序号" />
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" label="上传图片：" prop="url">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看封面' : '' }}</a>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 2" label="上传视频：" prop="url">
        <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'mp4'" :action="'/video/upload'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
        <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看视频' : '' }}</a>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from '@/api/statistic-dashboard-data/carousel'
import MyUpload from '@/components/upload'
import { projectSelectList } from '@/api/project/device'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      options: [
        { value: 1, label: '工程信息管理' }
      ],
      proList: [],
      visible: false,
      dataForm: {
        id: '',
        model: '',
        projectId: '',
        isEnable: 1,
        sortNum: '',
        type: 1,
        url: ''
      },
      dataRule: {
        model: [
          { required: true, message: '请选择所属看板', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请上传', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeHandle() {
      this.$refs.myUpload.$children[0].clearFiles()
    },
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getproSelectList()
        if (this.dataForm.id) {
          this.dataForm = row
        } else {
          this.dataForm.dictType = row.dictType
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
  .carousel-modal {
    width: 1000px;
  }
</style>
