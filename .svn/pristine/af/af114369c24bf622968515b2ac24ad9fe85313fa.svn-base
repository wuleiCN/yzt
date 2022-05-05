<template>

  <div class="vehicle-monitor-history">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="deviceName">
        <el-input v-model.trim="dataForm.deviceName" placeholder="设备名称" />
      </el-form-item>
      <el-form-item prop="inOut">
        <el-select v-model.trim="dataForm.inOut" clearable placeholder="进出类型" @change="(e) => searchHandle(e, 'inOut')">
          <el-option label="进" :value="1"> 进 </el-option>
          <el-option label="出" :value="2"> 出 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="carType">
        <el-select v-model.trim="dataForm.carType" clearable placeholder="车辆类型" @change="(e) => searchHandle(e, 'carType')">
          <el-option label="小型车" :value="1"> 小型车 </el-option>
          <el-option label="中型车" :value="2"> 中型车 </el-option>
          <el-option label="泥头车" :value="3"> 泥头车 </el-option>
        </el-select>
      </el-form-item>
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
        <el-button type="primary" @click="searchHandle()">查询</el-button>
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
        prop="deviceName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="设备名称"
      />
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
        prop="inOut"
        header-align="center"
        align="center"
        label="进出类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.inOut === 1">进</span>
          <span v-if="scope.row.inOut === 2">出</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="carType"
        header-align="center"
        align="center"
        label="车辆类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.carType === 1">小型车</span>
          <span v-if="scope.row.carType === 2">中型车</span>
          <span v-if="scope.row.carType === 3">泥头车</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="memberType"
        header-align="center"
        align="center"
        label="车牌类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.memberType === 1">临时车</span>
          <span v-if="scope.row.memberType === 2">月租车</span>
          <span v-if="scope.row.memberType === 3">年租车</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="liftTime"
        header-align="center"
        align="center"
        width="170"
        label="进出时间"
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
        deviceName: '',
        inOut: '',
        memberType: '',
        startTime: '',
        endTime: ''
      },
      timeRange: '',
      dataList: [],
      exportUrl: `/vehicleRecord/exportVehicleRecord`,
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
      this.exportUrl = `/vehicleRecord/exportVehicleRecord?`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      findVehicleRecordList({
        deviceId: deviceId,
        ...this.dataForm,
        'page': this.pageIndex,
        'rows': this.pageSize
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.liftTime = item.liftTime ? parseTime(item.liftTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    // 查询
    searchHandle() {
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
.vehicle-monitor-history {
  .el-table {
    width: 100%;
    // display: none;
    margin-top:20px
  }
}
</style>
