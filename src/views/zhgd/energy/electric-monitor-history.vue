<template>
  <div class="electric-history">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-radio-group v-model="btnVal" size="medium" @change="changeHandle">
          <el-radio-button label="sort15">15分钟</el-radio-button>
          <el-radio-button label="sortHour">小时</el-radio-button>
          <el-radio-button label="sortDay">日</el-radio-button>
          <el-radio-button label="sortMon">月</el-radio-button>
          <el-radio-button label="sortYear">年</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="btnVal === 'sort15' || btnVal === 'sortHour'">
        <el-time-picker
          v-model="hourValue"
          is-range
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          @change="(e) => selectChangeHandle(e, 'timeRange')"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-if="btnVal === 'sortDay'"
          v-model="timeRange"
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="(e) => selectChangeHandle(e, 'timeRange')"
        />
        <el-date-picker
          v-if="btnVal === 'sortMon'"
          v-model="monValue"
          clearable
          value-format="yyyy-MM"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          type="monthrange"
          @change="(e) => selectChangeHandle(e, 'timeRange')"
        />
      </el-form-item>
      <el-form-item v-show="btnVal === 'sortYear'">
        <el-date-picker
          v-model="yearStartTime"
          value-format="yyyy"
          type="year"
          placeholder="开始年份"
          @change="(e) => selectYearHandle(e, 'startYear')"
        />
        <span>-</span>
        <el-date-picker
          v-model="yearEndTime"
          value-format="yyyy"
          type="year"
          placeholder="结束年份"
          @change="(e) => selectYearHandle(e, 'endYear')"
        />
      </el-form-item>
      <el-form-item>
        <a
          target="_blank"
          :href="$httpZhgd.baseUrl(exportUrl)"
        ><el-button type="primary">导出</el-button></a>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
      tooltip-effect="light"
      highlight-current-row
    >
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="300"
        :show-overflow-tooltip="true"
        label="水表名称"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="设备类型"
      />
      <el-table-column
        prop="ip"
        header-align="center"
        align="center"
        label="通讯地址"
      />
      <el-table-column
        prop="mwo"
        header-align="center"
        align="center"
        label="总水量"
      />
      <el-table-column
        prop="time"
        header-align="center"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
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
import { getRecord } from '@/api-zhgd/electric-meter'
// import { parseTime } from '@/utils'
export default {
  props: {
    deviceId: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    const { token } = this.$store.state.user.loginInfo
    return {
      dataForm: {
        startTime: '',
        endTime: ''
      },
      btnVal: 'sort15',
      timeRange: '',
      hourValue: '',
      monValue: '',
      yearStartTime: '',
      yearEndTime: '',
      dataList: [],
      exportUrl: `/emissionRecord/exportDustEmissionRecordList?token=${token}`,
      projectId: this.$store.state.user.loginInfo.projectId,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  watch: {
    deviceId: {
      handler(newVal, oldVal) {
        return newVal && this.getDataList(newVal)
      },
      immediate: true
    }
  },
  created() {
    if (this.deviceId) this.getDataList(this.deviceId)
  },
  methods: {
    // 获取数据列表
    getDataList(deviceId) {
      this.dataListLoading = true
      this.exportUrl = `/electricRecord/exportElectricRecord?deviceId=${deviceId}&query=${this.btnVal}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      getRecord({
        ...this.dataForm,
        query: this.btnVal,
        projectId: this.projectId,
        deviceId: deviceId,
        page: this.pageIndex,
        rows: this.pageSize
      }).then(data => {
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
    changeHandle() {
      this.dataForm.startTime = ''
      this.dataForm.endTime = ''
      this.getDataList(this.deviceId)
    },
    selectYearHandle(val, type) {
      if (type === 'startYear') this.dataForm.startTime = val
      if (type === 'endYear') this.dataForm.endTime = val
      if (this.dataForm.startTime && this.dataForm.endTime) this.getDataList(this.deviceId)
    },
    selectChangeHandle(val, type) {
      this.dataForm.startTime = ''
      this.dataForm.endTime = ''
      if (type === 'timeRange') {
        this.dataForm.startTime = val && val.length ? val[0] : ''
        this.dataForm.endTime = val && val.length ? val[1] : ''
      }
      this.getDataList(this.deviceId)
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList(this.deviceId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList(this.deviceId)
    }
  }
}
</script>

<style lang="scss">
.electric-history {
  .el-form {
    margin-top:.94rem !important
  }
  .el-table {
    width: 100%;
    margin-top:1.25rem !important
  }
  .el-radio-group {
    .el-radio-button {
      margin: 0 10px;
      text-align: center;
      .el-radio-button__inner {
        border: 2px solid #1890FF;
        border-radius: 5px;
        line-height: 26px;
        padding: 0;
        width: 56px;
        height: 28px;
      }
    }
  }
}
</style>
