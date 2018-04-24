//控件初始化操作
(function() {
    var COMPONENTINIT=window.COMPONENTINIT=window.COMPONENTINIT||{
            plugins: []
        }
})();

/*text*/
COMPONENTINIT.plugins["text"]=function(el){
	var defaultvalue=$(el).attr("data-value");
	$(el).find("input").val(defaultvalue);
}

/*textarea*/
COMPONENTINIT.plugins["textarea"]=function(el){
	var defaultvalue=$(el).attr("data-value");
	$(el).find("textarea ").val(defaultvalue);
}

/*单选框*/
COMPONENTINIT.plugins["radio"]=function(el){
	
}

/*复选框*/
COMPONENTINIT.plugins["checkbox"]=function(el){
	
}

/*下拉框*/
COMPONENTINIT.plugins["dropdown"]=function(el){
	var default_selected=$(el).attr("data-default-selected");
	if(!!default_selected)
	{
		$(el).find(".component_dropdownbtn").text(default_selected);
	}
}
//数字
COMPONENTINIT.plugins["number"]=function(el){
	var defaultvalue=$(el).attr("data-value");
	$(el).find("input").val(defaultvalue);
}

//时间time
COMPONENTINIT.plugins["time"]=function(el){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	
	var defaulthourvalue=$(el).attr("data-hourvalue");
	var defaultminutevalue=$(el).attr("data-minutevalue");
	var defaultsecondvalue=$(el).attr("data-secondvalue");
	
	if(!!defaulthourvalue){
		$(el).find("#componentHour_"+idValue).find("option[value="+defaulthourvalue+"]").attr("selected",true);
	}
	if(!!defaultminutevalue)
	{
		$(el).find("#componentMinute_"+idValue).find("option[value="+defaultminutevalue+"]").attr("selected",true);
	}
	if(!!defaultsecondvalue)
	{
		$(el).find("#componentSecond_"+idValue).find("option[value="+defaultsecondvalue+"]").attr("selected",true);
	}
	
}
//日期
COMPONENTINIT.plugins["date"]=function(el){
	var defaultvalue=$(el).attr("data-datedefaultvalue");
	
	var datepicker_CurrentInput;
	 $.datepicker.setDefaults({
        showButtonPanel: true,
        closeText: '清除',
        beforeShow: function (input, inst) {
            datepicker_CurrentInput = input;
        }
    });
    $(el).find("input").datepicker({
            format: "yyyy-mm-dd"
     })
    $(el).find("input").val(defaultvalue);
}

/*邮箱*/
COMPONENTINIT.plugins["email"]=function(el){
	
}

/*手机*/
COMPONENTINIT.plugins["mobilePhone"]=function(el){
	var defaultvalue=$(el).attr("data-value");
	$(el).find("input").val(defaultvalue);
}

/*电话*/
COMPONENTINIT.plugins["telephone"]=function(el){
	var defaultvalue=$(el).attr("data-value");
	$(el).find("input").val(defaultvalue);
}

//地址
COMPONENTINIT.plugins["address"]=function(el){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	
	var provincevalue=$(el).attr("data-provincevalue");//初始化省份
	var cityvalue=$(el).attr("data-cityvalue");//初始化的市
	var districtvalue=$(el).attr("data-districtvalue")//初始化区
	var detailvalue=$.trim($(el).attr("data-detailvalue"))//初始化详细地址
	
	$(el).find("#distpicker_"+idValue).distpicker({
        province:provincevalue,
        city: cityvalue,
        district:districtvalue,
        autoSelect: false
    });
    
    $(el).find("#componentDetail_"+idValue).val(detailvalue);
}

/*上传图片*/
COMPONENTINIT.plugins["uploadimg"]=function(el){
	
}

/*上传附件*/
COMPONENTINIT.plugins["uploadfile"]=function(el){
	
}

/*cascadedropdown*/
COMPONENTINIT.plugins["cascadedropdown"]=function(el){
	
}

/*子表单*/
COMPONENTINIT.plugins["table"]=function(el){
	
}
/*加强字段*/
COMPONENTINIT.plugins["fieldtext"]=function(el){
	
}
/*分类标题*/
COMPONENTINIT.plugins["groupTitle"]=function(el){

}
//用户填写表单操作  控件初始化
$(function(){
	//下拉框选择
	$(".component_dropdownbtn_el").on('click',function(){
		var thistext=$(this).text();
		$(this).parent().parent().find("button").text(thistext);
	})
	
	//两级下拉框
	$(".cascadedropdown_parent_item").on("click",function(){
		var parentvalue=$(this).find("span").text();
		var defaultvalue=$(this).parent().find(".dropdown_item_default").text();
		$(this).parent().parent().find(".component_cascadedropdown_parent").text(parentvalue);
		if(parentvalue == defaultvalue)
		{
			$(this).parents(".cascadedropdown_template").find(".chiled_select_panel").html("");
		}else{
			
			var ulhtml=$(this).find("ul").html();
			$(this).parents(".cascadedropdown_template").find(".chiled_select_panel").html(ulhtml);
		}
		
	})
	$(".cascadedropdown_template").on("click",".dropdown_item_childel",function(){
		var vaule=$(this).text();
		$(this).parent().parent().find(".component_cascadedropdown_child").text(vaule);
	})
	
	//图片上传
	$(".uploadimg_template").on("change","input",function(){

	})
	//附件上传
	$(".uploadfile_template").on("change","input",function(){

	})
	
})