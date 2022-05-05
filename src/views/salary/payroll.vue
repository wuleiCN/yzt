<template>
  <div class="salary-payroll">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="planId">
        <el-select v-model="dataForm.planId" style="width:100%" placeholder="请选择薪资方案" @change="(e) => searchHandle(e, 'planId')">
          <el-option v-for="(item, index) in planList" :key="index" :label="item.name" :value="item.id">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="projectName">
        <el-input v-model="dataForm.projectName" clearable placeholder="所属项目名称" />
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
      @selection-change="selectionChangeHandle"
      @row-dblclick="rowDblclick"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="month"
        header-align="center"
        align="center"
        width="120"
        label="月份"
      />
      <el-table-column
        prop="planName"
        header-align="center"
        align="center"
        label="薪资方案"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="所属项目"
      />
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        width="120"
        label="发放状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="small" type="info">未发放</el-tag>
          <el-tag v-if="scope.row.status == 1" size="small" type="success">开始发放</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sendEmp"
        header-align="center"
        align="center"
        label="发放人员"
      />
      <el-table-column
        prop="sendTime"
        header-align="center"
        align="center"
        width="160"
        label="发放日期"
      />
      <el-table-column
        prop="resetEmp"
        header-align="center"
        align="center"
        label="重置人员"
      />
      <el-table-column
        prop="resetTime"
        header-align="center"
        align="center"
        width="160"
        label="重置日期"
      />
      <el-table-column
        v-if="basePermit('salary_payroll_btn_reset') || basePermit('salary_payroll_btn_send') || basePermit('salary_payroll_btn_detail')"
        fixed="right"
        header-align="center"
        align="center"
        label="操作"
        width="160"
      >
        <template slot-scope="scope">
          <el-button v-permit="'salary_payroll_btn_send'" :disabled="scope.row.status === 1" type="text" size="small" @click="payrollHandle(scope.row)">薪资发放</el-button>
          <el-button v-permit="'salary_payroll_btn_reset'" :disabled="scope.row.status === 0" type="text" size="small" @click="resetHandle(scope.row)">重置</el-button>
          <el-button v-permit="'salary_payroll_btn_detail'" :disabled="scope.row.status === 0" type="text" size="small" @click="addOrUpdateHandle(scope.row)">明细</el-button>
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
    <payroll-Detail v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import PayrollDetail from './payroll-detail'
import { optionList } from '@/api/salary/data'
import { getList, send, reset } from '@/api/salary/payroll'
import { parseTime } from '@/utils'
export default {
  components: {
    PayrollDetail
  },
  data() {
    return {
      dataForm: {
        planId: '',
        projectId: '',
        constructionName: '',
        teamName: '',
        month: parseTime(new Date(), '{y}-{m}')
      },
      dataList: [],
      planList: [],
      proList: [],
      headerList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getOptionPlanList()
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
            item.sendTime = item.sendTime ? parseTime(item.sendTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            item.resetTime = item.resetTime ? parseTime(item.resetTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    getOptionPlanList() {
      optionList().then((data) => {
        if (data && data.code === 1000) {
          this.planList = data.result
          if (this.planList.length) {
            this.dataForm.planId = this.planList[0].id
            this.getDataList()
          }
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle(val, type) {
      if (!this.dataForm.month) return this.$message.error('请选择月份')
      this.pageIndex = 1
      this.dataForm[type] = val
      // if (type === 'planId') this.getHeadList(val)
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
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    rowDblclick(row) {
      if (this.basePermit('salary_payroll_btn_detail')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 薪资发放
    payrollHandle(row) {
      this.$confirm(`您确定进行薪资发放的操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        send({ projectId: row.id, month: this.dataForm.month }).then((data) => {
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
    },
    // 重置
    resetHandle(row) {
      this.$confirm(`您确定进行重置的操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reset({ projectId: row.id, month: this.dataForm.month }).then((data) => {
          this.getDataList()
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
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
  .salary-payroll {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
</style>
