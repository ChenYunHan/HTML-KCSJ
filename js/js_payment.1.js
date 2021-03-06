var myChart1;

function setOption1(pad, to, to_r, str, col, url, da) {
    var option = {
        backgroundColor: 'white',
        title: {
            text: '纳税情况',
            top: '4%',
            left: '10%',
            textStyle: {
                fontSize: 14,
                fontWeight: '',
                color: '#333'
            },
        }, //标题
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
            orient: 'horizontal',
            y: 'bottom',
            x: 'center',
            padding: pad,
        }, //图例属性
        graphic: [{
            type: 'text',
            left: "center",
            top: '33%',
            style: {
                text: '纳税总额\n' + to + '\n\n\n' + '综合税负\n' + to_r + '%', //使用“+”可以使每行文字居中
                textAlign: 'center',
                font: '15px Arial',
                fill: 'rgb(100,100, 100)',
            }
        }, {
            type: 'text',
            left: 'center',
            bottom: '26%',
            style: {
                text: str, //使用“+”可以使每行文字居中
                textAlign: 'center',
                font: '11px Arial',
                fill: col,
            }
        }, {
            type: 'image',
            left: '3%',
            top: '3%',
            style: {
                image: "./img/u105.png",
                textAlign: "center",
                width: 30,
            }
        }, {
            type: 'image',
            left: '58%',
            top: '45%',
            style: {
                image: "./img/" + url + ".png",
                textAlign: "center",
                width: 30,
            }
        }], //此例饼状图为圆环中心文字显示属性，这是一个原生图形元素组件，功能很多
        series: [{
                name: '税负统计', //tooltip提示框中显示内容
                type: 'pie', //图形类型，如饼状图，柱状图等
                radius: ['46%', '60%'], //饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                //roseType:'area',是否显示成南丁格尔图，默认false
                center: ["50%", "40%"],
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        }
                    }, //基本样式
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)', //鼠标放在区域边框颜色
                        textColor: '#000'
                    } //鼠标放在各个区域的样式
                },
                data: da, //数据，数据中其他属性，查阅文档
                color: ['#10BEC6', '#FFB703', '#5FA0FA', "#ff6400", "#dda0dd", "#602dd6", "#ceda65", "#e60f65", "#df0fe6", "#0fe6c0", "#0fe669", "#ce3a3a"], //各个区域颜色
            }, //数组中一个{}元素，一个图，以此可以做出环形图
        ], //系列列表
    }
    myChart1.hideLoading();
    myChart1.setOption(option);
}

function noData() {
    $("#box").html("暂无数据");
    $("#box").addClass("center-vertical");
}

function drawing() {
    if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
        myChart1.dispose();
    }
    myChart1 = echarts.init(document.getElementById('box'));
    myChart1.showLoading();
    id = $.session.get("cno");
    year = $("#year").text();
    year = year.substr(0, year.length - 1);
    var pad = 0;
    $.ajax({
        type: "post",
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/yearlyTaxOverview",
        data: {
            "Param": {
                "company_no": id,
                "date": year
            }
        },
        dataType: "json",
        success: function (data) {
            if (data.errorCode == "1200") {
                var da = [];
                var res = data.result;
                var to = res.totaltax;
                var to_r = res.totaltax_rate;
                var jj = {
                    "thevattax": "增值税",
                    "incometax": "所得税",
                    "educationtax": "教育附加税",
                    "educationaddtax": "地方教育附加税",
                    "resourcetax": "资源税",
                    "landaddtax": "土地增值税",
                    "citytax": "城市维护建设税",
                    "hometax": "房产税",
                    "uselandtax": "土地使用税",
                    "carusetax": "车船使用税",
                    "stamptax": "印花税",
                    "othertax": "其他税"
                };
                var len = 0;
                for (let s in jj) {
                    var value = res[s];
                    if (value != 0) {
                        var name = jj[s];
                        var name_r = s + "_rate";
                        var value1 = res[name_r];
                        var json = {
                            "name": name,
                            "value": value,
                            "value1": value1
                        };
                        da.push(json);
                    }
                }
                var url = 'u108'
                var str = "处于综合税负率标准范围\n" + "(4-8%)";
                var col = "black";
                if (to_r < 4) {
                    url = 'u107'
                    str = "低于综合税负率标准范围\n" + "(4-8%)"
                    col = "red"
                } else if (to_r > 8) {
                    url = 'u106'
                    str = "高于综合税负率标准范围\n" + "(4-8%)"
                    col = "red"
                }
                if (5 <= len && len <= 7) {
                    pad = 30;
                } else if (8 <= len && len <= 10) {
                    pad = 10;
                }
                if (to != 0)
                    setOption1(pad, to, to_r, str, col, url, da)
                else {
                    noData();
                };
                // var year = res.date_year;
                // var tht = res.thevattax;
                // var tht_a = res.thevattax_rate;
                // var inc = res.incometax;
                // var inc_r = res.incometax_rate;
                // var edu = res.educationtax;
                // var edu_r = res.educationtax_rate;
                // var eduAdd = res.educationaddtax;
                // var eduAdd_r = res.educationaddtax_rate;
                // var rest = res.resourcetax;
                // var rest_r = res.resourcetax_rate;
                // var lan = res.landaddtax;
                // var lan_r = res.landaddtax_rate;
                // var ct = res.citytax;
                // var ct_r = res.citytax_rate;
                // var ht = res.hometax;
                // var ht_r = res.hometax_rate;
                // var ut = res.uselandtax;
                // var ut_r = res.uselandtax_rate;
                // var cart = res.carusetax;
                // var cart_r = res.carusetax_rate;
                // var st = res.stamptax;
                // var st_r = res.stamptax_rate;
                // var ot = res.othertax;
                // var ot_r = res.othertax_rate;
            } else {
                alert("出现未知错误,请求失败请稍后重试。");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
        }
    });
}

