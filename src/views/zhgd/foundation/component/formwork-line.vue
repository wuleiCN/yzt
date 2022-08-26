<template>
  <div class="line-card">
    <div class="title-line">
      <div class="title-wrap">{{ title }}</div>
      <div class="select-wrap">
        <el-select v-model="value" :popper-append-to-body="false" class="select-class hd" @change="navClick('hdData')">
          <el-option
            v-for="(ele,idx) in hdData"
            :key="idx"
            :label="ele.name"
            :value="ele.value"
          />
        </el-select>
        <el-select v-model="cvalue" :popper-append-to-body="false" class="select-class cv" @change="navClick('cvalue')">
          <el-option
            v-for="(ele,idx) in hdData"
            :key="idx"
            :label="ele.name"
            :value="ele.value"
          />
        </el-select>
        <div class="time">
          <span :style="{color: out === 1 ? '#2AAEF2' : '#FFFFFF'}" @click="outFn(1)">实时</span>
          <span :style="{color: out === 2 ? '#2AAEF2' : '#FFFFFF'}" @click="outFn(2)">7天</span>
          <span :style="{color: out === 3 ? '#2AAEF2' : '#FFFFFF'}" @click="outFn(3)">30天</span>
        </div>
        <div class="unit">{{ '单位：' + unit }}</div>
      </div>
    </div>
    <div :id="id" :style="{ height: height, width: width }" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import resize from '@/utils/resize'
import { getMataierStockView } from '@/api/material/meterialDatav'
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartDom: null,
      myChart: null,
      height_: '',
      date_: [],
      inCount: [1, 3, 6, 2, 7, 9, 2],
      outCount: [0, 4, 7, 4, 8, 11, 4],
      option: {},
      days: [],
      value: '深层水平位移',
      cvalue: '计算值',
      hdData: [
        {
          name: 'x',
          value: 0
        },
        {
          name: 'y',
          value: 1
        }
      ],
      out: 1
    }
  },
  mounted() {
    this.chartDom = document.getElementById(this.id)
    this.myChart = echarts.init(this.chartDom)
    this.mataierStockView()
  },
  methods: {
    mataierStockView() {
      getMataierStockView().then(res => {
        if (res.code === 1000 && res.result) {
          res.result.length && res.result.map(v => {
            this.date_.unshift(v[0].date)
            // this.inCount.push(v[0].inCount + 5)
            // this.outCount.push(v[0].outCount + 3)
          })
        }
        this.initChart()
      }).catch(() => {
        this.initChart()
      })
    },
    outFn(v) {
      this.out = v
    },
    navClick(value) {
      if (value === 'hdData') this.value = '深层水平位移'
      else if (value === 'cvalue') this.cvalue = '计算值'
    },
    initChart() {
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          width: '95%',
          height: '70%',
          right: '2%',
          top: '10%'
        },
        xAxis: [
          {
            data: this.date_ || [],
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: ['#5f9ea0']
              },
              show: true
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#29B9C8'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '入库数量',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(26,189,213,0.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(26,189,213,0.1)'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#00EDFF'
            },
            lineStyle: {
              color: '#57EEFF',
              width: 2
            },
            data: this.inCount || []
          },
          {
            name: '入库数量',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(87,174,255,.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(87,174,255,.1)'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#00EDFF'
            },
            lineStyle: {
              color: '#57AEFF',
              width: 2
            },
            data: this.outCount || []
          }
        ]
      }
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss" scoped>
.line-card {
  border: 1px solid #e6ebf5;
  border-radius: 5px;
  margin-top: 20px;
  background: 	#021238;
  .title-line {
    color: #fff;
    display: flex;
    .title-wrap {
      flex: 2;
      margin-left: 30px;
      width: 44px;
      line-height: 44px;
    }
    .select-wrap {
      flex: 8;
      padding-top: 5px;
      .hd {
          width: 6.92rem;
          margin-left: 50%;
        }
        .cv {
          width: 5.38rem;
          margin-left: 10px;
        }
        .time {
          display: inline-block;
          width: 144px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border: #fff 1px solid;
          margin-left: 10px;
          span {
            cursor: pointer;
            &:nth-child(1) {
              padding-right: .19rem;
            }
            &:nth-child(2) {
              padding: 0 .38rem;
              border-right: #2AAEF2 2px solid;
              border-left: #2AAEF2 2px solid;
            }
            &:nth-child(3) {
              padding-left: .19rem;
            }
          }
        }
      .unit {
          display: inline-block;
          padding-left: .58rem;
        }
        ::v-deep .select-class {
          color: #2AAEF2;
          border: #fff 1px solid;
          .el-input__inner {
            color: #2AAEF2;
            // font-size: .7rem;
            text-align: center;
            border: none;
            padding: 0 .38rem 0 0;
            background: transparent;
          }
          .el-input__suffix {
            right: 0;
          }
          .el-select-dropdown {
            background: rgb(5, 34, 80) !important;
            border: 0;
            .el-select-dropdown__item {
              color: #fff;
              &.hover, &:hover {
                background-color: rgb(2, 14, 49) !important;
              }
            }
          }
          .el-input__suffix {
            .el-input__icon {
              color: #2AAEF2 !important;
            }
          }
        }
    }
  }
}
</style>
