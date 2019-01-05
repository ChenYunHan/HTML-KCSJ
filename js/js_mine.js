var url = $.cookie('name');
if (url != null && url.toString().length > 0) {
    $("#dd").html("<a href='./info.html'><div class='center-block new'>" + url +
        "</div><div class='right-arrow new-right ''></div></a>");
    $('#dd').append("")
}