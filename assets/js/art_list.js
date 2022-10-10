$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage
  // 定义美化时间的过滤器
  template.defaults.imports.formTime = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  let qs = {
    pagenum: 1, //当前页码值(表示当前是第几页)
    pagesize: 2, //当前每页显示多少条
    cate_id: '', //当前选择的文章分类
    state: ''   //当前文章所处的状态，可选值：已发布，操作 都是字符串

  }
  loadArticlelist()
  loadCateList()
  // 加载分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类列表失败了')
        const html = template('tpl-cate', res)
        $('[name=cate_id]').html(html)
        form.render()  //render渲染的意思
      }
    })
  }
  // 加载文章列表函数

  function loadArticlelist() {
    $.ajax({
      method: 'GET',
      url: `/my/article/list?pagenum=${qs.pagenum}&pagesize=${qs.pagesize}&cate_id=${qs.cate_id}&state=${qs.state}`,
      success(res) {
        if (res.code !== 0) return layer.msg('获取文章列表失败')
        console.log(res);
        const str = template('tpl-list', res)
        $('tbody').empty().append(str)
        // 调用渲染分页的函数
        renderPager(res.total)
      }
    })
  }



  $('#choose-form').on('submit', function (e) {
    e.preventDefault()
    // 只需要处理一下参数，在直接调用获取列表的方法
    const cate_id = $('[name=cate_id]').val()
    qs.cate_id = cate_id

    const state = $('[name=state]').val()
    qs.state = state

    loadArticlelist()
  })

  // 渲染分页功能的函数
  function renderPager(total) {
    laypage.render({
      elem: document.getElementById('pagerWrapper'),
      count: total,
      limit: qs.pagesize,
      curr: qs.pagenum, //当前是第几页
      // layout就是布局的意思
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      jump(obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        // console.log(obj.curr, obj.limit)
        // console.log(first);
        qs.pagenum = obj.curr
        qs.pagesize = obj.limit

        // 应该是用户主动切换页码值的时候去加载列表
        if (typeof first === 'undefined') {
          loadArticlelist()
        }
      }
    })
  }


  // 通代理的形式  为删除按钮添加点击事件
  $('tbody').on('click', '.btnDelete', function () {
    const result = confirm('您确定要删除你的文章吗?')
    let len = $('.btnDelete').length
    if (result) {
      const id = $(this).attr('abc')
      $.ajax({
        method: 'DELETE',
        url: `/my/article/info?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除文章失败')

          layer.msg('删除文章成功')

          // 判断如果当前是最后一条数据的话 需要将pagenum-1
          // 获取删除按钮元素的个数
          if (len === 1) {
            qs.pagenum = qs.pagenum === 1 ? 1 : qs.pagenum - 1
          }
          loadArticlelist()
        }
      })
    }
  })
})



// https://www.apifox.cn/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/api-28607155