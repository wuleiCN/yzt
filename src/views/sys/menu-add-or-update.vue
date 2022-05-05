<template>
  <el-dialog
    custom-class="menu-modal"
    :title="!dataForm.id ? '新增菜单' : '修改菜单'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item label="别名" prop="alias">
        <el-input v-model="dataForm.alias" placeholder="别名" />
      </el-form-item>
      <el-form-item label="访问路径" prop="rules">
        <el-input v-model="dataForm.rules" placeholder="访问路径" />
      </el-form-item>
      <el-form-item label="权限url" prop="url">
        <el-input v-model="dataForm.url" :rows="4" type="textarea" placeholder="权限url" />
      </el-form-item>
      <el-form-item label="选择系统" prop="sysType">
        <el-select v-model.trim="dataForm.sysType" style="width: 100%" clearable placeholder="请选择选择系统">
          <el-option label="老系统" :value="0"> 老系统 </el-option>
          <el-option label="新系统" :value="1"> 新系统 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.parentId" label="父id" prop="parentId">
        <el-input v-model="dataForm.parentId" placeholder="父id" />
      </el-form-item>

      <el-form-item label="排序号" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号" />
      </el-form-item>
      <el-form-item label="菜单图标" prop="iconCls">
        <el-row>
          <el-col :span="24">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-list">
                <el-button
                  v-for="(item, index) in iconList"
                  :key="index"
                  :class="{ 'is-active': item === dataForm.icon }"
                  @click="iconActiveHandle(item)"
                >
                  <!-- <icon-svg :name="item" /> -->
                  <svg-icon :icon-class="item" />
                </el-button>
              </div>
            </el-popover>
            <el-input v-model="dataForm.iconCls" v-popover:iconListPopover :readonly="true" placeholder="菜单图标名称" class="icon-list__input" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Icon from '@/icons'
import { saveOrUpdate } from '@/api/sys/menu'
export default {
  data() {
    var validateUrl = (rule, value, callback) => {
      if (this.dataForm.type === 1 && !/\S/.test(value)) {
        callback(new Error('菜单URL不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      dataForm: {
        id: null,
        name: '',
        alias: '',
        rules: '',
        url: '',
        sysType: null,
        parentId: null,
        sort: 0,
        iconCls: ''
      },
      dataRule: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: '上级菜单不能为空', trigger: 'change' }
        ],
        url: [
          { validator: validateUrl, trigger: 'blur' }
        ]
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.iconList = Icon.getNameList()
  },
  methods: {
    init(row, type) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (type !== 'add') {
          this.dataForm = row
        } else {
          this.dataForm.id = null
          this.dataForm.parentId = row.id
        }
      })
    },
    // 图标选中
    iconActiveHandle(iconName) {
      this.dataForm.iconCls = iconName
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveOrUpdate({ ...this.dataForm }).then((data) => {
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
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      max-width: 460px;
    }
    &__icon-list {
      min-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
  .menu-modal {
    width: 600px;
  }
</style>
