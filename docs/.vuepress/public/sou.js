/*
作者:D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
日期：2019-07-26
版权所有，请勿删除
❶❷❸❹❺❻❼❽❾❿
由 yeetime 修改
github：https://github.com/yeetime/sou2
日期：2019-12-13
*/

// 搜索引擎列表【预设】
var se_list_preinstall = {
    '1': {
        id: 1,
        title: "百度",
        url: "https://www.baidu.com/s",
        name: "wd",
        img: "./icon/baidu.ico",
    },
    '2': {
        id: 2,
        title: "谷歌",
        url: "https://www.google.com/search",
        name: "q",
        img: "./icon/google_1.png",
    },
    '3': {
        id: 3,
        title: "必应",
        url: "https://cn.bing.com/search",
        name: "q",
        img: "./icon/bing.ico",
    },
    '4': {
        id: 4,
        title: "多吉",
        url: "https://www.dogedoge.com/results",
        name: "q",
        img: "./icon/doge_ico.png",
    },
    '5': {
        id: 5,
        title: "秘迹",
        url: "https://mijisou.com",
        name: "q",
        img: "./icon/mijisou.png",
    },
    '6': {
        id: 6,
        title: "seeres*",
        url: "https://seeres.com/search",
        name: "q",
        img: "./icon/seeres.png",
    },
};

// 主页快捷方式【预设】
var quick_list_preinstall = {
    '1': {
        title: "哔哩哔哩",
        url: "https://www.bilibili.com/",
        img: "./icon/bilibili.png",
        explain: "哔哩哔哩 (゜-゜)つロ 干杯~",
    },
    '2': {
        title: "GitHub",
        url: "https://github.com/",
        img: "./icon/github.ico",
        explain: "GitHub",
    },
    '3': {
        title: "V2EX",
        url: "https://www.v2ex.com/",
        img: "./icon/v2ex.png",
        explain: "V2EX",
    },
    '4': {
        title: "Steam",
        url: "https://store.steampowered.com/",
        img: "./icon/steam.ico",
        explain: "Steam",
    },
    '5': {
        title: "scp基金会",
        url: "http://scp-wiki-cn.wikidot.com/",
        img: "./icon/scp.png",
        explain: "控制，收容，保护",
    },
};

// 主题方案【预设】
var themes_preinstall = {
    '1': {
        'name': 'light',// 主题名称
        'bg': "#f5f5f5",// 背景色
        'pop_bg': "#ffffff",// 弹窗背景色
        'shadow': "#d8d7d7",// 阴影
        'bottom_bg': "#ddd",// 按钮背景
        //'top_bg': "#2299ff",// 高亮
        'text_color': "#777777",// 文本颜色
        'bg_img': "",//背景图片
    },
    '2': {
        'name': 'darcula',
        'bg': "#2b2b2b",
        'pop_bg': "#3c3f41",
        'shadow': "#211f1f",
        'bottom_bg': "#4c5052",
        //'top_bg': "#365880",// 高亮
        'text_color': "#bbbbbb",
        'bg_img': "",//背景图片
    },
};





// 获取搜索引擎列表
function getSeList() {
    var se_list_local = Cookies.get('se_list');
    if (se_list_local !== "{}" && se_list_local) {
        return JSON.parse(se_list_local);
    } else {
        setSeList(se_list_preinstall);
        return se_list_preinstall;
    }
}

// 设置搜索引擎列表
function setSeList(se_list) {
    if (se_list) {
        Cookies.set('se_list', se_list, {expires: 36500});
        return true;
    }
    return false;
}

// 获得默认搜索引擎
function getSeDefault() {
    var se_default = Cookies.get('se_default');
    return se_default ? se_default : "1";
}







// 搜索框高亮
function focusWd() {
    var themes = getThemes();
    var key = getThemesDefault();
    var theme = themes[key];

    $(".wd").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 1px 6px 0 " + theme["shadow"],
    });//输入框
}

// 搜索框取消高亮
function blurWd() {
    $(".wd").css({
        "background-color": "",
        "box-shadow": "",
    });//输入框
}

