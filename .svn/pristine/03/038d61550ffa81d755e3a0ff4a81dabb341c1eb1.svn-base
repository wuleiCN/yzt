<template>
  <el-dialog
    custom-class="device-sync-worker-modal"
    title="同步人员"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="0" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="url">
        <div class="sync-style">
          <div class="transfer-title">
            <span style="float: left">
              <span>已选中人数:</span><span class="num-style" style="" :style="{'color': length >=1000 ? '#F56C6C' : '#67C23A'}"> {{ length }}</span>

            </span>
            <span style="float: right">
              <span>总人数:</span><span class="num-style" style="color: #409EFF"> {{ data.length }}</span>
            </span>
          </div>
          <el-checkbox-group v-model="checkList" class="left-style" @change="handleCheckedCitiesChange">

            <div v-for="(item,index) in dataList" :key="index"> <el-checkbox :label="item.id">{{ item.construction.constructionName }}</el-checkbox></div>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="!checkList.length" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { synworker } from '@/api/gyc/device'
import { workersList } from '@/api/project/train-topic'
import { proSelectList } from '@/api/project/team'
export default {
  data() {
    return {
      visible: false,
      isIndeterminate: false,
      checkAll: false,
      checkList: [],
      dataList: [],
      data: [],
      length: 0,
      row: {},
      dataForm: {
        url: ''
      },
      dataRule: {
        ip: [
          { required: true, message: 'ip不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.visible = true
      this.row = row
      this.getProSelectList(this.row.projectId)
      this.getWorkersList(this.row.projectId)
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    // 所属参建单位选择列表
    getProSelectList(id) {
      proSelectList({ id, status: 0 }).then((data) => {
        this.dataList = data.result
        if (this.data.length < 1000) {
          this.checkList = this.dataList.map(item => item.id)
          this.constructionId = this.checkList.toString()
        } else {
          this.length = 0
          this.checkList = []
        }
      })
    },
    // 人员列表
    getWorkersList(projectId) {
      return new Promise(resolve => {
        workersList({ projectId }).then((data) => {
          this.data = data.result
          this.length = this.data.length
          resolve(this.data)
        })
      })
    },
    handleCheckedCitiesChange(constructionIds) {
      const workers = this.data.filter(item => constructionIds.includes(item.constructionId))
      this.length = workers.length
      this.constructionId = constructionIds.toString()
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.checkList.length >= 1000) {
            return this.$message.error('同步人员数不能超过1000')
          }
          synworker({ id: this.row.id, constructionId: this.constructionId }).then((data) => {
            if (data && data.code === 1000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
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
  .device-sync-worker-modal {
    width: 700px;
    .left-style {
      border: 1px solid #DBDBDB;
      width: 100%;
      padding: 0 10px;
      height: 400px;
      overflow: auto;
    }
    .transfer-title {
      height: 33px;
      border: 1px solid #e6e6e6;
      background: #F3F7FF;
      padding: 0 10px;
    }
    .num-style {
      font-size: 22px;
      vertical-align: middle;
    }
  }
</style>
