<template>
  <div class="dict">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="category">
        <el-select v-model="dataForm.category" clearable placeholder="请选择字典类型" @change="(e) => searchHandle(e, 'enterAndRetreatCondition')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="title">
        <el-input v-model="dataForm.title" placeholder="名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle">查询</el-button>
      </el-form-item>
      <div class="search-btn-style">
        <el-button v-permit="'sys_dict_btn_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
        <el-button v-permit="'sys_dict_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
        prop="title"
        header-align="center"
        align="center"
        label="名称"
      />
      <el-table-column
        prop="groupTitle"
        header-align="center"
        align="center"
        label="类别名称"
      />
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        v-if="basePermit('sys_dict_btn_update') || basePermit('sys_dict_btn_delete')"
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'sys_dict_btn_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'sys_dict_btn_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import AddOrUpdate from './dict-add-or-update'
import { getList, del } from '@/api/sys/dict'
import { parseTime } from '@/utils'
export default {
  name: 'List',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        category: '',
        title: ''
      },
      options: [
        { value: 'REW_LEVEL', label: '奖励等级' },
        { value: 'PUN_LEVEL', label: '惩罚等级' },
        { value: 'TRAIN_TYPE', label: '课题类型' },
        { value: 'REW_CATEGORY', label: '奖励类别' },
        { value: 'PUN_CATEGORY', label: '惩罚类别' },
        { value: 'CONSTRUCTION_EVENT', label: '事件类型' },
        { value: 'UNIT', label: '计量单位' },
        { value: 'AREA_UNIT_TYPE', label: '生活区单元楼类型' },
        { value: 'CER_TYPE', label: '证书类型' },
        { value: 'CER_LEVEL', label: '证书等级' },
        { value: 'SCHEDULE_NODE_ATTRIBUTE', label: '进度管理节点属性' },
        { value: 'QUALITY_CONTROL_TYPE', label: '质量管理问题类型' },
        { value: 'FB_REW_LEVEL', label: '分包奖励等级' },
        { value: 'FB_PUN_LEVEL', label: '分包惩罚等级' },
        { value: 'FB_REW_CATEGORY', label: '分包奖励类别' },
        { value: 'FB_PUN_CATEGORY', label: '分包惩罚类别' },
        { value: 'QUALIFICATION_TYPE', label: '资质类别' },
        { value: 'QUALIFICATION_LEVEL', label: '资质等级' },
        { value: 'DEVICE_FACTORY', label: '设备厂家' }
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
    this.dataForm.category = this.options[0].value
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
            item.createDate = item.createDate ? parseTime(item.createDate, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
        this.$refs.addOrUpdate.init({ ...row, category: this.dataForm.category })
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
  // .dict {}
</style>
