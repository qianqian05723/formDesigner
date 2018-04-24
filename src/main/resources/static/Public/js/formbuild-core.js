(function() {
	var LPB = window.LPB = window.LPB || {
		plugins: []
	};
})();

$(document).ready(function() {
	 var deleteOpsFlag = false;//删除组件操作标志位

	//表单名称不能为空
    $("#form_name").on("blur",function () {
        var formName = $("#form_name").val();
        if(formName != null && formName != ""){
            $("#errorTip_FormName").css("display","none");
            $("#formTitleDisplay").html(formName);
            $("#formTitleDisplay").css("display","block");
		}else{
            $("#errorTip_FormName").css("display","inline-block");
            $("#form_name").focus();
            $("#formTitleDisplay").html("");
            $("#formTitleDisplay").css("display","none");
		}
    });
	//表单描述
    $("#form_describe").on("blur",function () {
        var formDescribe = $("#form_describe").val();
        if(formDescribe != null && formDescribe != ""){
            $("#formDescribeDisplay").html(formDescribe);
            $("#formDescribeDisplay").css("display","block");
        }else{
            $("#formDescribeDisplay").html("");
            $("#formDescribeDisplay").css("display","none");
        }
    });

	//点击组件弹出编辑页面
	$(".container").on("click",".component", function(e) {
		e.preventDefault();
		componentInit();
		$(this).addClass("component_select");
		$(this).css({
			"border-top":"1px dashed transparent",
			"border-bottom":"1px dashed transparent",
			"border-color":"#4DB8FF",
			"border-left":"none",
			"border-right":"none",
			"background":"#ecf2f6",
			"padding-top":"15px",
		});
		$(this).find(".delete_btn").show();

		//判断是否是点击删除按钮（点击删除按钮时也会执行这个函数）
		if(!deleteOpsFlag){
			//获取编辑组件的ID
			var componentID = e.currentTarget.id.split("_")[1];
			//获取点击的插件
			var active_component = $(this);
			var plugins = active_component.attr("data-type");
            //清空编辑页面
            $("#editComponent").remove();
            var elstr='<div  id="editComponent"></div>'
            $("#2").append(elstr);

            //判断是否点击的是加强字段
			if(plugins == "fieldtext") {
				return false;
			}

			//tab标签变换
            $("#formAttribute").removeClass("active");
			$("#listControls").removeClass("active");
			$("#editControls").addClass("active");
			//tab页内容变换
            $("#0").removeClass("active");
			$("#1").removeClass("active");
			$("#2").addClass("active");


			//exec plugins
			if(typeof(LPB.plugins[plugins]) == 'function')
			{
				try{
					var componentEditUrl="../static/componentEdit/"+plugins+"_edit.html";
					$.ajax({
						url: componentEditUrl,
						type: "GET",
						async: false,
						success: function(data){
							var tmplate = $.templates(data);
							var index = {componentID:componentID};
							$("#editComponent").append(tmplate.render(index));
						}
					});

					LPB.plugins[plugins](active_component);
				}catch ( e ) {
					alert('控件异常！');
				}
			}else
			{
				alert("控件有误或不存在，请与我们联系！");
			}
		}
		deleteOpsFlag = false;
	});
	
	$("#target").on("mouseover", ".component", function(e) {
		$(this).css({
			"background":"#ecf2f6"
		})
	});
	$("#target").on("mouseleave", ".component", function(e) {
		$(this).css({
			"background":""
		})
	});
	//target里的所有component控件恢复到原来状态
	function componentInit(){
		$("#target .component").css({
		"border-top": "1px solid #f8f8f6",
		"border-bottom": "none",
		"background":"#f8f8f6",
		"padding-top":"0px"
		});
		$("#target .component").removeClass("component_select");
		$(".delete_btn").hide();
		
		$(".button_component").css({
			"border":"none",
			"background":"none"
		});
        $(".temporary_component").css({
            "border":"none",
            "background":"none"
        })
	}

    //点击删除图标
    $(".container").on("click",".delete_btn", function(e) {
    	//获取删除对象id
		var timeStamp = $(this).attr("data-id").split("_")[1];
        var deleteComponent = "component_" + timeStamp;
        var deleteParentItem = "componentItem_" + timeStamp;

        //判断删除的是否是加强字段
		var that=this;
        if($(this).parent().attr("data-type") == "fieldtext"){
			var id=$(that).parent().attr("data-id");
            $(this).parent().parent().remove();
			$("#fieldComponentSelect").find("#"+id).show();
		}

        if($("#target").find(".component_select").attr("id") == deleteComponent){
        	//清除组件
            $("#target").find("#"+deleteParentItem).remove();
            //清空编辑页面
            $("#editComponent").remove();
            //tab标签变换
            $("#formAttribute").removeClass("active");
            $("#listControls").addClass("active");
            $("#editControls").removeClass("active");
            //tab页内容变换
            $("#0").removeClass("active");
            $("#1").addClass("active");
            $("#2").removeClass("active");

			deleteOpsFlag = true;
		}
    });
	
	//点击表单提交按钮控件
	$(".container").on("click",".button_component",function(){
		componentInit();
		$(this).css({
			"border":"1px dashed transparent",
			"border-color":"#4DB8FF",
			"background":"#ecf2f6"
		});
        //tab标签变换
        $("#formAttribute").removeClass("active");
        $("#listControls").removeClass("active");
        $("#editControls").addClass("active");

        //tab页内容变换
        $("#0").removeClass("active");
        $("#1").removeClass("active");
        $("#2").addClass("active");

        $("#editComponent").remove();
        var elstr='<div  id="editComponent"></div>'
        $("#2").append(elstr);

        //获取点击的插件
        var active_component = $(this);
        var plugins = active_component.attr("data-type");
        if(typeof(LPB.plugins[plugins]) == 'function')
        {
            try{
                var componentEditUrl="../static/componentEdit/btnSubmit_edit.html";
                $.ajax({
                    url: componentEditUrl,
                    type: "GET",
                    async: false,
                    success: function(data){
                        var tmplate = $.templates(data);
                        $("#editComponent").append(tmplate.render());
                    }
                });

                LPB.plugins[plugins](active_component);
            }catch ( e ) {
                alert('控件异常！');
            }
        }else
        {
            alert("控件有误或不存在，请与我们联系！");
        }
	});

    //点击表单暂存按钮控件
    $(".container").on("click",".temporary_component",function(){
        componentInit();
        $(this).css({
            "border":"1px dashed transparent",
            "border-color":"#4DB8FF",
            "background":"#ecf2f6"
        });
        //tab标签变换
        $("#formAttribute").removeClass("active");
        $("#listControls").removeClass("active");
        $("#editControls").addClass("active");

        //tab页内容变换
        $("#0").removeClass("active");
        $("#1").removeClass("active");
        $("#2").addClass("active");

        $("#editComponent").remove();
        var elstr='<div  id="editComponent"></div>'
        $("#2").append(elstr);

        //获取点击的插件
        var active_component = $(this);
        var plugins = active_component.attr("data-type");
        if(typeof(LPB.plugins[plugins]) == 'function')
        {
            try{
                var componentEditUrl="../static/componentEdit/btnTemporary_edit.html";
                $.ajax({
                    url: componentEditUrl,
                    type: "GET",
                    async: false,
                    success: function(data){
                        var tmplate = $.templates(data);
                        $("#editComponent").append(tmplate.render());
                    }
                });

                LPB.plugins[plugins](active_component);
            }catch ( e ) {
                alert('控件异常！');
            }
        }else
        {
            alert("控件有误或不存在，请与我们联系！");
        }
    });
});

//监听浏览器窗口变化时
changeContainerHeight();
window.onresize = function(){
	changeContainerHeight();
	
}
//修改表单容器的高度
function changeContainerHeight(){
	var windowheight=$(window).height();
	$(".container").css({
		"height":windowheight-100+"px"
	});
	
	$("#components").css({
		"height":windowheight-100-58+"px"
	});
	
	if($("#components")[0].scrollHeight>$("#components")[0].clientHeight||$("#components")[0].offsetHeight>$("#components")[0].clientHeight){
		$("#components .item").css({
			"width":"124px"
		})
		$("#temp").css({
			"width":"124px"
		})
  	}else{
  		$("#components .item").css({
			"width":"137px"
		})
  		$("#temp").css({
			"width":"137px"
		})
  	}
}
