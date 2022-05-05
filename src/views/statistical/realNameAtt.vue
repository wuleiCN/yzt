<template>
  <div class="statistical_realNameAtt">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="projectId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <a v-permit="'statistical_realNameAtt_btn_export'" :href="!dataList.length ? 'javascript:void(0)' : $http.baseUrl(exportUrl)">
          <el-button :disabled="!dataList.length" type="primary">导出</el-button>
        </a>
      </el-form-item>
    </el-form>
    <h2 class="table-title">项目实名制实施情况汇总表</h2>
    <yztTable
      v-loading="dataListLoading"
      :i-s-index="true"
      :i-sselection="false"
      :total-page="totalPage"
      :page-index="pageIndex"
      :page-size="pageSize"
      :columns="columns"
      :table-data="dataList"
      @reload="reload"
    />
  </div>
</template>

<script>
import { proOptionList } from '@/api/salary/data'
import { getList } from '@/api/statistical/realNameAtt'
import yztTable from '@/components/yzt-table'
import { columns, fields } from './columns/realNameAtt'
export default {
  components: {
    yztTable
  },
  data() {
    const loginInfo = this.$store.state.user.loginInfo
    return {
      dataForm: {
        projectId: ''
      },
      exportUrl: ``,
      columns,
      fields,
      disabled: false,
      loginInfo,
      dataList: [],
      proList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  watch: {
    dataForm: {
      handler(newName, oldName) {
        this.exportUrl = `/statisticalReport/exportRealNameReport?token=${this.loginInfo.token}`
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
    await this.getProOptionList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      this.disabled = true
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      this.getDataList()
    }
  },
  methods: {
    reload(pageIndex, pageSize) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      this.getDataList()
    },
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
      this.pageIndex = 1
      this.dataForm[type] = val
      if (!this.dataForm.projectId) return this.$message.error('请选择项目')
      this.getDataList()
    }
  }
}
</script>

<style lang="scss">
  .statistical_realNameAtt {
    .table-title {
      text-align: center;
    }
  }
</style>
