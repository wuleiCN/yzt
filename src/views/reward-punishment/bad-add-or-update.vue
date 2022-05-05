<template>
  <el-dialog
    custom-class="sys-bad-record-modal"
    :title="!dataForm.id ? '新增不良记录' : '修改不良记录'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="handleClose"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-form-item v-if="!dataForm.id" class="train-style" label="选择人员：">
        <el-select v-model.trim="constructionId" class="train-search-team" clearable placeholder="所属参建单位" @clear="handleClear" @change="selectChange">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.construction.constructionName" :value="item.id">{{ item.construction.constructionName }}</el-option>
        </el-select>
        <el-select v-model.trim="teamId" class="train-search-team" clearable placeholder="所属班组" @change="selectTeamChange">
          <el-option v-for="(item, index) in teamList" :key="index" :label="item.teamName" :value="item.id">{{ item.teamName }}</el-option>
        </el-select>
        <!-- <el-transfer
          v-model="dataForm.ids"
          style="width:100%"
          :titles="['未选中人员', '选中的人员']"
          filter-placeholder="请输入人员名称"
          :data="data"
        /> -->
        <MyTransfer v-if="myTransferVisible" ref="myTransfer" :data="data" />
      </el-form-item>
      <el-form-item label="奖惩类别：" prop="eventId">
        <el-select v-model.trim="dataForm.eventId" style="width:100%" clearable placeholder="请选择奖惩类别">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件：" prop="url">
        <my-upload ref="myUpload" :is-show="true" :limit="'png&pdf'" :title="'点击上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
        <!-- {{ dataForm.url }} -->
        <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看附件' : '' }}</a>
      </el-form-item>
      <el-form-item label="内容：" prop="cause">
        <el-input
          v-model="dataForm.cause"
          type="textarea"
          :rows="3"
          placeholder="请输入内容信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, update } from '@/api/sys/bad-record'
import { workersList, optionList } from '@/api/project/train-topic'
import { proSelectList } from '@/api/project/team'
import { teamList } from '@/api/project/person'
import MyUpload from '@/components/upload'
import MyTransfer from '@/components/transfer'
export default {
  components: {
    MyUpload,
    MyTransfer
  },
  data() {
    return {
      data: [],
      copyData: [],
      selectList: [],
      levelList: [],
      value: [],
      constructionId: '',
      teamId: '',
      proList: [],
      teamList: [],
      visible: false,
      myTransferVisible: false,
      loginInfo: this.$store.state.user.loginInfo,
      dataForm: {
        id: null,
        cause: '',
        eventId: '',
        url: '',
        ids: []
      },
      dataRule: {
        cause: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        eventId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        url: [
          { required: false, message: '请上传附件', trigger: 'blur' }
        ],
        ids: [
          { required: true, message: '请选择人员', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.myTransferVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.ids = []
        this.constructionId = ''
        this.teamId = ''
        this.getOptionList(this.dataForm.type)
        if (!row.id) {
          this.getWorkersList()
          this.getProSelectList(this.loginInfo.projectId)
        } else {
          this.dataForm = row
        }
      })
    },
    // 所属参建单位选择列表
    getProSelectList(id) {
      proSelectList({ id, status: 0 }).then((data) => {
        this.proList = data.result
      })
    },
    // 下拉奖惩类别
    getOptionList(type) {
      optionList({ category: 'CONSTRUCTION_EVENT' }).then(data => {
        this.selectList = data.result
      })
    },
    // 所属班组选择列表
    getTeamList(constructionId, projectId) {
      if (constructionId) {
        teamList({ constructionId, projectId }).then((data) => {
          this.teamList = data.result
        })
      }
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    handleClear() {
      this.data = this.copyData.filter(item => {
        return !this.$refs.myTransfer.rightData.map(ele => ele.id).includes(item.id)
      })
      this.$refs.myTransfer.dataList = this.data
    },
    // 选择参建单位，加载所属班组
    selectChange(constructionId) {
      this.teamId = ''
      this.getTeamList(constructionId, this.loginInfo.projectId)
      this.data = [...this.copyData].filter(item => item.constructionId === constructionId)
      this.$refs.myTransfer.dataList = this.data
    },
    selectTeamChange(teamId) {
      this.data = [...this.copyData].filter(item => item.teamId === teamId)
      this.$refs.myTransfer.dataList = this.data
    },
    // 人员列表
    getWorkersList() {
      workersList({ projectId: this.loginInfo.projectId }).then((data) => {
        this.data = data.result.map(item => {
          item.label = item.empName
          item.key = item.id
          return item
        })
        this.copyData = this.data
        this.$refs.myTransfer.dataList = this.data.map((item, index) => {
          item.index = index
          return item
        })
      })
    },
    handleClose() {
      this.myTransferVisible = false
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            update({ ...this.dataForm }).then((data) => {
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
          } else {
            save({ ...this.dataForm, ids: this.$refs.myTransfer.rightData.map(item => item.id) }).then((data) => {
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
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .sys-bad-record-modal {
    width: 710px;
    .el-transfer-panel__item {
      line-height: 10px;
    }
    .el-transfer-panel {
      width: 324px;
    }
    .el-checkbox {
      display: block;
    }
    .train-search-con {
      // position: absolute;
      // top: 50px;
      // z-index: 1000;
      width: 110px;
    }
    .train-search-team {
      // position: absolute;
      // top: 50px;
      // left: 17%;
      // z-index: 1000;
      width: 110px;
    }
    .train-style .el-form-item__content {
      border-left: 1px solid #F5F7FA
    }
  }
</style>
