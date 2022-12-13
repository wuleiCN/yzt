<template>
  <div class="version">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="platformName">
        <el-input v-model="dataForm.platformName" placeholder="平台名称" clearable />
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model.trim="dataForm.type" clearable style="width:100%" placeholder="平台类型" @change="searchHandle">
          <el-option label="公司" :value="1"> 公司 </el-option>
          <el-option label="项目" :value="2"> 项目 </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="searchHandle">查询</el-button>
      <div class="search-btn-style">
        <el-button v-permit="'sys_open_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
        <el-button v-permit="'sys_open_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
        width="50"
      />
      <el-table-column
        prop="companyName"
        header-align="center"
        align="center"
        width="200"
        label="公司名称"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.companyName" @click="clipboardSuccessHandler(scope.row.companyId)">
            {{ scope.row.companyName }}
            <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectName"
        header-align="center"
        align="center"
        width="300"
        label="项目名称"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.projectName" @click="clipboardSuccessHandler(scope.row.projectId)">
            {{ scope.row.projectName }}
            <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="platformName"
        header-align="center"
        align="center"
        label="平台名称"
      />
      <el-table-column
        prop="platformCode"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="平台代码"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="status"
        label="	状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status == 1" size="small" type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="appId"
        header-align="center"
        align="center"
        width="300"
        label="appId"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.appId" @click="clipboardSuccessHandler(scope.row.appId)">
            {{ scope.row.appId }}
            <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="appSecret"
        header-align="center"
        align="center"
        width="300"
        label="appSecret"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.appSecret" @click="clipboardSuccessHandler(scope.row.appSecret)">
            {{ scope.row.appSecret }}
            <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="basePermit('sys_open_update') || basePermit('sys_open_delete')"
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_open_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'sys_open_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
    <add-or-update v-if="addOrUpdateVisible" ref="openAddOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './open-add-or-update'
import { openList, openDelete } from '@/api/sys/version'
import { parseTime } from '@/utils'
export default {
  name: 'List',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        platformName: ''
      },
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
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      openList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
            item.update = item.isUpdate ? (item.isUpdate === 1 ? '是' : '否') : ''
            item.type = item.deviceType ? (item.deviceType === 1 ? 'Android' : item.deviceType === 2 ? 'IOS' : '小智') : ''
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
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.openAddOrUpdate.init({ ...row })
      })
    },
    rowDblclick(row) {
      if (this.basePermit('sys_open_update')) this.addOrUpdateHandle(row)
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
        openDelete(ids).then((data) => {
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
    },
    clipboardSuccessHandler(value) {
      this.$clipboard(value)
      this.$message.success('已复制')
    }
  }
}
</script>

<style lang="scss">
  // .version {}
</style>
