! function($) {
    const $min_pic = $('.min_pic img');
    const $max_box = $('.max_box')
    const $max_pic = $('.max_box .max_img');
    const $fd_pic = $(' .fd_img');
    const $sx_box = $('.sx_box')
    const $title = $('h1');
    const $prise = $('.newprice');
    const $num = $('.num_regulation input');
    const $add = $('.increase');
    const $minus = $('.decrease');
    const $btn = $('.btn');
    $add.on('click', function() {
        let $product_num = $num.val();
        $product_num = parseFloat($product_num);
        $product_num++;
        $product_num = $product_num + '';
        $num.val($product_num);
    })
    $minus.on('click', function() {
        let $product_num1 = $num.val();
        $product_num1 = parseFloat($product_num1);
        if ($product_num1 > 1) {
            $product_num1--;
        } else {
            $product_num1 = 1;
        }
        $product_num1 = $product_num1 + '';
        $num.val($product_num1);
    })

    $num.on("input", function() {
        let $inputnum = $num.val();
        if ($inputnum >= 99) {
            $num.val(99);
        }
        if ($inputnum <= 1) {
            $num.val(1);
        }
        $inputnum = parseFloat($inputnum);
        if (typeof $inputnum !== Number) {
            console.log(typeof $inputnum);
            console.log($inputnum);
            if (isNaN($inputnum)) {
                console.log(1)
                $num.val(1);
            } else {
                console.log(2)
                $num.val($inputnum);
            }

        }

    })


    let $sid = location.search.substring(1).split("=")[1];
    if (!$sid) {
        $sid = '1';
    }
    console.log($sid);
    $.ajax({
        url: "http://10.31.160.31/fengqu/php/detail.php",
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function(data) {
        $min_pic.attr('src', data.url);
        $title.html(data.title);
        $prise.html(data.price);
        $max_pic.attr('src', data.url);
        $fd_pic.attr('src', data.url);
    })

    let arrsid = [];
    let arrnum = [];

    function judge() {
        if ($.cookie("cookiesid") && $.cookie("cookienum")) {
            arrsid = $.cookie('cookiesid').split(",");
            arrnum = $.cookie("cookienum").split(",");
        }
    }
    $btn.on('click', function() {
        judge();
        if ($.inArray($sid, arrsid) == -1) {
            console.log($sid);
            console.log('不存在')
            arrsid.push($sid);
            console.log(arrsid);
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' })
            arrnum.push($num.val());
            console.log(arrnum);
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' })
        } else {
            console.log('存在')
            let $index = $.inArray($sid, arrsid);
            arrnum[$index] = parseFloat(arrnum[$index]) + parseFloat($num.val());
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' })
        }

    })






    //放大镜效果
    $sx_box.width($max_pic.width() * $max_box.width() / $fd_pic.width());
    $sx_box.height($max_pic.height() * $max_box.height() / $fd_pic.height());
    let $multiple = $fd_pic.width() / $max_pic.width();
    $max_box.hover(function() {
        $fd_pic.css('visibility', 'visible');
        $max_pic.css('visibility', 'hidden')
        $sx_box.css('visibility', 'visible');
        $(this).on('mousemove', function(ev) {
            let $leftvalue = ev.pageX - $('.commod_detail_left').offset().left - $sx_box.width() / 2;
            let $topvalue = ev.pageY - $('.commod_detail_left').offset().top - $sx_box.height() / 2;
            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $max_pic.width() - $sx_box.width()) {
                $leftvalue = $max_pic.width() - $sx_box.width()
            }

            if ($topvalue < 0) {
                $topvalue = 0;
            } else if ($topvalue >= $max_pic.height() - $sx_box.height()) {
                $topvalue = $max_pic.height() - $sx_box.height()
            }

            $sx_box.css({
                left: $leftvalue,
                top: $topvalue
            });

            $fd_pic.css({
                left: -$leftvalue * $multiple,
                top: -$topvalue * $multiple
            });
        })
    }, function() {
        $fd_pic.css('visibility', 'hidden');
        $max_pic.css('visibility', 'visible')
        $sx_box.css('visibility', 'hidden');
    })

}(jQuery)