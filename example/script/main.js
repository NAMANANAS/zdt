/**
 * Created by harx on 2015/9/14.
 */
$.ajax({
    method: "get",
    url: "/test/a.json",
    data: {
        a: 1
    },
    dataType: 'json',
    //success: function (res) {
    //    $('#ajax').html(res)
    //},
    //error: function (err) {
    //    $('#ajax').html(res)
    //},
}).done(function (res) {
    $('#ajax').html(res.title).next().html(res.type)
})