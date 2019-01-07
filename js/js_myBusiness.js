$.cookie('name');
$.ajax({
    url: "http://192.168.9.196:7300/mock/5c1c376e48ca380e48e47bae/getunits",
    type: "POST",
    dataType: 'json',
    success: function (data) {
        if (data.errorCode == "1200") {

        }
    },
    error: function (er) {
        BackErr(er);
    }
});