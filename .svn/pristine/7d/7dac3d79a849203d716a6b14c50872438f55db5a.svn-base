<template>
  <div class="salary-audit">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" filterable style="width:100%" placeholder="请选择项目名称" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="constructionName">
        <el-select v-model="dataForm.constructionId" :disabled="disabled1" clearable filterable style="width:100%" placeholder="请选择参建单位" @change="(e) => searchHandle(e, 'constructionId')">
          <el-option v-for="(item, index) in constructionList" :key="index" :label="item.construction ? item.construction.constructionName : ''" :value="item.id">{{ item.construction ? item.construction.constructionName : '' }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="teamName">
        <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
      </el-form-item>
      <el-form-item prop="month">
        <el-date-picker
          v-model="dataForm.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="(e) => searchHandle(e, 'month')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column
        prop="status"
        header-align="center"
        align="center"
        width="150"
        label="审核状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">未提交审核</span>
          <span v-if="scope.row.status === 1">审核中</span>
          <span v-if="scope.row.status === 2">审核通过</span>
          <span v-if="scope.row.status === 3">审核未通过</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="nums"
        header-align="center"
        align="center"
        label="人数"
      />
      <el-table-column
        prop="month"
        header-align="center"
        align="center"
        label="月份"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        label="项目"
      />
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="参建单位"
      />
      <el-table-column
        prop="teamName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="班组"
      />
      <el-table-column
        prop="salaryType"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="薪资计算方式"
      />
      <el-table-column
        v-if="basePermit('salary_audit_btn_submit')"
        fixed="right"
        header-align="center"
        align="center"
        width="160"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="text" size="small" @click="submitHandle(scope.row.id)">
            <span>提交审核</span>
          </el-button>
          <span v-else>
            <span v-if="scope.row.status === 0" style="color: #909399">未提交审核</span>
            <span v-if="scope.row.status === 1">审核中</span>
            <span v-if="scope.row.status === 2" style="color: #67c23a">审核通过</span>
            <span v-if="scope.row.status === 3">审核未通过</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="basePermit('salary_audit_btn_review')"
        fixed="right"
        header-align="center"
        align="center"
        width="160"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">
            <span>审核</span>
          </el-button>
          <span v-else>
            <span v-if="scope.row.status === 0" style="color: #909399">未提交审核</span>
            <span v-if="scope.row.status === 1">审核中</span>
            <span v-if="scope.row.status === 2" style="color: #67c23a">审核通过</span>
            <span v-if="scope.row.status === 3">审核未通过</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <AuditDetail v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AuditDetail from './audit-detail'
import { getConstructionList } from '@/api/sys/user'
import { getList, submit } from '@/api/salary/audit'
import { optionCaseList } from '@/api/salary/data'
import { parseTime } from '@/utils'
export default {
  components: {
    AuditDetail
  },
  data() {
    return {
      dataForm: {
        projectId: '',
        constructionId: '',
        constructionName: '',
        teamName: '',
        month: parseTime(new Date(), '{y}-{m}')
      },
      disabled: false,
      disabled1: false,
      loginInfo: this.$store.state.user.loginInfo,
      dataList: [],
      planList: [],
      proList: [],
      constructionList: [],
      headerList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async created() {
    await this.getProOptionList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      this.dataForm.projectId = this.proList.find(item => item.id === this.dataForm.projectId) ? this.dataForm.projectId : ''
      await this.getConstructionList()
      this.disabled = true
      this.disabled1 = true
      this.getDataList()
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      this.dataForm.projectId = this.proList.find(item => item.id === this.dataForm.projectId) ? this.dataForm.projectId : ''
      await this.getConstructionList()
      this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            item.salaryType = item.salaryType === 1 ? '工时' : item.salaryType === 2 ? '工量' : ''
            return item
          })
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 获取参建单位下拉列表
    getConstructionList() {
      return new Promise(resolve => {
        getConstructionList({ id: this.dataForm.projectId }).then(data => {
          this.constructionList = data.result
          this.dataForm.constructionId = this.loginInfo.constructionId
          resolve(this.constructionList)
        })
      })
    },
    getProOptionList() {
      return new Promise(resolve => {
        optionCaseList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 查询
    searchHandle(val, type) {
      if (!this.dataForm.projectId) return this.$message.error('请选择项目')
      if (!this.dataForm.month) return this.$message.error('请选择月份')
      this.pageIndex = 1
      this.dataForm[type] = val
      if (type === 'projectId') this.getConstructionList()
      if (type === 'planId') this.getHeadList(val)
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 提交审核
    submitHandle(id) {
      this.$confirm(`您确定进行提交审核操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        submit({ id }).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
  // .salary-audit {}
</style>
