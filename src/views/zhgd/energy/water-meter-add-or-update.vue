<template>
  <el-dialog
    custom-class="zhgd-water-modal"
    :title="!dataForm.id ? '新增用水设备' : '修改用水设备'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()">
      <h3>水表基本信息</h3>
      <div class="base-info">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model.trim="dataForm.name" placeholder="设备名称" />
        </el-form-item>
        <el-form-item label="管理区域" prop="area">
          <el-select v-model.trim="dataForm.area" style="width:100%" placeholder="请选择管理区域">
            <el-option label="区域1" :value="1"> 区域1 </el-option>
            <el-option label="区域2" :value="2"> 区域2 </el-option>
            <el-option label="区域3" :value="3"> 区域3 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类别" prop="type">
          <el-select v-model.trim="dataForm.type" style="width:100%" placeholder="请选择设备类别">
            <el-option label="类别1" :value="1"> 类别1 </el-option>
            <el-option label="类别2" :value="2"> 类别2 </el-option>
            <el-option label="类别3" :value="3"> 类别3 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备品牌" prop="brand">
          <el-select v-model.trim="dataForm.brand" style="width:100%" placeholder="请选择设备品牌">
            <el-option label="威铭" :value="1"> 威铭 </el-option>
            <el-option label="常德" :value="2"> 常德 </el-option>
            <el-option label="捷先" :value="3"> 捷先 </el-option>
            <el-option label="宁波" :value="4"> 宁波 </el-option>
            <el-option label="炬华无线" :value="5"> 炬华无线 </el-option>
            <el-option label="炬华有线" :value="6"> 炬华有线 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公称口径" prop="caliber">
          <el-select v-model.trim="dataForm.caliber" style="width:100%" placeholder="请选择公称口径">
            <el-option label="复费率" :value="1"> 复费率 </el-option>
            <el-option label="单费率" :value="2"> 单费率 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌型号" prop="brandModel">
          <el-input v-model.trim="dataForm.brandModel" placeholder="品牌型号" />
        </el-form-item>
        <el-form-item label="安装日期" prop="date">
          <el-date-picker
            v-model.trim="dataForm.date"
            style="width:100%"
            type="date"
            placeholder="安装日期"
          />
        </el-form-item>
        <el-form-item label="安装位置" prop="location">
          <el-select v-model.trim="dataForm.location" style="width:100%" placeholder="请选择安装位置">
            <el-option v-for="(item, index) in areaTypes" :key="index" :label="item.dictLabel" :value="item.dictLabel">{{ item.dictLabel }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属水表" prop="waterFlowmeter">
          <el-select v-model.trim="dataForm.waterFlowmeter" style="width:100%" placeholder="请选择所属水表">
            <el-option label="水表1" :value="1"> 水表1 </el-option>
            <el-option label="水表2" :value="2"> 水表2 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="综合倍率" prop="multiplyingPower">
          <el-input v-model.number="dataForm.multiplyingPower" placeholder="综合倍率" />
        </el-form-item>
        <el-form-item label="排序号" prop="sortNumber">
          <el-input v-model.trim="dataForm.sortNumber" placeholder="排序号" />
        </el-form-item>
      </div>
      <h3>水表通讯信息</h3>
      <div class="communication-info">
        <el-form-item label="通讯方案" prop="communicationScheme">
          <el-select v-model.trim="dataForm.communicationScheme" style="width:100%" placeholder="请选择通讯方案">
            <el-option label="NB-IOT常德水表" :value="1"> NB-IOT常德水表 </el-option>
            <el-option label="NB-IOT常德水表" :value="2"> NB-IOT常德水表 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否带阀" prop="isValve">
          <el-select v-model.trim="dataForm.isValve" style="width:100%" placeholder="请选择是否带阀">
            <el-option label="带阀" :value="1"> 带阀 </el-option>
            <el-option label="不带阀" :value="2"> 不带阀 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通许地址" prop="ip">
          <el-input v-model.trim="dataForm.ip" placeholder="通许地址" />
        </el-form-item>
        <el-form-item label="表密码" prop="password">
          <el-input v-model.trim="dataForm.password" placeholder="表密码" />
        </el-form-item>
        <el-form-item label="规约" prop="statute">
          <el-select v-model.trim="dataForm.statute" style="width:100%" placeholder="请选择规约">
            <el-option v-for="(item, index) in areaTypes" :key="index" :label="item.dictLabel" :value="item.dictLabel">{{ item.dictLabel }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="波特率" prop="bps">
          <el-select v-model.trim="dataForm.bps" style="width:100%" placeholder="请选择波特率">
            <el-option label="波特率1" :value="1"> 波特率1 </el-option>
            <el-option label="波特率2" :value="2"> 波特率2 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属终端" prop="terminal">
          <el-select v-model.trim="dataForm.terminal" style="width:100%" placeholder="请选择所属终端">
            <el-option label="所属终端1" :value="1"> 所属终端1 </el-option>
            <el-option label="所属终端2" :value="2"> 所属终端2 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-select v-model.trim="dataForm.port" style="width:100%" placeholder="请选择端口">
            <el-option label="端口1" :value="1"> 端口1 </el-option>
            <el-option label="端口2" :value="2"> 端口2 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计量点" prop="meteringPoint">
          <el-input v-model.trim="dataForm.meteringPoint" placeholder="计量点" />
        </el-form-item>
        <el-form-item label="采集地址" prop="collectorArea">
          <el-input v-model.trim="dataForm.collectorArea" placeholder="采集地址" />
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input v-model.trim="dataForm.mark" placeholder="备注" />
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdateWater } from '@/api-zhgd/water-meter'
import { getList } from '@/api-zhgd/sys/dict'
import { getList as supplierList } from '@/api-zhgd/sys/supplier'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        projectId: this.$store.state.user.loginInfo.projectId,
        type: '',
        waterFlowmeter: '',
        name: '',
        area: '',
        supAbbreviation: '',
        brand: '',
        caliber: '',
        brandModel: '',
        date: '',
        location: '',
        multiplyingPower: '',
        sortNumber: '',
        communicationScheme: '',
        isValve: '',
        ip: '',
        password: '',
        statute: '',
        bps: '',
        terminal: '',
        port: '',
        meteringPoint: '',
        collectorArea: '',
        mark: ''
      },
      supList: [],
      areaTypes: [],
      dataRule: {
        comments: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '管理区域不能为空', trigger: 'blur' }
        ],
        sortNumber: [
          { required: true, message: '排序号不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '设备类别不能为空', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '设备品牌不能为空', trigger: 'blur' }
        ],
        caliber: [
          { required: true, message: '公称口径不能为空', trigger: 'blur' }
        ],
        communicationScheme: [
          { required: true, message: '通讯方案不能为空', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '通许地址不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '表密码不能为空', trigger: 'blur' }
        ],
        statute: [
          { required: true, message: '规约不能为空', trigger: 'blur' }
        ],
        bps: [
          { required: true, message: '波特率不能为空', trigger: 'blur' }
        ],
        terminal: [
          { required: true, message: '所属终端不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '端口不能为空', trigger: 'blur' }
        ],
        meteringPoint: [
          { required: true, message: '计量点不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        isValve: [
          { required: true, message: '是否带阀', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.dataForm.id = row.id || null
      this.visible = true
      this.getDataList()
      // this.getsupplierList()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = row
        } else {
          // this.dataForm.dictType = row.dictType
        }
      })
    },
    // 获取供应商
    getsupplierList() {
      supplierList({
        isDel: 0
        // 'deviceType': 3
      }).then((data) => {
        if (data && data.code === 1000) {
          this.supList = data.result
        }
      })
    },
    getDataList() {
      getList({
        dictType: 'quyu',
        isDel: 0
      }).then((data) => {
        if (data && data.code === 1000) {
          this.areaTypes = data.result.records
        } else {
          this.areaTypes = []
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdateWater({ ...this.dataForm }).then((data) => {
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
  .zhgd-water-modal {
    .base-info,.communication-info {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
      }
    }

  }
</style>
