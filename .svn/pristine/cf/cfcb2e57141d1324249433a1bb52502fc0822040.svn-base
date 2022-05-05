<template>
  <div class="company">
    <!-- <el-form :inline="true" :model="dataForm">
      <el-form-item v-for="(item, index) in fields" :key="index">
        <el-input v-model="dataForm[item.prop]" clearable :placeholder="item.placeholder" @clear="handleClear" />
      </el-form-item>
      <yztFormItem :fields="fields" :dataForm="dataForm" />
      <el-form-item>
        <el-button v-model="dataForm.xxx" type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'company_list_btn_add'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-permit="'company_list_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
      </div>
    </el-form> -->
    <yztSearchForm :fields="fields" :data-form="dataForm" @searchHandle="searchHandle" @handleClear="handleClear" />
    <div class="search-btn-style">
      <el-button v-permit="'company_list_btn_add'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      <el-button v-permit="'company_list_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
    </div>
    <yztTable
      v-loading="dataListLoading"
      :total-page="totalPage"
      :page-index="pageIndex"
      :page-size="pageSize"
      :columns="columns"
      :table-data="dataList"
      @reload="reload"
      @selection-change="selectionChangeHandle"
      @row-dblclick="rowDblclick"
    >
      <template v-slot:operat="scope">
        <el-button v-permit="'company_list_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
        <el-button v-permit="'company_list_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
      </template>
    </yztTable>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './company-add-or-update'
import { getList, del } from '@/api/company'
import yztTable from '@/components/yzt-table'
import yztSearchForm from '@/components/yzt-search-form'
import { columns, fields } from './columns'
export default {
  name: 'List',
  components: {
    AddOrUpdate,
    yztTable,
    yztSearchForm
  },
  data() {
    return {
      dataForm: {
        companyName: null,
        suid: null
      },
      columns,
      fields,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
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
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    rowDblclick(row) {
      if (this.basePermit('company_list_btn_update')) this.addOrUpdateHandle(row.id)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    handleClear() {
      this.dataForm.suid = null
      this.dataForm.companyName = null
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
