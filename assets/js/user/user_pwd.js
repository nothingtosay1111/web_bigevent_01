$(function() {
    // 自定义校准规则
    var form = layui.form;
    form.verify({
        // 1.密码
        pwd: [
            /^[\S]{6,12}$/, "密码必须是6-12位,且不能出现空格"
        ],
        //2.新旧密码不重复
        samePwd: (function(value) {
            // value 是新密码 旧密码需要获取
            if (value === $("[name=oldPwd]").val()) {
                return "原密码和旧密码不能一致"
            }
        }),
        // 3.两次新密码必须一致
        rePwd: function(value) {
            // value 是再次输入的新密码,新密码需要获取
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码输入不一致"
            }
        }
    })

    // 表单提交
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功');
                $(".layui-form")[0].reset()
            }
        })
    })

})