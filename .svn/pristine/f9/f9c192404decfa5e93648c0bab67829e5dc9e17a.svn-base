<template>

  <div class="elevator-monitor-history">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="noAlarm">
        <el-select v-model.trim="dataForm.noAlarm" clearable placeholder="请选择当前状态" @change="(e) => selectChangeHandle(e, 'noAlarm')">
          <el-option label="全部" value=""> 全部 </el-option>
          <el-option label="有报警" :value="0"> 有报警 </el-option>
          <el-option label="无报警" :value="1"> 无报警 </el-option>
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
    >
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="设备名称"
      />
      <el-table-column
        prop="noAlarm"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="当前状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.noAlarm" type="danger">有报警</el-tag>
          <el-tag v-else type="success">无报警</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="hxzId"
        header-align="center"
        align="center"
        label="设备编号"
      />
      <el-table-column
        prop="floor"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="楼层"
      />
      <el-table-column
        prop="loadRatio"
        header-align="center"
        align="center"
        label="载重比"
      />
      <el-table-column
        prop="laod"
        header-align="center"
        align="center"
        label="载重"
      />
      <el-table-column
        prop="loadingCapacity"
        header-align="center"
        align="center"
        label="载重人数"
      />
      <el-table-column
        prop="operatorName"
        header-align="center"
        align="center"
        label="司机名字"
      />
      <el-table-column
        prop="speed"
        header-align="center"
        align="center"
        label="速度"
      />
      <el-table-column
        prop="windSpeed"
        header-align="center"
        align="center"
        label="风速"
      />
      <el-table-column
        prop="runtime"
        header-align="center"
        align="center"
        width="180"
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
import { historyList } from '@/api-zhgd/zhgd-elevator'
import { parseTime } from '@/utils'
export default {
  props: {
    elevatorId: {
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
        name: '',
        noAlarm: '',
        startTime: '',
        endTime: ''
      },
      timeRange: '',
      dataList: [],
      exportUrl: `/eleAddrecord/export`,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  watch: {
    elevatorId: {
      handler(newVal, oldVal) {
        return newVal && this.getDataList(newVal)
      },
      immediate: true
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList(elevatorId) {
      this.dataListLoading = true
      this.exportUrl = `/eleAddrecord/export?`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      historyList({
        elevatorId: elevatorId,
        ...this.dataForm,
        'page': this.pageIndex,
        'rows': this.pageSize
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.runtime = item.runtime ? parseTime(item.runtime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
      // this.dataForm[type] = val
      this.getDataList(this.elevatorId)
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList(this.elevatorId)
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList(this.elevatorId)
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList(this.elevatorId)
    }
  }
}
</script>

<style lang="scss">
.elevator-monitor-history {
  .el-table {
    width: 100%;
    margin-top:10px
  }
}
</style>
