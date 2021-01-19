$(function() {
    var layer = layui.layer;
    // 1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度为1-6位之间"
            }
        }
    })

    // 2.获取和渲染用户信息
    initUserInfo();
    // 封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                // 调用form.val()赋值 渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.表单重置   给表单绑reset事件  给按钮绑click事件
    $("#btnReset").on('click', function(e) {
        // 阻止重置
        e.preventDefault();

        // 从新用户渲染
        initUserInfo();
    })

    // 4.监听表单提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault(); //阻止

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg("更新用户信息成功");
                // 调用父页面的方法,重新渲染用户的头像和信息
                window.parent.getUserInfo();
            }
        })
    })
})