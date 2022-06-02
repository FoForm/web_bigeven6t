// 获取用户基本信息
function getUser(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem("token"),
        // },
        success:res=>{
            // console.log(res);
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！");
            render(res.data)
        }
    })
}
// 渲染用户头像
const render=(user)=>{
    // console.log(user);
    // 获取用户名字
    let uname=user.nickname||user.username;
    // 设置欢迎文本
    $('#welcome').html(`欢迎 ${uname}`)
    // 按需渲染用户头像
    if(user.user_pic!==null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase())
    }
}
$('.layui-tui').click(function(){
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "提示" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";

        }
    );
})
function change(){
    $('#change').attr('class','layui-this').next().attr('class','')
}



getUser()