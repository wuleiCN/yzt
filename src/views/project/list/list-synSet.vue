<template>
  <el-dialog
    custom-class="list-synSet-modal"
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
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form v-if="showForm" ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px">
              <el-form-item label="状态" prop="state">
                <el-radio-group v-model="dataForm.state" style="width:100%">
                  <el-radio :label="1">对接</el-radio>
                  <el-radio :label="2">不对接</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="!Strategy.fieldClac('projectNumber').includes(platformName)" label="项目同步编号" prop="projectNumber">
                <el-input v-model.trim="dataForm.projectNumber" placeholder="项目同步编号" />
              </el-form-item>
              <el-form-item v-if="Strategy.fieldClac('engineeringCode').includes(platformName)" label="工地同步编号" prop="engineeringCode">
                <el-input v-model.trim="dataForm.engineeringCode" placeholder="工地同步编号" />
              </el-form-item>
              <el-form-item v-if="!Strategy.fieldClac('consIds').includes(platformName)" label="对接的参建单位" prop="consIds">
                <el-select
                  v-model="dataForm.consIds"
                  multiple
                  collapse-tags
                  style="width:100%"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in proList"
                    :key="index"
                    :label="item.construction && item.construction.constructionName"
                    :value="item.id"
                  >
                    <span>{{ item.construction && item.construction.constructionName }}</span>
                    <el-input
                      v-if="['XMJF', 'ZHENGZHOU'].includes(platformName) && dataForm.consIds && dataForm.consIds.includes(item.id)"
                      v-model.trim="item.constrNo"
                      class="right-input-synSet"
                      placeholder=""
                      @click.stop.native="()=>{}"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="!Strategy.fieldClac('userName').includes(platformName)" label="登录账号" prop="userName">
                <el-input v-model.trim="dataForm.userName" placeholder="登录账号" />
              </el-form-item>
              <el-form-item v-if="!Strategy.fieldClac('passWord').includes(platformName)" label="登录密码" prop="passWord">
                <el-input v-model.trim="dataForm.passWord" placeholder="登录密码" />
              </el-form-item>
              <el-button v-if="platformName === 'ZJJH'" style="margin-left:120px" type="primary" @click="getOrgListHandle()">点击获取组织机构</el-button>
              <el-form-item v-if="platformName === 'ZJJH' && orgList.length" label="组织机构" prop="apiKey">
                <el-select
                  v-model="dataForm.apiKey"
                  style="width:100%"
                  placeholder="请选择组织机构"
                >
                  <el-option
                    v-for="(item, index) in orgList"
                    :key="index"
                    :label="item.orgName"
                    :value="item.orgCode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="!Strategy.fieldClac('apiKey').includes(platformName)"
                :label="platformName === 'SHAANXI' ? 'token' : '授权账号'"
                prop="apiKey"
              >
                <el-input v-model.trim="dataForm.apiKey" :placeholder="platformName === 'SHAANXI' ? 'token' :'标准apiKey'" />
              </el-form-item>
              <el-form-item v-if="!Strategy.fieldClac('apiSecret').includes(platformName)" label="授权密钥" prop="apiSecret">
                <el-input v-model.trim="dataForm.apiSecret" placeholder="标准apiSecret" />
              </el-form-item>
              <el-form-item
                v-if="!Strategy.fieldClac('clientSerial').includes(platformName)"
                :label="platformName === 'AJD' ? '地区编码' : platformName === 'SHAANXI' ? 'provider' : ['HZZJJ', 'GDJY'].includes(platformName) ? '厂家识别码' : '设备序号'"
                prop="clientSerial"
              >
                <el-input
                  v-model.trim="dataForm.clientSerial"
                  :placeholder="platformName === 'AJD' ? '地区编码' : platformName === 'SHAANXI' ? 'provider' : ['HZZJJ', 'GDJY'].includes(platformName) ? '厂家识别码' : '设备序号'"
                />
              </el-form-item>
              <div v-if="['HZZJJ', 'GDJY'].includes(platformName)" class="cj-api-style">
                <el-divider content-position="left">采集秘钥</el-divider>
                <el-form-item label="采集授权账号" prop="cjApiKey">
                  <el-input v-model.trim="dataForm.cjApiKey" placeholder="采集cjApiKey" />
                </el-form-item>
                <el-form-item label="采集授权密钥" prop="cjApiSecret">
                  <el-input v-model.trim="dataForm.cjApiSecret" placeholder="采集cjApiSecret" />
                </el-form-item>
              </div>
              <el-form-item
                v-if="['SHPDXM'].includes(platformName)"
                label="WORKID"
                prop="apiKey"
              >
                <el-input
                  v-model.trim="dataForm.apiKey"
                  placeholder="WORKID"
                />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="9">
            <div>
              <div v-if="platformDesc[platformName]" class="syn-alert">
                <div class="title">对接说明</div>
                <div v-for="(item, index) in platformDesc[platformName]" :key="index">
                  <div>{{ index + 1 }}) {{ item.title }}</div>
                  <div v-for="(ele, inx) in item.ps" :key="inx" class="ps">
                    <span v-if="ele.length">※</span> {{ ele }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

      </el-main>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="!showForm" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { synDetail, synSaveOrUpdate, setList, getOrgList } from '@/api/project/project'
import { proSelectList } from '@/api/project/team'
import { platformDesc } from './decs'
import { Strategy } from './formField'
export default {
  data() {
    return {
      Strategy,
      platformDesc,
      visible: false,
      info: {},
      showForm: false,
      settingList: [],
      selectList: [],
      proList: [],
      orgList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      platformName: '',
      dataForm: {
        projectNumber: '',
        engineeringCode: '',
        state: 2,
        apiKey: '',
        cjApiKey: '',
        cjApiSecret: '',
        userName: '',
        passWord: '',
        consIds: [],
        apiSecret: '',
        clientSerial: ''
      },
      dataRule: {
        projectNumber: [
          { required: true, message: '项目同步编号不能为空', trigger: 'blur' }
        ],
        consIds: [
          { required: true, message: '请选择', trigger: ['blur'] }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: ['blur'] }
        ],
        userName: [
          { required: false, message: '授权账号不能为空', trigger: 'blur' }
          // { pattern: /^[0-9A-Za-z]{1,}$/, message: '由数字,字母组成', trigger: ['blur'] }
        ],
        passWord: [
          { required: false, message: '登录密码不能为空', trigger: 'blur' }
        ],
        apiKey: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        engineeringCode: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        apiSecret: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        cjApiKey: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        cjApiSecret: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        clientSerial: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    init(platformName, projectId) {
      this.showForm = false
      this.visible = true
      this.getSetList() // 对接平台列表
      this.getProSelectList(projectId) // 所属参建单位选择列表
      this.$nextTick(() => {
        this.$refs['dataForm'] && this.$refs['dataForm'].resetFields()
        this.platformName = platformName
        this.projectId = projectId
      })
    },
    getOrgListHandle() {
      getOrgList({ platId: this.dataForm.userName, projectId: this.dataForm.passWord }).then(data => {
        if (data.code === 1000) {
          this.orgList = data.result
          this.dataForm.apiSecret = 1 // 只有浙江金华才能随便填
          this.dataForm.clientSerial = 1 // 只有浙江金华才能随便填
        } else {
          this.orgList = []
        }
      })
    },
    // 某平台下对应的设置信息
    nodeClickHandle(row) {
      this.showForm = true
      synDetail({ platId: row.tag, projectId: this.projectId }).then(data => {
        this.$refs['dataForm'] && this.$refs['dataForm'].resetFields()
        this.platformName = row.tag
        console.log(row.tag)
        if (data.result) {
          this.dataForm = data.result
          const consIds = {}
          // 厦门建发平台：对接的参建单位字段回显逻辑
          if (this.dataForm.consIds && this.dataForm.consIds.length) {
            const consIdsNos = this.dataForm.consIds.split(',')
            for (const item of consIdsNos) {
              const val = item.split('-')
              if (val && val.length) {
                consIds[val[0]] = val[1]
              } else {
                consIds[item] = item
              }
            }
          }
          this.$set(this.dataForm, 'consIds', Object.keys(consIds))
          this.proList = this.proList.map(item => {
            if (Object.keys(consIds).includes(item.id)) {
              item.constrNo = consIds[item.id]
            }
            return item
          })
        } else {
          this.dataForm = {}
          this.$set(this.dataForm, 'state', 2) // 切换默认状态不对接
        }
      })
    },
    // 对接平台列表
    getSetList() {
      setList({ category: 'PLATFORM' }).then(data => {
        this.settingList = data.result.map((item, index) => {
          item.index = index + 1
          return item
        })
      })
    },
    // 所属参建单位选择列表
    getProSelectList(id) {
      proSelectList({ id }).then((data) => {
        this.proList = data && data.result ? data.result.map(item => {
          item.constrNo = ''
          return item
        }) : []
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 其余字段后台让默认填 1
          const copyForm = {
            projectNumber: '',
            engineeringCode: '',
            state: 2,
            apiKey: '',
            cjApiKey: '',
            cjApiSecret: '',
            userName: '',
            passWord: '',
            consIds: [],
            apiSecret: '',
            clientSerial: ''
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
.list-synSet-modal{
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
  .cj-api-style {
    margin: 25px 0;
    border: 1px solid #DCDFE6;
    border-top: none;
    border-radius: 3px;
    .el-divider {
      .el-divider__text {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  .syn-alert {
    height: 450px;
    overflow-y: auto;
    .title {
      font-size: 25px;
      padding-bottom: 10px;
      text-indent: 0px;
    }
    text-indent: 20px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 10px;
    line-height: 25px;
    font-size: 17px;
    letter-spacing:2px;
    .ps {
      font-size: 13px;
      margin: 6px 0 10px 0;
      border-bottom: 1px dashed #67c23a;
    }
  }
}
.right-input-synSet {
  margin:0 15px;
  width:150px;
  float: right;
  .el-input__inner {
    height: 25px !important;
  }
}
</style>
