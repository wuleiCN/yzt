<template>
  <el-dialog
    custom-class="payroll-detail-modal"
    title="设备执行明细"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-main>
      <div>
        <el-form ref="dataForm" :inline="true" :model="dataForm">
          <el-form-item prop="deviceName">
            <el-input v-model="dataForm.deviceName" clearable placeholder="设备名称" />
          </el-form-item>
          <el-form-item prop="cmdStatus">
            <el-select v-model.trim="dataForm.cmdStatus" clearable style="width:100%" placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'cmdStatus')">
              <el-option label="成功" :value="1"> 成功 </el-option>
              <el-option label="失败" :value="2"> 失败 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="">
            <el-button type="primary" @click="searchHandle()">查询</el-button>
          </el-form-item></el-form>
        <el-table
          v-loading="dataListLoading"
          :data="dataList"
          border
          stripe
          tooltip-effect="light"
          highlight-current-row
        >
          <el-table-column
            prop="deviceName"
            header-align="center"
            align="center"
            label="设备名称"
          />
          <el-table-column
            prop="cmdDescrible"
            header-align="center"
            align="center"
            label="指令描述"
          />
          <el-table-column
            prop="cmdStatus"
            header-align="center"
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.cmdStatus === 2" size="small" type="danger">失败</el-tag>
              <el-tag v-if="scope.row.cmdStatus === 1" size="small" type="success">成功</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
            label="执行结果"
          >
            <template slot-scope="scope">
              <span :style="{'color': scope.row.style ? '#1890ff' : '', 'cursor': scope.row.style ? 'pointer' : ''}" @click="showRemark(scope.row)">
                {{ scope.row.style ? '查看详情' : scope.row.remark }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="创建时间"
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
      </div>
      <el-dialog
        title="执行结果明细"
        custom-class="remack-modal"
        append-to-body
        width="1000px"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
      >
        <div class="remark-table">
          <h3>{{ total }}</h3>
          <el-table
            :data="tableList"
            border
            stripe
            height="500"
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              type="index"
              width="50"
              align="center"
              label="序列"
            />
            <el-table-column
              prop="workder"
              header-align="center"
              align="center"
              label="姓名"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              label="身份证"
            >
              <template slot-scope="scope">
                <div v-show="scope.row.idCode" @click="doCopy(scope.row.idCode)">
                  {{ scope.row.idCode }}
                  <i style="cursor: pointer;color:#46a6ff" title="点击复制" class="el-icon-document-copy" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="result"
              header-align="center"
              align="center"
              label="原因"
            />
          </el-table>
          <!-- <div v-for="(ele, index) in item.remark && item.remark.split(';')" :key="index" class="remark-item">
            <span v-for="(el, idx) in ele && ele.split('——')" :key="idx">{{ el }}</span>
          </div> -->
        </div>
      </el-dialog>
    </el-main>
  </el-dialog>
</template>

<script>
import { attcmdinfoList } from '@/api/project/device'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      tableList: [],
      item: {},
      total: '',
      dialogVisible: false,
      dataListLoading: false,
      loginInfo: this.$store.state.user.loginInfo,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataForm: {
        cmdStatus: null,
        deviceName: null
      },
      dataRule: {}
    }
  },
  methods: {
    // 打开弹窗
    init({ month, id }) {
      this.visible = true
      this.month = month
      this.id = id
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getDataList()
      })
    },
    getDataList() {
      this.dataListLoading = true
      attcmdinfoList({
        userId: this.loginInfo.id,
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data.result && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            item.style = item.remark && item.remark.indexOf('成功人数') !== -1 && item.remark.indexOf('失败人数') !== -1
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
    selectChangeHandle(val, type) {
      this.dataForm[type] = val
      if (type === 'cmdStatus' && val === '') this.dataForm.cmdStatus = null
      if (type === 'deviceName' && val === '') this.dataForm.deviceName = null
      this.getDataList()
    },
    // 每页数
    showRemark(row) {
      this.item = row
      const obj = {}
      this.total = row.remark && row.remark.split(';').filter((ele, idx) => idx === 0).toString()
      this.tableList = row.remark && row.remark.split(';').filter((ele, idx) => idx !== 0).map((item, index) => {
        this.$set(obj, 'workder', item.split('——')[0])
        this.$set(obj, 'idCode', item.split('——')[1])
        this.$set(obj, 'result', item.split('——')[2])
        item = { ...obj }
        return item
      })
      this.tableList = this.tableList.filter((item, index) => index !== this.tableList.length - 1)
      if (row.remark && row.remark.indexOf('成功人数') !== -1 && row.remark.indexOf('失败人数') !== -1) this.dialogVisible = true
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
      this.getDataList(this.companyId)
    },
    doCopy() {
      this.$message.success('复制成功')
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
  .payroll-detail-modal {

    width: 1200px;
    .el-dialog__body {
      padding: 0;
    }

  }
  .remack-modal {
    padding-bottom: 40px;
    .el-dialog__body {
      padding: 10px;
    }
  }
  .remark-table {
    width: 100%;
    margin:0 auto;
  }
  .remark-item {
    margin-bottom: 5px;
  }
  .remark-item:first-child {
    font-size: 20px;
    margin-bottom: 15px;
  }
</style>
