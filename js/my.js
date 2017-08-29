var myChart = echarts.init(document.getElementById('main'));
var data = [
    { name: '国际机场1', value: 5 },
    { name: '地名占位1', value: 4 },
    { name: '国际机场2', value: 3 },
    { name: '地名占位2', value: 2 },
    { name: '地名占位3', value: 1 },
];
var geoCoordMap = {
    '国际机场1': [120.858139, 27.918823],
    '地名占位1': [120.506004, 27.800338],
    '国际机场2': [120.658139, 27.518823],
    '地名占位2': [120.507004, 27.900338],
    '地名占位3': [121.006004, 27.800338],
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
    title: {
        text: '标题。',
        subtext: '副标题。',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    visualMap: {
        min: 0,
        max: 5,
        calculable: true,
        inRange: {
            color: ['#0f0', '#660', '#f00']
        },
        textStyle: {
            color: '#fff'
        },
        text: ['较差', '较好']
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        // data: ['pm2.5'],
        textStyle: {
            color: '#fff'
        },
    },
    backgroundColor: "rgba(255,255,255,0)",
    geo: {
        type:"map",
        map: 'china',
        show:true,
        label: {
            emphasis: {
                show: false
            }
        },
        center: [120.702542, 28.004152],
        boundingCoords: [
            // 定位左上角经纬度
            [120.251808, 28.389237],
            // 定位右下角经纬度
            [120.909511, 25.502892]
        ],
        zoom: 2,
        scaleLimit:{
            min: 1,
            max:10,
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: 'rgba(12,34,56,.8)',
                borderColor: 'rgb(8,135,195)',
                borderWidth: 1,
            },
            emphasis: {
                areaColor: 'rgba(255,34,56,.7)'
            }
        },
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: 'rgba(255,0,255,1)'
                }
            }
        },
    },
    series: [
        {
            name: null,//pm2.5
            type: 'scatter',//scatter
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            symbolSize:[20,20],
            symbol:"circle",
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
        }
    ]
};


myChart.setOption(option);