function showList() {
    var fr = $("#u1");
    var fr1 = $("#u2");
    id = $.session.get("cno");
    year = $("#year").text();
    year = year.substr(0, year.length - 1);
    var quarterUrl = "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/quarterlyTaxDetail";
    var monthlyUrl = "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/monthlyTaxDetail";
    quarterAndMonthly(quarterUrl, id, year, fr, "季度"); //不同的fr代表了不同的div
    quarterAndMonthly(monthlyUrl, id, year, fr1, "月份");
}

function quarterAndMonthly(url, id, year, fr, quarOrMon) {
    $.ajax({
        type: "post",
        url: url,
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
                fr.html("");
                for (let i = 0; i < res.length; i++) {
                    if (quarOrMon == "月份") {
                        var month = res[i].date_month.substr(4);
                        var directionId = "u2"
                    } else {
                        var month = res[i].date_quarter.substr(5);
                        var directionId = "u1"
                    }
                    if (month.substr(0, 1) === "0") {
                        month = month.substr(1);
                    }
                    var to = res[i].totaltax;
                    var to_r = res[i].totaltax_rate;
                    var da = []; //存放有多少税
                    var jj = {
                        "thevattax": "增值税",
                        "incometax": "所得税",
                        "educationtax": "教育附加税",
                        "educationaddtax": "地方教育附加税",
                        "resourcetax": "资源税",
                        "landaddtax": "土地增值税",
                        "citytax": "城市维护建设税",
                        "hometax": "房产税",
                        "uselandtax": "土地使用税",
                        "carusetax": "车船使用税",
                        "stamptax": "印花税",
                        "othertax": "其他税"
                    }
                    for (let s in jj) {
                        var value = res[i][s];
                        if (value != 0) {
                            var name = jj[s];
                            var name_r = s + "_rate";
                            var value1 = res[i][name_r];
                            var json = {
                                "name": name,
                                "value": value,
                                "value1": value1
                            };
                            da.push(json);
                        }
                    }
                    var url = "u108";
                    if (to_r < 4)
                        url = "u107"
                    else if (to_r > 8)
                        url = "u106"
                    if (to != 0) {
                        var dataInter = {
                            "month": month,
                            "quarOrMon": quarOrMon,
                            "to": to,
                            "to_r": to_r,
                            "url": url,
                            "directionId": directionId,
                            "i": i,
                        };
                        var interText = doT.template($("#listTmplHead").text());
                        $("#" + directionId).append(interText(dataInter));
                        for (let j = 0; j < da.length; j++) {
                            $("#" + directionId + "_" + i + "_1").append('<p>' + da[j].name + '</p>');
                            $("#" + directionId + "_" + i + "_2").append('<p class="p2">' + da[j].value + '</p>');
                            $("#" + directionId + "_" + i + "_3").append('<p class="p2">' + da[j].value1 + '</p>');
                        }
                    }
                }
            } else {
                alert("出现未知错误,请求失败请稍后重试。");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
        }
    });
}