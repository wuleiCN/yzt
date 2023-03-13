<template>
  <div class="project-person">
    <el-container>

      <el-main>
        <div>
          <el-form :inline="true" :model="dataForm">
            <el-form-item prop="empName">
              <el-input v-model="dataForm.empName" clearable placeholder="人员姓名" />
            </el-form-item>
            <el-form-item prop="empPhon">
              <el-input v-model="dataForm.empPhon" clearable placeholder="手机号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchHandle()">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            ref="multiTable"
            v-loading="dataListLoading"
            :data="dataList"
            border
            stripe
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              prop="faceUrl"
              header-align="center"
              align="center"
              fixed="left"
              label="人脸照片"
            >
              <template slot-scope="scope">
                <div @click="handleClickImg(scope.row)">
                  <el-avatar
                    icon="el-icon-user-solid"
                    :size="30"
                    :src="scope.row.faceUrl | http2HttpsFilter"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="empName"
              header-align="center"
              align="center"
              fixed="left"
              label="人员姓名"
            />
            <el-table-column
              prop="idCode"
              header-align="center"
              align="center"
              label="身份证号"
            />
            <el-table-column
              prop="empSex"
              header-align="center"
              align="center"
              label="性别"
            >
              <template slot-scope="scope">
                {{ scope.row.empSex ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="empPhon"
              header-align="center"
              align="center"
              width="110"
              label="手机号码"
            />
            <el-table-column
              prop="enterAndRetreatCondition"
              header-align="center"
              align="center"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.enterAndRetreatCondition === 0" size="small" type="success">在场</el-tag>
                <el-tag v-if="scope.row.enterAndRetreatCondition === 1" size="small" type="danger">退场</el-tag>
                <el-tag v-if="scope.row.enterAndRetreatCondition === 2" size="small" type="info">未同步</el-tag>
                <el-tag v-if="scope.row.enterAndRetreatCondition === 3" size="small" type="warning">暂退场</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="isExamine"
              header-align="center"
              align="center"
              label="审核状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isExamine === 0" size="small" type="danger">未审核</el-tag>
                <el-tag v-if="scope.row.isExamine === 1" size="small" type="info">已审核</el-tag>
                <el-tag v-if="scope.row.isExamine === 2" size="small" type="info">驳回</el-tag>
                <el-tag v-if="scope.row.isExamine === 3 || scope.row.isExamine === 4" size="small" type="warning">审核中</el-tag>

              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              header-align="center"
              align="center"
              label="进场时间"
            >
              <template slot-scope="scope"> <span>{{ scope.row.startTime ? parseTime(new Date(scope.row.startTime), '{y}-{m}-{d}') : '' }}</span> </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              label="操作"
              width="180"
            >
              <template slot-scope="scope">
                <my-upload
                  ref="myUpload"
                  :limit="'image'"
                  style="display:inline-block;"
                  :title="'上传'"
                  :action="'/user/upload'"
                  @getfileList="fileList => getFileData(fileList, 'faceUrl', scope)"
                />
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
        </div>
      </el-main>
    </el-container>
    <el-dialog
      :title="row.empName"
      custom-class="person-avatar el-dialog_img"
      append-to-body
      width="400px"
      onselectstart="return false;"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
    >
      <!-- <div style="height: 500px;width: 100%;margin:0 auto;text-align:center"> -->
      <img
        style="width: 100%;height:600px"
        :src="row.faceUrl | http2HttpsFilter"
        alt=""
      >
      <!-- </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import dist from '@/utils/dist'
import { whiteList, updateById } from '@/api/project/person'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      parseTime,
      dist,
      row: {},
      projectRegion: false,
      isShow: false,
      isRegion: false,
      dialogVisible: false,
      trintTypes: [],
      loginInfo: this.$store.state.user.loginInfo,
      projectId: JSON.parse(sessionStorage.getItem('result')).projectId,
      dataForm: {
        empName: '',
        empPhon: ''
      },
      options: [
        { value: 0, label: '在场' },
        { value: 1, label: '退场' },
        { value: 2, label: '未同步' },
        { value: 3, label: '暂退场' },
        { value: null, label: '全部' }
      ],
      companyId: '',
      type: '',
      dataList: [],
      orgList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight },
      set(val) { this.$store.commit('app/updateDocumentClientHeight', val) }
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 30 - 2 - 90
      if (this.$route.meta.isTab) {
        height -= 40
      }
      return { minHeight: height + 'px' }
    }
  },
  async mounted() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$refs.multiTable.clearSelection()
      whiteList({
        page: this.pageIndex,
        rows: this.pageSize,
        id: this.projectId,
        type: 2,
        ...this.dataForm
      }).then((data) => {
        if (data.code === 1000 && data.result) {
          this.dataList = data.result.records
          this.totalPage = data.result.total
          console.log('data', data)
        } else {
          this.$message.error(data.message)
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      // 翻页取消勾选
      // this.$refs.multiTable.clearSelection()
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
      // 翻页取消勾选
      // this.$refs.multiTable.clearSelection()
      this.pageIndex = val
      this.getDataList()
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    // 上传头像
    getFileData(fileList, type, row) {
      updateById({
        faceUrl: fileList.result,
        id: row.row.id
      })
      this.$set(this.dataList[row.$index], type, fileList.result)
    }
  }
}
</script>

<style lang="scss">
  .project-person {
    .left {
      border: 1px solid #e9eef2;
      overflow: auto;
      max-height: 700px;
    }
  }
  .temp-name {
    padding-bottom:3px;
    margin: 8px 0;
    cursor: pointer;
    border-bottom: 1px solid #dcdfe6;
  }
  .temp-name:hover{
    color: #1682e6;
    // border-bottom: 1px solid #1682e6;
  }
  .sublit-btn {
    width: 100%;
    text-align: right;
    border-bottom: 1px solid #dcdfe6;
    padding-bottom: 5px;
    margin-bottom: 5px;
    .el-button {
      height: 25px;
      padding: 5px;
    }
  }
  .checkbox-group-style {
    .el-checkbox {
      margin: 0;
      display: block;
      margin-bottom: 5px;
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .person-avatar {
    // margin-top: 15vh !important;
    .el-dialog__header {
      padding: 8px;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
    .el-dialog__body {
      padding: 10px;
    }
    .el-dialog__footer {
      display: none;
    }
  }
</style>
