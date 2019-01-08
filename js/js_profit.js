function displayData() {
    var id = $.cookie("cno");
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


function drawing(ty) {
    id = $.cookie("cno");
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
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/profitDetail",
        data: {
            "Param": {
                "company_no": id,
                "date": year
            }
        },
        dataType: "json",
        success: function (data) {
            var myChart = echarts.init(document.getElementById("box"));
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
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(1, 0, 0, 0.7)'
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
                    type: 'value',
                    show: false,
                    splitLine: {
                        onZero: false,
                    },
                    axisLabel: {},
                }],
                series: [{
                    name: che,
                    type: 'line',
                    symbolSize: 6,
                    smooth: true,
                    color: ['#66AEDE'],
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
            myChart.setOption(option);
        }
    });
}