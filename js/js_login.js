$("#d2_b1").click(function () {
    var name = $("#name").val();

    $.ajax({
        url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/loginByPwd",
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.errorCode == "1200") {
                $.cookie('name', name, {
                    expires: 1,
                })
                window.location.href = "./mine.html";
            }
        },
        error: function (er) {
            BackErr(er);
        }
    });
});