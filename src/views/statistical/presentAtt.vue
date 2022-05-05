<template>

  <div class="statistical-presentAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectId">
        <el-select v-model="dataForm.projectId" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(dataForm.type)">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="constructionName">
        <el-input v-model.trim="dataForm.constructionName" placeholder="参建单位" />
      </el-form-item>
      <el-form-item prop="teamName">
        <el-input v-model.trim="dataForm.teamName" placeholder="班组" />
      </el-form-item>
      <el-form-item prop="empName">
        <el-input v-model="dataForm.empName" clearable placeholder="人员名称" />
      </el-form-item>
      <el-form-item prop="idCode">
        <el-input v-model="dataForm.idCode" clearable placeholder="身份证号" />
      </el-form-item>
      <el-form-item prop="jobName">
        <el-input v-model.trim="dataForm.jobName" placeholder="工种名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle(dataForm.type)">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button type="primary" @click="searchHandle(2)">当前在岗</el-button>
        <el-button type="primary" @click="searchHandle(1)">今日未上岗</el-button>
        <el-button type="primary" @click="searchHandle(3)">今日离岗</el-button>
        <a v-permit="'statistical_presentAtt_btn_export'" style="margin-left:10px" :href="!dataForm.type ? 'javascript:void(0)' : $http.baseUrl(exportUrl)">
          <el-button :disabled="!dataForm.type" type="primary">导出</el-button>
        </a>
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
        prop="projectName"
        header-align="center"
        align="center"
        width="300"
        :show-overflow-tooltip="true"
        label="项目名称"
      />
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="参建单位名称"
      />
      <el-table-column
        prop="teamName"
        header-align="center"
        align="center"
        width="120"
        label="班组"
      />
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        width="120"
        label="姓名"
      />
      <el-table-column
        prop="idCode"
        header-align="center"
        align="center"
        label="身份证号"
      />
      <el-table-column
        prop="jobName"
        header-align="center"
        align="center"
        label="工种"
      />
      <el-table-column
        prop="direction"
        header-align="center"
        align="center"
        label="进出标识"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.direction === 'in'">上岗</div>
          <div v-if="scope.row.direction === 'out'">离岗</div>
          <div v-if="scope.row.direction === 'none'">不分进出</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="passedTime"
        header-align="center"
        align="center"
        label="时间"
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
import { getList } from '@/api/statistical/presentAtt'
import { proOptionList } from '@/api/gyc/community'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      dataList: [],
      proList: [],
      dataForm: {
        type: 1,
        empName: '',
        idCode: '',
        projectId: '',
        constructionName: '',
        teamName: '',
        jobName: ''
      },
      exportUrl: ``,
      loginInfo: this.$store.state.user.loginInfo,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  async created() {
    await this.getProOptionList()
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.exportUrl = `/statisticalReport/exportWorkerAttendance?token=${this.loginInfo.token}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.passedTime = item.passedTime ? parseTime(item.passedTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    // 获取项目下拉
    getProOptionList() {
      return new Promise(resolve => {
        proOptionList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            this.dataForm.projectId = this.proList.length ? this.proList[0].id : ''
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    searchHandle(type) {
      this.pageIndex = 1
      this.dataForm.type = type
      this.getDataList()
    },
    selectChangeHandle(val, type) {
      this.dataForm[type] = val
      this.getDataList()
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
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
  // .statistical-presentAtt {}
</style>
