$(function () {

  const form = layui.form

  form.verify({
    nickname: function (value) {
      if (value.length > 9) {
        return '昵称必须是1-9位的非空字符串!'
      }
    }
  })


  // 获取用户信息
  const initInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.mas('请求用户信息失败')
        console.log(res);
        form.val('userForm', res.data)
      }
    })
  }
  initInfo()

  // 重置按钮添加点击事件
  $('#btnReset').on('click', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 重新刷新用户信息
    initInfo()
  })

  // 监听表单提价事件
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    // 吧表单数据打印出来(快速获取表单数据)
    // $(this).serialize() -> key=value&key=value
    // form.val('userForm') ->{key : value , key:value}
    // console.log(form.val('userForm'));
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('userForm'),
      success(res) {
        console.log(res);
        if (res.code !== 0) return layer.msg('更新用户信息失败')
        // 刷新整体页面
        window.parent.getUserInfo()
        layer.msg('更新用户信息成功')
      }
    })
  }


    //把表单数据打出来

  )
})