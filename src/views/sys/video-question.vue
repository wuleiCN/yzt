<template>
  <el-dialog
    custom-class="video-question"
    title="试题列表"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div>
      <!-- <dialog id="img-modal">
        <span class="img-modal-close" onclick="this.parentNode.close()"><i class="el-icon-error" /></span>
        <img :src="questionImg">
      </dialog> -->

      <el-button v-permit="'video_question_add'" style="margin-bottom: 10px" type="primary" @click="addOrUpdateHandle(row, 'add')">新增</el-button>
      <my-upload ref="myUpload" v-permit="'video_question_import'" style="display:inline-block;margin-left:10px" :is-show="false" :limit="'doc'" :data="{videoId: row.id}" :title="'导入'" :action="'/questions/excelImport'" @getfileList="(fileList) => getFileData(fileList, 'importResult')" />
      <a v-permit="'video_question_download'" target="_blank" class="temp-name" :href="$http.staticUrl('/试题导入模板.xlsx')">
        <el-button style="margin-left:10px" type="primary">试题模板下载</el-button>
      </a>
      <el-table
        :data="tableList"
        stripe
        height="500"
        tooltip-effect="light"
        style="width: 100%"
      >
        <el-table-column
          prop="questionName"
          label="试题名称"

          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="questionImg"
          label="试题图片"
        >
          <template slot-scope="scope">
            <div @click="showImg(scope.row, '1')">
              <el-avatar v-if="scope.row.questionImg" shape="square" icon="el-icon-user-solid" :size="30" :src="scope.row.questionImg" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="optionType"
          label="选项类型"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.optionType === 1" size="small" type="danger">文字</span>
            <span v-if="scope.row.optionType === 2" size="small" type="success">图片</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="optionA"
          label="	选项A"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.optionType === 2" @click="showImg(scope.row, 'A')">
              <el-avatar shape="square" icon="el-icon-user-solid" :size="30" :src="scope.row.optionA" />

            </div>
            <span v-else>{{ scope.row.optionA }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="optionB"
          label="选项B"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.optionType === 2" @click="showImg(scope.row, 'B')">
              <el-avatar shape="square" icon="el-icon-user-solid" :size="30" :src="scope.row.optionB" />

            </div>
            <span v-else>{{ scope.row.optionB }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="correctOption"
          label="	正确答案"
        />
        <el-table-column
          prop="isEnable"
          label="	是否启用"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isEnable == 0" size="small" type="danger">禁用</el-tag>
            <el-tag v-if="scope.row.isEnable == 1" size="small" type="success">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          label="操作"
          width="130"
        >
          <template slot-scope="scope">
            <el-button v-permit="'video_question_status'" type="text" size="small" @click="handleEnable(scope.row)">{{ !scope.row.isEnable ? '启用' : '禁用' }}</el-button>
            <el-button v-permit="'video_question_update'" type="text" size="small" @click="addOrUpdateHandle(scope.row, 'update')">修改</el-button>
            <el-button v-permit="'video_question_del'" type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        custom-class="question-add-modal"
        :title="!rowId ? '新增试题' : '修改试题'"
        :close-on-click-modal="false"
        append-to-body
        :visible.sync="addVisible"
      >
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="90px">
          <el-form-item label="试题名称" prop="questionName">
            <el-input v-model.trim="dataForm.questionName" placeholder="试题名称" />
          </el-form-item>
          <el-form-item label="试题图片" prop="questionImg">
            <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'questionImg')" />

            <a target="_blank" style="color: #1890ff" :href="dataForm.questionImg">{{ dataForm.questionImg ? '查看图片' : '' }}</a>
          </el-form-item>
          <el-form-item label="选项类型" prop="optionType">
            <el-radio-group v-model.trim="dataForm.optionType" style="width:100%">
              <el-radio :label="1">文字</el-radio>
              <el-radio :label="2">图片</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选项A" prop="optionA">
            <el-input v-if="dataForm.optionType === 1" v-model.trim="dataForm.optionA" placeholder="选项A" />
            <div v-else>
              <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'optionA')" />
              <a target="_blank" style="color: #1890ff" :href="dataForm.optionA">{{ dataForm.optionA ? '查看图片' : '' }}</a>
            </div>
          </el-form-item>
          <el-form-item label="选项B" prop="optionB">
            <el-input v-if="dataForm.optionType === 1" v-model.trim="dataForm.optionB" placeholder="选项B" />
            <div v-else>
              <my-upload ref="myUpload" :is-show="true" :title="'点击上传'" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'optionB')" />
              <a target="_blank" style="color: #1890ff" :href="dataForm.optionB">{{ dataForm.optionB ? '查看图片' : '' }}</a>
            </div>

          </el-form-item>
          <el-form-item label="正确答案" prop="correctOption">
            <el-radio-group v-model.trim="dataForm.correctOption" style="width:100%">
              <el-radio label="A">选项A</el-radio>
              <el-radio label="B">选项B</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="查看图片"
        custom-class="video-question-modal el-dialog_img"
        append-to-body
        width="400px"
        onselectstart="return false;"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
      >
        <div style="width: 100%;margin:0 auto;">
          <img v-if="row.quesType === '1'" style="width: 100%;" :src="row.questionImg" alt="">
          <img v-if="row.quesType === 'A'" style="width: 100%;" :src="row.optionA" alt="">
          <img v-if="row.quesType === 'B'" style="width: 100%;" :src="row.optionB" alt="">
        </div>
      </el-dialog>
    </div>
  </el-dialog>
