<template>
  <el-dialog
    custom-class="pro-list-modal"
    :title="!dataForm.id ? '新增项目' : '修改项目'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="150px" @keyup.enter.native="dataFormSubmit()">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model.trim="dataForm.projectName" placeholder="项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目简称" prop="shortName">
            <el-input v-model.trim="dataForm.shortName" placeholder="项目简称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="projectType">
            <el-select v-model.trim="dataForm.projectType" style="width:100%" placeholder="请选择">
              <el-option v-for="(item, index) in types" :key="index" :label="item.title" :value="item.tag">{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目状态" prop="projectState">
            <el-select v-model.trim="dataForm.projectState" style="width:100%" placeholder="请选择">
              <el-option v-for="(item, index) in stateTypes" :key="index" :label="item.title" :value="item.tag">{{ item.title }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开工时间" prop="startingTime">
            <el-date-picker
              v-model.trim="dataForm.startingTime"
              style="width:100%"
              type="date"
              placeholder="开工时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目位置" prop="projectRegion">
            <el-cascader
              v-if="isShowInfo"
              :value="dataForm.projectRegion"
              style="width:100%"
              :props="props"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同竣工时间" prop="finishTime">
            <el-date-picker
              v-model.trim="dataForm.finishTime"
              style="width:100%"
              type="date"
              placeholder="合同竣工时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="施工许可证" prop="builderLicense">
            <el-input v-model.trim="dataForm.builderLicense" placeholder="施工许可证" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="建筑面积(m²)" prop="acreage">
            <el-input v-model.trim="dataForm.acreage" placeholder="建筑面积" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工程造价(万元)" prop="projectCost">
            <el-input v-model.trim="dataForm.projectCost" placeholder="工程造价" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人" prop="projectPrincipal">
            <el-input v-model.trim="dataForm.projectPrincipal" placeholder="负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.trim="dataForm.phone" placeholder="联系电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="项目位置" prop="projectRegion">
            <el-input v-model.trim="dataForm.projectRegion" placeholder="项目位置" />
          </el-form-item>
        </el-col> -->
      </el-row>

      <el-row :gutter="3">
        <el-col :span="21">
          <el-form-item label="详细地址" prop="projectAddress">
            <el-input
              v-model.trim="dataForm.projectAddress"
              type="textarea"
              :rows="2"
              placeholder="请输入详细地址信息"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button class="btn-sty" type="primary" @click="searchHandle()">地址转经纬度</el-button>
        </el-col>
      </el-row>
      <el-form-item label="地图定位" prop="latAndlng">
        <el-input
          v-show="false"
          v-model.trim="dataForm.latAndlng"
          :disabled="true"
          placeholder="请输入详细地址信息"
        />
        <span class="alert">温馨提示：拖拽标点选择经纬度</span>
        <div class="map-wrap">
          <div id="container" class="amap-class" />
        </div>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="安全报检编号" prop="securityCode">
            <el-input v-model.trim="dataForm.securityCode" placeholder="安全报检编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="质量报检编号" prop="qualityNumber">
            <el-input v-model.trim="dataForm.qualityNumber" placeholder="质量报检编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设计单位" prop="designOrganization">
            <el-input v-model.trim="dataForm.designOrganization" placeholder="设计单位" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="勘察单位" prop="explorationUnit">
            <el-input v-model.trim="dataForm.explorationUnit" placeholder="勘察单位" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="dataForm.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate, getProjectsType, getProjectsState, detail } from '@/api/project/project'
import MapLoader from '@/utils/AMap.js'
import { getTree } from '@/api/sys/area'
export default {
  data() {
    return {
      isShowInfo: false,
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      visible: false,
      types: [],
      stateTypes: [],
      dataForm: {
        id: null,
        projectName: '',
        shortName: '',
        projectType: '',
        projectState: '',
        startingTime: '',
        projectRegion: '',
        finishTime: '',
        builderLicense: '',
        acreage: '',
        projectCost: '',
        projectPrincipal: '',
        phone: '',
        projectAddress: '',
        latAndlng: '',
        longitude: '',
        latitude: '',
        securityCode: '',
        qualityNumber: '',
        designOrganization: '',
        explorationUnit: '',
        remark: ''
      },
      dataRule: {
        projectName: [
          { required: true, message: '项目名称不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        latAndlng: [
          { required: true, message: '拖拽标点选择经纬度', trigger: ['blur', 'change'] }
        ],
        shortName: [
          { required: true, message: '项目简称不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
        ],
        projectType: [
          { required: true, message: '请选择项目类型', trigger: ['blur', 'change'] }
        ],
        projectState: [
          { required: true, message: '请选择项目状态', trigger: ['blur', 'change'] }
        ],
        startingTime: [
          { required: true, message: '开工时间不能为空', trigger: ['blur', 'change'] }
        ],
        finishTime: [
          { required: true, message: '合同竣工时间不能为空', trigger: 'change' }
        ],
        builderLicense: [
          { required: true, message: '施工许可证不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] },
          { pattern: /^[0-9A-Za-z/-]{1,}$/, message: '施工许可证由数字,字母，横杠线组成', trigger: ['blur', 'change'] }
        ],
        acreage: [
          { required: true, message: '建筑面积不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] }
        ],
        projectCost: [
          { required: true, message: '工程造价不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,80}$)[\S\s]*/, message: '字符长度不能超过80', trigger: ['blur', 'change'] },
          { pattern: /(^[0-9]{1,8}$)|(^[0-9]{1,8}[\.]{1}[0-9]{1,6}$)/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        projectPrincipal: [
          { required: true, message: '负责人不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,16}$)[\S\s]*/, message: '字符长度不能超过16', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3456789]\d{9}$/, message: '联系电话格式不正确', trigger: ['blur', 'change'] }
        ],
        projectRegion: [
          { required: true, message: '项目位置不能为空', trigger: ['blur', 'change'] }
        ],
        projectAddress: [
          { required: true, message: '详细地址不能为空', trigger: ['blur', 'change'] },
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        securityCode: [
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        qualityNumber: [
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        designOrganization: [
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        explorationUnit: [
          { pattern: /^(?=[\S\s]{1,160}$)[\S\s]*/, message: '字符长度不能超过160', trigger: ['blur', 'change'] }
        ],
        remark: [
          { pattern: /^(?=[\S\s]{1,800}$)[\S\s]*/, message: '字符长度不能超过800', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(id) {
      this.dataForm.id = id || null
      this.visible = true
      this.isShowInfo = false
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
        this.getCompanyTypeHandle()
        this.getProjectsStateHandle()
        if (id) {
          await this.getProDetail(id)
        } else {
          this.isShowInfo = true
        }

        MapLoader().then(
          AMap => {
            this.map = new AMap.Map('container', {
              center: this.dataForm.latitude ? [this.dataForm.longitude, this.dataForm.latitude] : [114.02597366, 22.54605355],
              zoom: 12
            })
            this.geocoder = new AMap.Geocoder({
            })
            this.marker = new AMap.Marker({
              title: this.dataForm.projectName,
              draggable: true,
              cursor: 'move',
              //  offset: new AMap.Pixel(-8, -10),
              // 设置拖拽效果
              // raiseOnDrag: true,
              position: this.dataForm.latitude ? [this.dataForm.longitude, this.dataForm.latitude] : [114.02597366, 22.54605355]
            })
            this.map.add(this.marker)
            AMap.event.addListener(this.marker, 'dragend', (e) => {
              this.$set(this.dataForm, 'latAndlng', `${e.lnglat.lat},${e.lnglat.lng}`)
              this.dataForm.longitude = e.lnglat.lng
              this.dataForm.latitude = e.lnglat.lat
              this.marker.setPosition(new AMap.LngLat(e.lnglat.lng, e.lnglat.lat))
            })
            // 为地图注册click事件获取鼠标点击出的经纬度坐标
            this.map.on('click', (e) => {
              this.$set(this.dataForm, 'latAndlng', `${e.lnglat.lat},${e.lnglat.lng}`)
              this.dataForm.longitude = e.lnglat.lng
              this.dataForm.latitude = e.lnglat.lat
              this.marker.setPosition(new AMap.LngLat(e.lnglat.lng, e.lnglat.lat))
            })
            // this.map.setCity('北京市')
          },
          e => {
            // console.log('地图加载失败', e)
          }
        )
      })
    },
    searchHandle() {
      var addresses = this.dataForm.projectAddress
      this.geocoder.getLocation(addresses, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          const location = result.geocodes[0].location
          this.dataForm.longitude = location.lng
          this.dataForm.latitude = location.lat
          this.marker.setPosition([location.lng, location.lat])
          this.map.setFitView(this.marker)
        }
      })
    },
    // 获取项目详情
    getProDetail(id) {
      return new Promise((resolve, reject) => {
        detail({ id }).then((data) => {
          this.isShowInfo = true
          if (data && data.code === 1000) {
            this.dataForm = data.result
            this.$set(this.dataForm, 'latAndlng', `${data.result.latitude},${data.result.longitude}`)
            this.$set(this.dataForm, 'projectRegion', this.dataForm.projectRegion.split(','))
          } else {
            this.$message.error(data.message)
          }
          resolve(this.dataForm)
        })
      })
    },
    getCompanyTypeHandle() {
      getProjectsType().then(data => {
        if (data && data.code === 1000) {
          this.types = data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
    getProjectsStateHandle() {
      getProjectsState().then(data => {
        if (data && data.code === 1000) {
          this.stateTypes = data.result
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
      this.dataForm.projectRegion = value
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.projectRegion = this.dataForm.projectRegion.toString()
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
  .pro-list-modal {
    width: 950px;
    .map-wrap {
      width: 100%;
      margin-bottom: 20px;
      margin-top: 10px;
      height: 300px;
      .amap-class {
        width: 100%;
        height: 300px;
      }
    }
    .btn-sty {
      height: 50px;
      width: 112px;
    }
    .alert {
      background: #fdf6ec;
      padding: 3px;
      color: #e6a23c;
    }
  }
</style>
