/**
 * Created by admin on 2017/6/28.
 */
$(function () {
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
    
	//控件初始化
	$("#target").find(".component").each(function(index,el){
    	var type=$(this).attr("data-type");
        COMPONENTINIT.plugins[type](el);
    })
});
