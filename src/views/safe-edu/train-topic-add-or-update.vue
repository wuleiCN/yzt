<template>
  <el-dialog
    custom-class="train-topic"
    :title="!dataForm.id ? '新增培训课题' : '修改培训课题'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="handleClose"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-form-item class="train-style" label="培训人员：">
        <el-select v-model.trim="constructionId" class="train-search-team" clearable placeholder="所属参建单位" @clear="handleClear" @change="selectChange">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.construction.constructionName" :value="item.id">{{ item.construction.constructionName }}</el-option>
        </el-select>
        <el-select v-model.trim="teamId" class="train-search-team" clearable placeholder="所属班组" @change="selectTeamChange">
          <el-option v-for="(item, index) in teamList" :key="index" :label="item.teamName" :value="item.id">{{ item.teamName }}</el-option>
        </el-select>
        <MyTransfer v-if="myTransferVisible" ref="myTransfer" :data="data" />
      </el-form-item>
      <el-form-item label="所属项目：" prop="projectName">
        <el-input v-model.trim="dataForm.projectName" :disabled="true" placeholder="所属项目" />
      </el-form-item>
      <el-form-item label="课题名称：" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="课题名称" />
      </el-form-item>
      <el-form-item label="讲师：" prop="lecturer">
        <el-input v-model.trim="dataForm.lecturer" placeholder="讲师" />
      </el-form-item>
      <el-form-item label="课题类型：" prop="type">
        <el-select v-model.trim="dataForm.type" :disabled="!!dataForm.id" style="width:100%" clearable placeholder="请选择课题类型">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别：" prop="category">
        <el-radio-group v-model="dataForm.category" style="width:100%">
          <el-radio :label="1">线上</el-radio>
          <el-radio :label="2">线下</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间" prop="startEndTime">
        <el-date-picker
          v-model.trim="dataForm.startEndTime"
          style="width:100%"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="ck()"
        />
      </el-form-item>
      <el-form-item label="培训地址：" prop="trainAddress">
        <el-input v-model.trim="dataForm.trainAddress" placeholder="培训地址" />
      </el-form-item>
      <!-- <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model.trim="dataForm.endTime"
          style="width:100%"
          type="datetime"
          placeholder="结束时间"
        />
      </el-form-item> -->
      <el-form-item label="内容：" prop="content">
        <el-input
          v-model="dataForm.content"
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
import { saveOrUpdate, workersList, detail } from '@/api/project/train-topic'
import { projectsDetail, proSelectList } from '@/api/project/team'
import { teamList } from '@/api/project/person'
import MyTransfer from '@/components/transfer'
export default {
  components: {
    MyTransfer
  },
  props: {
    selectList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      data: [],
      copyData: [],
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
        name: '',
        projectName: '',
        lecturer: '',
        type: '',
        category: '',
        startEndTime: [],
        trainTime: '',
        trainAddress: '',
        // endTime: '',
        content: '',
        ids: []
      },
      dataRule: {
        projectName: [
          { required: true, message: '所属项目不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '课题名称不能为空', trigger: 'blur' }
        ],
        lecturer: [
          { required: true, message: '讲师不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '课题类型不能为空', trigger: 'blur' }
        ],
        startEndTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        ids: [
          { required: true, message: '请选择培训人员', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ck() {
      if (this.dataForm.startEndTime.length) {
        const hours = Math.floor((this.dataForm.startEndTime[1] - this.dataForm.startEndTime[0]) / (3600 * 1000))
        this.dataForm.trainTime = hours / 6
        console.log(this.dataForm.trainTime)
      }
    },
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.myTransferVisible = true
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.ids = []
        this.data = []
        this.constructionId = ''
        this.teamId = ''
        const dataList = await this.getWorkersList()
        const { projectId } = this.loginInfo
        this.dataForm.projectId = projectId
        if (this.dataForm.id) {
          detail({ id: this.dataForm.id }).then(data => {
            this.dataForm = data.result
            this.getProjectsDetail(this.dataForm.projectId)
            this.getProSelectList(this.dataForm.projectId)
            this.$refs.myTransfer.rightData = dataList.filter(item => {
              return this.dataForm.ids.includes(item.id)
            })
            this.$refs.myTransfer.dataList = this.$refs.myTransfer.dataList.filter(item => !this.dataForm.ids.includes(item.id))
          })
        } else {
          this.getProjectsDetail(this.dataForm.projectId)
          this.getProSelectList(this.dataForm.projectId)
        }
      })
    },
    // 根据loginInfo.projectId为参数获取所属项目中文名
    getProjectsDetail(id) {
      projectsDetail({ id }).then((data) => {
        this.$set(this.dataForm, 'projectName', data.result.projectName)
      })
    },
    // 所属参建单位选择列表
    getProSelectList(id) {
      proSelectList({ id, status: 0 }).then((data) => {
        this.proList = data.result
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
    handleClear() {
      this.data = this.copyData.filter(item => {
        return !this.$refs.myTransfer.rightData.map(ele => ele.id).includes(item.id)
      })
      this.$refs.myTransfer.dataList = this.data
    },
    // 选择参建单位，加载所属班组
    selectChange(constructionId) {
      this.teamId = ''
      this.getTeamList(constructionId, this.dataForm.projectId)
      this.data = [...this.copyData].filter(item => item.constructionId === constructionId)
      this.$set(this.dataForm, 'ids', this.dataForm.ids)
      this.$refs.myTransfer.dataList = this.data
    },
    selectTeamChange(teamId) {
      this.data = [...this.copyData].filter(item => item.teamId === teamId)
      this.$refs.myTransfer.dataList = this.data
    },
    // 人员列表
    getWorkersList() {
      return new Promise(resolve => {
        workersList({ projectId: this.loginInfo.projectId }).then((data) => {
          this.data = data && data.result ? data.result.map(item => {
            item.label = item.empName
            item.key = item.id
            return item
          }) : []
          this.copyData = this.data
          this.$refs.myTransfer.dataList = this.data.map((item, index) => {
            item.index = index
            return item
          })
          resolve(this.$refs.myTransfer.dataList)
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
          saveOrUpdate({ ...this.dataForm, ids: this.$refs.myTransfer.rightData.map(item => item.id) }).then((data) => {
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
  .train-topic {
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
