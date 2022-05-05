<template>
  <div class="produce-page">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="companyName">
        <el-input v-model.trim="dataForm.companyName" placeholder="公司名称" />
      </el-form-item>
      <el-form-item prop="brandName">
        <el-input v-model.trim="dataForm.brandName" placeholder="品牌名称" />
      </el-form-item>
      <el-form-item prop="productName">
        <el-input v-model.trim="dataForm.productName" placeholder="产品名称" />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="dataForm.isEnable" clearable placeholder="请选择状态" @change="(e) => searchHandle(e, 'isEnable')">
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
        <el-button v-permit="'product_product_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
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
        prop="companyName"
        header-align="center"
        align="center"
        label="公司名称"
      />
      <el-table-column
        prop="brandName"
        header-align="center"
        align="center"
        label="品牌名称"
      />
      <el-table-column
        prop="productName"
        header-align="center"
        align="center"
        label="产品名称"
      />
      <el-table-column
        prop="contacts"
        header-align="center"
        align="center"
        label="联系人"
      />
      <el-table-column
        prop="contactsPhone"
        header-align="center"
        align="center"
        label="联系电话"
      />
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="联系地址"
      />
      <el-table-column
        prop="isEnable"
        header-align="center"
        align="center"
        label="是否启用"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnable == 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.isEnable == 1" size="small" type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="copyCreateTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permit="'product_product_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-permit="'product_product_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import AddOrUpdate from './list-add-or-update'
import { getList, del } from '@/api/product'
import { parseTime } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      statusOptions: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataForm: {
        isEnable: '',
        companyName: '',
        brandName: '',
        productName: ''
      },
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  async created() {
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
            item.copyCreateTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row }, this.options)
      })
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
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del([id]).then((data) => {
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
  .produce-page{
    background: #fff;
  }
</style>
