// 每次调用$.get()  $.post()  $.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中 可以拿到我们给ajax提供的配置对象
var baseUrl = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function(options) {
    // console.log((options.url));
    // 在发起真正的ajax请求之前,同意拼接请求的根路径
    options.url = baseUrl + options.url;
    // console.log(options.url);
    // 统一给有权限的接口 设置headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 拦截所有响应,判断身份认证信息
    options.complete = function(res) {
        console.log(res);
        var obj = res.responseJSON;
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html'
        }
    }

})