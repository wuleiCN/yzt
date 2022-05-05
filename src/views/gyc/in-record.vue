<template>
  <div class="gyc-in-record-page">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectName">
        <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
      </el-form-item>
      <el-form-item prop="constructionName">
        <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位名称" />
      </el-form-item>
      <el-form-item prop="teamName">
        <el-input v-model="dataForm.teamName" clearable placeholder="班组名称" />
      </el-form-item>
      <el-form-item prop="empName">
        <el-input v-model="dataForm.empName" clearable placeholder="姓名" />
      </el-form-item>
      <el-form-item prop="timeRange">
        <el-date-picker
          v-model="dataForm.timeRange"
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="(e) => selectChangeHandle(e, 'timeRange')"
        />
      </el-form-item>
      <div>
        <el-form-item>
          <el-button type="primary" @click="searchHandle()">查询</el-button>
          <a v-permit="'in_record_btn_export'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
        </el-form-item>
      </div>
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
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
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
        width="180"
        label="身份证号码"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        label="所属项目"
      />
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        label="参建单位"
      />
      <el-table-column
        prop="teamName"
        header-align="center"
        align="center"
        label="班组"
      />
      <el-table-column
        prop="roomName"
        header-align="center"
        align="center"
        width="150"
        label="宿舍名称"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        width="120"
        label="入住/迁出"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" type="success">入住</el-tag>
          <el-tag v-if="scope.row.type === 2" type="danger">迁出</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatorTime"
        header-align="center"
        align="center"
        width="120"
        label="入住/迁出日期"
      />
      <el-table-column
        prop="cost"
        header-align="center"
        align="center"
        label="是否计费"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cost" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatorName"
        header-align="center"
        align="center"
        label="操作人"
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
</template>

<script>
import { recordList } from '@/api/gyc/in-record'
import { parseTime } from '@/utils'
export default {
  data() {
    const { token } = this.$store.state.user.loginInfo
    return {
      loginInfo: this.$store.state.user.loginInfo,
      exportUrl: `/gycStayRecord/export?token=${token}`,
      dataForm: {
        timeRange: [],
        projectName: '',
        constructionName: '',
        teamName: '',
        empName: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  async created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      const { token } = this.loginInfo
      this.exportUrl = `/gycStayRecord/export?token=${token}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      this.dataListLoading = true
      recordList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.operatorTime = item.operatorTime ? parseTime(item.operatorTime, '{y}-{m}-{d}') : ''
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
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.getDataList()
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
  // .gyc-in-record-page {}
</style>
