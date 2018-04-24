var FORMID='';
var FORMINSTANCEID='';
var SAVEFLAG=true;//true是提交，false是暂存;
var USERID="";
var formid=getUrlParam("formid");
$(function(){
	var backel="<i class='fa fa-mail-reply back_btn' onclick='backurl()'></i>"
	$("body").append(backel);
	
	$.ajax({
			type:"get",
			url:"../FormDesign/form/design/published/"+formid,
			async:false,
			success:function(data){
				console.log(data);
				if(data.success == true)
				{
					var html=data.returnValue;
					$(".container").html(html);
					var componentArray = $("#target").find(".component");
				    for(var i = 0; i < componentArray.length; i++){
				        var component_id = componentArray[i].id;
				        var idValue = component_id.split("_")[1];
				        //给width赋值
				        if($("#target").find("#"+component_id).attr("data-width") != ""){
				            componentArray[i].style.width = $("#target").find("#"+component_id).attr("data-width");
				            if($("#target").find("#"+component_id).attr("data-width") == "25%"){
				                $("#target").find("#"+component_id + " input").css("width","125px");
				                $("#target").find("#"+component_id + " select").css("width","60px");
				                $("#target").find("#"+component_id + " textarea").css("width","120px");
				                $("#target").find("#"+component_id + " textarea").css("height","60px");
				            }else if($("#target").find("#"+component_id).attr("data-width") == "50%"){
				                $("#target").find("#"+component_id + " input").css("width","275px");
				                $("#target").find("#"+component_id + " select").css("width","100px");
				                $("#target").find("#"+component_id + " textarea").css("width","300px");
				                $("#target").find("#"+component_id + " textarea").css("height","60px");
				            }
				        }
				        
				    }
				    //初始化控件
					$("#target").find(".component").each(function(index,el){
				    	var type=$(this).attr("data-type");
				    	COMPONENTINIT.plugins[type](el);
				    })
				}
			}
		});
	
	
	

	
	
    
})


//弹出验证模态框
function valiteModal(text){
	$("#valiteModal").find(".txt_tip").text(text);
	$("#valiteModal").modal("show");
	$('#valiteModal').css({"z-index":"1052"});
	$('#valiteModal').siblings(".modal-backdrop:last").css({"z-index":"1051"});
}
//成功提示
var showtiptime='';
function showtip(flage,message) {
	if(!!showtiptime)
	{
		clearTimeout(showtiptime);
		$(".result_tip").hide();
	}
	var template='';
	if(flage==true)
	{
		template='<p class="success_tip"><i class="icon_success"></i>'+message+'</p>';
	}else{
		template='<p class="fail_tip"><i class="icon_fail"></i>'+message+'</p>'
	}
	$(".inner_content").html(template);
	$(".result_tip").show();
	showtiptime=setTimeout(function(){
		$(".result_tip").hide();
	},2000)
}

///返回上一页
function backurl(){
	window.history.back();
}
//获取url中的参数
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null){
        return decodeURIComponent(r[2]);
    } else{
        return null
    }
}