$(function () {
  const form = layui.form

  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位。并且不能有空格！'],
    samePwd: function (value) {
      if (value === $('[name=old_pwd]').val()) {
        return '新旧密码不能一样'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=new_pwd]').val()) {
        return '两次输入的密码不一致'
      }
    }
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      method: 'PATCH',
      url: '/my/updatepwd',
      data: form.val('pwdForm'),
      success(res) {
        if (res.code !== 0) return layer.msg('修改密码失败')

        layer.msg('修改密码成功')
        // 清空表单
        // $('#btnReset').click() //调用type = "reset" 按钮

        // 原生表单元素.reset()
        $('.layui-form')[0].reset()
      }
    })
  })
})