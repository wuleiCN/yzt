<template>
  <div>
    <el-dialog
      custom-class="train-record-detail"
      title="危大工程信息"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="closeCK"
    >
      <el-form ref="ruleForm" class="base-info" :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()">
        <el-form-item label="项目名称：" label-width="120px">
          <el-input v-model.trim="dataForm.projectName" disabled clearable placeholder="项目名称" style="width: 260px;" />
        </el-form-item>
        <el-form-item label="作业状态：" label-width="120px" prop="status">
          <el-select v-model.trim="dataForm.status" style="width:260px" placeholder="作业状态">
            <el-option v-for="(v, i) in wokerStatus" :key="i" :label="v.label" :value="v.id">{{ v.label }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划开始：" label-width="120px" prop="startDate">
          <el-date-picker
            v-model.trim="dataForm.startDate"
            style="width:260px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="计划开始时间"
          />
        </el-form-item>
        <el-form-item label="危大工程类别：" label-width="120px" prop="type">
          <el-select v-model.trim="dataForm.type" style="width:260px" placeholder="危大工程类别">
            <el-option v-for="(v, i) in categoryList" :key="i" :label="v.title" :value="v.id">{{ v.title }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否超大规模：" label-width="120px" prop="isOversized">
          <el-select v-model.trim="dataForm.isOversized" style="width:260px" placeholder="是否超大规模">
            <el-option v-for="(v, i) in oversizedList" :key="i" :label="v.label" :value="v.id">{{ v.label }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划结束：" label-width="120px" prop="endDate">
          <el-date-picker
            v-model.trim="dataForm.endDate"
            style="width:260px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="计划结束时间"
          />
        </el-form-item>
        <el-form-item label="危大工程名称：" label-width="120px" prop="name">
          <el-input v-model.trim="dataForm.name" clearable placeholder="危大工程名称" style="width: 260px;" />
        </el-form-item>
        <el-form-item label="风险等级：" label-width="120px" prop="riskLevel">
          <el-select v-model.trim="dataForm.riskLevel" style="width:260px" placeholder="风险等级">
            <el-option v-for="(v, i) in riskLevelList" :key="i" :label="v.label" :value="v.id">{{ v.label }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际结束：" label-width="120px">
          <el-date-picker
            v-model.trim="dataForm.actualEndDate"
            style="width:260px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="实际结束时间"
          />
        </el-form-item>
      </el-form>
      <div class="operation-record">
        <div class="operation-title">
          <div class="title">作业记录</div>
          <el-button v-permit="'saverorupdate'" class="add" type="primary" size="mini" @click="addOperation('workerRecordDtoList', 4)">新增</el-button>
        </div>
        <div class="content">
          <el-table
            :data="dataForm.workerRecordDtoList"
            border
            stripe
            height="159"
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              prop="operationDate"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="时间"
            />
            <!-- <el-table-column
              prop="emergencyType"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="类型"
            /> -->
            <el-table-column
              prop="emergencyType"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="类型"
            >
              <template slot-scope="scope">
                <el-select v-model.trim="scope.row.emergencyType" style="width:200px" placeholder="危大工程类别">
                  <el-option v-for="(v, i) in worketype" :key="i" :label="v.title" :value="v.id">{{ v.title }}</el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="photoList"
              header-align="center"
              align="center"
              label="作业指令文件"
            >
              <template slot-scope="scope">
                <div class="file-operation">
                  <div :class="{'noclick': scope.row.type === 1}" @click="handleClickImg(scope.row)">
                    <el-avatar
                      icon="el-icon-picture"
                      :size="30"
                      :src="scope.row.type === 0 && scope.row.photoList.length !== 0 && scope.row.photoList[0].indexOf('.jpg') !== -1 ? (scope.row.photoList[0] ) : ''"
                    />
                  </div>
                  <my-upload
                    ref="myUpload"
                    v-permit="'saverorupdate'"
                    :disalbed="scope.row.type === 1"
                    :limit="'png&pdf'"
                    style="width:40%"
                    :is-show="true"
                    :title="'上传'"
                    :action="'/user/upload'"
                    @getfileList="(fileList) => getFileData(fileList, 'task', scope.$index, 0)"
                  />
                  <!-- <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary" :disabled="scope.row.type === 1">下载</el-button></a> -->
                  <el-button
                    v-permit="'dangerouslargeproject_downloadfile'"
                    type="primary"
                    :disabled="scope.row.type === 1"
                    style="height: 32px;"
                    @click="downloadIamge(scope.row.photoList)"
                  >下载</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="photoList"
              header-align="center"
              align="center"
              label="作业照片"
            >
              <template slot-scope="scope">
                <div class="file-operation">
                  <div :class="{'noclick': scope.row.type === 0}" @click="handleClickImg(scope.row)">
                    <el-avatar
                      icon="el-icon-picture"
                      :size="30"
                      :src="scope.row.type === 1 && scope.row.photoList.length !== 0 && scope.row.photoList[0].indexOf('.jpg') !== -1 ? (scope.row.photoList[0] ) : ''"
                    />
                  </div>
                  <my-upload
                    ref="myUpload"
                    v-permit="'saverorupdate'"
                    :disalbed="scope.row.type === 0"
                    :limit="'png&pdf'"
                    style="width:40%"
                    :is-show="true"
                    :title="'上传'"
                    :action="'/user/upload'"
                    @getfileList="(fileList) => getFileData(fileList, 'task', scope.$index, 1)"
                  />
                  <!-- <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary" :disabled="scope.row.type === 0">下载</el-button></a> -->
                  <el-button
                    v-permit="'dangerouslargeproject_downloadfile'"
                    type="primary"
                    :disabled="scope.row.type === 0"
                    style="height: 32px;"
                    @click="downloadIamge(scope.row.photoList)"
                  >下载</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="operation-record">
        <div class="operation-title">
          <div class="title">维保记录</div>
          <el-button v-if="dataForm.workerRecordDtoList.length > 0" v-permit="'saverorupdate'" class="add" type="primary" size="mini" @click="addOperation('maintenanceRecordDtoList', 2)">新增</el-button>
        </div>
        <div class="content">
          <el-table
            :data="dataForm.maintenanceRecordDtoList"
            border
            stripe
            height="159"
            tooltip-effect="light"
            highlight-current-row
          >
            <el-table-column
              prop="operationDate"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="时间"
            />
            <el-table-column
              prop="emergencyType"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="类型"
            >
              <template slot-scope="scope">
                <el-select v-model.trim="scope.row.emergencyType" style="width:200px" placeholder="危大工程类别">
                  <el-option v-for="(v, i) in worketype" :key="i" :label="v.title" :value="v.id">{{ v.title }}</el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="photoList"
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
                      :src="scope.row.photoList.length && scope.row.photoList[0].indexOf('.jpg') !== -1 ? scope.row.photoList[0] : ''"
                    />
                  </div>
                  <my-upload
                    ref="myUpload"
                    v-permit="'saverorupdate'"
                    :limit="'png&pdf'"
                    style="width:40%"
                    :is-show="true"
                    :title="'上传'"
                    :action="'/user/upload'"
                    @getfileList="(fileList) => getFileData(fileList, 'maintenance', scope.$index)"
                  />
                  <!-- <a target="_blank" :href="$http.baseUrl(exportUrl)"><el-button type="primary">下载</el-button></a> -->
                  <el-button v-permit="'dangerouslargeproject_downloadfile'" type="primary" style="height: 32px;" @click="downloadIamge(scope.row.photoList)">下载</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="maintenanceBy"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="维保人"
            >
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.maintenanceBy" clearable placeholder="维保人" style="width: 200px;" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="operation-record">
        <div class="operation-title">
          <div class="title">应急处理预案</div>
          <el-button v-if="dataForm.maintenanceRecordDtoList.length > 0" v-permit="'saverorupdate'" class="add" type="primary" size="mini" @click="addOperation('emergencyTreatmentDtoList', 3)">新增</el-button>
        </div>
        <div class="content">
          <el-table
            :data="dataForm.emergencyTreatmentDtoList"
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
              prop="operationDate"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="时间"
            />
            <el-table-column
              prop="emergencyType"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
              label="方案类型"
            >
              <template slot-scope="scope">
                <el-select v-model.trim="scope.row.emergencyType" style="width:200px" placeholder="危大工程类别">
                  <el-option v-for="(v, i) in worketype" :key="i" :label="v.title" :value="v.id">{{ v.title }}</el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="emergencyPlan"
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
                      :src="scope.row.photoList.length && scope.row.photoList[0].indexOf('.jpg') !== -1 ? scope.row.photoList[0] : ''"
                    />
                  </div>
                  <my-upload ref="myUpload" v-permit="'saverorupdate'" :limit="'png&pdf'" style="width:40%" :is-show="true" :title="'上传'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'emergency', scope.$index)" />
                  <el-button v-permit="'dangerouslargeproject_downloadfile'" type="primary" style="height: 32px;" @click="downloadIamge(scope.row.photoList)">下载</el-button>
                  <!-- <a target="_blank" :href="blob_" download><el-button type="primary" @click="downloadIamge(scope.row.photoList[0])">下载</el-button></a> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-form class="info" :model="dataForm" :rules="dataRule">
        <el-form-item label="备注：">
          <el-input v-model.trim="dataForm.remarks" clearable placeholder="备注" style="width: 260px;" />
        </el-form-item>
        <el-form-item label="最后更新人：">
          <el-input v-model.trim="dataForm.updateBy" disabled clearable placeholder="最后更新人" style="width: 260px;" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-permit="'saverorupdate'" type="primary" :disabled="btnLoading" @click="dataFormSubmit(dataForm)">确定</el-button>
      </span>
      <el-dialog
        title="照片详情"
        custom-class="safety-avatar"
        append-to-body
        onselectstart="return false;"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        @close="dialogClose"
      >
        <div class="img-wrap">
          <el-tabs v-model="activeName">
            <el-tab-pane label="现场照片" name="first">
              <div v-for="(ele, index) in rowImg" :key="index">
                <h1>现场照片 {{ index + 1 }}</h1>
                <img
                  style="width: 100%;height:600px"
                  :src="ele | http2HttpsFilter"
                  alt=""
                >
              </div>
            </el-tab-pane>
            <el-tab-pane label="PDF文件" name="second">
              <div v-for="(ele, index) in rowPdf" :key="index">
                <h1>PDF文件 {{ index + 1 }}</h1>
                <a target="_blank" :href="ele"><el-button type="primary">预览</el-button></a>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { saverOrUpdate, getDetail } from '@/api/dangerous'
import request from '@/utils/request'
import { optionList } from '@/api/dictionaries'
import { parseTime } from '@/utils'
import MyUpload from '@/components/upload'
import FileSaver from 'file-saver'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      btnLoading: false,
      trainScoreVisible: false,
      activeName: 'first',
      rowImg: [],
      rowPdf: [],
      type: false,
      item: {},
      dialogVisible: false,
      wokerStatus: [
        {
          label: '实施中',
          id: 0
        },
        {
          label: '未实施',
          id: 1
        },
        {
          label: '已结束',
          id: 2
        }
      ],
      oversizedList: [
        {
          label: '超大',
          id: 0
        },
        {
          label: '一般',
          id: 1
        },
        {
          label: '非危大工程',
          id: 2
        }
      ],
      riskLevelList: [
        {
          label: 'A',
          id: 0
        },
        {
          label: 'B',
          id: 1
        },
        {
          label: 'C',
          id: 2
        }
      ],
      categoryList: [],
      worketype: [],
      blob_: '',
      dataForm: {
        projectId: '',
        id: '',
        projectName: '',
        name: '',
        status: '',
        isOversized: '',
        riskLevel: '',
        startDate: '',
        endDate: '',
        recorder: '',
        completionMark: '',
        actualEndDate: '',
        createdDate: '',
        updatedDate: '',
        updateBy: '',
        workerRecordDtoList: [
          // {
          //   id: '',
          //   dangerousLargeProjectId: '',
          //   workerType: '',
          //   operationDate: parseTime(new Date().getTime(), '{y}-{m}-{d}'),
          //   photoList: [],
          //   emergencyType: '',
          //   maintenanceBy: '',
          //   emergencyPlan: '',
          //   serialNum: '',
          //   type: 4
          // }
        ],
        emergencyTreatmentDtoList: [
          // {
          //   id: '',
          //   dangerousLargeProjectId: '',
          //   workerType: '',
          //   operationDate: parseTime(new Date().getTime(), '{y}-{m}-{d}'),
          //   photoList: [],
          //   emergencyType: '',
          //   maintenanceBy: '',
          //   emergencyPlan: '',
          //   serialNum: '',
          //   type: 2
          // }
        ],
        maintenanceRecordDtoList: [
          // {
          //   id: '',
          //   dangerousLargeProjectId: '',
          //   workerType: '',
          //   operationDate: parseTime(new Date().getTime(), '{y}-{m}-{d}'),
          //   photoList: [],
          //   emergencyType: '',
          //   maintenanceBy: '',
          //   emergencyPlan: '',
          //   serialNum: '',
          //   type: 3
          // }
        ]
      },
      exportUrl: '',
      token: JSON.parse(sessionStorage.getItem('result')).token,
      dataRule: {
        status: [
          { required: true, message: '作业状态不能为空', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择计划开始时间', trigger: 'blur' }
        ],
        isOversized: [
          { required: true, message: '作业规模不能为空', trigger: 'blur' }
        ],
        riskLevel: [
          { required: true, message: '风险等级不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '危大工程类别不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '危大工程名称不能为空', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '计划结束不能为空', trigger: 'blur' }
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
        this.getOptionList()
        JSON.stringify(row) !== '{}' && this.getList(row.id)
      })
    },
    // 关闭弹窗
    closeCK() {
      Object.assign(this.$data.dataForm, this.$options.data().dataForm)
      this.$refs['ruleForm'].resetFields()
      this.type = false
    },
    addOperation(type, num) {
      const work = {
        id: '',
        dangerousLargeProjectId: '',
        workerType: '',
        operationDate: parseTime(new Date().getTime(), '{y}-{m}-{d}'),
        photoList: [],
        emergencyType: null,
        maintenanceBy: '',
        emergencyPlan: '',
        serialNum: '',
        type: ''
      }
      work.type = num
      if (!this.dataForm[type].length || this.dataForm[type][0].photoList.length) {
        this.dataForm[type] = [work, ...this.dataForm[type]]
      } else {
        this.$message.error('请填写完整上一项记录！')
      }
    },
    handleClickImg(row) {
      this.dialogVisible = true
      row.photoList.map(v => {
        v.indexOf('.jpg') !== -1 ? this.rowImg = [...this.rowImg, v] : this.rowPdf = [...this.rowPdf, v]
      })
    },
    dialogClose() {
      this.rowImg = []
      this.rowPdf = []
    },
    dataFormSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.startDate && this.dataForm.endDate) {
            if (this.dataForm.startDate > this.dataForm.endDate) {
              return this.$message.error('计划结束时间不能小于计划开始时间')
            }
            if (this.dataForm.actualEndDate < this.dataForm.endDate) {
              return this.$message.error('实际结束时间不能小于计划开始时间')
            }
          }
          saverOrUpdate({ ...this.dataForm }).then(res => {
            if (res && res.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.btnLoading = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.btnLoading = false
              this.$message.error(res.message)
            }
          })
          // this.visible = false
        } else {
          this.$message.error('请填写必选项！')
          return false
        }
      })
    },
    getList(id) {
      getDetail({ id }).then((data) => {
        if (data && data.code === 1000) {
          data.result.date = data.result.date ? parseTime(data.result.date, '{y}-{m}-{d}') : ''
          data.result.startDate = data.result.startDate ? parseTime(data.result.startDate, '{y}-{m}-{d}') : ''
          data.result.endDate = data.result.endDate ? parseTime(data.result.endDate, '{y}-{m}-{d}') : ''
          data.result.actualEndDate = data.result.actualEndDate ? parseTime(data.result.actualEndDate, '{y}-{m}-{d}') : ''
          if (data.result.emergencyTreatmentDtoList.length !== 0) {
            data.result.emergencyTreatmentDtoList = data.result.emergencyTreatmentDtoList.map(item => {
              item.operationDate = item.operationDate ? parseTime(item.operationDate, '{y}-{m}-{d}') : ''
              return item
            })
          } else {
            data.result.emergencyTreatmentDtoList = this.dataForm.emergencyTreatmentDtoList
          }
          if (data.result.maintenanceRecordDtoList.length !== 0) {
            data.result.maintenanceRecordDtoList = data.result.maintenanceRecordDtoList.map(item => {
              item.operationDate = item.operationDate ? parseTime(item.operationDate, '{y}-{m}-{d}') : ''
              return item
            })
          } else {
            data.result.maintenanceRecordDtoList = this.dataForm.maintenanceRecordDtoList
          }
          if (data.result.workerRecordDtoList.length !== 0) {
            data.result.workerRecordDtoList = data.result.workerRecordDtoList.map(item => {
              item.operationDate = item.operationDate ? parseTime(item.operationDate, '{y}-{m}-{d}') : ''
              return item
            })
          } else {
            data.result.workerRecordDtoList = this.dataForm.workerRecordDtoList
          }
          this.dataForm = data.result
        } else {
          this.$message.error(data.message)
        }
        this.dataListLoading = false
      })
    },
    getFileData(fileList, type, index, num) {
      if (type === 'task') {
        this.$set(this.dataForm.workerRecordDtoList[index], 'photoList', [fileList.result, ...this.dataForm.workerRecordDtoList[index].photoList])
        this.$set(this.dataForm.workerRecordDtoList[index], 'type', num)
      }
      if (type === 'maintenance') this.$set(this.dataForm.maintenanceRecordDtoList[index], 'photoList', [fileList.result, ...this.dataForm.maintenanceRecordDtoList[index].photoList])
      if (type === 'emergency') this.$set(this.dataForm.emergencyTreatmentDtoList[index], 'photoList', [fileList.result, ...this.dataForm.emergencyTreatmentDtoList[index].photoList])
    },
    getOptionList() {
      optionList({ category: 'DANGEROUS_PROJECT' }).then(data => {
        if (data.code === 1000 && data.result) this.categoryList = data.result
      })
      optionList({ category: 'DANGEROUS_PROJECT_WORKER_TYPE' }).then(data => {
        if (data.code === 1000 && data.result) this.worketype = data.result
      })
    },
    downloadIamge(url) {
      // url.map(v => {})
      request({
        url: `/dangerousLargeProject/downloadFile?token=${this.token}&urls=${[...url]}`,
        method: 'post'
      }).then(res => {
        res.result.map(v => {
          v.indexOf('data:image/jpg') !== -1 ? FileSaver.saveAs(v, new Date().getTime() + '.jpg') : FileSaver.saveAs(v, new Date().getTime() + '.pdf')
        })
      })
    }
  }
}
</script>
<style lang="scss">
.noclick{
		pointer-events: none;
}
  .train-record-detail {
    width: 1200px !important;
    .base-info {
      display: flex;
      flex-wrap: wrap;
      justify-items: center;
      .el-form-item {
        width: 385px;
        .el-form-item__label {
          padding: 0;
        }
      }
    }
    .operation-record {
      margin-bottom: 15px;
      .operation-title {
        display: flex;
        height: 37px;
        margin-bottom: 5px;
        .title {
          color: #303133;
          font-size: 18px;
          line-height: 37px;
          font-weight: bold;
          margin-right: 5px;
        }
        .add {
          margin: 0 0 5px 5px;
        }
      }
      .file-operation {
        display: flex;
        justify-content: center;
        padding-top: 5px;
      }
      .el-table__body-wrapper {
        min-height: 117px !important;
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
