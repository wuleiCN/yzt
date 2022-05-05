<template>

  <div class="monitor-history">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="time">
        <el-date-picker
          v-model="timeRange"
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
        prop="deviceName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="设备名称"
      />
      <el-table-column
        prop="current"
        header-align="center"
        align="center"
        label="漏电流"
      />
      <el-table-column
        prop="awarm"
        header-align="center"
        align="center"
        label="线缆a温度"
      />
      <el-table-column
        prop="bwarm"
        header-align="center"
        align="center"
        label="线缆b温度"
      />
      <el-table-column
        prop="cwarm"
        header-align="center"
        align="center"
        label="线缆c温度"
      />
      <el-table-column
        prop="nwarm"
        header-align="center"
        align="center"
        label="线缆n温度"
      />
      <el-table-column
        prop="tm"
        header-align="center"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
        label="运行时间"
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
import { findElectricityBoxRecordList } from '@/api-zhgd/box-monitor'
import { parseTime } from '@/utils'
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
    // const { token } = this.$store.state.user.loginInfo
    return {
      dataForm: {
        startTime: '',
        endTime: ''
      },
      timeRange: '',
      dataList: [],
      exportUrl: `/electricityBoxRecord/exportElectRecordList`,
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
    if (this.deviceId) this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList(deviceId) {
      this.dataListLoading = true
      this.exportUrl = `/electricityBoxRecord/exportElectRecordList?`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      findElectricityBoxRecordList({
        deviceId: deviceId,
        ...this.dataForm,
        'page': this.pageIndex,
        'rows': this.pageSize
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.tm = item.tm ? parseTime(item.tm, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startTime = val && val.length ? val[0] : ''
        this.dataForm.endTime = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
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
.monitor-history {
  .el-table {
    width: 100%;
    margin-top:10px
  }
}
</style>
