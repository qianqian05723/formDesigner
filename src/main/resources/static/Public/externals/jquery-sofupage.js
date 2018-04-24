(function ($) {
    $.fn.SOFUPage = function (option) {
        if (this.length < 1) { return; };
        // 默认值
        var Option;

        //解析参数
        var SOFUExtend = function (option) {
            Option = $.extend({
                Style: "Normal",   //分页样式
                AllPage: 0,       //总页数
                AllCount: 100,     //数据总条数
                PageCount:10,      //每页条数
                NowPage: 1,        //当前显示的页数
                MaxShow: 5,        //分页控件最大按钮个数（不包含上下页与前后页）
                NextPrev: true,    //是否显示上一页与下一页
                FirstLast: true,   //是否显示最后一页与第一页
                FirstVal: '‖←',    //第一面显示文字
                LastVal: '→‖',     //最后一页显示文字
                NextVal: '→',      //下一页显示文字
                PrevVal: '←',      //上一页显示文字
                Href: "#{page}",   //分页按钮的URL
                Target: "_blank",  //以何种方式打开页面
                IsCurAble: true,    //当前页面是否可以访问
                OnChange: function (page) { },
            }, option);
        }

        var SOFUPage = this;

        var SOFUInit = function () {
            if (!SOFUPage.hasClass("sofupage")) {
                SOFUPage.addClass("sofupage");
            }
            if (!SOFUPage.hasClass(Option.Style)) {
                SOFUPage.addClass(Option.Style);
            }
            if (Option.FirstLast) {
                var OnePageItem = $("<a></a>");
                OnePageItem.addClass("first");
                if (Option.NowPage == 1) {
                    OnePageItem.addClass("disable");
                    OnePageItem.attr("href", 'javascript:void(0)');
                }
                else {
                    if (Option.Href != "") {
                        OnePageItem.attr("href", Option.Href.replace("{page}", "1"));
                    }
                    else {
                        OnePageItem.attr("href", 'javascript:void(0)');
                    }
                    OnePageItem.attr("target", Option.Target);
                }
                OnePageItem.html(Option.FirstVal);
                SOFUPage.append(OnePageItem);
            }
            if (Option.NextPrev) {
                var OnePageItem = $("<a></a>");
                OnePageItem.addClass("prev");
                if (Option.NowPage == 1) {
                    OnePageItem.addClass("disable");
                }
                OnePageItem.attr("href", "javascript:void(0)");
                OnePageItem.html(Option.PrevVal);
                SOFUPage.append(OnePageItem);
            }
            if (Option.AllPage <= Option.MaxShow) {
                for (var i = 1; i <= Option.AllPage; i++) {
                    var OnePageItem = $("<a></a>");
                    if (Option.Href != "") {
                        OnePageItem.attr("href", Option.Href.replace("{page}", i));
                        OnePageItem.attr("target", Option.Target);
                    }
                    else {
                        OnePageItem.attr("href", 'javascript:void(0)');
                    }
                    OnePageItem.html(i);
                    if (i == Option.NowPage) {
                        OnePageItem.addClass("cur");
                    }
                    SOFUPage.append(OnePageItem);
                }
            }
            else {
                if (Option.NowPage <= ((Option.MaxShow+2) / 2 - 2)) {

                    for (var i = 1; i <= Option.MaxShow - 2; i++) {
                        var OnePageItem = $("<a></a>");
                        if (Option.Href != "") {
                            OnePageItem.attr("href", Option.Href.replace("{page}", i));
                            OnePageItem.attr("target", Option.Target);
                        }
                        else {
                            OnePageItem.attr("href", 'javascript:void(0)');
                        }
                        OnePageItem.html(i);
                        if (i == Option.NowPage) {
                            OnePageItem.addClass("cur");
                        }
                        SOFUPage.append(OnePageItem);
                    }
                    var OnePageItem = $("<a></a>");
                    OnePageItem.addClass("nopage");
                    OnePageItem.addClass("disable");
                    OnePageItem.attr("href", "javascript:void(0)");
                    OnePageItem.html("···");
                    SOFUPage.append(OnePageItem);

                    var OnePageItem2 = $("<a></a>");
                    if (Option.Href != "") {
                        OnePageItem2.attr("href", Option.Href.replace("{page}", Option.AllPage));
                        OnePageItem2.attr("target", Option.Target);
                    }
                    else {
                        OnePageItem2.attr("href", 'javascript:void(0)');
                    }
                    OnePageItem2.html(Option.AllPage);
                    SOFUPage.append(OnePageItem2);
                }

                else if (Option.NowPage > (Option.AllPage -(Option.MaxShow-3))) {
                    var OnePageItem2 = $("<a></a>");
                    if (Option.Href != "") {
                        OnePageItem2.attr("href", Option.Href.replace("{page}", "1"));
                        OnePageItem2.attr("target", Option.Target);
                    }
                    else {
                        OnePageItem2.attr("href", 'javascript:void(0)');
                    }
                    OnePageItem2.html("1");
                    SOFUPage.append(OnePageItem2);

                    var OnePageItem = $("<a></a>");
                    OnePageItem.addClass("nopage");
                    OnePageItem.addClass("disable");
                    OnePageItem.attr("href", "javascript:void(0)");
                    OnePageItem.html("···");
                    SOFUPage.append(OnePageItem);
                    for (var i = Option.AllPage-(Option.MaxShow-3); i <= Option.AllPage; i++) {
                        var OnePageItem = $("<a></a>");
                        if (Option.Href != "") {
                            OnePageItem.attr("href", Option.Href.replace("{page}", i));
                            OnePageItem.attr("target", Option.Target);
                        }
                        else {
                            OnePageItem.attr("href", 'javascript:void(0)');
                        }
                        OnePageItem.html(i);
                        if (i == Option.NowPage) {
                            OnePageItem.addClass("cur");
                        }
                        SOFUPage.append(OnePageItem);
                    }
                }
                else {
                    var OnePageItem2 = $("<a></a>");
                    if (Option.Href != "") {
                        OnePageItem2.attr("href", Option.Href.replace("{page}", "1"));
                        OnePageItem2.attr("target", Option.Target);
                    }
                    else {
                        OnePageItem2.attr("href", 'javascript:void(0)');
                    }
                    OnePageItem2.html("1");
                    SOFUPage.append(OnePageItem2);

                    var OnePageItem3 = $("<a></a>");
                    OnePageItem3.addClass("nopage");
                    OnePageItem3.addClass("disable");
                    OnePageItem3.attr("href", "javascript:void(0)");
                    OnePageItem3.html("···");
                    SOFUPage.append(OnePageItem3);

                    for (var i = parseInt(Option.NowPage - (Option.MaxShow - 4) / 2)+1 ; i <= parseInt(Option.NowPage) + parseInt((Option.MaxShow - 4) / 2) ; i++) {
                        var OnePageItem = $("<a></a>");
                        if (Option.Href != "") {
                            OnePageItem.attr("href", Option.Href.replace("{page}", i));
                            OnePageItem.attr("target", Option.Target);
                        }
                        else {
                            OnePageItem.attr("href", 'javascript:void(0)');
                        }
                        OnePageItem.html(i);
                        if (i == Option.NowPage) {
                            OnePageItem.addClass("cur");
                        }
                        SOFUPage.append(OnePageItem);
                    }

                    var OnePageItem = $("<a></a>");
                    OnePageItem.addClass("nopage");
                    OnePageItem.addClass("disable");
                    OnePageItem.attr("href", "javascript:void(0)");
                    OnePageItem.html("···");
                    SOFUPage.append(OnePageItem);

                    var OnePageItem4 = $("<a></a>");
                    if (Option.Href != "") {
                        OnePageItem4.attr("href", Option.Href.replace("{page}", Option.AllPage));
                        OnePageItem4.attr("target", Option.Target);
                    }
                    else {
                        OnePageItem4.attr("href", 'javascript:void(0)');
                    }
                    OnePageItem4.html(Option.AllPage);
                    SOFUPage.append(OnePageItem4);
                }
            }

            if (Option.NextPrev) {
                var OnePageItem = $("<a></a>");
                OnePageItem.addClass("next");
                if (Option.NowPage == Option.AllPage) {
                    OnePageItem.addClass("disable");
                }
                OnePageItem.attr("href", "javascript:void(0)");
                OnePageItem.html(Option.NextVal);
                SOFUPage.append(OnePageItem);
            }
            if (Option.FirstLast) {
                var OnePageItem = $("<a></a>");
                OnePageItem.addClass("last");
                if (Option.NowPage == Option.AllPage) {
                    OnePageItem.addClass("disable");
                }
                if (Option.Href != "") {
                    OnePageItem.attr("href", Option.Href.replace("{page}", Option.AllPage));
                    OnePageItem.attr("target", Option.Target);
                }
                else{
                    OnePageItem.attr("href","javascript:void(0)");
                }
                OnePageItem.html(Option.LastVal);
                SOFUPage.append(OnePageItem);
            }

            if (Option.Href == "") {
                SOFUPage.on("click", "a", function () {
                    var Page = 0;
                    if ($(this).attr("Class") == "first") {
                        Page = 1;
                    }
                    else if ($(this).attr("Class") == "last") {
                        Page = Option.AllPage;
                    }
                    else if ($(this).attr("Class") == "prev") {
                        Page = Option.NowPage - 1;
                        if (Page < 1) {
                            Page = 1;
                        }
                    }
                    else if ($(this).attr("Class") == "next") {
                        Page = Option.NowPage + 1;
                        if (Page > Option.AllPage) {
                            Page = Option.AllPage;
                        }
                    }
                    else if ($(this).attr("Class") == null) {
                        Page = $(this).html();
                    }
                    else if ($(this).attr("Class") == "cur") {
                        if (Option.IsCurAble) {
                            Page = $(this).html();
                        }
                        else {
                            Page = 0;
                        }
                    }
                    else {
                        Page = 0;
                    }
                    if (Page != 0) {
                        Option.OnChange(Page);
                        SOFUReInit(Page);
                    }
                });
            }
            else {
                SOFUPage.on("click", " a.prev", function () {
                    var Page = Option.NowPage - 1;
                    if (Page < 1) {
                        Page = 1;
                    }
                    window.open(Option.Href.replace("{page}", Page), Option.Target == "_blank" ? true : false);
                });
                SOFUPage.on("click", " a.next", function () {
                    var Page = Option.NowPage + 1;
                    if (Page > Option.AllPage) {
                        Page = Option.AllPage;
                    }
                    window.open(Option.Href.replace("{page}", Page), Option.Target == "_blank" ? true : false);
                });
            }
        };

        var SOFUReInit = function (page) {
            option.NowPage = page;
            SOFUExtend(option);
            SOFUPage.html("");
            SOFUPage.off();
            SOFUInit();
        };

        var CSH = function () {
            SOFUExtend(option);
            if (Option.AllCount == 0) {
            }
            else {
                if (Option.AllCount % Option.PageCount == 0) {
                    Option.AllPage = Option.AllCount / Option.PageCount;
                }
                else {
                    Option.AllPage = parseInt(Option.AllCount / Option.PageCount)+1;
                }
            }
            SOFUInit();

        };
        CSH();


    };

})(jQuery);
