$(function () {
    $('#homepage .jumbotron').animate({
        opacity : 1
    });
    // 代刷网下拉
    (function () {
        if(!localStorage.getItem('replaceBrushStyle')) {
            localStorage.setItem('replaceBrushStyle', 'none')
        }
        var key = localStorage.getItem('replaceBrushStyle'),
            imgEle = $('#homepage .replaceBrush h5 span img'),
            imgdown = './images/caret-down-square.svg',
            imgup = './images/caret-up-square.svg';
        $('#homepage .replaceBrush .replaceBrush-content').css('display', key)
        if(key == 'none') {
            $(imgEle).attr('src', imgdown)
        } else {
            $(imgEle).attr('src', imgup)
        }
        $('#homepage .replaceBrush h5').on('click', function () {
            $('#homepage .replaceBrush .replaceBrush-content').stop().slideToggle(300)
            if(key == 'none') {
                key = 'block';
                localStorage.setItem('replaceBrushStyle', 'block')
                $(imgEle).attr('src', imgup)
            } else {
                key = 'none';
                localStorage.setItem('replaceBrushStyle', 'none')
                $(imgEle).attr('src', imgdown)
            }
        })
    })();
    // 时间段提示内容获取
    $.ajax({
        url : 'https://v.api.aa1.cn/api/time-tx/index.php',
        type : 'get',
        dataType : 'json',
        success : function (res) {
            if(res.code !== 1) return $('.timeTip').html('接口可能失效啦~')
            $('.timeTip').html(res.msg)
        },
        error : function (err){
            $('timeTip').html('请检查网络')
        }
    });
    // 返回置顶显示隐藏功能 toupDateReturnTop
    (function () {
        $(window).on('scroll', function () {
            var htmlheight = $(window).height() / 2;
            if($('html').scrollTop() > htmlheight) {
                $('#returntop').show()
            }else {
                $('#returntop').hide()
            }
        })
        $('#returntop').on('click', function () {
            $('html').stop().animate({
                scrollTop : 0
            })
        })
    }());
    // 侧边栏
    (function () {
        function clear() {
            $('#homepage .cover').hide()
            $('body').css('overflow', 'visible')
            $('.sidebar').stop().animate({
                left : -280
            }, 300)
            $('.sidebarBn img').css('transform', 'rotate(0deg)')
        }
        $('.sidebar .navigaBar').on('click', function (e) {
            clear()
            $('html').animate({
                scrollTop : $('.jumbotron').eq($(e.target).index()).offset().top
            })
        })
        $('.sidebarBn').on('click', function () {
            $('.sidebarBn img').css('transform', 'rotate(90deg)')
            $('#homepage .cover').show()
            $('body').css('overflow', 'hidden')
            $('.sidebar').stop().animate({
                left : 0
            }, 300)
            $('#homepage .cover').on('click', function () {
                clear()
            })
        })
        function down() {
            $(this).css('background-color', '#ccc')
        }
        function up() {
            $(this).css('background-color', '#fff')
        }
        $('.sidebarBn').on({
            mousedown : down,
            mouseup : up,
            touchstart : down,
            touchend : up
        })
    })();
    // loadding效果
    var loadding = (function () {
        var rotateDeg = 0,
            timer = setInterval(function () {
                rotateDeg ++;
                $('#homepage .jumbotron p img').css('transform', 'rotate(' + rotateDeg + 'deg)')
            }, 0);
        return timer
    })();
    // 获得软件已运行时间 pastTime
    (function () {       
        var pasttimeevents = $('.sidebar .pasttime span'),
        // 设置发布时间
            old_time = new Date(2022, 0, 16),
            new_time,         
            day, 
            leave_day, 
            hour, 
            leave_hour, 
            minute,
            second;
        function caleTimeDiff() {
            // 获取最新时间
            new_time = new Date()         
            // 计算时间差(差多少秒)
            diff_time = (new_time - old_time) / 1000;       
            day = Math.floor(diff_time / (3600 * 24));
            leave_day = diff_time % (3600 * 24);
            hour = Math.floor(leave_day / (3600));
            leave_hour = leave_day % (3600);
            minute = Math.floor(leave_hour / 60);
            second = Math.floor(leave_hour % 60);        
            // 时间输出
            pasttimeevents.eq(0).html(day)
            pasttimeevents.eq(1).html(hour)
            pasttimeevents.eq(2).html(minute)
            pasttimeevents.eq(3).html(second)
        }
        caleTimeDiff()
        setInterval(caleTimeDiff, 999)
    }());
    // 底部按钮切换功能 footerBtnType
    (function () {
        $('footer button').each(function (i, e) {
            $(this).click(function () {
                   // 点击底部按钮返回滚动条置顶
                $('html').scrollTop(0)
                   // 页面隐藏显示切换
                $('#showregion > div').eq(i).stop().fadeIn(300).siblings().hide()
                // 文字效果切换
                $(e).find('.text span').css({
                    fontSize : '.6rem',
                    color : '#fedcba',
                    backgroundColor : 'cornflowerblue'
                })
                $(e).siblings().find('.text span').css({
                    fontSize : '.5rem',
                    color : '#fff',
                    backgroundColor : 'transparent'
                })
            })
        })
    }());
    // 功能链接数据加载
    $.ajax({
        url : 'https://lhshilin.github.io/jimu/allFunctionData.json',
        type : 'get',
        dataType : 'json',
        success : function (res) {
            $('#homepage .row p').css('height', 'auto').html('')
            var fnnum = 0,
                aElement = '<a class="col-4" target="_blank"></a>';
            // 数据载入
            // QQ专区数据输入及输入进全部功能里
            $(res.QQ).each(function (i, e) {
                $('#homepage .fn-qq p').append(aElement).children('a').eq(i).html(e.name).attr('href', e.url)
            })
            fnnum += res.QQ.length;
            //  信息查询专区数据输入及输入进全部功能里
            $(res.informationquery).each(function (i, e) {
                $('#homepage .fn-informationquery .row').append(aElement).children('a').eq(i).html(e.name).attr('href', e.url)
            })
            fnnum += res.informationquery.length;
            //  网站专区数据输入及输入进全部功能里
            $(res.website).each(function (i, e) {
                $('#homepage .fn-website .row').append(aElement).children('a').eq(i).html(e.name).attr('href', e.url)
            })
            fnnum += res.website.length;
            //  热搜榜专区数据输入及输入进全部功能里
            $(res.hotSearchList).each(function (i, e) {
                $('#homepage .fn-hotSearchList .row').append(aElement).children('a').eq(i).html(e.name).attr('href', e.url)
            })
            fnnum += res.hotSearchList.length;
            // 文案专区数据输入及输入进全部功能里
            $(res.copywriting).each(function (i, e) {
                $('#homepage .fn-copywriting .row').append(aElement).children('a').eq(i).html(e.name).attr('href', e.url)
            })
            fnnum += res.copywriting.length;
            // 其他功能专区数据输入及输入进全部功能里
            $(res.other).each(function (i, e) {
                $('#homepage .fn-other .row').append(aElement).children('a').eq(i).html(e.name).attr('href', e.url)
            })
            fnnum += res.other.length;
            // 输出一共的功能数量
            $('.fn-num span').html(fnnum).parent().show()
            mysteriouCode(res)
        },
        error : function (err) {
            clearInterval(loadding)
            $('#homepage .row p img').css('transform', 'rotate(0deg)').attr('src', './images/bug.svg')
            $('#logo').on('click', function () {
                location.reload()
            })
        }
    })
    // 更新日志数据输入
    $.get('https://lhshilin.github.io/jimu/log.json', function (res) {
        $(res).each(function (i, v) {
            $('#toupdate').append('<ul class="row"><li><span class="update-date">' + v.date + '</span><ul class="update-content"></ul></li></ul>')         
            $(v.data).each(function (index, value) {
                $('#toupdate > ul > li > ul').eq(i).append('<li></li>').children('li').eq(index).html(value)
            })          
        })
    });
    // 打赏二维码切换效果
    $('#reward button').eq(0).click(function () {
        $(this).addClass('btn-success').siblings('button').removeClass('btn-primary')
        $('#reward img').eq(0).stop().fadeIn(500).siblings('img').hide()
    });
    $('#reward button').eq(1).click(function () {
        $(this).addClass('btn-primary').siblings('button').removeClass('btn-success')
        $('#reward img').eq(1).stop().fadeIn(500).siblings('img').hide()
    });
    // 反馈功能 feedback
    (function () {
        var key = true;
        $('#feedback').on('click', function () {
            $('.feedbackBox').fadeIn(500)
            $('body > .cover').show()
            $('body').css('overflow', 'hidden')
            $('.feedbackBox input:eq(0)').focus()
        })
        $('.feedbackBox input:eq(1)').on('keydown', function (e) {
            if(e.keyCode == 13) send()
        })
        $('.feedbackBox button:eq(0)').on('click', function () {
            $('.feedbackBox').hide(500)
            $('body > .cover').hide()
            $('body').css('overflow', 'visible')
        })
        $('.feedbackBox button:eq(1)').on('click', send)
        function send() {
            if(key) {
                key = false;
                $.ajax({
                    url : 'https://api.yuxli.cn/api/mail/mail.php',
                    type : 'get',
                    dataType : 'text',
                    data : {
                        address : '1352058684@qq.com',
                        name : $('.feedbackBox input:eq(0)').val(),
                        certno : $('.feedbackBox input:eq(1)').val()
                    },
                    success : function (res) {
                        $('.feedbackBox .message').html(res)
                        $('.feedbackBox input').val('')
                        key = true;
                    },
                    error : function (err) {
                        $('.feedbackBox .message').html('反馈失败，可能发送反馈接口有问题，请在侧边栏点击联系作者')
                        key = true;
                    }
                })
            }
        }
    })();
    // 点击复制功能 copy
    (function () {       
        // QQ复制按钮
        var urlClipboardLeftBtn = new Clipboard('#homepage .replaceBrush .replaceBrush-content .urlClipboard .leftBtn'),
            urlClipboardRightBtn = new Clipboard('#homepage .replaceBrush .replaceBrush-content .urlClipboard .rightBtn'),
            authorQQcopybtn = new Clipboard('#authorQQcopybtn'),
            authorQQmailcopybtn = new Clipboard('#authorQQmailcopybtn'),
            authorQQCommunicationGroup = new Clipboard('#authorQQCommunicationGroup'),
            sourceCodeDownload = new Clipboard('#sourceCodeDownload'),
            androidDownload = new Clipboard('#androidDownload'),
            lanzouyunDownload = new Clipboard('#lanzouyunDownload');
        // 代刷网左复制按钮
        urlClipboardLeftBtn.on('success', function(e) {
            e.clearSelection();
            $('#homepage .replaceBrush .replaceBrush-content .urlClipboard .leftBtn').html('复制成功')
        })
        // 代刷网右复制按钮
        urlClipboardRightBtn.on('success', function(e) {
            e.clearSelection();
            $('#homepage .replaceBrush .replaceBrush-content .urlClipboard .rightBtn').html('复制成功')
        })
        // QQ号复制按钮
        authorQQcopybtn.on('success', function(e) {
            e.clearSelection();
            $('#authorQQcopybtn').html('复制成功')
        })
          // QQ邮箱复制按钮
        authorQQmailcopybtn.on('success', function(e) {
            e.clearSelection();
            $('#authorQQmailcopybtn').html('复制成功')
        })
        // QQ交流群号复制按钮
        authorQQCommunicationGroup.on('success', function(e) {
            e.clearSelection();
            $('#authorQQCommunicationGroup').html('复制成功')
        },)
        // 积木pc端下载链接点击复制
        sourceCodeDownload.on('success', function(e) {
            e.clearSelection();
            $('#sourceCodeDownload').html('复制成功')
        })
        // 积木安卓版下载链接点击复制
        androidDownload.on('success', function(e) {
            e.clearSelection();
            $('#androidDownload').html('复制成功')
        })
        // 蓝奏云备用下载链接点击复制
        lanzouyunDownload.on('success', function(e) {
            e.clearSelection();
            $('#lanzouyunDownload').html('复制成功')
        })
    }());
    // mysteriouCode
    function mysteriouCode(res) {
        function mysteriouCodeUrl() {
            $('.sidebar .navigaBar').append('<li style="color: #a0a;">秘密区</li>')
            $(res.mysteriouCode).each(function (i, e) {
                $('#homepage .fn-mysteriouCode .row').append('<a class="col-4" target="_blank"></a>').children('a').eq(i).html(e.name).attr('href', e.url)
            })
            // 输出一共的功能数量
            var funcNum = parseInt($('.fn-num span').html())
            $('.fn-num span').html(funcNum + res.mysteriouCode.length)
            $('.fn-mysteriouCode').show()
        }
        if(!localStorage.getItem('mysteriouCode')) {
            localStorage.setItem('mysteriouCode', 'false')
        }
        if(localStorage.getItem('mysteriouCode') === 'true') {
            mysteriouCodeUrl()
        } else {
            var count = 0,
                timer;
            function down() {
                timer = setInterval(function () {
                    count ++;
                    if(count == 3) {
                        count = 0;
                        clearInterval(timer)
                        $('.mysteriouCode').fadeIn(500)
                        $('body > .cover').show()
                        $('body').css('overflow', 'hidden')
                        $('.mysteriouCode input').focus()
                        $(window).on('keydown', function (e) {
                            if(e.keyCode === 13) {
                                $('.mysteriouCode .mysteriouCodeRight').click()
                                $(window).on('keydown', null)
                            }
                        })
                    }
                }, 1000)
                return timer
            }
            function clear() {
                $('.mysteriouCode').hide(500)
                $('body > .cover').hide()
                $('body').css('overflow', 'visible')
                $(window).on('keydown', null)
            }
            $('.mysteriouCode .mysteriouCodeLeft').on('click', function () {
                clear()
            })
            $('.mysteriouCode .mysteriouCodeRight').on('click', function () {
                if($('.mysteriouCode input').val() === '') {
                    return $('.mysteriouCode .mysteriouCodeTip .meg').html('密码不能为空')
                }
                $.get('https://v.api.aa1.cn/api/api-md5/go.php', {act : '加密', md5 : $('.mysteriouCode input').val()}, function (res) {
                    res = res.slice(6, 38)
                    if(res == '871925f4b0a5cd9e35cd0340edea0e82') {
                        $('.mysteriouCode .mysteriouCodeTip .meg').html('密码正确')
                        mysteriouCodeUrl()
                        localStorage.setItem('mysteriouCode', 'true')
                        clear()
                        $('html').animate({
                            'scrollTop' : $('html').prop('scrollHeight')
                        })
                    } else {
                        $('.mysteriouCode .mysteriouCodeTip .meg').html('密码错误')
                    }
                })
            })
            $('#logo').on({
                mousedown : function () {
                    down()
                    $('#logo').on('mouseup', function () {
                        count = 0;
                        clearInterval(timer)
                        return false;
                    }) 
                },
                touchstart : function () {
                    down()
                    $('#logo').on('touchend', function () {
                        count = 0;
                        clearInterval(timer)
                        return false;
                    }) 
                }
            })
        }
    };
    // 下雪特效执行
    $(document).ready( function() {
        $("canvas.xiaxue").let_it_snow();
    });
})
