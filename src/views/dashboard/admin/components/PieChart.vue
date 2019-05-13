<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import {
  getDashboardData
} from '@/api/dashboard'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created() {
  },
  mounted() {
    console.info(this.teams)
    console.info(this.data)
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      getDashboardData().then(response => {
        console.info(response)
        const data = []
        const teams = []
        if (response.data.code === 0) {
          const result = response.data.data.distributionPlugIn
          for (let i = 0; i < result.length; ++i) {
            data.push({ name: result[i].projectName, value: result[i].projectPrivate })
            teams.push(result[i].projectName)
          }
        }
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: teams
          },
          calculable: true,
          series: [
            {
              name: '应用数占比',
              type: 'pie',
              roseType: 'area',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: data,
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      })
    }
  }
}
</script>
