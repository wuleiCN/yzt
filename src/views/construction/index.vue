<template>
  <div class="construction">
    <el-form :inline="true" :model="dataForm">
      <el-form-item prop="constructionName">
        <el-input v-model="dataForm.constructionName" clearable placeholder="参建单位名称" />
      </el-form-item>
      <el-form-item prop="suid">
        <el-input v-model="dataForm.suid" clearable placeholder="信用代码" />
      </el-form-item>
      <el-form-item prop="companyType">
        <el-select v-model="dataForm.companyType" clearable style="width:100%" placeholder="请选择单位类型" @change="(e) => selectChangeHandle(e, 'companyType')">
          <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="address">
        <el-input v-model="dataForm.address" clearable placeholder="注册区域" />
      </el-form-item>
      <el-form-item class="">
        <el-button type="primary" @click="searchHandle()">查询</el-button>
        <el-button v-permit="'construction_btn_add'" type="primary" @click="addCon">新增</el-button>
        <el-button v-permit="'construction_btn_delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
      </el-form-item></el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      :show-header="false"
      stripe
      style="width: 100%;"
      @row-dblclick="rowDblclick"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="selection"
        align="left"
        width="50"
      />
      <el-table-column
        align="left"
      >
        <template slot-scope="scope">
          <div class="table-item">
            <div @click="addOrUpdateHandle(scope.row)"> <span class="label">参建单位名称：</span><a class="construction-name" href="#">{{ scope.row.constructionName }}</a></div>
            <div><span class="label">成立日期：</span>{{ scope.row.setUpDate }}</div>
            <!-- <div><span class="label">营业执照：</span>{{ scope.row.legalPerson }}</div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
      >
        <template slot-scope="scope">
          <div class="table-item item-border">
            <div><span class="label">法定代表人：</span>{{ scope.row.legalPerson }}</div>
            <div><span class="label">在册人数：</span>{{ scope.row.workersNum }}</div>
            <div><span class="label">联系电话：</span>{{ scope.row.mobilePhone }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
      >
        <template slot-scope="scope">
          <div class="table-item item-border">
            <div><span class="label">注册资本：</span>{{ scope.row.capital }}</div>
            <div><span class="label">类型：</span>{{ scope.row.typeStr }}</div>
            <div><span class="label">信用代码：</span>{{ scope.row.suid }}</div>
          </div>

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
    <AddModal v-if="addModalVisible" ref="addModal" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './construction-detail-modal'
import AddModal from './construction-add'
import { getCompanyType } from '@/api/company'
import { getList, del } from '@/api/construction'
export default {
  name: 'List',
  components: {
    AddOrUpdate,
    AddModal
  },
  data() {
    return {
      dataForm: {
        constructionName: '',
        suid: '',
        address: '',
        companyType: ''
      },
      dataList: [],
      types: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addModalVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
    this.getCompanyType()
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
    getCompanyType() {
      getCompanyType().then(data => {
        if (data && data.code === 1000) {
          this.types = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...row })
      })
    },
    // 双击table
    rowDblclick(row) {
      this.addOrUpdateHandle(row)
    },
    // 新增 / 修改
    addCon() {
      this.addModalVisible = true
      this.$nextTick(() => {
        this.$refs.addModal.init()
      })
    },
    selectChangeHandle(val, type) {
      this.dataForm[type] = val
      this.getDataList()
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
  .construction {
    .add-btn {
      float: right;
      margin-right: 0;
    }
    .el-table__row td {
      border-top: 1px solid #dfe6ec;
    }
    .table-item {
      font-size: 15px;
      line-height: 30px;
      padding: 15px;
      padding-left: 20px;
      .label {
        color: #636ca4 ;
      }
      .construction-name {
        color: #3f91d7;
      }
      .construction-name:hover {
        color: #fe5621;
        text-decoration: underline;
      }
    }
    .item-border {
      border-left: 1px solid #f1f1f1;
    }
  }
</style>
