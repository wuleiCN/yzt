<template>
  <div class="workersLib">
    <el-form :inline="true" :model="dataForm">
      <el-row>
        <el-col :span="1">
          <el-form-item style="width: 100px;padding-left:10px" label="工种：" />
        </el-col>
        <el-col :span="23">
          <el-form-item prop="titles">
            <Checkbox :option="option" :is-show-toggle="option.length === 21 || false" @change="(e) => selectChangeHandle(e, 'titles')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="1">
          <el-form-item style="width: 100px;padding-left:10px" label="学历：" />
        </el-col>
        <el-form-item prop="educations">
          <Checkbox :option="option1" :is-show-toggle="false" @change="(e) => selectChangeHandle(e, 'educations')" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="1">
          <el-form-item style="width: 100px;padding-left:10px" label="年龄：" />
        </el-col>
        <el-form-item prop="ageTypes">
          <YztRadio :option="option3" @change="(e) => selectChangeHandle(e, 'ageTypes')" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="1">
          <el-form-item style="width: 100px;padding-left:10px" label="性别：" />
        </el-col>
        <el-form-item prop="empSex">
          <YztRadio :option="option4" @change="(e) => selectChangeHandle(e, 'empSex')" />
        </el-form-item>
      </el-row>

      <el-form-item prop="idAddress">
        <el-input v-model="dataForm.idAddress" clearable placeholder="区域" />
      </el-form-item>
      <el-form-item prop="empName">
        <el-input v-model="dataForm.empName" clearable placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="suid">
        <el-input v-model="dataForm.idCode" clearable placeholder="身份证号" />
      </el-form-item>
      <el-form-item class="">
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item></el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      stripe
      :show-header="false"
      style="width: 100%;"
      @row-dblclick="rowDblclick"
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
          <div onselectstart="return false;" class="table-item">
            <div style="width:50px" @click="handleClickImg(scope.row)">
              <el-avatar
                icon="el-icon-user-solid"
                :size="50"
                :src="scope.row.faceUrl | http2HttpsFilter"
              />
            </div>
            <div><span class="construction-name" @click="detailModalHandle(scope.row)">{{ scope.row.empName }}</span>  {{ scope.row.jobTypeName }}</div>
          </div>

        </template>
      </el-table-column>
      <el-table-column
        align="left"
      >
        <template slot-scope="scope">
          <div class="table-item item-border">
            <el-row>
              <el-col :span="12"><span class="label">性别：</span>{{ scope.row.empSex }}</el-col>
              <el-col :span="12"><span class="label">民族：</span> {{ scope.row.empNation }}</el-col>
            </el-row>
            <div><span class="label">是否加入工会:</span> {{ scope.row.isLabunion ? '是' : '否' }}</div>
          </div>

        </template>
      </el-table-column>
      <el-table-column
        align="left"
      >
        <template slot-scope="scope">
          <div class="table-item item-border">
            <div><span class="label">籍贯:</span> {{ scope.row.nativePlace }}</div>
            <div><span class="label">手机号码:</span> {{ scope.row.empPhon }}</div>
          </div>

        </template>
      </el-table-column>
      <el-table-column
        align="left"
      >
        <template slot-scope="scope">
          <div class="table-item item-border">
            <div><span class="label">身份证号:</span> {{ scope.row.idCode }}</div>
            <div><span class="label">地址:</span> {{ scope.row.idAddress }}</div>
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
    <el-dialog
      :title="row.empName"
      custom-class="workersLib-avatar el-dialog_img"
      append-to-body
      width="400px"
      onselectstart="return false;"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
    >
      <div style="width: 100%;margin:0 auto;">
        <img
          style="width: 100%;"
          :src="row.faceUrl | http2HttpsFilter"
          alt=""
        >
      </div>
    </el-dialog>
    <!-- 弹窗, 工人库弹窗 -->
    <detail-modal v-if="detailModalVisible" ref="detailModal" />
  </div>
</template>

<script>
import detailModal from './workersLib-detail-modal'
import { getList, hotWorkerType } from '@/api/workersLib'
import Checkbox from '@/components/yzt-checkbox'
import YztRadio from '@/components/yzt-radio'
export default {
  name: 'List',
  components: {
    detailModal,
    YztRadio,
    Checkbox
  },
  data() {
    return {
      dataForm: {
        empName: '',
        idAddress: '',
        empSex: '',
        ageTypes: '',
        titles: [],
        educations: [],
        idCode: ''
      },
      row: {},
      dataList: [],
      option: [],
      option1: [
        { title: '小学', tag: '小学' },
        { title: '初中', tag: '初中' },
        { title: '高中', tag: '高中' },
        { title: '中专', tag: '中专' },
        { title: '大专', tag: '大专' },
        { title: '职专', tag: '职专' },
        { title: '本科', tag: '本科' },
        { title: '硕士', tag: '硕士' },
        { title: '博士', tag: '博士' },
        { title: '博士后', tag: '博士后' },
        { title: '其他', tag: '其他' }
      ],
      option3: [
        { title: '18岁以下', tag: 1 },
        { title: '18-29岁', tag: 2 },
        { title: '30-39岁', tag: 3 },
        { title: '40-49岁', tag: 4 },
        { title: '50-55岁', tag: 5 },
        { title: '55以上', tag: 6 }
      ],
      option4: [
        { title: '男', tag: '男' },
        { title: '女', tag: '女' }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dialogVisible: false,
      detailModalVisible: false
    }
  },
  created() {
    this.getDataList()
    this.getHotWorkerType()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getList({
        page: this.pageIndex,
        rows: this.pageSize,
        ...this.dataForm
      }).then((data) => {
        this.dataList = data.result.records
        this.totalPage = data.result.total
        this.dataListLoading = false
      })
    },
    getHotWorkerType() {
      hotWorkerType().then(data => {
        this.option = data.result
      })
    },
    selectChangeHandle(val, type) {
      this.dataForm[type] = val
      this.getDataList()
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
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
    // 双击table
    rowDblclick(row) {
      this.detailModalHandle(row)
    },
    // 详情弹窗
    detailModalHandle(row) {
      this.detailModalVisible = true
      this.$nextTick(() => {
        this.$refs.detailModal.init(row)
      })
    }
  }
}
</script>

<style lang="scss">
  .workersLib {
    // .el-form-item {
    //   height: 23px;
    // }
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
        font-size: 18px;
        color: #3f91d7;
      }
      .construction-name:hover {
        color: #fe5621;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .item-border {
      border-left: 1px solid #dfe6ec;
    }
  }
  .workersLib-avatar {
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
