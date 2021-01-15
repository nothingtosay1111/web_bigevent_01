$(function() {
    // 点击 去注册账号 时 登录盒子隐藏  注册盒子显示
    $("#link_reg").on('click', function() {
            $('.loginBox').hide()
            $('.regBox').show()
        })
        // 点击 去登录 时 登录盒子显示  注册盒子隐藏
    $("#link_login").on('click', function() {
        $('.loginBox').show()
        $('.regBox').hide()
    });

    // 自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6-16位,且不能输入空格'
        ],
        // 确认密码
        repwd: function(value) {
            var pwd = $("regBox input[name=username]").val().trim();
            if (value !== pwd) {
                return "两次密码输入不一致";
            }
        }
    });

    // 注册功能
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".regBox [name=username]").val(),
                password: $(".regBox [name=password]").val(),
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录');
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        })
    });

    // 登录功能
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜您,登录成功");
                localStorage.setItem("token", res.token);
                location.href = '/index.html'
            }
        })


    })
})