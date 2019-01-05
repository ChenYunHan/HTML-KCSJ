$("#d2_b1").click(function () {
    var name = $("#name").val();
    $.cookie('name', name, {
        expires: 1,
    })
    alert($.cookie('name'));
    window.location.href = "./mine.html"
    // $.ajax({
    //     url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/loginByPwd",
    //     type: "POST",
    //     dataType: 'json',
    //     success: function (data) {
    //         errorCode = data.errorCode;
    //         errorString = data.errorString;
    //     },
    //     error: function (er) {
    //         // alert("11");
    //         BackErr(er);
    //     }
    // });
    // alert(errorCode + " " + errorString);
    // if (errorCode == "1200")
    //     window.location.href = "../mine.html?name" + $("#name").val();
});