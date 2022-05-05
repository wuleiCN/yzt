<template>
  <div class="iodetail-record-pege">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="deviceNo">
        <el-input v-model.trim="dataForm.deviceNo" placeholder="设备唯一标识" />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="dataForm.status" clearable placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'status')">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="operatorName">
        <el-input v-model.trim="dataForm.operatorName" placeholder="操作人" />
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
      </el-form-item>
      <div class="search-btn-style">
        <a v-permit="'product_io_export'" style="margin-left:10px" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
      </div>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      stripe
    >
      <el-table-column
        prop="productName"
        header-align="center"
        align="center"
        fixed="left"
        label="所属产品"
      />
      <el-table-column
        prop="deviceNo"
        header-align="center"
        align="center"
        label="设备唯一标识"
      />
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态"
      >
        <template slot-scope="{row}">
          <div>
            <el-tag v-if="row.status === 2">出库</el-tag>
            <el-tag v-if="row.status === 1" type="success">在库</el-tag>
            <el-tag v-if="row.status === 3" type="warning">返修</el-tag>
            <el-tag v-if="row.status === 4" type="danger">报废</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatorName"
        header-align="center"
        align="center"
        label="操作人"
      />
      <el-table-column
        prop="copyCreateTime"
        header-align="center"
        align="center"
        label="创建时间"
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
import { parseTime } from '@/utils/index'
import { productRecord } from '@/api/product'
export default {
  data() {
    return {
      statusOptions: [
        { value: 1, label: '在库' },
        { value: 2, label: '出库' },
        { value: 3, label: '返修' },
        { value: 4, label: '报废' }
      ],
      exportUrl: '',
      dataForm: {
        deviceNo: '',
        status: '',
        startDate: '',
        endDate: '',
        operatorName: ''
      },
      loginInfo: this.$store.state.user.loginInfo,
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
      this.dataListLoading = true
      const { token } = this.loginInfo
      const { timeRange } = this.dataForm
      this.dataForm.startDate = timeRange && timeRange.length ? timeRange[0] : ''
      this.dataForm.endDate = timeRange && timeRange.length ? timeRange[1] : ''
      this.exportUrl = `/productRecord/export?token=${token}`
      for (const key in this.dataForm) {
        if (this.dataForm.hasOwnProperty(key)) {
          const element = this.dataForm[key]
          if (element || element === 0) {
            this.exportUrl += `&${key}=${this.dataForm[key]}`
          }
        }
      }
      productRecord({
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.copyCreateTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
      this.dataForm[type] = val
      this.pageIndex = 1
      this.getDataList()
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
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>

<style lang="scss">
</style>
