<template>
  <div class="salary-data">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="planId">
        <el-select v-model="dataForm.planId" style="width:100%" placeholder="请选择薪资方案" @change="(e) => searchHandle(e, 'planId')">
          <el-option v-for="(item, index) in planList" :key="index" :label="item.name" :value="item.id">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="planId">
        <el-select v-model="dataForm.projectId" :disabled="disabled" filterable style="width:100%" placeholder="请选择项目" @change="(e) => searchHandle(e, 'projectId')">
          <el-option v-for="(item, index) in proList" :key="index" :label="item.projectName" :value="item.id">{{ item.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item prop="constructionName">
        <el-input v-model="dataForm.constructionList" clearable placeholder="参建单位" />
      </el-form-item>
      <el-form-item prop="teamName">
        <el-input v-model="dataForm.teamName" clearable placeholder="所属班组" />
      </el-form-item> -->
      <el-form-item prop="constructionId">
        <el-select v-model.trim="dataForm.constructionId" :disabled="disabled1" style="width:100%" clearable placeholder="请选择参建单位" @change="(e) => searchHandle(e, 'constructionId')">
          <el-option v-for="(item, index) in constructionList" :key="index" :label="item.construction.constructionName" :value="item.id"> {{ item.construction.constructionName }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="month">
        <el-date-picker
          v-model="dataForm.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="(e) => searchHandle(e, 'month')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'salary_data_btn_import'" type="primary" @click="showImportModal()">导入</el-button>
        <el-button v-permit="'salary_data_btn_update'" type="primary" :disabled="dataListSelections.length <= 0" @click="addOrUpdateHandle(headerList)">批量设置</el-button>
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
      @selection-change="selectionChangeHandle"
      @row-dblclick="rowDblclick"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="idCode"
        header-align="center"
        align="center"
        width="170"
        label="身份证"
      />
      <el-table-column
        prop="empName"
        header-align="center"
        align="center"
        label="姓名"
      />
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        label="项目"
      />
      <!-- <el-table-column
        prop="builderLicense"
        header-align="center"
        align="center"
        label="施工许可证"
      /> -->
      <el-table-column
        prop="constructionName"
        header-align="center"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
        label="参建单位"
      />
      <el-table-column
        prop="teamName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="班组"
      />
      <el-table-column
        v-for="(item,index) in headerList"
        :key="index"
        :prop="item.code"
        header-align="center"
        align="center"
        :width="item.name === '本月实际支付' ? 110 : 'auto'"
        :label="item.name"
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
    <import-modal v-if="importVisible" ref="importModal" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './data-add-or-update'
import { getConstructionList } from '@/api/sys/user'
import ImportModal from './data-import'
import { getList, getheadList, del, optionList, optionCaseList } from '@/api/salary/data'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate,
    ImportModal
  },
  data() {
    return {
      dataForm: {
        planId: '',
        projectId: '',
        constructionId: '',
        constructionName: '',
        teamName: '',
        month: parseTime(new Date(), '{y}-{m}')
      },
      disabled: false,
      disabled1: false,
      loginInfo: this.$store.state.user.loginInfo,
      dataList: [],
      planList: [],
      proList: [],
      constructionList: [],
      headerList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      importVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  async created() {
    await this.getProOptionList()
    await this.getOptionPlanList()
    if (this.loginInfo.userType === 3) {
      this.dataForm.projectId = this.loginInfo.projectId
      this.dataForm.projectId = this.proList.find(item => item.id === this.dataForm.projectId) ? this.dataForm.projectId : ''
      await this.getConstructionList()
      this.disabled = true
      this.disabled1 = true
      this.getDataList()
    } else if (this.loginInfo.userType === 2) {
      this.disabled = true
      this.dataForm.projectId = this.loginInfo.projectId
      this.dataForm.projectId = this.proList.find(item => item.id === this.dataForm.projectId) ? this.dataForm.projectId : ''
      await this.getConstructionList()
      this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    // 导入
    showImportModal(id, tempId) {
      this.importVisible = true
      this.$nextTick(() => {
        this.$refs.importModal.init()
      })
    },
    // 获取参建单位下拉列表
    getConstructionList() {
      return new Promise(resolve => {
        getConstructionList({ id: this.dataForm.projectId }).then(data => {
          this.constructionList = data.result
          this.dataForm.constructionId = this.loginInfo.constructionId
          resolve(this.constructionList)
        })
      })
    },
    getHeadList(planId) {
      getheadList({ planId }).then((data) => {
        this.headerList = data.result
      })
    },
    getOptionPlanList() {
      return new Promise(resolve => {
        optionList().then((data) => {
          if (data && data.code === 1000) {
            this.planList = data.result
            resolve(this.planList)
            if (this.planList.length) {
              this.getHeadList(this.planList[0].id)
              this.dataForm.planId = this.planList[0].id
            }
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    getProOptionList() {
      return new Promise(resolve => {
        optionCaseList().then((data) => {
          if (data && data.code === 1000) {
            this.proList = data.result
            resolve(this.proList)
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 查询
    searchHandle(val, type) {
      this.pageIndex = 1
      this.dataForm[type] = val
      if (type === 'projectId') this.getConstructionList()
      if (type === 'planId') this.getHeadList(val)
      if (!this.dataForm.projectId) return this.$message.error('请选择项目')
      if (!this.dataForm.month) return this.$message.error('请选择月份')
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(headerList, dataListSelections, row) {
      const ids = row && row.id ? [row.id] : this.dataListSelections.map(item => item.id)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init([...headerList], ids, this.dataForm.month, { ...row })
      })
    },
    rowDblclick(row) {
      if (this.basePermit('salary_data_btn_update')) this.addOrUpdateHandle(this.headerList, [], row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`您确定进行[${id ? '删除' : '批量删除'}]操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(ids).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
  .salary-data {
    .add-btn {
      float: right;
      margin-right: 0;
    }
  }
</style>
