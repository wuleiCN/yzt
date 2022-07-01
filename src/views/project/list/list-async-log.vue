<template>
  <el-dialog
    custom-class="list-async-log"
    title="对接日志"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-main>
      <div>
        <el-form ref="dataForm" :inline="true" :model="dataForm">
          <el-form-item prop="platformName">
            <el-select v-model.trim="dataForm.platformName" style="width:100%" placeholder="请选择">
              <el-option v-for="(item, index) in settingList" :key="index" :label="item.title" :value="item.tag">{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="projectName">
            <el-input v-model="dataForm.projectName" clearable placeholder="项目名称" />
          </el-form-item>
          <el-form-item prop="objectType">
            <el-select v-model.trim="dataForm.objectType" clearable style="width:100%" placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'objectType')">
              <el-option label="项目" :value="5"> 项目 </el-option>
              <el-option label="参建单位" :value="1"> 参建单位 </el-option>
              <el-option label="班组" :value="4"> 班组 </el-option>
              <el-option label="项目人员" :value="2"> 项目人员 </el-option>
              <el-option label="考勤记录" :value="3"> 考勤记录 </el-option>
              <el-option label="工资" :value="15"> 工资 </el-option>
              <el-option label="培训" :value="16"> 培训 </el-option>
              <el-option label="奖惩" :value="17"> 奖惩 </el-option>
              <el-option label="不良记录" :value="18"> 不良记录 </el-option>
              <el-option label="人员进退场" :value="6"> 人员进退场 </el-option>
              <el-option label="人员进退场" :value="8"> 参建单位上传 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model.trim="dataForm.status" clearable style="width:100%" placeholder="请选择状态" @change="(e) => selectChangeHandle(e, 'status')">
              <el-option label="成功" :value="1"> 成功 </el-option>
              <el-option label="失败" :value="2"> 失败 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="ObjectName">
            <el-input v-model="dataForm.ObjectName" clearable placeholder="对象名称" />
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
            prop="projectName"
            header-align="center"
            align="center"
            width="250"
            :show-overflow-tooltip="true"
            label="项目名称"
          />
          <el-table-column
            prop="methodName"
            header-align="center"
            align="center"
            width="180"
            label="方法名"
          />
          <el-table-column
            prop="msg"
            header-align="center"
            align="center"
            width="250"
            :show-overflow-tooltip="true"
            label="对接信息"
          />
          <el-table-column
            prop="objectName"
            header-align="center"
            align="center"
            width="220"
            label="对象名称"
          />
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 2" size="small" type="danger">失败</el-tag>
              <el-tag v-if="scope.row.status === 1" size="small" type="success">成功</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            width="180"
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
    </el-main>
  </el-dialog>
</template>

<script>
import { getLogList, setList } from '@/api/project/project'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      settingList: [],
      dataForm: {
        objectType: 1,
        platformName: '',
        projectName: '',
        ObjectName: '',
        status: ''
      },
      dataRule: {}
    }
  },
  methods: {
    // 打开弹窗
    init({ id }) {
      this.visible = true
      this.id = id
      this.getSetList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getDataList()
      })
    },
    // 对接平台列表
    getSetList(id) {
      setList({ category: 'PLATFORM' }).then(data => {
        this.settingList = data.result
      })
    },
    getDataList() {
      this.dataListLoading = true
      getLogList({
        'page': this.pageIndex,
        'rows': this.pageSize,
        ...this.dataForm
      }).then((data) => {
        if (data && data.code === 1000) {
          this.dataList = data.result.records.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
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
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
  .list-async-log {
    width: 1180px;
    .el-dialog__body {
      padding-top: 20px;
    }

  }
</style>
