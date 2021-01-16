! function($) {
    const $form1 = $('.form1');
    const $span = $('.form1 p span');
    const $email = $('[name=email]');
    const $tel = $('[name=tel]');
    const $password = $('[name=password]');
    let $emailflag = false;
    let $telflag = false;
    let $passflag = false;
    $tel.on('focus', function() {
        $span.eq(0).html('请输入11位手机号码').css({
            display: 'block',
            color: '#999'
        })
    })
    $tel.on('blur', function() {
        if ($tel.val() !== '') {
            let $telreg = /^1[3|5|7|8]\d{9}$/;
            console.log($telreg.test($tel.val()))
            if ($telreg.test($tel.val())) {
                $span.eq(0).html("√").css('color', 'green');
                $telflag = true;
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.160.31/fengqu/php/reg.php',
                    dataType: 'json',
                    data: {
                        tel: $tel.val(),
                    }
                }).done(function(data) {
                    if (!data) {
                        $span.eq(0).html("√").css('color', 'green');
                    } else {
                        $span.eq(0).html("此手机号已注册").css('color', 'green');
                    }
                })
            } else {
                $span.eq(0).html("你输入的手机号码格式有误").css('color', 'red');
                $telflag = false;
            }
        } else {
            $span.eq(0).html("手机号码不能为空").css('color', 'red');
            $telflag = false;
        }
    })
    $email.on('focus', function() {
        $span.eq(1).html('请输入邮箱地址').css({
            display: 'block',
            color: '#999'
        })
    })
    $email.on('blur', function() {
        if ($email.val() !== '') {
            let $emreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.[c][o][m]$/
            if ($emreg.test($email.val())) {
                $span.eq(1).html('√').css('color', 'green');
                $emailflag = true;
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.160.31/fengqu/php/reg.php',
                    dataType: 'json',
                    data: {
                        email: $email.val(),
                    }
                }).done(function(data) {
                    if (!data) {
                        $span.eq(1).html("√").css('color', 'green');
                    } else {
                        $span.eq(2).html("此邮箱已注册").css('color', 'green');
                    }
                })
            } else {
                $span.eq(1).html('你输入的邮箱格式有误').css('color', 'red');
                $emailflag = false;
            }
        } else {
            $span.eq(1).html('邮箱不能为空').css('color', 'red');
            $emailflag = false;
        }
    })

    $password.on('focus', function() {
        $span.eq(2).html("请输入密码").css({
            display: 'block',
            color: '#999'
        })
    })
    $password.on('input', function() {
        if ($password.val().length >= 6 && $password.val().length <= 20) {
            let $pasreg1 = /\d+/;
            let $pasreg2 = /[A-Z]/;
            let $pasreg3 = /[a-z]/;
            let $pasreg4 = /[\W_]/;
            let num = 0;
            if ($pasreg1.test($password.val())) {
                num++
            }
            if ($pasreg2.test($password.val())) {
                num++
            }
            if ($pasreg3.test($password.val())) {
                num++
            }
            if ($pasreg4.test($password.val())) {
                num++
            }

            switch (num) {
                case 1:
                    $span.eq(2).html('弱').css('color', 'red');
                    break;
                case 2:
                    ;
                case 3:
                    $span.eq(2).html('中').css('color', 'orange');
                    $passflag = true;
                    break;
                case 4:
                    $span.eq(2).html('强').css('color', 'green');
                    $passflag = true;
                    break;
            }
        }
    })
    $password.on('blur', function() {
        if ($password.val() !== '') {
            if ($passflag) {
                $span.eq(2).html("√").css('color', 'green');
            }
        } else {
            $span.eq(2).html("密码不能为空").css('color', 'red');
        }
    })



    $form1.on('submit', function() {
        if ($tel.val() === '') {
            $span.eq(0).html("手机号码不能为空").css('color', 'red');
        }
        if ($email.val() === '') {
            $span.eq(1).html("邮箱不能为空").css('color', 'red');
        }
        if ($password.val() === '') {
            $span.eq(2).html("密码不能为空").css('color', 'red');
        }
        if (!($telflag && $emailflag && $passflag)) {
            return false;
        }
    })
}(jQuery)