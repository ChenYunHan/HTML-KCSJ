var boolean1 = false;
var boolean2 = false;
$("#name").blur(function () {
    var tel = $(this).val();
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (!reg.test(tel)) {
        $("#dd1").fadeIn();
        $("#name").css("background-color", "rgb(243,221,221)");
        boolean1 = false;
    } else {
        $("#frm1_1").css("border", "1px,solid,rgb(243,221,221)");
        boolean1 = true;
    }
})
$("#name").focus(function () {
    $("#dd1").fadeOut();
    $("#name").css("background-color", "white");
})
$("#pwd").blur(function () {
    var pwd = $(this).val();
    var reg = /^[\w_-]{6,16}$/;
    if (!reg.test(pwd)) {
        $("#dd2").fadeIn();
        $("#pwd").css("background-color", "rgb(243,221,221)");
        boolean2 = false;
    } else {
        boolean2 = true;
    }
})
$("#pwd").focus(function () {
    $("#dd2").fadeOut();
    $("#pwd").css("background-color", "white");
})
$("#d2_b1").click(function () {
    if (boolean1 && boolean2) {
        var name = $("#name").val();
        $.ajax({
            url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/loginByPwd",
            type: "POST",
            dataType: 'json',
            success: function (data) {
                if (data.errorCode == "1200") {
                    $.session.set("name", name);
                    window.location.href = "./mine.html";
                }
            },
        });
    } else {
        $("#dd3").fadeIn();
        $("#dd3").delay(1000).fadeOut();
    }
});

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}