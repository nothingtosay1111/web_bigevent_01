$(function() {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on('click', function() {
        $("#file").click()
    })

    // 修改裁剪区域 给文件选择框 绑定change事件
    $("#file").on('change', function(e) {
        // console.log(e);
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg("请选择照片")
        }
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 把文件转化为路径
        var imgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 修改头像
    // 给确定按钮 绑定点击事件
    $("#btnUpload").on('click', function() {
        // 获取base64格式字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 调用接口, 把头像上传到后台服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更换头像失败")
                }
                return layer.msg("更换头像成功")
                window.parent.getUserInfo();
            }
        })
    })
})