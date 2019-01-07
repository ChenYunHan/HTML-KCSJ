// 获取所有的企业信息
var fr = $("#ul1");
var la = $("#u1")
$.ajax({
    url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/getunits",
    type: "POST",
    dataType: 'json',
    success: function (data) {
        if (data.errorCode == "1200") {
            var bh = data.result[0].DWZD_BH;
            var mc = data.result[0].DWZD_MC;
            alert(bh);
            fr.html(mc);
            la.html("");
            for (let i = 1; i < data.result.length; i++) {
                var bh = data.result[i].DWZD_BH;
                var mc = data.result[i].DWZD_MC;
                la.append('<li class="l2"><span>' + mc + '</span></li>');
            }
        }
    },
    error: function (er) {
        BackErr(er);
    }
});