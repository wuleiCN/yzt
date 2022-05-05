<template>
  <el-dialog
    custom-class="node-add-or-update-modal"
    title="节点设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <span>{{ dataForm.projectName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同名称：">
            <span>{{ dataForm.contractName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="乙方单位：">
            <span>{{ dataForm.yfName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计划开始时间：">
            <span>{{ dataForm.startDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划结束时间：">
            <span>{{ dataForm.endDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：">
            <el-tag v-if="dataForm.status === 0" type="danger">关闭</el-tag>
            <el-tag v-if="dataForm.status === 1" type="success">启用</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="node-btn-wrap">
      <el-button type="primary" @click="nodeAdd('tj')">同级新增</el-button>
      <el-button type="primary" :disabled="!nodeList.length" @click="nodeAdd('xj')">下级新增</el-button>
      <el-button v-permit="'progress_del'" type="primary" :disabled="!!!tableRadio" @click="deleteHandle()">删除</el-button>
      <el-button type="primary" @click="cancelHandle()">取消</el-button>
      <el-button v-permit="'progress_update'" type="primary" :disabled="!nodeList.length" @click="updateHandle()">修改</el-button>
      <el-button v-permit="'progress_save'" type="primary" :disabled="!!!tableRadio || !tableRow.edit" @click="saveHandle()">保存</el-button>
      <my-upload
        ref="myUpload"
        v-permit="'progress_import'"
        style="display: inline-block;margin: 0 10px"
        :is-show="true"
        :title="'导入'"
        :action="`/projectScheduleNode/mppImport?scheduleId=${dataForm.id}`"
        @getfileList="importCallBack"
      />
      <a target="_blank" class="temp-name" :href="$http.staticUrl('/节点导入模板.mpp')">节点导入模板下载</a>
    </div>
    <el-table
      :data="nodeList"
      class="node-table"
      max-height="500"
      row-key="id"
      border
      stripe
      tooltip-effect="light"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
    >
      <el-table-column label="选择" type="selection" header-align="center" align="center" width="55">
        <template slot-scope="scope">
          <el-radio v-model="tableRadio" :label="scope.row.id"><span /></el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="nodeName"
        label="节点名称"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.nodeName }}</span>
          <template v-else>
            <el-input v-model.trim="scope.row.nodeName" style="width:80%" placeholder="节点名称" />
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="isContractNode"
        label="是否合同节点"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.isContractNode === 1 ? '是' : '否' }}</span>
          <template v-else>
            <el-select v-model="scope.row.isContractNode" placeholder="请选择" @change="(type) => handleChange(type, scope.row)">
              <el-option label="是" :value="1"> 是 </el-option>
              <el-option label="否" :value="0"> 否 </el-option>
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="nodeAttributeName"
        label="节点属性"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;">
            <span v-if="!scope.row.edit">{{ scope.row.nodeAttributeName }}</span>
            <template v-else>
              <el-select v-model="scope.row.nodeAttribute" placeholder="请选择" @change="(type) => handleChange(type, scope.row)">
                <el-option
                  v-for="(item, index) in attrList"
                  :key="index"
                  :label="item.title"
                  :value="item.id"
                > {{ item.title }} </el-option>
              </el-select>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="计划开始时间"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;">
            <span v-if="!scope.row.edit">{{ scope.row.startDate }}</span>
            <template v-else>
              <el-date-picker
                v-model.trim="scope.row.startDate"
                style="width:100%"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="计划开始时间"
                @change="dateChange(scope.row)"
              />
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="计划结束时间"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;">
            <span v-if="!scope.row.edit">{{ scope.row.endDate }}</span>
            <template v-else>
              <el-date-picker
                v-model.trim="scope.row.endDate"
                style="width:100%"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="计划结束时间"
                @change="dateChange(scope.row)"
              />
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="requiredResult"
        label="要求成果"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;">
            <span v-if="!scope.row.edit">{{ scope.row.requiredResult }}</span>
            <template v-else>
              <el-input v-model.trim="scope.row.requiredResult" placeholder="要求成果" />
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="workDays"
        label="工期（天）"
      />
      <el-table-column
        prop="constructionName"
        :show-overflow-tooltip="true"
        label="责任单位"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.constructionName }}</span>
          <template v-else>
            <el-select v-model="scope.row.constructionId" placeholder="请选择" @change="(type) => handleChange(type, scope.row, 'construction')">
              <el-option
                v-for="(item, index) in constrList"
                :key="index"
                :label="item.construction.constructionName"
                :value="item.id"
              > {{ item.construction.constructionName }} </el-option>
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        label="责任人"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;">
            <span v-if="!scope.row.edit">{{ scope.row.userName }}</span>
            <template v-else>
              <el-select v-model="scope.row.userId" placeholder="请选择" @change="(type) => handleChange(type, scope.row)">
                <el-option
                  v-for="(item, index) in userList"
                  :key="index"
                  :label="item.loginName"
                  :value="item.id"
                > {{ item.loginName }} </el-option>
              </el-select>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer;">
            <span v-if="!scope.row.edit">{{ scope.row.remark }}</span>
            <template v-else>
              <el-input v-model.trim="scope.row.remark" placeholder="备注" />
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="picUrl"
        label="图片url"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.id">
            <a
              v-if="!scope.row.edit"
              target="_blank"
              style="color: #1890ff"
              :href="scope.row.picUrl"
            >{{ (scope.row.picUrl) ? '查看图片' : '' }}</a>
            <template v-else>
              <my-upload
                ref="myUpload"
                :limit="'image'"
                :is-show="false"
                :title="'点击上传'"
                :action="'/user/upload'"
                @getfileList="(fileList) => getFileData(fileList, 'picUrl')"
              />
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="attachmentUrl"
        label="附件URL"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.id">
            <a
              v-if="!scope.row.edit"
              target="_blank"
              style="color: #1890ff"
              :href="scope.row.attachmentUrl"
            >{{ (scope.row.attachmentUrl) ? '查看附件' : '' }}</a>
            <template v-else>
              <my-upload
                ref="myUpload"
                :limit="'png&pdf'"
                :is-show="true"
                :title="'点击上传'"
                :action="'/user/upload'"
                @getfileList="(fileList) => getFileData(fileList, 'attachmentUrl')"
              />
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer" />
  </el-dialog>
</template>

<script>
import { getAttrList, getConstrList, getUserList, getNodeList, nodeSaveOrUpdate, nodeDel } from '@/api/progress'
import { parseTime, treeDataTranslate, treeToList, deepClone } from '@/utils'
import MyUpload from '@/components/upload'
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      type: '', // 同级新增：'tj', 下级新增：'xj'
      tableRadio: '', // 单选框选中
      visible: false,
      nodeList: [],
      constrList: [],
      attrList: [],
      userList: [],
      tableRow: {},
      dataForm: {},
      dataRule: {}
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.tableRadio = '' // 取消单选框选中
      this.dataForm.id = row.id || null
      this.tableRow = {}
      this.visible = true
      this.getNodeListHandle(row.id)
      this.getConstrListHandle(row.projectId)
      this.getAttrListHandle()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        }
      })
    },
    // 前端假添加节点
    nodeAdd(type) {
      const list = treeToList(deepClone(this.nodeList))
      const fList = list.filter(item => {
        return item.id && item.id.startsWith('random_id')
      })
      if (fList.length >= 1) return this.$message.error('请先填写当前节点，再新增')
      const { id, parentId } = this.tableRow
      if (!id && this.nodeList.length) return this.$message.error('请选择某个节点')
      // 拼接字符串random_id, 保存节点的时候区分：同级新增的保存？还是下级新增的保存？还是修改的保存？
      const node = {
        id: 'random_id' + Math.random(),
        edit: true,
        nodeName: '',
        isContractNode: '',
        nodeAttribute: '',
        startDate: '',
        endDate: '',
        requiredResult: '',
        workDays: '',
        constructionName: '',
        userId: '',
        remark: '',
        picUrl: '',
        attachmentUrl: '',
        parentId: type === 'xj' ? id : parentId
      }
      this.tableRadio = node.id
      if (type === 'tj') {
        const index = list.findIndex(item => item.id === this.tableRow.id)
        this.nodeList.splice(index + 1, 0, node)
        this.nodeList = treeDataTranslate(this.nodeList, 'id')
      } else {
        this.nodeList = treeToList(this.nodeList)
        this.nodeList.push(node)
        this.nodeList = treeDataTranslate(this.nodeList, 'id')
      }
    },
    // 前端假取消节点
    cancelHandle() {
      // const lastEleId = this.nodeList.length ? this.nodeList[this.nodeList.length - 1].id : ''
      // if (!lastEleId) this.nodeList.pop()
      // if (this.tableRow.edit) this.tableRow.edit = false
      this.tableRow.edit = false
      if (this.nodeList.length) this.getNodeListHandle(this.dataForm.id)
    },
    // 修改节点
    updateHandle() {
      if (!this.tableRow.id && this.nodeList.length) return this.$message.error('请选择某个节点')
      this.rowDblclick(this.tableRow)
    },
    // 保存节点
    saveHandle() {
      const { nodeName, isContractNode, nodeAttribute, startDate, endDate } = this.tableRow
      if (!nodeName) return this.$message.error('节点名称不能为空')
      if (isContractNode === '') return this.$message.error('请选择是否合同节点')
      if (!nodeAttribute) return this.$message.error('请选择节点属性')
      if (!startDate) return this.$message.error('请选择计划开始时间')
      if (!endDate) return this.$message.error('请选择计划结束时间')
      if (startDate && endDate && (new Date(endDate) < new Date(startDate))) return this.$message.error('计划结束时间不能小于计划开始时间')
      if (this.tableRow.edit || this.tableRadio) {
        // 如果是同级新增的保存或者是下级新增的保存：this.tableRow.id = ''
        if (this.tableRow.id.startsWith('random_id')) this.tableRow.id = ''
        nodeSaveOrUpdate({ ...this.tableRow, scheduleId: this.dataForm.id }).then((data) => {
          if (data && data.code === 1000) {
            this.$message.success(data.message)
            this.getNodeListHandle(this.dataForm.id)
            this.tableRow = {}
            this.tableRadio = ''
          } else {
            this.$message.error(data.message)
          }
        })
      } else {
        this.$message.error('请选择节点，再保存')
      }
    },
    // 选择日期事件
    dateChange(row) {
      // 工期值根据计划时间差值
      if (row.startDate && row.endDate) {
        this.$set(row, 'workDays', (new Date(row.endDate) - new Date(row.startDate)) / (1000 * 60 * 60 * 24) + 1)
      }
    },
    // 点击选中一行
    rowClick(tableRow) {
      this.tableRadio = tableRow.id
      this.tableRow = tableRow
    },
    // 双击修改
    rowDblclick(tableRow) {
      // 取消其他的可编辑状态
      this.nodeList = treeToList(this.nodeList).map(item => {
        item.edit = false
        return item
      })
      this.nodeList = treeDataTranslate(this.nodeList, 'id')
      tableRow.constructionId && this.getUserListHandle(tableRow.constructionId)
      this.$set(tableRow, 'edit', true)
    },
    // 获取节点列表
    getNodeListHandle(scheduleId) {
      getNodeList({ scheduleId }).then((data) => {
        if (data && data.code === 1000) {
          const list = data.result.map(item => {
            item.edit = false
            item.startDate = item.startDate ? parseTime(item.startDate, '{y}-{m}-{d}') : ''
            item.endDate = item.endDate ? parseTime(item.endDate, '{y}-{m}-{d}') : ''
            return item
          })
          this.nodeList = treeDataTranslate(list, 'id')
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 节点属性下拉列表
    getAttrListHandle() {
      getAttrList({ category: 'SCHEDULE_NODE_ATTRIBUTE' }).then((data) => {
        if (data && data.code === 1000) {
          this.attrList = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 节点删除
    deleteHandle() {
      if (!this.tableRadio) return this.$message.error('请选择要删除的节点')
      this.$confirm(`您确定进行删除节点：${this.tableRow.nodeName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        nodeDel([this.tableRow.id]).then((data) => {
          if (data && data.code === 1000) {
            this.tableRadio = '' // 单选框取消选中
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getNodeListHandle(this.dataForm.id)
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 参建单位下拉列表
    getConstrListHandle(id) {
      getConstrList({ id, status: 0 }).then((data) => {
        if (data && data.code === 1000) {
          this.constrList = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 负责人下拉列表
    getUserListHandle(constructionId) {
      getUserList({ constructionId }).then((data) => {
        if (data && data.code === 1000) {
          this.userList = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    // 选择参建加载负责人下拉
    handleChange(constructionId, row, name) {
      if (name === 'construction') this.getUserListHandle(constructionId)
    },
    // 图片url
    getFileData(fileList, type) {
      this.$set(this.tableRow, type, fileList.result)
      this.saveHandle()
    },
    // 导入成功回调
    importCallBack() {
      this.getNodeListHandle(this.dataForm.id)
    }
  }
}
</script>
<style lang="scss">
  .node-add-or-update-modal {
    width: 1450px;
    .node-btn-wrap {
      margin-bottom: 10px;
    }
    .el-input {
      display: inline-block !important;
    }
    .temp-name {
      color: #1890ff;
      text-decoration: underline;
    }
    // .el-table__indent {
    //   display: none;
    // }
    // .el-table__expand-icon{
    //   -webkit-transform: rotate(0deg);
    //   transform: rotate(0deg);
    //   display: inline-block !important;
    // }
    // /*2.展开按钮未点击的样式是加号带边框*/
    // .el-table__expand-icon .el-icon-arrow-right:before {
    //   content: "\e6d9";
    //   border: 1px solid #ccc;
    //   padding: 2px;
    // }
    // /*3.展开按钮点击后的样式是减号带边框*/
    // .el-table__expand-icon--expanded .el-icon-arrow-right:before {
    //   content: "\e6d8";
    // }
    .node-table {
      width: 100%;
      margin-bottom: 20px;
      .el-table-column--selection {
        .el-checkbox {
          display: none;
        }
      }
    }
  }
</style>
