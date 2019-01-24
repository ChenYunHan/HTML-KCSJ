// 获取所有的企业信息
var la = $("#u1")
$.ajax({
    url: getJsonUrl("getunits"),
    type: "POST",
    dataType: 'json',
    success: function (data) {
        if (data.errorCode == "1200") {
            la.html("");
            var bh = data.result[0].DWZD_BH;
            if ($.session.get("cno") == null) {
                $.session.set("cno", bh);
            }
            for (let i = 0; i < data.result.length; i++) {
                bh = data.result[i].DWZD_BH;
                var mc = data.result[i].DWZD_MC;
                var str = '<li value="' + bh + '"><a>' + mc + '</a></li>'
                if ($.session.get("cno") == bh) {
                    $("#area").text(mc);
                }
                la.append(str);
            }
            $("#u1").val($.session.get("cno"));
            aj1($.session.get("cno"));
        } else {
            alert("出现未知错误,请求失败请稍后重试。");
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
    }
});

//设置页面的详细数据
function aj1(data) {
    $.ajax({
        url: getJsonUrl("financialOverview"),
        type: "POST",
        data: {
            "Param": {
                "company_no": data
            }
        },
        dataType: "json",
        success: function (data) {
            if (data.errorCode == "1200") {
                var rs = data.result;
                //利润
                var pf = rs.profit;
                $.session.set("year1", pf.period.substr(0, 4));
                var month = pf.period.substr(4, 5);
                if (month.substr(0, 1) === "0") {
                    month = month.substr(1);
                }
                $("#dd1").html("");
                $("#dd1").append('<div class="col-xs-5">' + month + '月利润</div><div class="col-xs-5">' + pf.monthlyProfit + '</div>')
                $("#dd1").append('<div class="col-xs-5">本年利润</div><div class="col-xs-5">' + pf.yearlyProfit + '</div>')
                //纳税
                pf = rs.tax;
                $.session.set("year2", pf.date_quarter.substr(0, 4));
                month = pf.date_quarter.substr(5);
                $("#dd2").html("");
                $("#dd2").append('<div class="col-xs-5">' + month + '季度纳税</div><div class="col-xs-5">' + pf.quarterlyTax + '</div>')
                $("#dd2").append('<div class="col-xs-5">本年纳税</div><div class="col-xs-5">' + pf.yearlyTax + '</div>')
                //账款
                pf = rs.receivable;
                $.session.set("year3", pf.period);
                month = pf.period.substr(4, 5);
                if (month.substr(0, 1) === "0") {
                    month = month.substr(1);
                }
                $("#dd3").html("");
                $("#dd3").append('<div class="col-xs-5">' + month + '月余额</div><div class="col-xs-5">' + pf.receivable + '</div>')
            } else {
                alert("出现未知错误,请求失败请稍后重试。");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
        }
    });
}

$("#u1").on("click", "li", function () {
    var id = $(this).attr("value");
    $.session.set("cno", id);
    aj1(id);
    $("#area").text($(this).text());
    $(".retrie dt a").removeClass('up');
    $('.downlist').slideUp();
})