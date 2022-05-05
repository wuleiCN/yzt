<template>
  <el-dialog
    custom-class="user-modal"
    :title="!dataForm.id ? '新增用户' : `修改用户-${dataForm.loginName}`"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="135px">
      <el-form-item label="用户名称：" prop="loginName">
        <el-input v-model.trim="dataForm.loginName" style="width:100%" placeholder="用户名称" />
      </el-form-item>
      <el-form-item v-if="!dataForm.id" label="用户密码：" prop="passWord">
        <el-input v-model.trim="dataForm.passWord" placeholder="用户密码" style="width:100%" />
      </el-form-item>
      <el-form-item label="姓名：" prop="nickName">
        <el-input v-model.trim="dataForm.nickName" placeholder="姓名" style="width:100%" />
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model.trim="dataForm.phone" placeholder="手机号码" style="width:100%" />
      </el-form-item>
      <el-form-item label="用户性别：" prop="sex">
        <el-radio-group v-model.trim="dataForm.sex" style="width:100%">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户头像：" prop="ico">
        <my-upload ref="myUpload" :title="'点击上传'" :is-show="true" :limit="'image'" :action="'/user/upload'" @getfileList="(fileList) => getFileData(fileList, 'ico')" />
        <!-- {{ dataForm.ico }} -->
        <a target="_blank" style="color: #1890ff" :href="dataForm.ico">{{ dataForm.ico ? '查看用户头像' : '' }}</a>
      </el-form-item>
      <el-form-item label="用户类型：" prop="userType">
        <el-radio-group v-model.trim="dataForm.userType" style="width:100%" @change="changeUserType">
          <el-radio v-for="(item, index) in userTypes" :key="index" :label="item.id"> {{ item.name }} </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="showIsManager" label="是否超级管理员：" prop="isManager">
        <el-radio-group v-model.trim="dataForm.isManager" :disabled="isManagerDisabled" style="width:100%" @change="changeHandle">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="showOrgId" label="选择公司：" prop="orgId">
        <el-select v-model.trim="dataForm.orgId" filterable :disabled="disabled" style="width:100%" placeholder="请选择公司">
          <el-option v-for="(item, index) in groupList" :key="index" :label="item.companyName" :value="item.id"> {{ item.companyName }} <span v-if="item.isGroup" class="flag">(集团)</span> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.userType === 2" label="选择项目：" prop="projectId">
        <el-select v-model.trim="dataForm.projectId" filterable style="width:100%" placeholder="请选择项目">
          <el-option v-for="(item, index) in projectList" :key="index" :label="item.projectName" :value="item.id"> {{ item.projectName }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.userType === 3" label="选择参建单位：" prop="constructionId">
        <el-select v-model.trim="dataForm.constructionId" filterable style="width:100%" placeholder="请选择参建单位">
          <el-option v-for="(item, index) in constructionList" :key="index" :label="item.construction.constructionName" :value="item.id"> {{ item.construction.constructionName }} </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属角色：" prop="roleId">
        <el-select v-model.trim="dataForm.roleId" style="width:100%" placeholder="请选择所属角色">
          <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"> {{ item.name }} </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, getRoleList, getGroupComList, getprojectList, getConstructionList, detail } from '@/api/sys/user'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      visible: false,
      disabled: false,
      showIsManager: true,
      showOrgId: true,
      isManagerDisabled: false,
      dataForm: {
        id: null,
        loginName: '',
        nickName: '',
        phone: '',
        sex: 1,
        ico: '',
        passWord: '',
        roleId: '',
        orgId: '',
        isManager: 0,
        projectId: '',
        constructionId: '',
        userType: ''
      },
      userTypes: [
        { id: 0, name: '集团' },
        { id: 1, name: '公司' },
        { id: 2, name: '项目' },
        { id: 3, name: '参建单位' }
      ],
      dataRule: {
        loginName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z]{1,}$/, message: '用户名称只能输入字母+数字' }
        ],
        passWord: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z!@#$%^&*()_+]{8,}$/, message: '密码不少于8位数，且由数字字母特殊字符!@#$%^&*()_+组成' }
        ],
        phone: [
          { required: false, message: '手机号码不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: ['blur', 'change'] }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        isManager: [
          { required: true, message: '请选择是否超级管理员', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        constructionId: [
          { required: true, message: '请选择参建单位', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择所属角色', trigger: 'blur' }
        ]
      },
      roleList: [],
      groupList: [],
      projectList: [],
      constructionList: [],
      loginInfo: JSON.parse(sessionStorage.getItem('result')),
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.loginInfo.userType === 0 && this.loginInfo.isManager === 1) {
          this.dataForm.userType = 0 // 集团
          this.userTypes = [
            { id: 0, name: '集团' },
            { id: 1, name: '公司' }
          ]
        } else if (this.loginInfo.userType === 0 && this.loginInfo.isManager === 0) {
          this.dataForm.userType = 1 // 公司
          this.userTypes = [
            { id: 1, name: '公司' }
          ]
          this.showIsManager = false
        } else if (this.loginInfo.userType === 1 && this.loginInfo.isManager === 0) {
          this.dataForm.userType = 2 // 项目
          this.userTypes = [
            { id: 2, name: '项目' }
          ]
          this.showIsManager = false
          this.showOrgId = false
          this.dataForm.orgId = this.loginInfo.orgId
          this.dataForm.projectId = ''
        } else if (this.loginInfo.userType === 2 && this.loginInfo.isManager === 0) {
          this.dataForm.userType = 3 // 参建单位
          this.userTypes = [
            { id: 3, name: '参建单位' }
          ]
          this.showIsManager = false
          this.showOrgId = false
          this.dataForm.orgId = this.loginInfo.orgId
          this.dataForm.projectId = this.loginInfo.projectId
        }
        if (id) {
          detail({ id }).then((data) => {
            if (data && data.code === 1000) {
              this.dataForm = data.result
              // this.changeHandle(data.result.isManager)
              // this.changeUserType(data.result.isManager)
            }
          })
        } else {
          this.dataForm.passWord = ''
          this.dataForm.constructionId = ''
        }
        this.getDataList(this.dataForm.userType)
        // 如果 用户类型 等于 3， 不用请求集团公司下拉列表
        if (this.dataForm.userType === 0 || this.dataForm.userType === 1) this.getGroupList()
        if (this.dataForm.userType === 2) this.getprojectList()
        if (this.dataForm.userType === 3) this.getConstructionList()
      })
    },
    getFileData(fileList, type) {
      this.$set(this.dataForm, type, fileList.result)
    },
    changeHandle(val) {
      // 超级管理员选中 是 ， 集团公司显示登录时的orgId,并且禁用
      if (val) {
        this.dataForm.orgId = this.loginInfo.orgId
        this.disabled = true
      } else {
        this.dataForm.orgId = ''
        this.disabled = false
      }
    },
    changeUserType(userType) {
      this.dataForm.roleId = ''
      // 如果用户类型不等于集团的时候，是否超级管理员为否 isManager = 0
      if (userType) {
        this.dataForm.isManager = 0
        this.disabled = false
        this.isManagerDisabled = true
        this.dataForm.orgId = ''
      } else {
        this.isManagerDisabled = false
      }
      this.getDataList(userType)
    },
    // 获取所属角色下拉列表
    getDataList(type) {
      getRoleList({ type }).then(data => {
        this.roleList = data.result
      })
    },
    // 获取集团公司下拉列表
    getGroupList() {
      getGroupComList().then(data => {
        const pass = (this.loginInfo.userType === 0) && (this.loginInfo.isManager === 0)
        if (pass) {
          this.groupList = data.result.map(item => {
            if (item.id === this.loginInfo.orgId) item.isGroup = true
            return item
          })
        } else {
          this.groupList = data.result
        }
      })
    },
    // 获取项目下拉列表
    getprojectList() {
      getprojectList().then(data => {
        this.projectList = data.result
      })
    },
    // 获取参建单位下拉列表
    getConstructionList() {
      getConstructionList({ id: this.loginInfo.projectId }).then(data => {
        this.constructionList = data.result
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm, isManager: this.dataForm.isManager }).then((data) => {
            if (data && data.code === 1000) {
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
              if (data && data.code === 1002) return this.$message.error('该用户名已存在')
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
.user-modal {
  width: 600px;
}
.flag {
  font-size: 10px;
  color: red;
}
</style>
