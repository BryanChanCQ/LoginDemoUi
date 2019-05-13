import echarts from 'echarts'

export function oneLineCharts(charts) {
  var echart = echarts.init(document.getElementById(charts.id))
  echart.setOption({
    title: {
      text: charts.title
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: charts.linex
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: charts.liney
      }
    ]
  })
}

