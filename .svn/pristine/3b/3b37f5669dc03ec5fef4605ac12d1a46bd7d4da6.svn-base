<template>
  <div class="zhgd-sys-dict">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="supName">
        <el-input v-model="dataForm.supName" clearable placeholder="供应商名称" />
      </el-form-item>
      <!-- <el-form-item prop="deviceType">
        <el-select v-model="dataForm.deviceType" clearable placeholder="请选择供应商类型" @change="(e) => searchHandle(e, 'deviceType')">
          <el-option
            v-for="item in options"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item prop="status">
        <el-select v-model="dataForm.status" clearable placeholder="请选择状态" @change="(e) => searchHandle(e, 'status')">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button type="primary" @click="addOrUpdateHandle({})">新增</el-button>
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
        prop="supName"
        header-align="center"
        align="center"
        label="供应商名称"
      />
      <el-table-column
        prop="supAbbreviation"
        header-align="center"
        align="center"
        label="厂家简称"
      />
      <el-table-column
        prop="supContacts"
        header-align="center"
        align="center"
        label="联系人"
      />
      <!-- <el-table-column
        prop="deviceTypeName"
        header-align="center"
        align="center"
        label="设备类型"
      /> -->
      <!-- <el-table-column
        prop="statusName"
        header-align="center"
        align="center"
        label="开关状态"
      /> -->
      <el-table-column
        header-align="center"
        align="center"
        prop="status"
        label="	开关状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" size="small" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status == 0" size="small" type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="supPhone"
        header-align="center"
        align="center"
        width="110"
        label="联系人电话"
      />
      <el-table-column
        prop="appId"
        header-align="center"
        align="center"
        width="300"
        label="appId"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.appId" v-clipboard="scope.row.appId" style="cursor: pointer;" @click="$message.success('复制成功')">
            <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
            {{ scope.row.appId }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="appSecret"
        header-align="center"
        align="center"
        width="300"
        label="appSecret"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.appSecret" v-clipboard="scope.row.appSecret" style="cursor: pointer;" @click="$message.success('复制成功')">
            <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
            {{ scope.row.appSecret }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="160"
        label="创建时间"
      />
      <el-table-column
        v-if="basePermit('sys_dict_btn_update') || basePermit('sys_dict_btn_delete')"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :options="options" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './supplier-add-or-update'
import { getList, del } from '@/api-zhgd/sys/supplier'
import { getList as getDist } from '@/api-zhgd/sys/dict'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        deviceType: '',
        supName: '',
        isDel: 0
      },
      options: [],
      statusOptions: [
        { value: 0, label: '启用' },
        { value: 1, label: '禁用' }
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
  async created() {
    await this.getabbreviationList()
    this.getDataList()
  },
  methods: {
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
            item.deviceTypeName = this.options.find(ele => +ele.dictValue === item.deviceType)
              ? this.options.find(ele => +ele.dictValue === item.deviceType).dictLabel : ''
            item.statusName = this.statusOptions.filter(ele => ele.value === item.status)[0].label
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
    getabbreviationList() {
      return getDist({
        dictType: 'supAbbreviation',
        isDel: 0
      }).then((data) => {
        if (data && data.code === 1000) {
          this.options = data.result.records
        } else {
          this.options = []
        }
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
        this.$refs.addOrUpdate.init({ ...row }, this.options)
      })
    },
    rowDblclick(row) {
      if (this.basePermit('sys_dict_btn_update')) this.addOrUpdateHandle(row)
    },
    basePermit(e) {
      return this.$store.getters.roleList.includes(e)
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then((data) => {
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
  .zhgd-sys-dict{
    background: #fff;
  }
</style>
