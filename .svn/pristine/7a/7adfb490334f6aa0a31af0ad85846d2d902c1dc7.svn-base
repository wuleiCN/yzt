<template>
  <el-dialog
    custom-class="product-warehousing-detail-modal"
    title="产品明细"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-main>
      <el-form :inline="true" :model="searchDataForm">
        <el-form-item prop="deviceNo">
          <el-input v-model.trim="searchDataForm.deviceNo" placeholder="设备唯一标识" />
        </el-form-item>
        <el-form-item prop="batchNumber">
          <el-input v-model.trim="searchDataForm.batchNumber" placeholder="产品批次号" />
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="searchDataForm.status" clearable placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'status')">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="operatorName">
          <el-input v-model.trim="searchDataForm.operatorName" placeholder="操作人" />
        </el-form-item>
        <el-form-item prop="timeRange">
          <el-date-picker
            v-model="searchDataForm.timeRange"
            clearable
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="(e) => selectChangeHandle(e, 'timeRange')"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandle()">查询</el-button>
        </el-form-item>
        <div class="search-btn-style">
          <el-button v-permit="'warehousing_detail_add'" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
          <my-upload ref="myUpload" v-permit="'warehousing_detail_import'" style="display:inline-block;margin-left:10px" :is-show="false" :limit="'doc'" :data="{productPurchaseId: id}" :title="'导入'" :action="'/productPurchaseDetail/excelImport'" @getfileList="(fileList) => getFileData(fileList, 'importResult')" />
          <a v-permit="'warehousing_detail_download'" target="_blank" class="temp-name" :href="$http.staticUrl('/产品明细导入模板.xlsx')">
            <el-button style="margin-left:10px" type="primary">产品明细模板下载</el-button>
          </a>
        </div>
      </el-form>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="deviceNo"
          header-align="center"
          align="center"
          label="设备唯一标识"
        />
        <el-table-column
          prop="status"
          header-align="center"
          align="center"
          label="状态"
        >
          <template slot-scope="{row}">
            <div>
              <el-tag v-if="row.status === 2">出库</el-tag>
              <el-tag v-if="row.status === 1" type="success">在库</el-tag>
              <el-tag v-if="row.status === 3" type="warning">返修</el-tag>
              <el-tag v-if="row.status === 4" type="danger">报废</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="batchNumber"
          header-align="center"
          align="center"
          label="产品批次号"
        />
        <el-table-column
          prop="operatorName"
          header-align="center"
          align="center"
          label="操作人"
        />
        <el-table-column
          prop="copyCreateTime"
          header-align="center"
          align="center"
          label="创建时间"
        />
        <el-table-column
          header-align="center"
          align="center"
          width="130"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button v-permit="'warehousing_detail_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
            <el-button v-permit="'warehousing_detail_delete'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    </el-main>
    <el-dialog
      custom-class="product-list-modal"
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="addOrUpdateVisible"
    >
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" @keyup.enter.native="dataFormSubmit()">
        <el-form-item label="设备唯一标识" prop="deviceNo">
          <el-input v-model.trim="dataForm.deviceNo" placeholder="设备唯一标识" />
        </el-form-item>
        <el-form-item label="产品批次号" prop="batchNumber">
          <el-input v-model.trim="dataForm.batchNumber" placeholder="产品批次号" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="dataForm.status" style="width: 100%" clearable placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select></el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model.trim="dataForm.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { getList, del, saveOrUpdate } from '@/api/productPurchaseDetail'
import { parseTime } from '@/utils'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      statusOptions: [
        { value: 1, label: '在库' },
        { value: 2, label: '出库' },
        { value: 3, label: '返修' },
        { value: 4, label: '报废' }
      ],
      visible: false,
      addOrUpdateVisible: false,
      dataListLoading: false,
      searchDataForm: {
        status: '',
        deviceNo: '',
        startDate: '',
        endDate: '',
        batchNumber: '',
        operatorName: ''
      },
      id: '',
      dataForm: {
        // id: '',
        deviceNo: '',
        remark: '',
        status: ''
      },
      dataRule: {
        deviceNo: [
          { required: true, message: '设备唯一标识不能为空', trigger: 'blur' }
        ],
        batchNumber: [
          { required: true, message: '产品批次号不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z]{1,}$/, message: '由数字,字母组成', trigger: ['blur', 'change'] }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.id = row.id || null
      this.row = row
      this.visible = true
      this.getDataList()
      this.$nextTick(() => {
        // if (this.id) {
        // }
      })
    },
    getDataList() {
      this.dataListLoading = true
      getList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        productPurchaseId: this.id,
        ...this.searchDataForm
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
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        if (!row.id) {
          this.$refs['dataForm'].resetFields()
          this.dataForm = {}
        } else {
          this.dataForm = { ...row }
        }
      })
    },
    getFileData(fileList, type) {
      // this.$set(this.dataForm, type, fileList.result)
      // if (this.dataForm.importResult) {
      this.getDataList()
      const { errorList, successCount } = fileList.result
      if (successCount) this.$emit('refreshDataList')
      let str = `
          <div>成功导入${successCount}条试题</div>
        `
      errorList.length && errorList.map(item => {
        str += `<div>第${item.row}行，失败原因：${item.msg}</div>`
      })

      this.$alert(str, '导入结果', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
      // }
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
                this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 查询
    searchHandle() {
      this.pageIndex = 1
      this.getDataList()
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.searchDataForm.startDate = val && val.length ? val[0] : ''
        this.searchDataForm.endDate = val && val.length ? val[1] : ''
      }
      this.searchDataForm[type] = val
      this.pageIndex = 1
      this.getDataList()
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
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({ ...this.dataForm, productPurchaseId: this.id }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.addOrUpdateVisible = false
                  this.getDataList()
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .product-warehousing-detail-modal {
    width: 1200px;
  }
</style>
