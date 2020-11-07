<template>
  <div class="search" >
         <div class="sou">
            <form class="search" ref="search" action="https://www.baidu.com/s" target="_blank">
                <img class="se" ref="se" src="https://cdn.jsdelivr.net/gh/wjxm/search/icon/baidu.ico" title="点击切换搜索引擎">
                <input class="wd"  @keyup="show($event)" ref="wd" type="text" name="wd" placeholder="请输入搜索内容" autocomplete="off">
                <button class="s">
                    <i style="font-size: 20px;" class="iconfont icon-sousuo"></i>
                </button>

            </form>

            <div id="keywords" @click="keyshow($event)" style="display: none;"></div>
            <div class="search-engine" style="display: none;">
                <div class="search-engine-head">
                    <strong class="search-engine-tit">选择搜索引擎：</strong>
                </div>
                
       
            </div>
            <div class="quick-div">
                
                <ul class="search-engine-list" v-for= "(item, index) in se_list_preinstall " :key="index"  >
                    <li class="se-li" :data-url='item.url' :data-name='item.name' :data-img='item.img' @click="hold(item)">
                        <img :src='item.img'>{{item.title}}
                    </li>
                </ul>

            </div>
            </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {




  data () {
    return {
        se_list_preinstall : {
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
                title: "github",
                url: 'https://github.com/search',
                name: "q",
                img: "https://github.com/favicon.ico",
            },
            '4': {
                id: 4,
                title: "bilibili",
                url: "https://search.bilibili.com/all",
                name: "keyword",
                img: "https://search.bilibili.com/favicon.ico",
            },
            '5': {
                id: 5,
                title: "秘迹",
                url: "https://www.zhihu.com/search?type=content",
                name: "q",
                img: "https://www.zhihu.com/favicon.ico",
            },
            '6': {
                id: 6,
                title: "seeres*",
                url: "https://seeres.com/search",
                name: "q",
                img: "./icon/seeres.png",
            },
            },}
        },







  mounted () {
      
    this.gettheme()
          // 搜索框获得焦点事件
    $(".wd").focus(function () {
        focusWd();
        keywordReminder();
    });

    // 搜索框框失去焦事件
        $(".wd").blur(function () {
        blurWd();
    });
    $("#keywords").on("click", "li", function () {
    var wd = $(this).text();
    $(".wd").val(wd);
    $(".search").submit();
});
    // 自动提示键盘方向键选择操作
    $(".wd").keydown(function (event) {//上下键获取焦点
        var key = event.keyCode;
        if ($.trim($(this).val()).length === 0) return;

        var id = $(".keyword-active").attr("data-id");
        if (id === undefined) id = 0;

        if (key === 38) { /*向上按钮*/
            id--;
        } else if (key === 40) {/*向下按钮*/
            id++;
        } else {
            return;
        }
        var length = $("#keywords").attr("data-length");
        if (id > length) id = 1;
        if (id < 1) id = length;

        $(".keyword[data-id=" + id + "]").addClass("keyword-active").siblings().removeClass("keyword-active");
        $(".wd").val($(".keyword[data-id=" + id + "]").text());
    });
        // 搜索框获得焦点事件
    $(".wd").focus(function () {
        this.focusWd();
        this.keywordReminder();
    });

    // 搜索框失去焦点事件
    $(".wd").blur(function () {
        blurWd();
    });
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



  },






 
  methods: {

   hold(item) {
        console.log("sdfs")
        var url = item.url;
        var name = item.name;
        var img = item.img;
        this.$refs.search.action = url;
        this.$refs.wd.name = name;
        this.$refs.se.src = img;
        this.$refs.wd.name = name;
  
        // $(".search-engine").hide();
    },
        // 自动提示( 调用百度 api ）

    keywordReminder() {
        console.log("dd");
        var keyword = $(".wd").val();
        if (keyword != "") {
            $.ajax({
                url: 'https://suggestion.baidu.com/su?wd=' + keyword,
                dataType: 'jsonp',
                jsonp: 'cb', //回调函数的参数名(键值)key
                success: function (data) {
                    $("#keywords").empty().show();
                    $.each(data.s, function (i, val) {
                        $('#keywords').append("&nbsp <li class=\"keyword\" data-id=\"" + (i + 1) + "\">" + val + "</li>");
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
    },
    show:function(event){
    console.log("aa")
    var key = event.keyCode;
    // 屏蔽上下键
    var shieldKey = [38, 40];
    if (shieldKey.includes(key)) return;
    keywordReminder();
    this.gettheme()
    console.log("bb")
    },


    

    gettheme(){
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
}
    var theme = {
        'name': 'light',// 主题名称
        'bg': "#f5f5f5",// 背景色
        'pop_bg': "#ffffff",// 弹窗背景色
        'shadow': "#d8d7d7",// 阴影
        'bottom_bg': "#ddd",// 按钮背景
        //'top_bg': "#2299ff",// 高亮
        'text_color': "#777777",// 文本颜色
        'bg_img': "",//背景图片
    };
    
    $(".con .sou form .wd").css({
        "border": "1px solid " + theme["bottom_bg"],
        "color": theme["text_color"],
    });//输入框
    $(".search-engine").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 5px 20px 0 " + theme["shadow"],
    });//搜索引擎选择弹窗
    $("#keywords").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 5px 20px 0 " + theme["shadow"],
        "color": theme["text_color"]
    });//关键字提示弹窗
    $(".search-engine-list .se-li").css({
        "background-color": theme["bottom_bg"],
        "color": theme["text_color"],
    });//搜索引擎选择弹窗里的按钮
    $(".search-engine-tip").css({
        "border-bottom": "8px solid " + theme["pop_bg"],
    });//搜索引擎选择弹窗上的箭头


    }
    



  },
}
</script>

