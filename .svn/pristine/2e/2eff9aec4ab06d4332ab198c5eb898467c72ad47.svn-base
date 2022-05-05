<template>
  <div class="statistical-weekAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="type">
        <el-select v-model="dataForm.type" style="width:100%" placeholder="请选择状态" @change="(e) => searchHandle(e, 'type')">
          <el-option label="进场" :value="0">进场</el-option>
          <el-option label="退场" :value="1">退场</el-option>
        </el-select>
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
      <el-form-item prop="type">
        <el-date-picker
          ref="week"
          v-model="dataForm.firstWeekDay"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          @change="(e) => searchHandle(e, 'week')"
        />
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
      id="tableau"
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
        key="1"
        type="index"
        header-align="center"
        align="center"
        width="50"
        label="序号"
      />
      <el-table-column
        v-if="!dataForm.type"
        key="2"
        prop="empName"
        header-align="center"
        align="center"
        label="本周进场农民工姓名"
      />
      <el-table-column
        v-else
        key="3"
        prop="empName"
        header-align="center"
        align="center"
        label="本周离场农民工姓名"
      />
      <el-table-column
        key="4"
        prop="idCode"
        header-align="center"
        align="center"
        label="身份证号"
      />
      <el-table-column
        v-if="!dataForm.type"
        key="5"
        prop="startTime"
        header-align="center"
        align="center"
        label="进场时间"
      />
      <el-table-column
        v-else
        key="6"
        prop="endTime"
        header-align="center"
        align="center"
        label="退场时间"
      />
      <el-table-column
        key="7"
        prop="jobName"
        header-align="center"
        align="center"
        label="工种"
      />
      <el-table-column
        v-if="!dataForm.type"
        key="8"
        prop="是否在市建委备案"
        header-align="center"
        align="center"
        label="是否在市建委备案"
      />
      <el-table-column
        v-else
        key="9"
        prop="days"
        header-align="center"
        align="center"
        label="在本工程务工时间"
      />
      <el-table-column
        v-if="!dataForm.type"
        key="10"
        prop="contract"
        header-align="center"
        align="center"
        label="是否签订《劳动合同》"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.contract ? '是' : '否' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        key="11"
        prop="工资结算、支付情况"
        header-align="center"
        align="center"
        label="工资结算、支付情况"
      />
      <el-table-column
        v-if="!dataForm.type"
        key="12"
        prop="remark"
        header-align="center"
        align="center"
        label="备注"
      />
      <el-table-column
        v-else
        key="13"
        prop="exeunt"
        header-align="center"
        align="center"
        label="离场承诺书有否"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.exeunt ? '是' : '否' }}</div>
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
import { getList } from '@/api/statistical/weekAtt'
import { parseTime } from '@/utils'
// import { workTypeList } from '@/api/project/person'
export default {
  data() {
    const loginInfo = this.$store.state.user.loginInfo
    return {
      dataForm: {
        type: 0,
        projectId: '',
        constructionId: '',
        firstWeekDay: '',
        year: '',
        week: ''
      },
      parseTime,
      exportUrl: ``,
      constructionName: '',
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
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    }
  },
  watch: {
    dataForm: {
      handler(newName, oldName) {
        this.exportUrl = `/statisticalReport/exportInOutWeekReport?token=${this.loginInfo.token}`
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
    // 工种选择列表
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
      this.$nextTick(() => {
        this.pageIndex = 1
        this.dataForm[type] = val
        if (type === 'projectId') this.getConstructionList()
        if (type === 'week') {
          const value = this.$refs.week.$children[0].nativeInputValue
          this.dataForm.week = +value.split(' ')[2]
          this.dataForm.year = +value.split(' ')[0]
        }
        if (!this.dataForm.projectId) return this.$message.error('请选择项目')
        if (!this.dataForm.constructionId) return this.$message.error('请选择参建单位')
        if (!this.dataForm.week) return this.$message.error('请选择周')
        this.getDataList()
      })
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
  // .statistical-weekAtt {}
</style>
