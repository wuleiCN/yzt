<template>
  <div>
    <el-button style="margin-bottom: 10px" type="primary" @click="addOrUpdateHandle({})">新增</el-button>
    <el-table
      :data="certificateList"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="cerTypeTitle"
        label="证书类型"
      />
      <el-table-column
        prop="cerName"
        label="	证书名称"
      />
      <el-table-column
        prop="cerId"
        label="证书编号"
      />
      <el-table-column
        prop="starTime"
        width="180"
        label="	有效期"
      >
        <template slot-scope="scope">
          {{ scope.row.startDate }}至{{ scope.row.endDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="cerLevelTitle"
        label="	证书等级"
      />
      <el-table-column
        prop="url"
        label="附件"
      >
        <template slot-scope="scope">
          <a v-if="scope.row.url" style="color: rgb(24, 144, 255)" target="_blank" :href="scope.row.url">附件预览</a>
          <el-button v-else type="text" :disabled="true" size="small">附件预览</el-button>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="90"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" style="color: rgb(254, 27, 54);" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      custom-class="certificate-modal"
      :title="!rowId ? '新增证书信息' : '修改证书信息'"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="visible"
    >
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
        <el-form-item label="证书类型" prop="cerType">
          <el-select v-model="dataForm.cerType" filterable style="width:100%" placeholder="请选择证书类型">
            <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证书名称" prop="cerName">
          <el-input v-model.trim="dataForm.cerName" placeholder="证书名称" />
        </el-form-item>
        <el-form-item label="证书编号" prop="cerId">
          <el-input v-model.trim="dataForm.cerId" placeholder="证书编号" />
        </el-form-item>
        <el-form-item label="有效期" prop="timeRange">
          <el-date-picker
            v-model="dataForm.timeRange"
            clearable
            style="width: 100%"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="(e) => selectChangeHandle(e, 'timeRange')"
          />
        </el-form-item>
        <el-form-item label="证书等级" prop="cerLevel">
          <el-select v-model="dataForm.cerLevel" filterable style="width:100%" placeholder="请选择证书等级">
            <el-option v-for="(item, index) in levelTypes" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附件地址" prop="url">
          <my-upload ref="myUpload" :limit="'png&pdf'" :is-show="true" :title="'附件地址'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'url')" />
          <a target="_blank" style="color: #1890ff" :href="dataForm.url">{{ dataForm.url ? '查看附件' : '' }}</a>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdateCerti, deleteCerti, getCertificate } from '@/api/project/person'
import { optionList } from '@/api/gyc/unit'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    idCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      rowId: '',
      types: [],
      levelTypes: [],
      dataForm: {
        timeRange: [],
        cerType: '',
        cerName: '',
        cerId: '',
        cerLevel: '',
        url: ''
      },
      dataRule: {
        cerType: [
          { required: true, message: '证书类型不能为空', trigger: 'blur' }
        ],
        cerName: [
          { required: true, message: '证书名称不能为空', trigger: 'blur' }
        ],
        timeRange: [
          { required: true, message: '有效期不能为空', trigger: 'blur' }
        ],
        cerLevel: [
          { required: true, message: '证书等级不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '附件地址不能为空', trigger: 'blur' }
        ],
        cerId: [
          { required: true, message: '证书编号不能为空', trigger: 'blur' }
        ]
      },
      certificateList: []
    }
  },
  created() {
    if (this.id) {
      this.getDataList(this.id)
    }
  },

  methods: {
    // 下拉证书类型
    getOptionList() {
      optionList({ category: 'CER_TYPE' }).then(data => {
        this.types = data.result
      })
    },
    // 下拉证书等级类型
    getOptionList1() {
      optionList({ category: 'CER_LEVEL' }).then(data => {
        this.levelTypes = data.result
      })
    },
    selectChangeHandle(val, type) {
      if (type === 'timeRange') {
        this.dataForm.startDate = val && val.length ? val[0] : ''
        this.dataForm.endDate = val && val.length ? val[1] : ''
      }
    },
    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.visible = true
      this.rowId = row.id
      this.getOptionList()
      this.getOptionList1()
      this.$nextTick(() => {
        if (row.id) {
          this.dataForm = { ...row }
          this.$set(this.dataForm, 'timeRange', [row.startDate, row.endDate])
        } else {
          this.dataForm = {}
        }
      })
    },
    getDataList(id) {
      getCertificate({ id }).then(data => {
        this.certificateList = data.result
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`您确定进行删除操作吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCerti([id]).then((data) => {
          if (data && data.code === 1000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList(this.id)
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
          saveOrUpdateCerti({ ...this.dataForm, workerId: this.id }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.getDataList(this.id)
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
