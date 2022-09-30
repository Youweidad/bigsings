$(function(){
  getUserInfo()
})
const getUserInfo = () => {
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    headers:{
      Authorization:localStorage.getItem('big_news_token' || '')
    },
    success(res){
      if(res.code !==0) return layer.msg(res.message)
      // 按需渲染头像
      renderAvatar(res)
    }
  })
}
const renderAvatar = (res) => {
  if(res.user_pic) {
    $('.text-avatar').head()
    $('.user-box img').css('src',res.user_pic)
  }else{
    $('.layui-nav-img').hide()
    // 显示文字头像，取username属性的第一个字母
    const char = res.data.username.charAt(0).toUpperCase()
    $('.text-avatar').html(char)
  }
  $('.text').html(`欢迎&nbsp;$nbsp;${res.data.username}`)
}
// 问题：你在切换分支的时候:git checkout home
// 如果你切的分支名称