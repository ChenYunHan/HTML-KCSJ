var cno = $.session.get("cno");
$.ajax({
    type: "post",
    url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/financialOverview",
    data: {
        "Param": {
            "company_no": cno,
        }
    },
    dataType: "json",
    success: function (data) {
        if (data.errorCode == "1200") {
            pf = data.result.receivable;
            year = pf.period.substr(0, 4);
            month = pf.period.substr(4, 5);
            if (month.substr(0, 1) === "0") {
                month = month.substr(1);
            }
            $("#d2>div:nth-child(2)>p:first-child").text("");
            $("#d2>div:nth-child(2)>p:nth-child(2)").text("");
            $("#d2>div:nth-child(2)>p:first-child").text(year + "年" + month + "月期末余额");
            $("#d2>div:nth-child(2)>p:nth-child(2)").text(pf.receivable);
        } else {
            alert("出现未知错误,请求失败请稍后重试。");
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
    }
});

function down(x, y) {
    return y.jy - x.jy
}

var uu = $("#u1");
var year = $.session.get("year3");
$.ajax({
    type: "post",
    url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/api/OpenAPIService/getReceivables",
    data: {
        "Param": {
            "company_no": cno,
            "date": year
        }
    },
    dataType: "json",
    success: function (data) {
        if (data.errorCode == "1200") {
            var res = data.result;
            uu.html("");
            var str = '<li><div class="col-xs-12 i4_1"><p class=" col-xs-12 pp1">应收明细（共<span id="sp2">' + res.length + '</span>笔）</p></div></li>'
            uu.append(str);
            var json = [];
            for (let i = 0; i < res.length; i++) {
                var dw = res[i].dwmc;
                var jy = res[i].jyje;
                if (jy !== 0) {
                    json.push({
                        dw,
                        jy
                    });
                }
            }
            json.sort(down);
            for (let i = 0; i < json.length; i++) {
                str = '<div><div class="col-xs-12 i4_1"><p class="col-xs-9 pp1">' + json[i].dw + '</p><p class="col-xs-3 pp1">' + json[i].jy + '</p></div></li>';
                uu.append(str);
            }
        } else {
            alert("出现未知错误,请求失败请稍后重试。");
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
    }
});