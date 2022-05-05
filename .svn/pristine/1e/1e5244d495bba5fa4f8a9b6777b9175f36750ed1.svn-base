<template>
  <div class="zhgd-sys-dict">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="dictType">
        <el-select v-model="dataForm.dictType" placeholder="请选择字典类型" @change="(e) => searchHandle(e, 'dictType')">
          <el-option
            v-for="item in options"
            :key="item.dictType"
            :label="item.dictName"
            :value="item.dictType"
          />
        </el-select>
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
        prop="dictLabel"
        header-align="center"
        align="center"
        label="字典标签"
      />
      <el-table-column
        prop="dictValue"
        header-align="center"
        align="center"
        label="类别名称"
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
          <el-button type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.dictCode)">删除</el-button>
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
import { getList, del, getTypeList } from '@/api-zhgd/sys/dict'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        dictType: '',
        isDel: 0
      },
      options: [],
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
    await this.getTypeListHandle()
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getTypeListHandle() {
      return new Promise(resolve => {
        getTypeList().then((data) => {
          if (data && data.code === 1000) {
            this.options = data.result
            if (this.options.length) {
              this.dataForm.dictType = this.options[0].dictType
              this.getDataList()
            }
            resolve(true)
          }
        })
      })
    },
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
    deleteHandle(dictCode) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ dictCode }).then((data) => {
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
