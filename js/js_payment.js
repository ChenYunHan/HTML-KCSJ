function drawing() {
    var myChart1 = echarts.init(document.getElementById('box'));
    myChart1.showLoading();
    myChart1.setOption({
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
        }, //图例属性
        graphic: [{
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: '纳税总额\n' + '192.44\n\n\n' + '综合税负\n' + '9.03%', //使用“+”可以使每行文字居中
                    textAlign: 'center',
                    font: '15px Arial',
                    fill: '#000',
                }
            },
            {
                type: 'text',
                left: 'center',
                bottom: '19%',
                style: {
                    text: '超出综合税负率标准范围\n' + '(4-8%)', //使用“+”可以使每行文字居中
                    textAlign: 'center',
                    font: '11px Arial',
                    fill: 'red',
                }
            },
            {
                type: 'image',
                left: '3%',
                top: '3%',
                style: {
                    image: "./img/u105.png",
                    textAlign: "center",
                    width: 30,
                }
            }
        ], //此例饼状图为圆环中心文字显示属性，这是一个原生图形元素组件，功能很多
        series: [{
                name: '用户统计', //tooltip提示框中显示内容
                type: 'pie', //图形类型，如饼状图，柱状图等
                radius: ['46%', '60%'], //饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                //roseType:'area',是否显示成南丁格尔图，默认false
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
                data: [{
                        value: 170.67,
                        name: '增值税￥170.67'
                    },
                    {
                        value: 11.95,
                        name: '城建税￥11.95'
                    },
                    {
                        value: 5.12,
                        name: '教育费附加￥5.12'
                    },
                    {
                        value: 4.70,
                        name: '印花税￥5.12'
                    },
                ], //数据，数据中其他属性，查阅文档
                color: ['#10BEC6', '#FFB703', '#5FA0FA', "#ff6400", "#dda0dd", "#602dd6", "#ceda65", "#e60f65", "#df0fe6", "#0fe6c0", "#0fe669", "#ce3a3a"], //各个区域颜色
            }, //数组中一个{}元素，一个图，以此可以做出环形图
        ], //系列列表
    });
    id = $.cookie("cno");
    year = $("#year").text();
    year = year.substr(0, year.length - 1);
    $.ajax({
        type: "post",
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/yearlyTaxOverview",
        data: {
            "Param": {
                "company_no": "0000FX",
                "date": "2017"
            }
        },
        dataType: "json",
        success: function (data) {
            if (data.errorCode == "1200") {
                var da = [];
                var res = data.result;
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
                var len = 0;
                for (let item in res) {
                    len++;
                }
                for (let s in res) {
                    if (jj.hasOwnProperty(s)) {
                        var name = jj[s];
                        var value = res[s];
                        var json = {
                            "value": value,
                            "name": name + "￥" + value
                        };
                        if (value != 0)
                            da.push(json);
                    }
                }
                myChart1.hideLoading();
                myChart1.setOption({
                    series: [{
                        data: da,
                    }]
                });
                // alert(data);
                // var year = res.date_year;
                // var to = res.totaltax;
                // var to_r = res.totaltax_rate;
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
            }
        }
    });
}