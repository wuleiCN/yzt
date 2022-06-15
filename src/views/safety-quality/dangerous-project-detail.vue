<template>
  <div>
    <el-dialog
      custom-class="train-record-detail"
      title="危大工程信息"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form class="base-info" :model="dataForm" :rules="dataRule">
        <el-form-item label="项目名称：" label-width="110px">
          <el-input v-model.trim="dataForm.projectName" clearable placeholder="项目名称" style="width: 260px;" />
        </el-form-item>
        <el-form-item label="作业状态：" label-width="110px">
          <el-select v-model.trim="dataForm.projectId" style="width:260px" placeholder="作业状态">
            <el-option v-for="(v, i) in wokerStatus" :key="i" :label="bv.projectName" :value="v.id">{{ v.projectName }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划开始：" label-width="110px">
          <el-date-picker
            v-model.trim="dataForm.startDate"
            style="width:260px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="计划开始时间"
          />
        </el-form-item>
        <el-form-item label="危大工程类别：" label-width="110px">
          <el-select v-model.trim="dataForm.projectId" style="width:260px" placeholder="危大工程类别">
            <el-option v-for="(v, i) in projectList" :key="i" :label="bv.projectName" :value="v.id">{{ v.projectName }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否超大规模：" label-width="110px">
          <el-select v-model.trim="dataForm.projectId" style="width:260px" placeholder="是否超大规模">
            <el-option v-for="(v, i) in wokerStatus" :key="i" :label="bv.projectName" :value="v.id">{{ v.projectName }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划结束：" label-width="110px">
          <el-date-picker
            v-model.trim="dataForm.endtDate"
            style="width:260px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="计划结束时间"
          />
        </el-form-item>
        <el-form-item label="危大工程名称：" label-width="110px">
          <el-select v-model.trim="dataForm.projectId" style="width:260px" placeholder="危大工程类别">
            <el-option v-for="(v, i) in projectList" :key="i" :label="bv.projectName" :value="v.id">{{ v.projectName }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级：" label-width="110px">
          <el-select v-model.trim="dataForm.projectId" style="width:260px" placeholder="风险等级">
            <el-option v-for="(v, i) in wokerStatus" :key="i" :label="bv.projectName" :value="v.id">{{ v.projectName }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际结束：" label-width="110px">
          <el-date-picker
            v-model.trim="dataForm.endtDate"
            style="width:260px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="实际结束时间"
          />
        </el-form-item>
      </el-form>
      <div class="operation-record">
        <div class="title">作业记录</div>
        <div class="content">
          <el-table
            :data="dataList"
            border
            stripe
            height="159"
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              prop="datetime"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="时间"
            />
            <el-table-column
              prop="type"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="类型"
            />
            <el-table-column
              prop="scenePho"
              header-align="center"
              align="center"
              label="作业指令文件"
            >
              <template slot-scope="scope">
                <div class="file-operation">
                  <div @click="handleClickImg(scope.row)">
                    <el-avatar
                      icon="el-icon-picture"
                      :size="30"
                      :src="scope.row.scenePho && scope.row.scenePho.split(',').length ? (scope.row.scenePho.split(',')[0] ) : ''"
                    />
                  </div>
                  <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'task', scope.$index)" />
                  <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">下载</el-button></a>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="scenePho"
              header-align="center"
              align="center"
              label="作业照片"
            >
              <template slot-scope="scope">
                <div class="file-operation">
                  <div @click="handleClickImg(scope.row)">
                    <el-avatar
                      icon="el-icon-picture"
                      :size="30"
                      :src="scope.row.scenePho && scope.row.scenePho.split(',').length ? (scope.row.scenePho.split(',')[0] ) : ''"
                    />
                  </div>
                  <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'operation', scope.$index)" />
                  <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">下载</el-button></a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="operation-record">
        <div class="title">维保记录</div>
        <div class="content">
          <el-table
            :data="dataList1"
            border
            stripe
            height="159"
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              prop="datetime"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="时间"
            />
            <el-table-column
              prop="type"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="类型"
            />
            <el-table-column
              prop="scenePho"
              header-align="center"
              align="center"
              label="附件"
            >
              <template slot-scope="scope">
                <div class="file-operation">
                  <div @click="handleClickImg(scope.row)">
                    <el-avatar
                      icon="el-icon-picture"
                      :size="30"
                      :src="scope.row.scenePho && scope.row.scenePho.split(',').length ? (scope.row.scenePho.split(',')[0] ) : ''"
                    />
                  </div>
                  <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'maintenance', scope.$index)" />
                  <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">下载</el-button></a>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="maintainer"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="维保人"
            />
          </el-table>
        </div>
      </div>
      <div class="operation-record">
        <div class="title">应急处理预案</div>
        <div class="content">
          <el-table
            :data="dataList2"
            border
            stripe
            height="159"
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              label="#"
              header-align="center"
              align="center"
              type="index"
              width="50"
            />
            <el-table-column
              prop="datetime"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="时间"
            />
            <el-table-column
              prop="type"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="方案类型"
            />
            <el-table-column
              prop="scenePho"
              header-align="center"
              align="center"
              label="附件"
            >
              <template slot-scope="scope">
                <div class="file-operation">
                  <div @click="handleClickImg(scope.row)">
                    <el-avatar
                      icon="el-icon-picture"
                      :size="30"
                      :src="scope.row.scenePho && scope.row.scenePho.split(',').length ? (scope.row.scenePho.split(',')[0] ) : ''"
                    />
                  </div>
                  <my-upload ref="myUpload" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'emergency', scope.$index)" />
                  <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">下载</el-button></a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-form class="info">
        <el-form-item label="备注：">
          <el-input v-model.trim="dataForm.projectName" clearable placeholder="备注" style="width: 260px;" />
        </el-form-item>
        <el-form-item label="最后更新人：">
          <el-input v-model.trim="dataForm.projectName" clearable placeholder="最后更新人" style="width: 260px;" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
      <el-dialog
        title="照片详情"
        custom-class="safety-avatar"
        append-to-body
        onselectstart="return false;"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
      >
        <div class="img-wrap">
          <div v-for="(ele, index) in row.scenePho && row.scenePho.split(',')" :key="index">
            <h1>现场照片 {{ index + 1 }}</h1>
            <img
              style="width: 100%;height:600px"
              :src="ele | http2HttpsFilter"
              alt=""
            >
          </div>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { saverOrUpdate, getList } from '@/api/dangerous'
import { parseTime } from '@/utils'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      trainScoreVisible: false,
      row: {},
      type: '',
      item: {},
      dialogVisible: false,
      wokerStatus: [],
      projectList: [],
      tableList: [],
      dataForm: {
        projectName: '',
        status: 0,
        isOversized: 0,
        startDate: null,
        endDate: null
      },
      exportUrl: '',
      dataList: [
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        },
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        },
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        },
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        },
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        }
      ],
      dataList1: [
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: '',
          maintainer: '王五'
        }
      ],
      dataList2: [
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        },
        {
          datetime: '2022-05-31',
          type: '一般',
          scenePho: ''
        }
      ],
      dataRule: {
        projectId: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        contractName: [
          { required: true, message: '合同名称不能为空', trigger: 'blur' }
        ],
        yfName: [
          { required: true, message: '乙方单位不能为空', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择计划开始时间', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择计划结束时间', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.row = row
      this.visible = true
      this.$nextTick(() => {
        console.log(row)
      })
    },
    // 某人培训列表
    getList(id) {
      getList({ id }).then((data) => {
        if (data && data.code === 1000) {
          this.tableList = data.result.map(item => {
            item.createTime = item.createTime ? parseTime(item.createTime, '{y}-{m}-{d} {h}:{i}:{s}') : ''
            return item
          })
        } else {
          this.tableList = []
        }
        this.dataListLoading = false
      })
    },
    handleClickImg(row) {
      this.dialogVisible = true
      this.row = row
    },
    dataFormSubmit() {
      saverOrUpdate().then(res => {
        res.code === 1000 || this.$message.success('修改成功')
      })
      this.visible = false
    },
    getFileData(fileList, type, index) {
      if (type === 'task') this.$set(this.dataList[index], 'scenePho', fileList.result)
      if (type === 'maintenance') this.$set(this.dataList1[index], 'scenePho', fileList.result)
      if (type === 'emergency') this.$set(this.dataList2[index], 'scenePho', fileList.result)
    }
  }
}
</script>
<style lang="scss">
  .train-record-detail {
    width: 1200px !important;
    .base-info {
      display: flex;
      flex-wrap: wrap;
      justify-items: center;
      .el-form-item {
        width: 385px;
      }
    }
    .operation-record {
      margin-bottom: 15px;
      .title {
        color: #303133;
        font-size: 18px;
        line-height: 24px;
        font-weight: bold;
      }
      .content {
        margin-top: 15px;
      }
      .file-operation {
        display: flex;
        justify-content: center;
        padding-top: 5px;
      }
      .el-table__body-wrapper {
        height: 117px !important;
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      .el-form-item {
        width: 370px;
      }
    }
    .el-dialog__body {
      padding: 20px;
      padding-bottom: 15px;
    }
  }
</style>