<style lang="stylus">
ul,
li {
    // display: block;
    list-style: none;
}
.s {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
}
.sou {
    max-width: 680px;
    height: 50px;
}

.sou {
    max-width: 680px;
    position: relative;
    width: calc(100% - 60px);
    min-width: 320px;
    margin: 0 auto;
}

.sou form {
    width: 100%;
    /*border: 1px solid #ddd;*/
    height: 50px;
    display: block;
    margin: 10px auto 30px;
    position: relative;
}

.sou form .se {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    z-index: 10;
    left: 6px;
    top: 6px;
    cursor: pointer;
    font-size: 22px;
    line-height: 40px;
    border-radius: 50%;
    color: #777;
}

// .sou form .se:hover {
//     opacity: 0.7;
//     filter:alpha(opacity=70); /* IE8 及其更早版本 */
//     -moz-opacity: 0.7;
// }

.sou form .wd {
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid #ddd;
    border-radius: 25px;
    line-height: 100%;
    text-indent: 55px;
    font-size: 18px;
}

// /*.con .sou form .wd:focus {*/
// /*    background: #fff;*/
// /*    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);*/
// /*    border-color: #fff*/
// /*}*/

.sou form .s {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    z-index: 10;
    right: 6px;
    top: 6px;
    cursor: pointer;
    font-size: 22px;
    line-height: 40px;
    border-radius: 50%;
    color: #777;
}

#keywords {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #FFF;
    padding: 0 0;
    border-radius: 5px;
    box-shadow: 0 5px 20px 0 #d8d7d7;
    transition: all 0.3s;
    display: none;
    z-index: 999;
    box-sizing: border-box;
    max-height: 208px;
    overflow-x: hidden;
}

#keywords li {
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    line-height: 1.1;
    font-size: 1.1em;
    padding: 4px .681818em;
    margin: 0 auto;
    position: static;
}

.keyword-active {
    font-weight: bold;
}

.search-engine {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #FFF;
    padding: 15px 0 0 0;
    border-radius: 5px;
    box-shadow: 0 5px 20px 0 #d8d7d7;
    transition: all 0.3s;
    display: none;
    z-index: 999
}

.search-engine-head {
    overflow: hidden;
    text-indent: 20px;
    margin-bottom: 10px;
    padding-right: 15px;
}

.search-engine-tit {
    float: left;
    margin: 0;
    font-size: 14px;
    color: #999;
}

.search-engine ul {
    padding: 0;
    height: 40px;
    margin: 0 auto;
    justify-content: left;
}

.search-engine-tip {
    width: 0;
    height: 0;
    position: absolute;
    top: -15px;
    left: 15px;
    border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
    border-left: 8px solid transparent;

}

.search-engine-list::after {
    content: '';
    width: 70px;
    height: 18px;
    position: absolute;
    top: -17px;
    left: 1px;
}

.search-engine-list li {
    float: left;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 14px;
    left: 15px;
    padding: 5px 10px 5px 10px;
    margin: 0 10px 10px 0;
    background: #f9f9f9;
    color: #999;
    cursor: pointer;
    list-style: none;
    position: relative;
    border-radius: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.search-engine-list li img {
    width: 25px;
    height: 25px;
    border-radius: 15px;
    float: left;
    margin-right: 5px;
    margin-top: 2px;
}

.quick-div {
    margin: 0 auto;
    width: 100%;
    justify-content: left;
}

.quick-ul {
}

.quick {
    width: 17%;
    height: 40px;
    margin: 5px 3px;
    left: 30px;
    float: left;
    -webkit-tap-highlight-color: transparent;
    background: #eee;
    font-size: 16px;
    line-height: 40px;
    text-align: left;
    text-indent: 40px;
    text-overflow: ellipsis;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    white-space: nowrap;
}

.quick:active {
    background: #fff;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .1);
}

.quick i {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    left: 0;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transform: scale(0.7);
}
</style>
