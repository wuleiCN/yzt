<template>
  <el-dialog
    custom-class="payroll-detail-modal"
    title="薪资发放明细"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-main>
      <div>
        <el-form style="margin-top:10px" :inline="true" :model="dataForm">
          <el-form-item prop="constructionName">
            <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位" />
          </el-form-item>
          <el-form-item prop="teamName">
            <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
          </el-form-item>
          <!-- <el-form-item prop="status">
            <el-input v-model="dataForm.status" clearable placeholder="审核状态" />
          </el-form-item> -->
          <el-form-item class="">
            <el-button type="primary" @click="searchHandle()">查询</el-button>
          </el-form-item></el-form>
        <el-table
          v-loading="dataListLoading"
          :data="dataList"
          border
          stripe
          highlight-current-row
        >
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            width="120"
            label="审核状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">未提交审核</span>
              <span v-if="scope.row.status === 1">审核中</span>
              <span v-if="scope.row.status === 2">审核通过</span>
              <span v-if="scope.row.status === 3">审核未通过</span>
            </template>
          </el-table-column>
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
            label="项目名称"
          />
          <el-table-column
            prop="constructionName"
            header-align="center"
            align="center"
            width="220"
            label="参建单位"
          />
          <el-table-column
            prop="teamName"
            header-align="center"
            align="center"
            label="班组"
          />
          <el-table-column
            prop="empName"
            header-align="center"
            align="center"
            label="姓名"
          />
          <el-table-column
            prop="idCode"
            header-align="center"
            align="center"
            width="170"
            label="身份证号"
          />
          <el-table-column
            prop="empBankname"
            header-align="center"
            align="center"
            width="140"
            label="开户行"
          />
          <el-table-column
            prop="empCardnum"
            header-align="center"
            align="center"
            width="180"
            label="银行账号"
          />
          <el-table-column
            prop="yfPay"
            header-align="center"
            align="center"
            label="应发工资"
          />
          <el-table-column
            prop="sfPay"
            header-align="center"
            align="center"
            label="实发工资"
          />
          <el-table-column
            prop="difference"
            header-align="center"
            align="center"
            label="差额"
          />
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
      </div>
    </el-main>
  </el-dialog>
</template>

<script>
import { detail } from '@/api/salary/payroll'
export default {
  data() {
    return {
      visible: false,
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataForm: {
        constructionName: '',
        teamName: '',
        status: ''
      },
      dataRule: {}
    }
  },
  methods: {
    // 打开弹窗
    init({ month, id }) {
      this.visible = true
      this.month = month
      this.id = id
      this.getDataList()
    },
    getDataList() {
      detail({
        month: this.month,
        projectId: this.id,
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList(this.companyId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
  .payroll-detail-modal {
    width: 1200px;
    .el-dialog__body {
      padding: 0;
    }

  }
</style>
