<template>
  <el-dialog
    custom-class="train-topic-modal"
    :title="!dataForm.id ? '新增工人奖惩' : '修改工人奖惩'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="handleClose"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-form-item v-if="!dataForm.id" class="train-style" label="奖惩人员：">
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
      <el-form-item label="类型：" prop="type">
        <el-radio-group v-model="dataForm.type" style="width:100%" @change="handleChange">
          <el-radio :label="1">奖励</el-radio>
          <el-radio :label="2">惩罚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="奖惩类别：" prop="category">
        <el-select v-model.trim="dataForm.category" style="width:100%" clearable placeholder="请选择奖惩类别">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖惩等级：" prop="levels">
        <el-select v-model.trim="dataForm.levels" style="width:100%" clearable placeholder="请选择奖惩等级">
          <el-option v-for="(item, index) in levelList" :key="index" :label="item.title" :value="item.id"> {{ item.title }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额：" prop="amount">
        <el-input v-model.trim="dataForm.amount" placeholder="金额" />
      </el-form-item>
      <el-form-item label="描述：" prop="content">
        <el-input
          v-model="dataForm.content"
          type="textarea"
          :rows="3"
          placeholder="请输入描述信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { save, update } from '@/api/project/reward-punish'
import { workersList, optionList } from '@/api/project/train-topic'
import { proSelectList } from '@/api/project/team'
import { teamList } from '@/api/project/person'
import MyTransfer from '@/components/transfer'
export default {
  components: {
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
        type: 1,
        category: '',
        levels: '',
        amount: '',
        content: '',
        ids: []
      },
      dataRule: {
        amount: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          { pattern: /(^[0-9]{1,8}$)|(^[0-9]{1,8}[\.]{1}[0-9]{1,2}$)/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        category: [
          { required: true, message: '奖惩类别不能为空', trigger: 'blur' }
        ],
        levels: [
          { required: true, message: '奖惩等级不能为空', trigger: ['blur'] }
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
        if (!row.id) {
          this.getWorkersList()
          this.getProSelectList(this.loginInfo.projectId)
        } else {
          this.dataForm = { ...row }
        }
        this.getOptionList(this.dataForm.type)
        this.getlevelList(this.dataForm.type)
      })
    },
    // 所属参建单位选择列表
    getProSelectList(id) {
      proSelectList({ id, status: 0 }).then((data) => {
        if (data.code === 1000 && data.result) this.proList = data.result
      })
    },
    // 下拉奖惩类别
    getOptionList(type) {
      optionList({ category: type === 1 ? 'REW_CATEGORY' : 'PUN_CATEGORY' }).then(data => {
        this.selectList = data.result
      })
    },
    // 下拉奖惩等级
    getlevelList(type) {
      optionList({ category: type === 1 ? 'REW_LEVEL' : 'PUN_LEVEL' }).then(data => {
        this.levelList = data.result
      })
    },
    handleChange(type) {
      this.dataForm.category = ''
      this.dataForm.levels = ''
      this.getOptionList(type)
      this.getlevelList(type)
    },
    handleClear() {
      this.data = this.copyData.filter(item => {
        return !this.$refs.myTransfer.rightData.map(ele => ele.id).includes(item.id)
      })
      this.$refs.myTransfer.dataList = this.data
    },
    // 所属班组选择列表
    getTeamList(constructionId, projectId) {
      if (constructionId) {
        teamList({ constructionId, projectId }).then((data) => {
          this.teamList = data.result
        })
      }
    },
    // 选择参建单位，加载所属班组
    selectChange(constructionId) {
      this.teamId = ''
      this.getTeamList(constructionId, this.loginInfo.projectId)
      this.data = [...this.copyData].filter(item => item.constructionId === constructionId).filter(item => !this.$refs.myTransfer.rightData.map(ele => ele.id).includes(item.id))
      this.$refs.myTransfer.dataList = this.data
    },
    selectTeamChange(teamId) {
      this.data = [...this.copyData].filter(item => item.teamId === teamId)
      this.$refs.myTransfer.dataList = this.data
    },
    // 人员列表
    getWorkersList() {
      workersList({ projectId: this.loginInfo.projectId }).then((data) => {
        if (data.code === 1000 && data.result) {
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
        }
      })
    },
    handleClose() {
      this.myTransferVisible = false
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.amount = +this.dataForm.amount
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
  .train-topic-modal {
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
