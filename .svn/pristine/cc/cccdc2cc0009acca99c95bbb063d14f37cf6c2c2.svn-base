<template>
  <el-dialog
    custom-class="crane-hxz-modal"
    title="绑定塔吊黑匣子"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="150px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="黑匣子编号：" prop="hxzId">
        <el-input v-model.trim="dataForm.hxzId" placeholder="黑匣子编号" />
      </el-form-item>
      <el-form-item label="经度：" prop="latitude">
        <el-input v-model.trim="dataForm.latitude" :disabled="true" placeholder="经度" />
      </el-form-item>
      <el-form-item label="纬度：" prop="longitude">
        <el-input v-model.trim="dataForm.longitude" :disabled="true" placeholder="纬度" />
      </el-form-item>
      <el-form-item label="地图定位" prop="latAndlng">
        <el-input
          v-show="false"
          v-model.trim="dataForm.latAndlng"
          :disabled="true"
        />
        <span class="alert">温馨提示：拖拽标点选择经纬度</span>
        <div class="map-wrap">
          <div id="container" class="amap-class" />
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="!!disabled" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, view1 } from '@/api-zhgd/zhgd-tower-crane'
import MapLoader from '@/utils/AMap.js'
export default {
  data() {
    return {
      visible: false,
      disabled: false,
      dataForm: {
        craneId: '',
        latAndlng: '',
        hxzId: '',
        latitude: '',
        longitude: '',
        id: ''
      },
      row: {},
      dataRule: {
        hxzId: [
          { required: true, message: '黑匣子编号不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z]{1,}$/, message: '由数字,字母组成', trigger: ['blur', 'change'] }
        ],
        latitude: [
          { required: true, message: '经度不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '纬度不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开弹窗
    init(row) {
      this.row = row
      this.dataForm.hxzId = row.hxzId
      this.visible = true
      this.$nextTick(() => {
        if (row.id) {
          view1({ craneId: row.id }).then(data => {
            if (data && data.code === 1000) {
              this.disabled = data.result && data.result.hxzId
              this.dataForm = data.result || { craneId: row.id }
            }
          })
        }
        this.$refs['dataForm'].resetFields()
        MapLoader().then(
          AMap => {
            this.map = new AMap.Map('container', {
              center: this.dataForm.latitude ? [this.dataForm.longitude, this.dataForm.latitude] : [114.02597366, 22.54605355],
              zoom: 12
            })
            var marker = new AMap.Marker({
              title: this.dataForm.projectName,
              draggable: true,
              cursor: 'move',
              //  offset: new AMap.Pixel(-8, -10),
              // 设置拖拽效果
              // raiseOnDrag: true,
              position: this.dataForm.latitude ? [this.dataForm.longitude, this.dataForm.latitude] : [114.02597366, 22.54605355]
            })
            this.map.add(marker)
            AMap.event.addListener(marker, 'dragend', (e) => {
              this.$set(this.dataForm, 'latAndlng', `${e.lnglat.lat},${e.lnglat.lng}`)
              this.dataForm.longitude = e.lnglat.lng
              this.dataForm.latitude = e.lnglat.lat
              marker.setPosition(new AMap.LngLat(e.lnglat.lng, e.lnglat.lat))
            })
            // 为地图注册click事件获取鼠标点击出的经纬度坐标
            this.map.on('click', (e) => {
              this.$set(this.dataForm, 'latAndlng', `${e.lnglat.lat},${e.lnglat.lng}`)
              this.dataForm.longitude = e.lnglat.lng
              this.dataForm.latitude = e.lnglat.lat
              marker.setPosition(new AMap.LngLat(e.lnglat.lng, e.lnglat.lat))
            })
          },
          e => {
            console.log('地图加载失败', e)
          }
        )
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          update({ ...this.dataForm }).then((data) => {
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
  .crane-hxz-modal {
    width: 900px;
    .line {
      text-align: center;
    }
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
    .alert {
      background: #fdf6ec;
      padding: 3px;
      color: #e6a23c;
    }
  }
</style>
