<template>
  <div>
    <el-dialog
      custom-class="list-dataSet-modal"
      title="对接设置"
      :close-on-click-modal="false"
      :visible.sync="visible"
      :destroy-on-close="true"
    >
      <el-container>
        <el-aside class="platform" width="250px">
          <el-tree highlight-current :data="settingList" node-key="id" :props="defaultProps" @node-click="nodeClickHandle">
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span class="circle">{{ data.index }}</span><span>{{ node.label }}</span>
            </span>
          </el-tree>
        </el-aside>
        <el-main>
          <el-form v-if="showForm" ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px">
            <el-form-item>
              <el-button class="button-new-tag" size="small" @click="showInput">+ 添加新账号秘钥</el-button>
            </el-form-item>
            <el-form-item label="环境监测">
              <div v-for="(e, i) in dataForm.envState" :key="i">
                <el-select
                  v-model="e.apiKey"
                  style="width:50%"
                  placeholder="请选择秘钥"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="e.deviceId"
                  multiple
                  collapse-tags
                  filterable
                  style="width:30%"
                  placeholder="请选择设备"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="配电箱">
              <div v-for="(e, i) in dataForm.boxState" :key="i">
                <el-select
                  v-model="e.apiKey"
                  style="width:50%"
                  placeholder="请选择秘钥"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="e.deviceId"
                  style="width:30%"
                  multiple
                  collapse-tags
                  filterable
                  placeholder="请选择设备"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="车辆管理">
              <div v-for="(e, i) in dataForm.vehicleState" :key="i">
                <el-select
                  v-model="e.apiKey"
                  style="width:50%"
                  placeholder="请选择秘钥"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="e.deviceId"
                  multiple
                  collapse-tags
                  filterable
                  style="width:30%"
                  placeholder="请选择设备"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="塔吊监测">
              <div v-for="(e, i) in dataForm.towerCraneState" :key="i">
                <el-select
                  v-model="e.apiKey"
                  style="width:50%"
                  placeholder="请选择秘钥"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="e.deviceId"
                  style="width:30%"
                  multiple
                  collapse-tags
                  filterable
                  placeholder="请选择设备"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="升降机监测">
              <div v-for="(e, i) in dataForm.elevatorState" :key="i">
                <el-select
                  v-model="e.apiKey"
                  style="width:50%"
                  placeholder="请选择秘钥"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="e.deviceId"
                  style="width:30%"
                  multiple
                  collapse-tags
                  filterable
                  placeholder="请选择设备"
                >
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item.deviceName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-form>

        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="!showForm" type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加账号秘钥"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="apiForm" :model="apiForm" :rules="dataRule" label-width="120px">
        <el-form-item label="授权账号" prop="apiKey">
          <el-input v-model.trim="apiForm.apiKey" placeholder="标准apiKey" />
        </el-form-item>
        <el-form-item label="授权密钥" prop="apiSecret">
          <el-input v-model.trim="apiForm.apiSecret" placeholder="标准apiSecret" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { synSaveOrUpdate, setList } from '@/api/project/project'
import { getList as getEvnList } from '@/api-zhgd/env-device'
// import { platformDesc } from './decs'
import { Strategy } from './formField'
export default {
  data() {
    return {
      Strategy,
      // platformDesc,
      visible: false,
      showForm: false,
      centerDialogVisible: false,
      addVisible: true,
      apiKeyValue: '',
      apiForm: {
        apiKey: '',
        apiSecret: ''
      },
      settingList: [],
      envList: [],
      boxList: [],
      vehicleList: [],
      towerCraneList: [],
      elevatorList: [],
      orgList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      platformName: '',
      dataForm: {
        envState: [
          {
            apiKey: '',
            apiSecret: '',
            projectId: '',
            deviceId: []
          }
        ],
        towerCraneState: [
          {
            apiKey: '',
            apiSecret: '',
            projectId: '',
            deviceId: ''
          }
        ],
        vehicleState: [
          {
            apiKey: '',
            apiSecret: '',
            projectId: '',
            deviceId: ''
          }
        ],
        boxState: [
          {
            apiKey: '',
            apiSecret: '',
            projectId: '',
            deviceId: ''
          }
        ],
        elevatorState: [
          {
            apiKey: '',
            apiSecret: '',
            projectId: '',
            deviceId: ''
          }
        ]
      },
      dataRule: {
        apiKey: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        apiSecret: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        envState: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        boxState: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        vehicleState: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        towerCraneState: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        elevatorState: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    init(projectId) {
      this.showForm = false
      this.visible = true
      this.getSetList() // 对接平台列表
      this.$nextTick(() => {
        this.$refs['dataForm'] && this.$refs['dataForm'].resetFields()
        this.projectId = projectId
      })
    },
    // 某平台下对应的设置信息
    nodeClickHandle(row) {
      this.showForm = true
      this.$refs['dataForm'] && this.$refs['dataForm'].resetFields()
      this.dataForm = this.$options.data().dataForm
    },
    // 对接平台列表 设备列表
    getSetList() {
      setList({ category: 'PLATFORM' }).then(data => {
        this.settingList = data.result.map((item, index) => {
          item.index = index + 1
          return item
        })
      })
      getEvnList({
        'page': 1,
        'rows': 999,
        'isDel': 0,
        'deviceId': ''
      }).then(data => {
        if (data.result && data.code === 1000) this.envList = data.result.records
      })
    },
    // 添加apiKey&apiSecret
    showInput() {
      this.centerDialogVisible = true
    },
    handleInputConfirm() {
      const apiKeyValue = this.apiKeyValue
      if (apiKeyValue) {
        this.dataForm.apiKeyTags.push(apiKeyValue)
      }
      this.inputVisible = false
      this.apiKeyValue = ''
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 其余字段后台让默认填 1
          const copyForm = {
            elevatorState: [],
            towerCraneState: [],
            vehicleState: [],
            boxState: [],
            envState: []
          }
          for (var key in { ...copyForm, ...this.dataForm }) {
            if (!this.dataForm[key] && key !== 'id' && key !== 'createDate') this.dataForm[key] = '1'
          }
          // 如果是厦门建发consIds：id-右边输入框的值,id-右边输入框的值
          let newConsIds = []
          if (this.platformName === 'XMJF' || this.platformName === 'ZHENGZHOU') {
            newConsIds = this.dataForm.consIds.map(item => {
              item = `${item}-${this.proList.find(ele => ele.id === item).constrNo || ' '}`
              return item
            })
          } else {
            newConsIds = this.dataForm.consIds
          }
          synSaveOrUpdate({ ...this.dataForm, platformName: this.platformName, projectId: this.projectId, consIds: newConsIds.toString() }).then((data) => {
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
.list-dataSet-modal{
  width: 1100px;
  .platform {
    border-right: 1px solid #b8b8b8;
    height: 450px;
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
