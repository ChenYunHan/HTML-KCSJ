function getJsonUrl(name) {
    var url;
    $.ajax({
        type: "post",
        url: "./ajax-url.json",
        dataType: "json",
        async: false,
        success: function (data) {
            url = data.url[name];
        }
    });
    return url;
}