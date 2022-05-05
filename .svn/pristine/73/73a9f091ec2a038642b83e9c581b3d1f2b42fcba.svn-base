<template>

  <div class="statistical-proAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="companyName">
        <el-select v-model="dataForm.companyName" :disabled="disabled" filterable style="width:100%" placeholder="请选择公司" @change="(e) => selectChangeHandle(e, 'companyId')">
          <el-option v-for="(item, index) in comList" :key="index" :label="item.id" :value="item.id">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="projectName">
        <el-input
          v-model="dataForm.projectName"
          clearable
          placeholder="项目名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectChangeHandle()">查询</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <div class="search-btn-style">
          <a v-permit="'project_record_btn_export'" target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">导出</el-button></a>
        </div>
      </el-form-item> -->
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
        prop="projectName"
        header-align="center"
        align="center"
        width="300"
        :show-overflow-tooltip="true"
        label="项目名称"
      />
      <el-table-column
        prop="projectState"
        header-align="center"
        align="center"
        label="项目状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.projectState == '在建'" size="small" type="success">在建</el-tag>
          <el-tag v-if="scope.row.projectState == '停工'" size="small" type="danger">停工</el-tag>
          <el-tag v-if="scope.row.projectState == '竣工'" size="small" type="info">竣工</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectAddress"
        header-align="center"
        align="center"
        width="250"
        :show-overflow-tooltip="true"
        label="项目所在地"
      />
      <el-table-column
        prop="projectType"
        header-align="center"
        align="center"
        width="130"
        label="项目类型"
      />
      <el-table-column
        prop="zycbNum"
        header-align="center"
        align="center"
        width="120"
        label="专业承包单位数"
      />
      <el-table-column
        prop="lwfbNum"
        header-align="center"
        align="center"
        width="120"
        label="劳务分包单位数"
      />
      <el-table-column
        prop="lwbzNum"
        header-align="center"
        align="center"
        width="120"
        label="劳务班组数"
      />
      <el-table-column
        prop="ljNum"
        header-align="center"
        align="center"
        label="累计人数"
      />
      <el-table-column
        prop="zcNum"
        header-align="center"
        align="center"
        label="在场人数"
      />
      <el-table-column
        prop="xcNum"
        header-align="center"
        align="center"
        label="现场人数"
      />
      <el-table-column
        prop="jrcqNum"
        header-align="center"
        align="center"
        width="120"
        label="今日出勤人数"
      />
      <el-table-column
        prop="jrskLv"
        header-align="center"
        align="center"
        width="120"
        label="今日刷卡率"
      />
      <el-table-column
        prop="qrskLv"
        header-align="center"
        align="center"
        width="120"
        label="近七日刷卡率"
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
import { getList } from '@/api/statistical/proAtt'
export default {
  data() {
    // const { token } = this.$store.state.user.loginInfo
    return {
      dataList: [],
      keyName: '',
      dataForm: {
        projectName: null,
        companyName: null
      },
      comList: [
        {
          id: 1,
          name: 'test01'
        },
        {
          id: 2,
          name: 'test02'
        }
      ],
      disabled: false,
      // exportUrl: `/statisticalReport/exportProjectAttendance?token=${token}`,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records
          this.totalPage = data.result.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
        // console.log(data)
      })
    },
    // 查询
    selectChangeHandle() {
      if (this.dataForm.projectName !== null || this.dataForm.companyName !== null) {
        console.log(this.dataForm)
      } else {
        this.$message.error('请选择项目名称')
      }
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
    }
  }
}
</script>

<style lang="scss">
  // .statistical-proAtt {}
</style>
