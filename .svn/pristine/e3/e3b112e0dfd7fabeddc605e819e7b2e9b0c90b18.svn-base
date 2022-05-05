<template>
  <div class="gyc-inout-record">
    <el-container>
      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="projectName">
              <el-input v-model="dataForm.projectName" clearable placeholder="所属项目名称" />
            </el-form-item>
            <el-form-item prop="liveAreaName">
              <el-input v-model="dataForm.liveAreaName" clearable placeholder="生活区名称" />
            </el-form-item>
            <el-form-item prop="constructionName">
              <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位名称" />
            </el-form-item>
            <el-form-item prop="empName">
              <el-input v-model="dataForm.empName" clearable placeholder="人员姓名" />
            </el-form-item>
            <el-form-item prop="teamName">
              <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
            </el-form-item>
            <el-form-item prop="deviceNo">
              <el-input v-model="dataForm.deviceNo" clearable placeholder="设备序列号" />
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
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
              <a v-permit="'inout_record_btn_export'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
            </el-form-item>
          </el-form>
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            highlight-current-row
          >
            <el-table-column
              prop="sitePhoto"
              header-align="center"
              align="center"
              fixed="left"
              label="实时头像"
            >
              <template slot-scope="scope">
                <div @click="handleClickImg(scope.row)">
                  <el-avatar icon="el-icon-user-solid" :size="30" :src="scope.row.sitePhoto" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              fixed="left"
              label="姓名"
            />
            <el-table-column
              prop="jobNo"
              header-align="center"
              align="center"
              width="110"
              label="工号"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              width="170"
              label="身份证号"
            />
            <el-table-column
              prop="projectName"
              header-align="center"
              align="center"
              width="300"
              :show-overflow-tooltip="true"
              label="项目名称"
            />
            <el-table-column
              prop="liveAreaName"
              header-align="center"
              align="center"
              width="150"
              :show-overflow-tooltip="true"
              label="生活区名称"
            />
            <el-table-column
              prop="constructionName"
              header-align="center"
              align="center"
              width="300"
              label="参建单位名称"
            />
            <el-table-column
              prop="teamName"
              header-align="center"
              align="center"
              width="190"
              label="班组名称"
            />
            <el-table-column
              prop="deviceName"
              header-align="center"
              align="center"
              width="190"
              label="生活区设备类型"
            />
            <el-table-column
              prop="deviceNo"
              header-align="center"
              align="center"
              width="190"
              label="设备序列号"
            />
            <el-table-column
              prop="direction"
              header-align="center"
              align="center"
              width="120"
              label="进出标识"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.direction ? (scope.row.direction === 'in' ? '进' : '出') : '' }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="passedTime"
              header-align="center"
              align="center"
              width="160"
              label="打卡时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.passedTime ? parseTime(scope.row.passedTime, '{y}-{m}-{d} {h}:{i}:{s}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="createDate"
              header-align="center"
              align="center"
              width="160"
              label="写入系统时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.createDate ? parseTime(scope.row.createDate, '{y}-{m}-{d} {h}:{i}:{s}') : '' }}</span> </template>
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
          <el-dialog
            :title="row.empName"
            custom-class="gyc-inout-record-avatar el-dialog_img"
            append-to-body
            width="400px"
            onselectstart="return false;"
            :close-on-click-modal="true"
            :visible.sync="dialogVisible"
          >
            <div style="width: 100%;margin:0 auto;">
              <img style="width: 100%;" :src="row.sitePhoto" alt="">
            </div>
          </el-dialog>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { inOutRecordList } from '@/api/gyc/in-record'
export default {
  data() {
    const { token } = this.$store.state.user.loginInfo
    return {
      parseTime,
      isShow: false,
      dialogVisible: false,
      row: {},
      loginInfo: this.$store.state.user.loginInfo,
      exportUrl: `/gycAtRecord/export?token=${token}`,
      dataForm: {
        projectName: '',
        liveAreaName: '',
        constructionName: '',
        empName: '',
        teamName: '',
        deviceNo: '',
        startDate: '',
        endDate: ''
      },
      companyId: '',
      type: '',
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  async created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      const { token } = this.loginInfo
      this.exportUrl = `/gycAtRecord/export?token=${token}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      this.dataListLoading = true
      inOutRecordList({
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records
        this.totalPage = data.result.total
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
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
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
  // .gyc-inout-record {
  // }
  .gyc-inout-record-avatar {
    .el-dialog__header {
      padding: 8px;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
    .el-dialog__body {
      padding: 10px;
    }
    .el-dialog__footer {
      display: none;
    }
  }
</style>
