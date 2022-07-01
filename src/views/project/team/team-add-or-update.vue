<template>
  <el-dialog
    custom-class="team-add-or-update-modal"
    :title="!dataForm.id ? '新增班组' : '修改班组'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="150px" @keyup.enter.native="dataFormSubmit()">
      <el-row>
        <el-col :span="24">
          <el-form-item label="所属项目" prop="projectName">
            <el-input v-model.trim="dataForm.projectName" :disabled="!!dataForm.projectName" placeholder="所属项目" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="所属参建单位" prop="constructionId">
            <el-select v-model.trim="dataForm.constructionId" style="width:100%" :disabled="!!loginInfo.constructionId" placeholder="所属参建单位">
              <el-option v-for="(item, index) in proList" :key="index" :label="item.construction.constructionName" :value="item.id">{{ item.construction.constructionName }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="班组名称" prop="teamName">
            <el-input v-model.trim="dataForm.teamName" placeholder="班组名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="班组类型" prop="teamType">
            <el-select v-model.trim="dataForm.teamType" style="width:100%" placeholder="班组类型">
              <el-option v-for="(item, index) in optionList" :key="index" :label="item.title" :value="item.tag">{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="入场时间" prop="inTime">
            <el-date-picker
              v-model.trim="dataForm.inTime"
              style="width:100%"
              type="date"
              placeholder="入场时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退场时间" prop="outTime">
            <el-date-picker
              v-model.trim="dataForm.outTime"
              style="width:100%"
              type="date"
              :disabled="true"
              placeholder="退场时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" :prop="projectType === '99' ? 'remark' : ''">
        <el-input
          v-model.trim="dataForm.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="btnLoading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, detail, projectsDetail, constructionDetail, proSelectList, optionList } from '@/api/project/team'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      proList: [],
      projectType: '',
      optionList: [],
      dataForm: {
        id: null,
        teamName: '',
        teamType: '',
        projectName: '',
        constructionName: '',
        constructionId: '',
        projectId: '',
        inTime: '',
        outTime: '',
        remark: ''
      },
      dataRule: {
        constructionId: [
          { required: true, message: '所属参建单位不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        teamName: [
          { required: true, message: '班组名称不能为空', trigger: 'blur' },
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] },
          { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '班组名称由数字,字母中文组成', trigger: ['blur', 'change'] }
        ],
        teamType: [
          { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  methods: {
    // 打开弹窗
    init(row, pId) {
      this.dataForm.id = (row ? row.id : null)
      this.projectType = JSON.parse(sessionStorage.getItem('projectType'))
      this.visible = true
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
        const { projectId, constructionId } = this.loginInfo
        this.dataForm.projectId = pId || projectId
        this.dataForm.constructionId = constructionId
        const projectRegion = await this.getProjectsDetail(pId || projectId)
        this.getOptionList(projectRegion)
        this.getProSelectList(pId || projectId)
        if (this.dataForm.id) {
          detail({ id: this.dataForm.id }).then((data) => {
            if (data && data.code === 1000) {
              this.dataForm = { ...this.dataForm, ...data.result }
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          this.dataForm.teamThirdCode = null
          this.dataForm.teamCode = null
          this.dataForm.teamId = null
          this.dataForm.teamSysno = null
        }
      })
    },
    getProjectsDetail(id) {
      return projectsDetail({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.$set(this.dataForm, 'projectName', data.result.projectName)
          return data.result ? data.result.projectRegion : ''
        } else {
          console.log(data)
          this.$message.error(data.message)
        }
      })
    },
    getConstructionDetail(id) {
      constructionDetail({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.dataForm.constructionName = data.result.construction.constructionName
        } else {
          this.$message.error(data.message)
        }
      })
    },
    getProSelectList(id) {
      proSelectList({ id, status: 0 }).then((data) => {
        if (data && data.code === 1000) {
          this.proList = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    getOptionList(projectRegion) {
      let category = ''
      if (this.projectType === '102') {
        category = 'TEAM_TYPE_HFTX'
      } else {
        // 根据不同项目拉取不同班组 山西(JOB_NAME_SHANXI)：140000
        const code = {
          140000: 'JOB_NAME_SHANXI',
          441400: 'JOB_NAME_GDMEIZHOU',
          441800: 'JOB_NAME_GDQINGYUAN',
          440700: 'JOB_NAME_JIANGMEN'
        }
        const region = projectRegion && projectRegion.split(',')
        const fregion = region.find(item => {
          return Object.keys(code).includes(item)
        })
        category = fregion ? code[fregion] : 'TEAM_TYPE_SZGWS'
        // const category = projectRegion.includes('140000') ? 'JOB_NAME_SHANXI' : 'TEAM_TYPE_SZGWS'
      }
      optionList({ category }).then((data) => {
        if (data && data.code === 1000) {
          this.optionList = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm }).then((data) => {
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
  .team-add-or-update-modal {
    width: 950px;
  }
</style>
