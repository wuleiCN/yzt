<template>
  <div class="statistical-personAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="type">
        <el-select v-model="dataForm.type" style="width:100%" placeholder="请选择薪资方案" @change="(e) => searchHandle(e, 'type')">
          <el-option label="打卡情况" :value="1">打卡情况</el-option>
          <el-option label="打卡时间" :value="2">打卡时间</el-option>
          <el-option label="打卡时长" :value="3">打卡时长</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <el-date-picker
          v-model="dataForm.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="(e) => searchHandle(e, 'month')"
        />
      </el-form-item>
      <el-form-item prop="projectId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="constructionId">
        <el-select v-model.trim="dataForm.constructionId" :disabled="disabled1" style="width:100%" clearable placeholder="请选择参建单位" @change="(e) => searchHandle(e, 'constructionId')">
          <el-option v-for="(item, index) in constructionList" :key="index" :label="item.construction.constructionName" :value="item.id"> {{ item.construction.constructionName }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="teamName">
        <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
      </el-form-item>
      <el-form-item prop="empName">
        <el-input v-model.trim="dataForm.empName" placeholder="人员姓名" />
      </el-form-item>
      <el-form-item prop="jobName">
        <el-input v-model.trim="dataForm.jobName" placeholder="工种名称" />
        <!-- <el-select v-model="dataForm.jobName" filterable clearable style="width:100%" placeholder="选择工种" @change="(e) => searchHandle(e, 'jobName')">
          <el-option v-for="(item, index) in workSelectList" :key="index" :label="item.title" :value="item.tag">{{ item.title }}</el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <a v-permit="'statistical_personAtt_btn_export'" :href="!dataList.length ? 'javascript:void(0)' : $http.baseUrl(exportUrl)">
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
        prop="teamName"
        header-align="center"
        align="center"
        width="120"
        label="班组"
      />
      <el-table-column
        prop="emp_name"
        header-align="center"
        align="center"
        width="120"
        label="姓名"
      />
      <el-table-column
        prop="job_name"
        header-align="center"
        align="center"
        width="160"
        label="工种"
      />
      <el-table-column
        v-for="item in days"
        :key="item"
        header-align="left"
        :prop="item"
        align="left"
        :label="item"
        width="120px"
      >
        <template slot-scope="scope">
          <span v-if="dataForm.type === 1">{{ scope.row[item] ? '√' : scope.row[item] }}</span>
          <div v-if="dataForm.type === 2">
            <template v-for="(ele, idx) in scope.row[item] && scope.row[item].length && scope.row[item].split('，')">
              <div :key="idx">
                {{ ele }}
              </div>
            </template>
          </div>
          <span v-if="dataForm.type === 3">{{ scope.row[item] }}</span>
          <!-- <span>{{ dataForm.type === 2 || dataForm.type === 3 ? scope.row[item] : scope.row[item] ? '√' : scope.row[item] }}</span> -->
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
  </div>
</template>

<script>
import { getConstructionList } from '@/api/sys/user'
import { proOptionList } from '@/api/salary/data'
import { getList } from '@/api/statistical/personAtt'
import { parseTime } from '@/utils'
// import { workTypeList } from '@/api/project/person'
export default {
  data() {
    const loginInfo = this.$store.state.user.loginInfo
    return {
      dataForm: {
        type: 1,
        jobName: '',
        projectId: '',
        empName: '',
        constructionId: '',
        constructionName: '',
        teamName: '',
        month: parseTime(new Date(), '{y}-{m}')
      },
      exportUrl: `/statisticalReport/exportWorkerKQB?token=${loginInfo.token}`,
      disabled: false,
      disabled1: false,
      loginInfo,
      dataList: [],
      planList: [],
      proList: [],
      constructionList: [],
      // workSelectList: [],
      headerList: [],
      pageIndex: 1,
      pageSize: 10,
      days: [],
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    }
  },
  watch: {
    dataForm: {
      handler(newName, oldName) {
        this.exportUrl = `/statisticalReport/exportWorkerKQB?token=${this.loginInfo.token}`
        for (const key in this.dataForm) {
          if (this.dataForm.hasOwnProperty(key)) {
            const element = this.dataForm[key]
            if (element || element === 0) {
              this.exportUrl += `&${key}=${this.dataForm[key]}`
            }
          }
        }
      },
      deep: true
    }
  },
  async created() {
    this.getDays()
    // this.getWorkSelectList()
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
    getDays() {
      const month = this.dataForm.month.split('-')[1] // 月份从0开始获取，所以需要加1
      const year = this.dataForm.month.split('-')[0]
      const d = new Date(year, month, 0)
      this.days = [...Array(d.getDate())].map((_, idx) => {
        return idx + 1 + ''
      })
      this.days = this.days.map((item, index) => {
        if (item < 10) item = '0' + item
        // this.days.filter(ele => ele[index]).
        // item.total =
        return item
      })
    },
    // // 工种选择列表
    // getWorkSelectList() {
    //   workTypeList({}).then((data) => {
    //     this.workSelectList = data.result
    //   })
    // },
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
      this.pageIndex = 1
      this.dataForm[type] = val
      if (type === 'projectId') this.getConstructionList()
      if (type === 'month') this.getDays()
      if (!this.dataForm.projectId) return this.$message.error('请选择项目')
      if (!this.dataForm.constructionId) return this.$message.error('请选择参建单位')
      if (!this.dataForm.month) return this.$message.error('请选择月份')
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
  .statistical-personAtt {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
</style>
