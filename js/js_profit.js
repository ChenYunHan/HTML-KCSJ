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

function displayList() {
    var id = $.cookie("cno");
    var year = $("#year").text();
    var year = year.substr(0, year.length - 1);
    var ll = $("#u1").html("");
    $.ajax({
        type: "POST",
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/profitDetail",
        data: {
            "Param": {
                "company_no": id,
                "date": year,
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
                    ll.append('<li><div class="col-xs-12 i4_1"><div class="col-xs-2"><p class="p1">' + month + '</p><p class="p2">' + year + '</p></div><div class="col-xs-7"><p class="p3">收￥' + income + '</p><p class="p4">支￥' + cost + '</p></div><div class="col-xs-3"><p class="p2">利润</p><p class="p3">￥' + profit + '</p></div></div></li>')
                }
            }
        }
    })
}

function switch1() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的id
        var id = $(e.target).attr("id");
        var str = '<div id="box" style="width: 100%;height:400px"></div>';
        $("#income").html("");
        $("#cost").html("");
        $("#profit").html("");
        if (id == "li1") {
            $("#income").html(str)
        } else if (id == "li2") {
            $("#cost").html(str)
        } else if (id == "li3") {
            $("#profit").html(str)
        }
        drawing(id);
    })
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
            if (data.errorCode == "1200") {
                var myChart = echarts.init(document.getElementById("box"));
                myChart.hideLoading();
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
                            show: false
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
        }
    });
}