// 关键字提示
function keywordReminder() {
    var keyword = $(".wd").val();
    if (keyword != "") {
        $.ajax({
            url: 'https://suggestion.baidu.com/su?wd=' + keyword,
            dataType: 'jsonp',
            jsonp: 'cb', //回调函数的参数名(键值)key
            success: function (data) {
                $("#keywords").empty().show();
                $.each(data.s, function (i, val) {
                    $('#keywords').append("<li class=\"keyword\" data-id=\"" + (i + 1) + "\">" + val + "</li>");
                });
                $("#keywords").attr("data-length", data.s["length"]);
            },
            error: function () {
                $("#keywords").empty().show();
                $("#keywords").hide();
            }
        })
    } else {
        $("#keywords").empty().show();
        $("#keywords").hide();
    }
}

// 搜索框数据加载
function searchData() {
    var se_default = getSeDefault();
    var se_list = getSeList();
    var defaultSe = se_list[se_default];
    if (defaultSe) {
        $(".search").attr("action", defaultSe["url"]);
        $(".se").attr("src", defaultSe["img"]);
        $(".wd").attr("name", defaultSe["name"]);
    }

    // 判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    } else {
        $(".wd").focus();
        focusWd();
    }
}

// 搜索引擎列表加载
function seList() {
    var html = "";
    var se_list = getSeList();
    for (var i in se_list) {
        html += "<li class='se-li' data-url='" + se_list[i]["url"] + "' data-name='" + se_list[i]["name"] + "' data-img='" + se_list[i]["img"] + "'><img src='" + se_list[i]["img"] + "'>" + se_list[i]["title"] + "</li>";
    }
    $(".search-engine-list").html(html);
}

// // 设置-搜索引擎列表加载
// function setSeInit() {
//     var se_default = getSeDefault();
//     var se_list = getSeList();
//     var html = "";
//     for (var i in se_list) {
//         var tr = "<tr><td></td>";
//         if (i === se_default) {
//             tr = "<tr><td><span class='iconfont iconhome'></span></td>";
//         }
//         tr += "<td>" + i + ". " + se_list[i]["title"] + "</td><td><button class='set_se_default' value='" + i + "'><span class='iconfont iconstrore-add'></span></button> <button class='edit_se' value='" + i + "'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='" + i + "'><span class='iconfont icondelete'></span></button></td></tr>";
//         html += tr;
//     }
//     $(".se_list_table").html(html);
// }
$(".search-engine-list").on("click", ".se-li", function () {
        console.log("sdfs")
        var url = $(this).attr('data-url');
        var name = $(this).attr('data-name');
        var img = $(this).attr('data-img');
        $(".search").attr("action", url);
        $(".wd").attr("name", name);
        $(".se").attr("src", img);
        $(".search-engine").hide();
    });


$(document).ready(function () {

    // 搜索框数据加载
    searchData();

    // 搜索引擎列表加载
    seList();




    // 点击事件
    $(document).on('click', function (e) {
        // 选择搜索引擎点击
        if ($(".search-engine").is(":hidden") && $(".se").is(e.target)) {
            if ($(".se").is(e.target)) {
                $(".search-engine").show();
            }
        } else {
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }

        // 自动提示隐藏
        if (!$(".sou").is(e.target) && $(".sou").has(e.target).length === 0) {
            $("#keywords").hide();
        }

    });

    // 搜索引擎列表点击
    $(".search-engine-list").on("click", ".se-li", function () {
        console.log("sdfs")
        var url = $(this).attr('data-url');
        var name = $(this).attr('data-name');
        var img = $(this).attr('data-img');
        $(".search").attr("action", url);
        $(".wd").attr("name", name);
        $(".se").attr("src", img);
        $(".search-engine").hide();
    });

    // 搜索框获得焦点事件
    $(".wd").focus(function () {
        focusWd();
        keywordReminder();
    });

    // 搜索框失去焦点事件
    $(".wd").blur(function () {
        blurWd();
    });

    // 自动提示( 调用百度 api ）
    $('.wd').keyup(function(event) {
        var key = event.keyCode;
        // 屏蔽上下键
        var shieldKey = [38, 40];
        if (shieldKey.includes(key)) return;
        keywordReminder();
    });

    // 点击自动提示的关键字
    $("#keywords").on("click", "li", function () {
        var wd = $(this).text();
        $(".wd").val(wd);
        $(".search").submit();
    });




  



    // 选择文件后读取文件内容

});
