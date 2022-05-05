<template>
  <div class="statistical-worker-roster">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="timeRange">
        <el-date-picker
          v-model="dataForm.timeRange"
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="(e) => searchHandle(e, 'timeRange')"
        />
      </el-form-item>
      <el-form-item prop="projectId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item prop="name">
        <el-date-picker
          v-model="dataForm.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="(e) => searchHandle(e, 'month')"
        />
      </el-form-item> -->
      <el-form-item prop="constructionId">
        <el-select v-model.trim="dataForm.constructionId" :disabled="disabled1" style="width:100%" clearable placeholder="请选择参建单位" @change="(e) => searchHandle(e, 'constructionId')">
          <el-option v-for="(item, index) in constructionList" :key="index" :label="item.construction.constructionName" :value="item.id"> {{ item.construction.constructionName }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <a v-permit="'statistical_worker-roster_btn_export'" :href="!dataList.length ? 'javascript:void(0)' : $http.baseUrl(exportUrl)">
          <el-button :disabled="!dataList.length" type="primary">导出</el-button>
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
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="50"
        label="序号"
      />
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        width="120"
        label="姓名"
      />
      <el-table-column
        prop="jobName"
        header-align="center"
        align="center"
        width="200"
        label="工种"
      />
      <el-table-column
        prop="idAddress"
        header-align="center"
        align="center"
        label="家庭地址"
      />
      <el-table-column
        prop="idCode"
        header-align="center"
        align="center"
        width="170"
        label="身份证号"
      />
      <el-table-column
        prop="laodong"
        header-align="center"
        align="center"
        width="170"
        label="劳动合同编号"
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
import { getConstructionList } from '@/api/sys/user'
import { proOptionList } from '@/api/salary/data'
import { getList } from '@/api/statistical/worker-roster'
import { parseTime } from '@/utils'
export default {
  components: {},
  data() {
    const timeRange = [parseTime(new Date().setDate(1), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')]
    const loginInfo = this.$store.state.user.loginInfo
    return {
      dataForm: {
        projectId: '',
        constructionId: '',
        startDate: timeRange[0],
        endDate: timeRange[1],
        timeRange
      },
      exportUrl: ``,
      disabled: false,
      disabled1: false,
      loginInfo,
      dataList: [],
      proList: [],
      constructionList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    }
  },
  async created() {
    await this.getProOptionList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      await this.getConstructionList()
      this.disabled = true
      this.disabled1 = true
      // this.getDataList()
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      await this.getConstructionList()
      // this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.exportUrl = `/statisticalReport/exportWorkerRoster?token=${this.loginInfo.token}`
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
          this.dataList = data.result.records
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
        proOptionList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 查询
    searchHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.pageIndex = 1
      this.dataForm[type] = val
      if (type === 'projectId') this.getConstructionList()
      if (!this.dataForm.projectId) return this.$message.error('请选择项目')
      if (!this.dataForm.constructionId) return this.$message.error('请选择参建单位')
      // if (!this.dataForm.month) return this.$message.error('请选择月份')
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
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    }
  }
}
</script>

<style lang="scss">
  // .statistical-worker-roster {}
</style>
