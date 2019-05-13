import echarts from 'echarts'

export function gaugeCharts(charts) {
  var echart = echarts.init(document.getElementById(charts.id))
  echart.setOption({
    backgroundColor: '#1b1b1b',
    tooltip: {
      formatter: '{a} <br/> {b} :{c}'
    },
    series: [
      {
        name: charts.title,
        type: 'gauge',
        center: ['50%', '50%'], // 默认全局居中
        radius: '80%', // 占比,大小
        min: 0, // 最小值
        max: charts.max, // 最大值
        splitNumber: 10, // 分割段数，默认为5
        axisLine: {// 坐标轴线
          lineStyle: {// 属性lineStyle控制线条样式
            color: [[0.2, '	#00FF00'], [0.8, '#FFA500'], [1, '#FF0000']],
            width: 2,
            shadowColor: '#fff', // 默认透明
            shadowBlur: 35
          }
        },
        axisTick: {// 坐标轴小标记
          splitNumber: 7, // 坐标轴小标记
          length: 18, //  属性length控制线长
          lineStyle: { // 属性lineStyle控制线条样式
            color: 'auto',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 35
          }
        },
        axisLabel: {// 坐标轴文本标签
          textStyle: {// 其余属性默认使用全局文本样式
            color: 'auto',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 35
          }
        },
        splitLine: {// 分隔线
          length: 30, // 属性length控制线长
          lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
            width: 2,
            color: 'auto',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 35
          }
        },
        pointer: {
          width: 4
        },
        title: {
          show: true,
          offsetCenter: [0, '-40'], // x, y，单位px
          textStyle: {
            color: '#FFA500',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 35
          }
        },
        detail: {
          formatter: '{value}' + charts.type,
          textStyle: {
            color: 'auto',
            fontWeight: 'bolder'
          }
        },
        data: [{ value: charts.value, name: charts.title }]
      }
    ]
  })
}

