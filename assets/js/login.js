$(function () {
  // 点击登录
  $('#go2Reg').on('click', function () {
    // console.log(123);
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })

  // 点击注册
  $('#go2Login').on('click', function () {
    $('.login-wrap').show()
    $('.reg-wrap').hide()
  })
})