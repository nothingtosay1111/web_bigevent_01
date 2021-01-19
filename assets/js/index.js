$(function() { // 入口函数
    // 获取用户信息,并渲染用户名和头像
    getUserInfo();

    // 退出功能
    var layer = layui.layer;
    $("#btnLogout").on('click', function() {
        // 提示是否确认退出窗口  layui 内置方法confirm()  方法中有一个内置函数,进行调用,需要实现的功能写在内置的函数当中
        layer.confirm('是否确认退出?', { icom: 3, title: '提示' }, function(index) {
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转回登录注册页面
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index)
        })
    })
})

// 封装一个getUserInfo()方法  必须是全局函数,后面其他页面会用到
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 调用renderAvatar()渲染用户头像
            renderAvatar(res.data)
        },

    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户头像 进行判断 图片头像还是文本头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        // 渲染文字头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}