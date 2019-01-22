var myChart;

function displayData() {
    var id = $.session.get("cno");
    var year = $("#year").text();
    var year = year.substr(0, year.length - 1);
    $.ajax({
        type: "post",
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/profitOverview",
        data: {
            "Param": {
                "company_no": id,
                "date": year
            }
        },
        dataType: "json",
        success: function (data) {
            if (data.errorCode == "1200") {
                var per = data.result.period; //年份
                var inc = data.result.income; //收入
                var cost = data.result.cost; //支出
                var pro = data.result.profit; //利润
                $("#sp1").html(inc);
                $("#sp2").html(cost);
                $("#sp3").html(pro);
            }
        }
    });
}

function displayList() {
    var id = $.session.get("cno");
    var year = $("#year").text();
    var year = year.substr(0, year.length - 1);
    var ll = $("#u1").html("");
    $.ajax({
        type: "POST",
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/profitDetail",
        data: {
            "Param": {
                "company_no": id,
                "date": year
            }
        },
        dataType: "json",
        success: function (data) {
            if (data.errorCode == "1200") {
                var res = data.result;
                for (let i = 0; i < res.length; i++) {
                    var year = res[i].date;
                    var month = year.substr(4);
                    year = year.substr(0, 4);
                    var income = res[i].income;
                    var cost = res[i].cost;
                    var profit = res[i].profit;
                    var color = "p3"
                    if (profit < 0)
                        color = "p4"
                    ll.append('<li><div class="col-xs-12 i4_1"><div class="col-xs-2"><p class="p1">' + month + '</p><p class="p2">' + year + '</p></div><div class="col-xs-7"><p class="p3">收￥' + income + '</p><p class="p4">支￥' + cost + '</p></div><div class="col-xs-3"><p class="p2">利润</p><p class="' + color + '">￥' + profit + '</p></div></div></li>')
                }
            }
        }
    })
}


function drawing(ty) {
    if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose();
    }
    myChart = echarts.init(document.getElementById("box"));
    myChart.showLoading();
    id = $.session.get("cno");
    year = $("#year").text();
    year = year.substr(0, year.length - 1);
    var che;
    var eng
    if (ty == "li1") {
        che = '收入';
        eng = 'income';
    } else if (ty == 'li2') {
        che = '成本';
        eng = 'cost';
    } else {
        che = '利润';
        eng = 'profit';
    }
    $.ajax({
        type: "POST",
        url: "https://www.easy-mock.com/mock/5c345ed47db0f179db2028af/api/OpenAPIService/profitDetail",
        data: {
            "Param": {
                "company_no": id,
                "date": year
            }
        },
        dataType: "json",
        success: function (data) {
            if (data.errorCode == "1200") {
                var option = {
                    backgroundColor: 'white',
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [che]
                    },
                    calculable: true,
                    xAxis: [{
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(88, 88, 88, 0.4)'
                            }
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: function () {
                            var list = [];
                            var res = data.result;
                            for (let i = 0; i < res.length; i++) {
                                var year = res[i].date;
                                var month = year.substr(4);
                                year = year.substr(0, 4);
                                if (month.substr(0, 1) === "0") {
                                    month = month.substr(1);
                                }
                                list.push(year + "年" + month + "月");
                            }
                            return list;
                        }(),
                    }],
                    yAxis: [{
                        show: false,
                    }],
                    series: [{
                        name: che,
                        type: 'line',
                        symbolSize: 6,
                        smooth: true,
                        color: ['#81befd'],
                        areaStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#81befd'
                                }, {
                                    offset: 0.5,
                                    color: '#e4f2ff'
                                }, {
                                    offset: 1,
                                    color: '#fff'
                                }]), //背景渐变色
                            },
                        }, //线条样式
                        markPoint: {

                            data: [{
                                    type: 'max',
                                    name: '最大值'
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                            ]
                        },
                        markLine: {
                            lineStyle: {
                                normal: {
                                    color: 'rgba(88, 88, 88, 0.4)'
                                }
                            },
                            data: [{
                                type: 'average',
                                name: '平均值'
                            }],
                            label: {
                                position: "middle",
                            },
                            symbol: false,
                        },
                        data: function () {
                            var list = [];
                            var res = data.result;
                            for (let i = 0; i < res.length; i++) {
                                if (eng == "income") {
                                    list.push(res[i].income);
                                } else if (eng == "cost")
                                    list.push(res[i].cost);
                                else
                                    list.push(res[i].profit);
                            }
                            return list;
                        }()
                    }],
                    itemStyle: {
                        normal: {
                            color: '#66AEDE',
                            borderColor: '#66AEDE',
                            lineStyle: {
                                width: 1,
                                type: 'solid',
                            }
                        }
                    }
                };
                myChart.hideLoading();
                myChart.setOption(option);
            }
        }
    });
}