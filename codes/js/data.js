

formPortData: function (data) {
    var xAxisData = []
    var seriesData = []
    var nameData = []

    xAxisData = data.date
    nameData = data.count.map(function (item) {
        return item.portName
    })
    seriesData = data.count.map(function (item) {
        return {
            name: item.portName,
            data: item.portCount,
            type: 'line'
        }
    })
    self.initData(xAxisData, seriesData)
},
initData (xAxisData, seriesData) {
    var chartDom = document.getElementById('main');
    var chart = echarts.init(chartDom);
    var option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: seriesData
    }
}







