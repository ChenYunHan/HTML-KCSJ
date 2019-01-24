$.ajax({
    url: getJsonUrl("getunits"),
    type: "POST",
    dataType: 'json',
    success: function (data) {
        if (data.errorCode == "1200") {
            var cpy = $("#uu1");
            var sum = $("#s1");
            cpy.html("");
            sum.html(data.result.length)
            for (let i = 0; i < data.result.length; i++) {
                var dwdz_mc = data.result[i].DWZD_MC;
                var unit_mc = data.result[i].UNIT_MC;
                var qylx = data.result[i].QYLX;
                var fwqx = data.result[i].FWQX;
                if (qylx == '小规模') {
                    qylx = 'u101';
                } else {
                    qylx = 'u102';
                }
                cpy.append('<li><div class="media col-xs-12 i4_1"><div class="media-left"><img src="./img/u10.png" class="media-object" alt="企业" style="height: 17px"></div><div class="media-body" style="width: 100%;"><p class="p1">' + dwdz_mc + '</p><p style="color:rgba(0, 0, 0, 0.5);margin-bottom: 5px;">' + unit_mc + '</p><p style="color:rgba(0, 0, 0, 0.5)">' + fwqx + '</p></div><div class="media-right"><img class="img1" src="./img/' + qylx + '.png" alt="小规模"></div></div></li><li><div class="col-xs-12" style="height: 9px"></div></li>');
            }
            $(".img1").css("width", screen.availWidth * 0.14492);
        } else {
            alert("出现未知错误,请求失败请稍后重试。");
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
    }
});