</template>

<script>
import { questionList, questionSaveOrUpdate, questionDel, questionEnable } from '@/api/sys/video'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      addVisible: false,
      dialogVisible: false,
      rowId: '',
      questionImg: '',
      row: {},
      tableList: [],
      dataForm: {
        importResult: {},
        questionName: '',
        questionImg: '',
        optionType: 1,
        optionA: '',
        optionB: '',
        correctOption: ''
      },
      dataRule: {
        questionName: [
          { required: true, message: '试题名称不能为空', trigger: 'blur' }
        ],
        optionA: [
          { required: true, message: '选项A不能为空', trigger: 'blur' }
        ],
        optionB: [
          { required: true, message: '选项B不能为空', trigger: 'blur' }
        ],
        optionType: [
          { required: true, message: '请选择试题类型', trigger: 'blur' }
        ],
        correctOption: [
          { required: true, message: '请选择正确答案', trigger: 'blur' }
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
        this.getList(row.id)
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
      if (this.dataForm.importResult) {
        this.getList(this.row.id)
        const { errorList, successCount } = this.dataForm.importResult
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
      }
    },
    // 试题列表
    getList(videoId) {
      questionList({ videoId }).then((data) => {
        if (data && data.code === 1000) {
          this.tableList = data.result
        } else {
          this.tableList = []
        }
        this.dataListLoading = false
      })
    },
    // 新增试题
    addOrUpdateHandle(row, type) {
      this.addVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (type === 'update') this.dataForm = { ...row }
        if (type === 'add') this.dataForm.videoId = row.id
      })
    },
    showImg(row, quesType) {
      // console.log(document.querySelector('#img-modal'), 'ss')
      // document.querySelector('#img-modal').showModal()
      this.row = { ...row, quesType }
      this.dialogVisible = true
    },
    // 启用禁用
    handleEnable(tableRow) {
      questionEnable({ id: tableRow.id, isEnable: Number(!tableRow.isEnable) }).then(data => {
        if (data && data.code === 1000) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.getList(this.row.id)
            }
          })
        }
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionDel([id]).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getList(this.row.id)
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          questionSaveOrUpdate({ ...this.dataForm }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.addVisible = false
                  this.getList(this.row.id)
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
  .video-question {
    width: 1000px;
    .el-dialog__body {
      padding: 15px;
      padding-bottom: 20px;
    }
  }
  .question-add-modal {
    width: 700px;
  }
  #img-modal {
    border: none;
    position: absolute;
    top: 25vh;
    .img-modal-close {
      position: absolute;
      right: -20px;
      top: -20px;
      font-size: 40px;
      color: #909399;
      cursor: pointer;
    }
  }
</style>
