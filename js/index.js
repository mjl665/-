/*
分析
1.获取li的index()
2.更换背景图片
3.更换播放器图片、文件
4.更换播放按钮为暂停
5.图片旋转
6.播放歌曲

其他
1.暂停/播放
2.上一首/下一首
3.播放器可以显示与隐藏
*/

//准备工作
var index = 0; //li初始索引
var li = $(".banner ul li"); //获取所有li元素
var img = $(".music .m_img img"); //获取播放器img元素
var text = $(".music .m_text"); //获取播放器m_text元素
var prev = $(".music .m_btn .m_prev"); //获取播放器上一首a元素按钮
var play = $(".music .m_btn .m_play"); //获取播放器播放/暂停a元素按钮
var next = $(".music .m_btn .m_next"); //获取播放器下一首a元素按钮
var mp3 = $(".music .m_mp3"); //媒体元素
var flag = false; //歌曲是否播放的标记true播放 false暂停
var close = true; //播放器是否显示true显示false隐藏

/* 
获取点击的li索引
*/
li.click(function() {
    console.log($(this).index());
    //获取当前点击的li索引
    index = $(this).index();
    //播放歌曲
    show();

})

/* 
封装一个函数 方便上一首 下一首调用
*/
function show() {
    //更换背景图片 +1是因为索引从0开始 图片名称是从1开始的
    change_bg(index + 1);
    //更换播放器图片、文本
    change_img_text(index + 1);
    //更换播放器按钮及title为暂停
    change_btn_title();
    /*  图片旋转*/
    img_rotate();
    //播放歌曲
    play_mp3();
}

/* 
更换背景
*/
function change_bg(idx) {
    $("body").css({
        "background": "url(img/" + idx + "bj.jpg) no-repeat",
        "background-size": "cover"
    })
}

/* 
更换播放器图片、文本
*/
function change_img_text(idx) {
    img.attr("src", "img/" + idx + ".jpg"); //更换播放器图片
    text.html(li.eq(index).attr("title")); //获取li的title属性然后替换文本
}

/* 
更换播放器的按钮
*/
function change_btn_title() {
    play.attr("title", "暂停");
    play.text("暂停")
}
/*  图片旋转*/

function img_rotate() {
    // 移除所有img的图片旋转样式
    li.children().removeClass("img_rotate");
    //给当前点击的li添加图片旋转样式
    li.eq(index).children().addClass("img_rotate");
}
/* 
播放歌曲
*/

function play_mp3() {

    //获取选中的li的datasrc属性
    mp3.attr("src", li.eq(index).attr("datasrc"));
    //播放歌曲
    mp3.get(0).play();
    //修改歌曲是否播放的标记true播放false暂停
    flag = true;
}
/* 
暂停或者播放
*/
play.click(function() {
    /* 
    如果歌曲播放
    1.暂停歌曲
    2.图片旋转
    3.暂停按钮更改为播放
    4.title更换为播放
    */
    if (flag) {
        //暂停歌曲
        mp3.get(0).pause();
        //移除图片旋转
        li.eq(index).children().removeClass("img_rotate");
        /* 暂停改为播放 */
        play.attr("title", "播放");
        play.text("播放")
        flag = false; //修改歌曲是否播放的标记 true播放 false暂停
    } else {
        /* 
        如果歌曲暂停
        1.播放歌曲
        2.图片旋转
        3.播放按钮更改为暂停
        4.title更改为暂停
        */
        mp3.get(0).play();
        li.eq(index).children().addClass("img_rotate");
        play.attr("title", "暂停");
        play.text("暂停");
        flag = true;
        //第一次进入页面直接点击播放页面的背景处理
        change_bg(index + 1);
    }
})

/* 
上一首
*/
prev.click(function() {
    index--;
    if (index < 0) {
        index = li.length - 1;
    }

    show();

});
/* 
下一首
*/
next.click(function() {
    index++;
    if (li.length - 1 < index) {
        index = 0;
    }
    show();
    console.log($(this).index());
});

/* 
播放器显示和隐藏
*/
$(".m_close").click(function() {
    //如果显示则隐藏 添加样式
    if (close) {
        $(this).text(">").addClass(".m_close");
        //添加向左移动样式1秒完成
        $(".music").animate({ "left": "-550px" }, 1000);
        close = false; //播放器是否显示true显示false隐藏

    } else {
        //如果隐藏则显示
        $(this).text("<")
            //恢复默认值
        $(".music").animate({ "left": "0px" }, 1000);
        close = true;
    }
});