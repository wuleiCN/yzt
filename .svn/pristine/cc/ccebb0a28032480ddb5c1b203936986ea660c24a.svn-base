<template>
  <div class="log-page">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model.trim="dataForm.userName" clearable placeholder="用户" />
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="请选择" @change="(e) => selectChangeHandle(e, 'type')">
          <el-option label="操作日志" :value="1"> 操作日志 </el-option>
          <el-option label="登录日志" :value="2"> 登录日志 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="timeRange">
        <el-date-picker
          v-model="dataForm.timeRange"
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="(e) => selectChangeHandle(e, 'timeRange')"
        />
      </el-form-item>
      <div class="search-btn-style">
        <el-button type="primary" @click="searchHandle()">查询</el-button>
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
    >
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        label="用户"
      />
      <el-table-column
        prop="action"
        header-align="center"
        align="center"
        label="请求接口"
      />
      <el-table-column
        prop="clientIp"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="IP"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="日志类型"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1">操作日志</el-tag>
          <el-tag v-if="scope.row.type === 2" type="danger">登录日志</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="methodType"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="操作类型"
      />
      <el-table-column
        prop="code"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.code === 1000" type="success">成功</el-tag>
          <el-tag v-else type="danger">失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="requestParams"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="请求参数"
      />
      <el-table-column
        prop="responseParams"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="响应参数"
      />

      <el-table-column
        prop="createTime"
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
// import { webLogList } from '@/api/sys/user'
// import { parseTime } from '@/utils'
export default {
  components: {},
  data() {
    return {
      dataForm: {
        type: '',
        userName: '',
        timeRange: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  created() {
    // this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      // this.dataListLoading = true
      // webLogList({
      //   'page': this.pageIndex,
      //   'rows': this.pageSize,
      //   ...this.dataForm
      // }).then((data) => {
      //   if (data && data.code === 1000) {
      //     this.dataList = data.result.records.map(item => {
      //       item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
      //       item.requestParams = item.requestParams ? JSON.stringify(item.requestParams) : ''
      //       item.responseParams = item.responseParams ? JSON.stringify(item.responseParams) : ''
      //       return item
      //     })
      //     this.totalPage = data.result.total
      //   } else {
      //     this.dataList = []
      //     this.totalPage = 0
      //   }
      //   this.dataListLoading = false
      // })
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
      this.getDataList()
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
  // .log-page {}
</style>
