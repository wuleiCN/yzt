<template>
  <el-dialog
    custom-class="setting-modal"
    title="对接设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-container>
      <el-aside class="platform" width="300px">
        <el-tree highlight-current :data="platformList" node-key="id" :props="defaultProps" @node-click="nodeClickHandle">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="circle">{{ data.index }}</span><span>{{ node.label }}</span>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <el-form v-show="showForm" ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="dataForm.status" style="width:100%">
              <el-radio :label="0">对接</el-radio>
              <el-radio :label="1">不对接</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <!-- <el-input v-model.trim="dataForm.deviceType" disabled placeholder="平台名称" /> -->
            <el-select v-model="dataForm.deviceType" style="width:100%" clearable filterable placeholder="请选择设备类型">
              <el-option
                v-for="item in deviceTypeList"
                :key="item.dictCode"
                :label="item.dictLabel"
                :value="+item.dictValue"
              >
                <span style="float: left">{{ item.dictLabel }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="平台名称" prop="platformName">
            <el-input v-model.trim="dataForm.platformName" placeholder="平台名称" />
          </el-form-item> -->
          <el-form-item label="api_key" prop="apiKey">
            <el-input v-model.trim="dataForm.apiKey" placeholder="api_key" />
          </el-form-item>
          <el-form-item label="项目编码" prop="projectCode">
            <el-input v-model.trim="dataForm.projectCode" placeholder="项目编码" />
          </el-form-item>
          <el-form-item label="工程编码" prop="engCode">
            <el-input v-model.trim="dataForm.engCode" placeholder="工程编码" />
          </el-form-item>
          <el-form-item label="秘钥" prop="apiSecret">
            <el-input v-model.trim="dataForm.apiSecret" placeholder="秘钥" />
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="visible = false">取消</el-button> -->
      <el-button :disabled="!showForm" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { synSaveOrUpdate } from '@/api/project/project'
import { getList } from '@/api-zhgd/sys/dict'
import { synDetail, synSaveOrUpdate } from '@/api-zhgd/vehicle-device'
export default {
  data() {
    return {
      visible: false,
      showForm: false,
      platformList: [],
      deviceTypeList: [],
      defaultProps: {
        children: 'children',
        label: 'dictLabel'
      },
      dataForm: {
        projectId: this.$store.state.user.loginInfo.projectId,
        deviceId: '',
        status: 0,
        deviceType: '',
        apiKey: '',
        apiSecret: '',
        projectCode: '',
        engCode: ''
      },
      dataRule: {
        apiKey: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        apiSecret: [
          { required: false, message: '不能为空', trigger: 'blur' }
        ],
        projectCode: [
          { required: true, message: '项目编码不能为空', trigger: 'blur' }
        ],
        engCode: [
          { required: true, message: '工程编码不能为空', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    init(deviceId) {
      this.showForm = false
      this.visible = true
      this.getSetList() // 平台类型字典
      this.getSetList1() // 设备类型字典
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.deviceId = deviceId
      })
    },
    // 对接平台列表
    getSetList() {
      getList({
        dictType: 'dock_platform',
        isDel: 0
      }).then((data) => {
        if (data && data.code === 1000) {
          this.platformList = data.result.records.map((item, index) => {
            item.index = index + 1
            return item
          })
        } else {
          this.platformList = []
        }
      })
    },
    // 对接平台列表
    getSetList1() {
      getList({
        dictType: 'device_type',
        isDel: 0
      }).then((data) => {
        if (data && data.code === 1000) {
          this.deviceTypeList = data.result.records
        } else {
          this.deviceTypeList = []
        }
      })
    },
    // 某平台下对应的设置信息
    nodeClickHandle(row) {
      this.dataForm.platformName = row.dictLabel
      this.dataForm.platformValue = row.dictValue
      this.dataForm.platformType = row.dictType
      this.showForm = true
      this.$refs['dataForm'].resetFields()
      synDetail({
        deviceId: this.dataForm.deviceId,
        deviceType: '1',
        platformType: row.dictType,
        platformName: row.dictLabel,
        platformValue: row.dictValue,
        projectId: this.dataForm.projectId
      }).then(data => {
        if (data.result) {
          this.dataForm = data.result
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // return
          synSaveOrUpdate({ ...this.dataForm }).then((data) => {
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
.setting-modal{
  width: 850px;
  .platform {
    // border-left: 1px solid #b8b8b8;
    border-right: 1px solid #b8b8b8;
    height: 400px;
    .el-tree-node {
      height: 40px;
      margin-right: 20px;
    }
    .is-leaf {
      display: none;
    }
    .circle {
      display: inline-block;
      width: 20px;
      height: 20px;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      margin:0 15px 0 10px;
      border: 1px solid #b8b8b8;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 50px;
    }
    .el-tree-node__content {
      border-bottom: 1px dashed #b8b8b8;
        height: 40px;
        line-height: 30px;
    }
    .is-current {
      color: #7777cb;
      .circle {
        border: 1px solid #7777cb;
      }
    }
  }
}
</style>
