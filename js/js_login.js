var boolean1 = false;
var boolean2 = false;

function isName() {
    var tel = $("#name").val();
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (!reg.test(tel)) {
        $("#dd1").fadeIn();
        $("#name").css("background-color", "rgb(243,221,221)");
        boolean1 = false;
        $("#fd1 .img2").show();
        $("#fd1 .img1").hide();
    } else {
        $("#fd1 .img1").show();
        $("#fd1 .img2").hide();
        boolean1 = true;
    }
}
$("#name").on("blur", isName)
$("#name").focus(function () {
    $("#dd1").fadeOut();
    $("#fd1 .img2").hide();
    $("#name").css("background-color", "white");
})

function pwd() {
    var pwd = $("#pwd").val();
    var reg = /^[\w_-]{6,16}$/;
    if (!reg.test(pwd)) {
        $("#dd2").fadeIn();
        $("#pwd").css("background-color", "rgb(243,221,221)");
        boolean2 = false;
        $("#fd2 .img2").show();
        $("#fd2 .img1").hide();
    } else {
        $("#fd2 .img1").show();
        $("#fd2 .img2").hide();
        boolean2 = true;
    }
}
$("#pwd").on("blur", pwd);
$("#pwd").focus(function () {
    $("#dd2").fadeOut();
    $("#fd2 .img2").hide();
    $("#pwd").css("background-color", "white");
})
$("#d2_b1").click(function () {
    isName();
    pwd();
    if (boolean1 && boolean2) {
        var name = $("#name").val();
        $.ajax({
            url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/loginByPwd",
            type: "POST",
            dataType: 'json',
            success: function (data) {
                if (data.errorCode == "1200") {
                    $.session.set("name", name);
                    $("#dd5").fadeIn();
                    window.setTimeout("javascript:window.location.href='./mine.html'", 1500);
                } else {
                    alert("出现未知错误,请求失败请稍后重试。");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("出现未知错误。\r\n" + XMLHttpRequest.status + "：" + textStatus)
            }
        });
    } else {
        $("#dd3").fadeIn();
        $("#dd3").delay(1000).fadeOut();
    }
});