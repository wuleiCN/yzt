<template>
  <el-dialog
    custom-class="safelity-add-update"
    :title="!dataForm.id ? '新增人员信息' : '修改人员信息'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="140px" @keyup.enter.native="dataFormSubmit()">
      <el-row :gutter="20">
        <el-form-item v-if="dataForm.id" label="人员姓名" prop="empName">
          <el-input v-model.trim="dataForm.empName" disabled />
        </el-form-item>
        <el-form-item v-if="!dataForm.id" label="人员姓名" prop="employeeId">
          <el-select
            v-model="dataForm.employeeId"
            filterable
            style="width:100%"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in proList"
              :key="index"
              :label="item.emp_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="安全看板区域类型" prop="type">
          <el-select v-model.trim="dataForm.type" style="width:100%" placeholder="请选择类型">
            <el-option v-for="(item, index) in type" :key="index" :label="item.dictLabel" :value="item.value">{{ item.dictLabel }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dataForm.type === 3" label="项目寄语" prop="message">
          <el-input v-model.trim="dataForm.message" maxlength="30" show-word-limit placeholder="项目寄语" />
        </el-form-item>
        <el-form-item v-if="dataForm.type === 1" label="安全评分" prop="saftyPf">
          <el-input v-model.trim="dataForm.saftyPf" type="number" placeholder="安全评分" />
        </el-form-item>
        <el-form-item v-if="dataForm.type === 3" label="季度榜" prop="quarterType">
          <el-select v-model.trim="dataForm.quarterType" style="width:100%" placeholder="请选择区域">
            <el-option v-for="(item, index) in quarterType" :key="index" :label="item.dictLabel" :value="item.value">{{ item.dictLabel }}</el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addStalyStart, updateStalyStart, getList } from '@/api/statistic-dashboard-data/safelityStars'
// import { getList } from '@/api-zhgd/sys/dict'
export default {
  data() {
    return {
      visible: false,
      type: [
        {
          dictLabel: '风采展示',
          value: 1
        },
        {
          dictLabel: '监督管理小组',
          value: 2
        },
        {
          dictLabel: '季度榜',
          value: 3
        }
      ],
      quarterType: [
        {
          dictLabel: '季度',
          value: 1
        },
        {
          dictLabel: '月度',
          value: 2
        },
        {
          dictLabel: '周度',
          value: 3
        }
      ],
      dataForm: {
        id: null,
        saftyPf: 0,
        message: '以身作则，安全第一',
        employeeId: null,
        type: 1,
        quarterType: 1,
        projectId: this.$store.state.user.loginInfo.projectId
      },
      proList: [],
      dataRule: {
        saftyPf: [
          { required: true, message: '安全评分不能为空', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '项目寄语不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        quarterType: [
          { required: true, message: '季度榜不能为空', trigger: 'blur' }
        ],
        employeeId: [
          { required: true, message: '人员姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.getDataList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm = row
      })
    },
    getDataList() {
      getList().then(data => {
        if (data.code === 1000 && data.result) this.proList = data.result
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.dataForm)
          const saveOrUpdate = this.dataForm.id ? updateStalyStart : addStalyStart
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
<style lang="scss" scoped>
  ::v-deep .safelity-add-update {
    width: 700px;
  }
</style>
