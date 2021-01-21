$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArtcateList();

    function initArtcateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                template('tpl-art-cate', res)
                $('tbody').html(template('tpl-art-cate', res))
            }
        })
    }

    $("#btnAdd").on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
        });

    })

    // 提交文章分类添加(事件委托)
    var indexAdd = null;
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg("恭喜您,文章类别添加成功");
                initArtcateList();
                layer.close(indexAdd);
            }
        })
    })

    // 通过代理给btn-edit绑定事件
    // 修改展示表单
    var indexEdit = null;
    $('tbody').on('click', ".btn-edit", function() {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章类别',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
        });
        // 获取id 发送请求 渲染到页面
        var id = $(this).attr("data-id");

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 修改提交
    $("body").on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtcateList();
                layer.msg("恭喜你,文章类别更新成功");
                layer.close(indexEdit)
            }
        })
    })

    // 删除
    $('tbody').on('click', ".btn-delete", function() {
        // 获取id
        var id = $(this).attr('data-id');
        // 弹出对话框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' },
            function(index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        initArtcateList();
                        layer.msg('恭喜你删除成功')
                        layer.close(index);
                    }
                })

            });
    })
})