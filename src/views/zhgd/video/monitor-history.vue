<template>

  <div class="monitor-history">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="time">
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
      style="width: 100%;"
    >
      <el-table-column
        prop="driver"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="驾驶员"
      />
      <el-table-column
        prop="vehicleNo"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="车牌号"
      />
      <el-table-column
        prop="gateinName"
        header-align="center"
        align="center"
        label="通道名称"
      />
      <el-table-column
        prop="inOut"
        header-align="center"
        align="center"
        label="进出类型"
      />
      <el-table-column
        prop="liftTime"
        header-align="center"
        align="center"
        label="进出时间"
      />
      <el-table-column
        prop="memberType"
        header-align="center"
        align="center"
        label="车辆类型"
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
import { findVehicleRecordList } from '@/api-zhgd/vehicle-monitor'
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
        timeRange: ''
      },
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
      findVehicleRecordList({
        deviceId: deviceId,
        ...this.dataForm,
        'page': this.pageIndex,
        'rows': this.pageSize
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.date = item.date ? parseTime(item.date, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
  padding: 20px;
  background: #fff;
  height: 73vh;
}
</style>
