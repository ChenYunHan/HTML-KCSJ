// 获取所有的企业信息
var la = $("#u1")
$.ajax({
    url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/getunits",
    type: "POST",
    dataType: 'json',
    success: function (data) {
        if (data.errorCode == "1200") {
            var bh = data.result[0].DWZD_BH;
            var mc = data.result[0].DWZD_MC;
            if ($.session.get("cno") == null) {
                $.session.set("cno", bh);
            }
            la.html("");
            la.append('<option value="' + bh + '">' + mc + '</option>')
            for (let i = 1; i < data.result.length; i++) {
                bh = data.result[i].DWZD_BH;
                mc = data.result[i].DWZD_MC;
                la.append('<option value="' + bh + '">' + mc + '</option>');
            }
            $("#u1").val($.session.get("cno"));
            aj1($.session.get("cno"));
        }
    },
});

//设置页面的详细数据
function aj1(data) {
    $.ajax({
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/financialOverview",
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
                $("#dd1").append('<p><span class="sp1">' + month + '月利润</span>' + pf.monthlyProfit + '</p>')
                $("#dd1").append('<p><span class="sp1">本年利润</span>' + pf.yearlyProfit + '</p>')
                //纳税
                pf = rs.tax;
                $.session.set("year2", pf.date_quarter.substr(0, 4));
                month = pf.date_quarter.substr(5);
                $("#dd2").html("");
                $("#dd2").append('<p><span class="sp1">' + month + '季度纳税</span>' + pf.quarterlyTax + '</p>')
                $("#dd2").append('<p><span class="sp1">本年纳税</span>' + pf.yearlyTax + '</p>')
                //账款
                pf = rs.receivable;
                $.session.set("year3", pf.period);
                month = pf.period.substr(4, 5);
                if (month.substr(0, 1) === "0") {
                    month = month.substr(1);
                }
                $("#dd3").html("");
                $("#dd3").append('<p><span class="sp1">' + month + '月余额</span>' + pf.receivable + '</p>')
            }
        },
    });
}

$("#u1").change(function (e) {
    var id = $("#u1").val();
    $.session.set("cno", id);
    aj1(id);
});