<template>
  <div class="version">
    <el-form :inline="true" :model="dataForm">
      <div class="search-btn-style">
        <el-button v-permit="'sys_version_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
        <el-button v-permit="'sys_version_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
        <el-form-item label="设备类别：" label-width="110px" prop="type">
          <el-select v-model.trim="dataForm.deviceTypePlus" clearable style="width:160px" placeholder="设备类型" @change="getDataList()">
            <el-option v-for="(v, i) in deviceList" :key="i" :label="v.title" :value="v.id">{{ v.title }}</el-option>
          </el-select>
        </el-form-item>
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
        prop="version"
        header-align="center"
        align="center"
        width="110"
        label="版本号"
      />
      <el-table-column
        prop="downloadUrl"
        header-align="center"
        align="center"
        width="575"
        :show-overflow-tooltip="true"
        label="下载地址"
      />
      <el-table-column
        prop="content"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="更新内容"
      />
      <el-table-column
        prop="update"
        header-align="center"
        align="center"
        width="110"
        label="是否可以更新"
      />
      <el-table-column
        prop="mobilePhone"
        header-align="center"
        align="center"
        width="110"
        label="是否全局更新"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        width="120"
        label="设备类型"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="120"
        label="创建时间"
      />
      <el-table-column
        v-if="basePermit('sys_version_btn_update') || basePermit('sys_version_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_version_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'sys_version_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './version-add-or-update'
import { getList, del } from '@/api/sys/version'
import { parseTime } from '@/utils'
export default {
  name: 'List',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        companyName: null,
        suid: null,
        deviceTypePlus: null
      },
      deviceList: [
        {
          title: 'Android_v1',
          id: 1
        },
        {
          title: 'Android_v2',
          id: 4
        },
        {
          title: 'Android_v3',
          id: 5
        },
        {
          title: 'IOS',
          id: 2
        },
        {
          title: '小智',
          id: 3
        }
      ],
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
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d}') : ''
            item.update = item.isUpdate ? (item.isUpdate === 1 ? '是' : '否') : ''
            item.type = item.deviceType && this.deviceList.find(v => v.id === item.deviceType).title
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
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    rowDblclick(row) {
      if (this.basePermit('sys_version_btn_update')) this.addOrUpdateHandle(row)
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

<style lang="scss">
  // .version {}
</style>
