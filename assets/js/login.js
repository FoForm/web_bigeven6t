$(function(){
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(()=>{
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录让 注册框隐藏，登录框显示
    $('#link_login').click(()=>{
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从 LayUI 中获取 form 对象
    const form = layui.form
    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: (value) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $("#form_reg [name=password").val();
            console.log(pwd);
            if(pwd !== value) return "两次密码不一致"
        },
    })
    // const baseUrl='http://www.liulongbin.top:3007'
    const layer = layui.layer
    // 监听注册表单，发送注册请求
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username').val(),
                password:$('#form_reg [name=password').val()
            },
            success:function(res){
                // console.log(res);
                if(res.status!==0) return layer.msg(res.message);
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            }
        })
    })
    // 登录
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if(res.status!=0) return layer.msg('登录失败')
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})