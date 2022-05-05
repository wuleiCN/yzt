<template>
  <el-dialog
    custom-class="unit-modal"
    :title="!dataForm.id ? '新增参建单位' : '修改参建单位'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="base">
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="150px" @keyup.enter.native="dataFormSubmit()">
          <el-form-item label="单位信用代码" prop="construction.suid">
            <el-input v-model.trim="dataForm.construction.suid" placeholder="请输入内容" @input="handlechange">
              <template slot="append">
                <span class="search-btn" @click="searchHandle">搜索</span>
              </template>
            </el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参建单位名称" prop="construction.constructionName">
                <el-input v-model.trim="dataForm.construction.constructionName" placeholder="参建单位名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参建单位简称" prop="construction.shortName">
                <el-input v-model.trim="dataForm.construction.shortName" placeholder="参建单位简称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位类型" prop="construction.companyType">
                <el-select v-model.trim="dataForm.construction.companyType" style="width:100%" placeholder="请选择">
                  <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人名称" prop="construction.legalPerson">
                <el-input v-model.trim="dataForm.construction.legalPerson" placeholder="法人名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                :rules="[
                  { required:sichuanziyang, message: '法人身份证不能为空', trigger: 'blur' }
                ]"
                label="法人身份证"
                prop="construction.legalCode"
              >
                <el-input v-model.trim="dataForm.construction.legalCode" placeholder="法人身份证" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :rules="[
                  { required: sichuanziyang, message: '法人联系电话不能为空', trigger: 'blur' }
                ]"
                label="法人联系电话"
                prop="construction.legalPhone"
              >
                <el-input v-model.trim="dataForm.construction.legalPhone" placeholder="法人联系电话" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地区" prop="construction.area">
                <el-cascader
                  v-if="isShowInfo"
                  :value="dataForm.construction.area"
                  style="width:100%"
                  :props="props"
                  @change="handleChange"
                />
                <el-select v-if="!isShowInfo" v-model.trim="dataForm.construction.areaxxx" style="width:100%" placeholder="请选择" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成立时间" prop="construction.setUpDate">
                <el-date-picker
                  v-model.trim="dataForm.construction.setUpDate"
                  style="width:100%"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="成立时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="projectType === '100'">
            <el-col :span="12">
              <el-form-item label="劳务账号用户名" prop="userName">
                <el-input v-model.trim="dataForm.userName" placeholder="劳务账号用户名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="劳务账号密码" prop="passWord">
                <el-input v-model.trim="dataForm.passWord" placeholder="劳务账号密码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入场时间" prop="inTime">
                <el-date-picker
                  v-model.trim="dataForm.inTime"
                  style="width:100%"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="入场时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退场时间" prop="outTime">
                <el-date-picker
                  v-model.trim="dataForm.outTime"
                  style="width:100%"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :disabled="true"
                  placeholder="退场时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="组织机构代码" prop="organizationCode">
                <el-input v-model.trim="dataForm.construction.organizationCode" placeholder="组织机构代码" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :rules="[
                  { required: projectType === '110' || dongguanCityCode || henanCityCode, message: '负责人不能为空', trigger: 'blur' }
                ]"
                label="负责人"
                prop="construction.contacts"
              >
                <el-input v-model.trim="dataForm.construction.contacts" placeholder="负责人" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                :rules="[
                  { required: projectType === '110' || dongguanCityCode || henanCityCode || shanxisheng || qingyuan || jiangmen, message: '负责人电话不能为空', trigger: 'blur' }
                ]"
                label="负责人电话"
                prop="construction.mobilePhone"
              >
                <el-input v-model.trim="dataForm.construction.mobilePhone" placeholder="负责人电话" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="电子邮件"
                :rules="[
                  { required: dongguanCityCode, message: '电子邮件不能为空', trigger: 'blur' },
                  { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
                ]"
                prop="construction.email"
              >
                <el-input v-model.trim="dataForm.construction.email" placeholder="电子邮件" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开户银行" prop="bankOpen">
                <el-input v-model.trim="dataForm.construction.bankOpen" placeholder="开户银行" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :rules="[
                  { required: projectType === '110' || shanxisheng || qingyuan || jiangmen, message: '注册资金不能为空', trigger: 'blur' },
                  { pattern: /^[0-9]{1,8}$/, message: '注册资金格式不正确', trigger: ['blur', 'change'] }
                ]"
                label="注册资金(万元)"
                prop="construction.capital"
              >
                <el-input v-model.trim="dataForm.construction.capital" placeholder="注册资金(万元)" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开户账号" prop="construction.bankNum">
                <el-input v-model.trim="dataForm.construction.bankNum" placeholder="开户账号" />
              </el-form-item>
            </el-col>
            <el-col v-if="projectType === '94' || meizhou" :span="12">
              <el-form-item
                label="参建注册类型"
                prop="construction.registrationType"
              >
                <el-select v-model.trim="dataForm.construction.registrationType" style="width:100%" placeholder="请选择参建注册类型">
                  <el-option v-for="(item, index) in regisTypes" :key="index" :label="item.title" :value="item.id">{{ item.title }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            :rules="[
              { required: projectType === '110' || shanxisheng || qingyuan || jiangmen, message: '单位详细地址不能为空', trigger: 'blur' },
              { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
            ]"
            label="单位详细地址"
            prop="construction.address"
          >

            <el-input
              v-model.trim="dataForm.construction.address"
              type="textarea"
              :rows="2"
              placeholder="请输入单位详细地址信息"
            />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model.trim="dataForm.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注信息"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="dataForm.id && visible" label="资质信息" name="qualification">
        <unit-qual :suid="row.construction && row.construction.suid" />
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, getCompanyType, dictionList, detail, suidSearch, projectsDetail } from '@/api/project/unit'
import { parseTime } from '@/utils'
import { getTree } from '@/api/sys/area'
import UnitQual from './unit-qualification'
export default {
  components: {
    UnitQual
  },
  data() {
    return {
      isShowInfo: false,
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      activeName: 'base',
      row: {},
      projectType: '',
      dongguanCityCode: '',
      henanCityCode: '',
      shanxisheng: '',
      meizhou: '',
      jiangmen: '',
      qingyuan: '',
      sichuanziyang: '',
      loginInfo: this.$store.state.user.loginInfo,
      visible: false,
      types: [],
      regisTypes: [],
      dataForm: {
        id: null,
        inTime: '',
        userName: '',
        passWord: '',
        outTime: null,
        construction: {
          legalCode: '',
          legalPhone: '',
          registrationType: '',
          area: '',
          setUpDate: '',
          companyType: '',
          constructionName: '',
          contacts: '',
          email: '',
          id: '',
          capital: '',
          legalPerson: '',
          mobilePhone: '',
          shortName: '',
          address: '',
          bankOpen: '',
          organizationCode: '',
          projectCost: '',
          projectPrincipal: '',
          bankAddress: '',
          bankNum: '',
          suid: ''
        },
        remark: ''
      },
      dataRule: {
        construction: {
          constructionName: [
            { required: true, message: '参建单位名称不能为空', trigger: 'blur' },
            { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
            // { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '参建单位名称由数字,字母中文组成', trigger: ['blur', 'change'] }
          ],
          shortName: [
            { required: false, message: '参建单位简称不能为空', trigger: 'blur' },
            { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] },
            { pattern: /^[\u4e00-\u9fa5_0-9A-Za-z]{1,}$/, message: '参建单位名称由数字,字母中文组成', trigger: ['blur', 'change'] }
          ],
          suid: [
            { required: true, message: '信用代码不能为空', trigger: 'change' },
            { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] },
            { pattern: /^[0-9A-Za-z]{18}$/, message: '信用代码由数字,字母18位数组成', trigger: ['blur', 'change'] }
          ],
          legalPerson: [
            { required: true, message: '法人代表不能为空', trigger: 'change' },
            { pattern: /^(?=[\S\s]{1,16}$)[\S\s]*/, message: '字符长度不能超过16', trigger: ['blur', 'change'] },
            { pattern: /^[\u4e00-\u9fa5_A-Za-z]{1,}$/, message: '法定代表人由字母，文字组成', trigger: ['blur', 'change'] }
          ],
          contacts: [
            { pattern: /^(?=[\S\s]{1,16}$)[\S\s]*/, message: '字符长度不能超过16', trigger: ['blur', 'change'] },
            { pattern: /^[\u4e00-\u9fa5_A-Za-z]{1,}$/, message: '联系人由字母，文字组成', trigger: ['blur', 'change'] }
          ],
          mobilePhone: [
            { pattern: /^(?=[\S\s]{1,11}$)[\S\s]*/, message: '字符长度不能超过11', trigger: ['blur', 'change'] }
            // { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: ['blur', 'change'] }
          ],
          // email: [
          //   // { required: true, message: '电子邮件不能为空', trigger: 'blur' },
          //   { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
          // ],
          organizationCode: [
            { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
          ],
          bankOpen: [
            { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
          ],
          address: [
            { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
          ],
          // capital: [
          //   { pattern: /^[0-9]{1,8}$/, message: '注册资金格式不正确', trigger: ['blur', 'change'] }
          // ],
          companyType: [
            { required: true, message: '请选择单位类型', trigger: ['blur', 'change'] }
          ],
          registrationType: [
            { required: true, message: '请选择参建注册类型', trigger: ['blur'] }
          ],
          setUpDate: [
            { required: true, message: '请选择成立时间', trigger: ['blur', 'change'] }
          ],
          area: [
            { required: true, message: '请选择地区', trigger: ['blur'] }
          ]
        },
        userName: [
          { required: true, message: '劳务账号用户名不能为空', trigger: ['blur'] },
          { pattern: /^(?=[\S\s]{1,50}$)[\S\s]*/, message: '字符长度不能超过50', trigger: ['blur', 'change'] }
        ],
        passWord: [
          { required: true, message: '劳务账号密码不能为空', trigger: ['blur'] },
          { pattern: /^(?=[\S\s]{1,50}$)[\S\s]*/, message: '字符长度不能超过50', trigger: ['blur', 'change'] }
        ],
        remark: [
          { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.row = row
      this.visible = true
      this.activeName = 'base'
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
        // 深度清空
        for (var key in this.dataForm.construction) {
          if (this.dataForm.construction.hasOwnProperty(key)) {
            this.dataForm.construction[key] = ''
            if (key === 'area') this.dataForm.construction[key] = []
          }
        }
        this.getCompanyTypeHandle()
        await this.getDtail(row.id)
        this.getDictionList()
        if (this.dataForm.id) {
          this.isShowInfo = false
          detail({ id: this.dataForm.id }).then((data) => {
            this.isShowInfo = true
            if (data && data.code === 1000) {
              this.dataForm = data.result
              if (this.dataForm.construction) {
                this.$set(this.dataForm.construction, 'setUpDate', this.dataForm.construction.setUpDate ? parseTime(this.dataForm.construction.setUpDate, '{y}-{m}-{d}') : null)
                this.$set(this.dataForm.construction, 'area', this.dataForm.construction.area ? this.dataForm.construction.area.split(',') : [])
                // console.log(this.$$refs.cascader, 'ppp')
                this.$set(this.dataForm, 'inTime', this.dataForm.inTime ? parseTime(this.dataForm.inTime, '{y}-{m}-{d}') : null)
              }
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          this.isShowInfo = true
          this.dataForm.teamSysno = null
          this.dataForm.inTime = parseTime(new Date(), '{y}-{m}-{d}')
        }
      })
    },
    //     const platform = {
    //   province: [
    //     { henanCityCode: 1, code: '410000', requiredArray: ['construction.contacts', 'construction.mobilePhone', 'construction.email'] },
    //     { shanxisheng: 1, code: '140000', requiredArray: ['aaa', 'sss', 'ccc'] }
    //   ],
    //   city: [
    //     { dongguanCityCode: 1, code: '441900', requiredArray: ['aaa', 'sss', 'ccc'] },
    //     { qingyuan: 1, code: '441800', requiredArray: ['contacts', 'mobilePhone', 'email'] },
    //     { meizhou: 1, code: '441400', requiredArray: ['aaa', 'sss', 'ccc'] }
    //   ]
    // }
    // const areaCodes = result.projectRegion ? result.projectRegion.split(',') : []
    // const provCode = areaCodes.length && areaCodes[0]
    // const cityCode = areaCodes.length && areaCodes[1]
    // let platformItem
    // for (const key in platform) {
    //   platformItem = platform[key].find(item => {
    //     return (key === 'province' ? provCode : cityCode) === item.code
    //   })
    // }
    // if (platformItem) {
    //   platformItem.requiredArray.map(required => {
    //     const itme = [...this.dataRule.construction[required], { required: true, message: '必填' }]
    //     this.$set(this.dataRule.construction, required, itme)
    //   })
    // }
    getDtail(id) {
      return projectsDetail({ id: id ? this.row.projectId : this.loginInfo.projectId }).then((data) => {
        const result = data.result || {}
        // projectType === 100 后台要求 为100表示郑州 加两个字段 userName（劳务账号用户名） passWord（劳务账号密码）
        this.projectType = result.projectType
        // 441900 后台要求 为441900表示东莞 	邮箱 负责人 负责人的联系方式必填
        const dongguanCityCode = result.projectRegion ? result.projectRegion.split(',')[1] : ''
        this.dongguanCityCode = dongguanCityCode === '441900'
        // 410000 后台要求 为410000表示河南 	负责人 负责人的联系方式必填
        const henanCityCode = result.projectRegion ? result.projectRegion.split(',')[0] : ''
        this.henanCityCode = henanCityCode === '410000'
        // 140000 后台要求 为410000表示山西省 	单位详细地址 注册资金 负责人电话 必填
        const shanxisheng = result.projectRegion ? result.projectRegion.split(',')[0] : ''
        this.shanxisheng = shanxisheng === '140000'
        // 441800 后台要求 为441800表示广东清远 	单位详细地址 注册资金 负责人电话 必填
        const qingyuan = result.projectRegion ? result.projectRegion.split(',')[1] : ''
        this.qingyuan = qingyuan === '441800'
        // 441400 后台要求 为441400表示广东省梅州平台 	单位详细地址 注册资金 负责人电话 必填
        const meizhou = result.projectRegion ? result.projectRegion.split(',')[1] : ''
        this.meizhou = meizhou === '441400'
        // 441400 后台要求 为441400表示广东省梅州平台 	单位详细地址 注册资金 负责人电话 必填
        const jiangmen = result.projectRegion ? result.projectRegion.split(',')[1] : ''
        this.jiangmen = jiangmen === '440700'
        // 512000 后台要求 为512000表示四川资阳 	法人身份证，法人联系电话必填 必填
        const sichuanziyang = result.projectRegion ? result.projectRegion.split(',')[1] : ''
        this.sichuanziyang = sichuanziyang === '512000'
        return data
      })
    },
    // 信用代码搜素
    searchHandle() {
      if (this.dataForm.construction && this.dataForm.construction.suid) {
        suidSearch({ suid: this.dataForm.construction.suid }).then((data) => {
          if (data.result) this.dataForm.construction = data.result
        })
      } else {
        this.$message.error('请输入信用代码')
      }
    },
    handlechange(val) {
      for (var key in this.dataForm.construction) {
        if (this.dataForm.construction.hasOwnProperty(key)) {
          if (key !== 'suid') this.dataForm.construction[key] = ''
        }
      }
    },
    getCompanyTypeHandle() {
      getCompanyType().then(data => {
        if (data && data.code === 1000) {
          this.types = data.result
          console.log(data)
        } else {
          this.$message.error(data.message)
        }
      })
    },
    getDictionList() {
      let category = ''
      if (this.meizhou) {
        category = 'Registration_Type_GDMEIZHOU'
      } else {
        category = 'Registration_Type_GZSW'
      }
      dictionList({ category }).then(data => {
        if (data && data.code === 1000) {
          this.regisTypes = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    lazyLoad(node, resolve) {
      if (node.level === 0) {
        this.getTreeChild(100000, resolve)
        // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
      } else {
        this.getTreeChild(node.data.id, resolve)
      }
    },
    getTreeChild(id, resolve) {
      //  这里可以替换成向后台发起的请求修改data,为了演示我用的是写死的数据,获取到data后,resolve出去就好了
      getTree({ id: id || 100000 }).then(data => {
        if (data && data.code === 1000) {
          const list = data.result.map(item => {
            item.label = item.text
            item.value = item.id
            item.edit = false
            item.leaf = item.state === 'open'
            return item
          })
          resolve(list)
        }
      })
    },
    handleChange(value) {
      this.$set(this.dataForm.construction, 'area', value)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.construction.area = this.dataForm.construction.area.toString()
          saveOrUpdate({ ...this.dataForm }).then((data) => {
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
  .unit-modal {
    width: 950px;
    .el-dialog__body {
      padding-top: 0;
    }
    .search-btn {
      cursor: pointer;
    }
  }

</style>
