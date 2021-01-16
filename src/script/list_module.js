! function($) {
    const $lists = $(".list ul");
    let $array_default = []; //排序前的li放入此数组。
    let $array = []; //排序后的数组
    let $prev = []; //li里面的商品的前一个价格
    let $next = []; //li里面的商品的后一个价格
    $.ajax({
        url: 'http://10.31.160.31/fengqu/php/listdata.php',
        dataType: 'json'
    }).done(function(datalist) {
        console.log(datalist);
        $data = datalist.pagedata;
        console.log($data);
        $strhtml = '';
        $.each($data, function(index, value) {
            $strhtml += `
            <a href="detail.html?sid=${value.sid}" class="pro_li">
                        <li>
                            <img class="lazy" data-original="${value.url}" alt="">
                            <h3>${value.title}</h3>
                            <p>
                                ￥<span class="price1">${value.newprice}</span>
                                <span class="priceb">￥<span class="price2">${value.price}</span></span>
                            </p>
                        </li>
                         <div class="shopping">加入购物车</div>
                    </a>
            `;
        })
        $lists.html($strhtml);
        //将li元素添加到排序前的数组中。
        $(function() { //页面加载完成
            $("img.lazy").lazyload({
                effect: "fadeIn" //显示方法：谈入
            });
        });
        $('.list .pro_li').each(function(index, element) { //element:原生的元素对象
            $array_default[index] = $(this); //排序前
            $array[index] = $(this); //排序后
        });
        进行分页设置
        $('.page').pagination({
            pageCount: datalist.pageno, //总的页数
            jump: true, //是否开启跳转到指定的页数，布尔值。
            prevContent: '上一页', //将图标改成上一页下一页。
            nextContent: '下一页',
            callback: function(api) {
                console.log(api.getCurrent()); //获取当前的点击的页码。
                $.ajax({
                    url: 'http://10.31.160.31/fengqu/php/listdata.php',
                    data: {
                        page: api.getCurrent()
                    },
                    dataType: 'json'
                }).done(function(datalist) {
                    data = datalist.pagedata; //获取接口里面数据
                    let $strhtml = '';
                    $.each(data, function(index, value) {
                        $strhtml += `
                            <a href="detail.html?sid=${value.sid}" class="pro_li">
                            <li>
                            <img class="lazy" data-original="${value.url}" alt="">
                                <h3>${value.title}</h3>
                                <p>
                                    ￥<span class="price1">${value.newprice}</span>
                                    <span class="priceb">￥<span class="price2">${value.price}</span></span>
                                </p>
                            </li>
                            <div class="shopping">加入购物车</div>
                        </a>
                                `;
                    });
                    $lists.html($strhtml);
                    //懒加载
                    $(function() { //页面加载完成
                        $("img.lazy").lazyload({
                            effect: "fadeIn" //显示方法：谈入
                        });
                    });
                    $array_default = [];
                    $array = [];
                    //将li元素添加到排序前的数组中。
                    $('.list .pro_li').each(function(index, element) { //element:原生的元素对象
                        $array_default[index] = $(this); //排序前
                        $array[index] = $(this); //排序后
                    });
                });
            }
        });
        //3.点击按钮进行排序
        $('.products_sort button').eq(0).on('click', function() {
            //遍历渲染。
            $.each($array_default, function(index, value) { //value就是li元素
                $lists.append(value);
            });
        });

        //升序
        $('.products_sort button').eq(1).on('click', function() {
            for (let i = 0; i < $array.length - 1; i++) {
                for (let j = 0; j < $array.length - i - 1; j++) {
                    $prev = parseFloat($array[j].find('.price1').html()); //上一个价格
                    console.log($prev);
                    $next = parseFloat($array[j + 1].find('.price1').html()); //下一个价格
                    if ($prev > $next) {
                        //通过价格的比较,交换的是里面的这个li元素
                        let temp = $array[j];
                        $array[j] = $array[j + 1];
                        $array[j + 1] = temp;
                    }
                }
            }
            //遍历渲染。
            $.each($array, function(index, value) { //value就是li元素
                $lists.append(value);
            });
        });
        //降序
        $('.products_sort button').eq(2).on('click', function() {
            for (let i = 0; i < $array.length - 1; i++) {
                for (let j = 0; j < $array.length - i - 1; j++) {
                    $prev = parseFloat($array[j].find('.price1').html()); //上一个价格
                    $next = parseFloat($array[j + 1].find('.price1').html()); //下一个价格
                    if ($prev < $next) {
                        //通过价格的比较,交换的是里面的这个li元素
                        let temp = $array[j];
                        $array[j] = $array[j + 1];
                        $array[j + 1] = temp;
                    }
                }
            }
            //遍历渲染。
            $.each($array, function(index, value) { //value就是li元素
                console.log($array);
                $lists.append(value);
            });
        });
    })
}(jQuery)