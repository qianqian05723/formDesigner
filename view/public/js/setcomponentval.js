/*设置保存的表单数据方法*/
(function() {
    var SETCOMPONENTVAL=window.SETCOMPONENTVAL=window.SETCOMPONENTVAL||{
            plugins: []
        }
})();

/*text*/
SETCOMPONENTVAL.plugins["text"]=function(el,objvalue){
	if(objvalue != ""){
		$(el).find("input").val(objvalue);
	}
	
}
/*textarea*/
SETCOMPONENTVAL.plugins["textarea"]=function(el,objvalue){
	if(objvalue != ""){
		$(el).find("textarea").val(objvalue);
	}
}
/*radio*/
SETCOMPONENTVAL.plugins["radio"]=function(el,objvalue){
	if(objvalue != "")
	{
		var index=Number(objvalue.index);
		$($(el).find("input")[index]).attr("checked","checked");
	}
}
/*checkbox*/
SETCOMPONENTVAL.plugins["checkbox"]=function(el,objvalue){
	
	if(objvalue != ""){
		for(var i=0;i<objvalue.length;i++)
		{
			var index=Number(objvalue[i].index);
			$($(el).find("input")[index]).attr("checked","checked");
		}
	}
}
/*dropdown*/
SETCOMPONENTVAL.plugins["dropdown"]=function(el,objvalue){
	
	if(objvalue != ""){
		$(el).find(".component_dropdownbtn").text(objvalue);
	}
}
/*number*/
SETCOMPONENTVAL.plugins["number"]=function(el,objvalue){
	console.log("number");
	if(objvalue != ""){
		$(el).find("input").val(objvalue);
	}
}
/*time*/
SETCOMPONENTVAL.plugins["time"]=function(el,objvalue){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	var addsecond=$(el).attr("data-addsecond");//是否精确到秒
	
	if(objvalue != ""){
		if(addsecond == "true")
		{
			$(el).find("#componentHour_"+idValue).val(objvalue.hourvalue);
			$(el).find("#componentMinute_"+idValue).val(objvalue.minutevalue);
			$(el).find("#componentSecond_"+idValue).val(objvalue.secondvalue);
		}else{
			$(el).find("#componentHour_"+idValue).val(objvalue.hourvalue);
			$(el).find("#componentMinute_"+idValue).val(objvalue.minutevalue);
		}
	}	
}
/*date*/
SETCOMPONENTVAL.plugins["date"]=function(el,objvalue){
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
	if(objvalue != ""){
		$(el).find("input").val(objvalue);
	}
}
/*email*/
SETCOMPONENTVAL.plugins["email"]=function(el,objvalue){
	if(objvalue != ""){
		$(el).find("input").val(objvalue);
	}
}
/*mobilePhone*/
SETCOMPONENTVAL.plugins["mobilePhone"]=function(el,objvalue){
	if(objvalue != ""){
		$(el).find("input").val(objvalue);
	}
}
/*telephone*/
SETCOMPONENTVAL.plugins["telephone"]=function(el,objvalue){
	if(objvalue != ""){
		$(el).find("input").val(objvalue);
	}
}
/*address*/
SETCOMPONENTVAL.plugins["address"]=function(el,objvalue){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	
	if(objvalue != ""){
		$(el).find("#distpicker_"+idValue).distpicker({
		        province:objvalue.provincevalue,
		        city: objvalue.cityvalue,
		        district:objvalue.districtvalue,
		        autoSelect: false
		    });
		$(el).find("#componentDetail_"+idValue).val(objvalue.detailvalue);
	}
}
/*uploadimg*/
SETCOMPONENTVAL.plugins["uploadimg"]=function(el,objvalue){
	
	if(objvalue != ""){
		$(el).find("img").attr("src",objvalue);
		$(el).find("input").attr("data-src",objvalue);
		$(el).find(".uploadimg_rander").show();
	}
}
/*uploadfile*/
SETCOMPONENTVAL.plugins["uploadfile"]=function(el,objvalue){
	
	if(objvalue != "")
	{
		var index=objvalue.lastIndexOf(".");
		var str  = objvalue .substring(index + 1, objvalue .length);
		var extName="."+str;
		if(extName == ".doc" || extName == ".dot" || extName == ".ppt" || extName == ".wps" || extName == ".docx")
		{
			$(el).find("img").attr("src","public/images/word.png");
		}
		if(extName == ".xlc" || extName == ".xlm" || extName == ".xls" ||  extName == ".xlt" ||  extName == ".xlw" || extName=='.xlsx')
		{
			$(el).find("img").attr("src","public/images/excel.png");
		}
		$(el).find("input").attr("data-src",objvalue);
		$(el).find(".uploadfile_rander").show();
	}
	
}
/*cascadedropdown*/
SETCOMPONENTVAL.plugins["cascadedropdown"]=function(el,objvalue){
	console.log("cascadedropdown");
	if(!!objvalue)
	{
		var parentindx=Number(objvalue.parentindex);//选中的一级index
		$(el).find(".component_cascadedropdown_parent").text(objvalue.parentvalue);
		$(el).find(".component_cascadedropdown_child").text(objvalue.childvalue);
		$(el).find(".component_cascadedropdown_parent").attr("data-index",parentindx);
		if(parentindx != 0)
		{
			
			var ulhtml=$($(el).find(".cascadedropdown_parent_item")[parentindx]).find("ul").html();
			$(el).find(".chiled_select_panel").html(ulhtml);
		}else if(parentindx == 0 || parentindx == ""){
			var parentdefaultvalue=$($(el).find(".cascadedropdown_parent_item")[0]).find("span").text();
			$(el).find(".component_cascadedropdown_parent").text(parentdefaultvalue);
			var childdefaultvalue=$($(el).find(".cascadedropdown_parent_item")[1]).find(".child_default_childitem").text();
			$(el).find(".component_cascadedropdown_child").text(childdefaultvalue);
		}
	}
}
/*table*/
SETCOMPONENTVAL.plugins["table"]=function(el,objvalue){
	if(!!objvalue)
	{
		for(var i=0;i<objvalue.length;i++)
		{
			var item=objvalue[i];
			var index=Number(item.index);
			var valuelist=item.valuelist;
			$($(el).find(".row_item")[index]).find("input").each(function(index,el){
				$(el).val(valuelist[index]);
			})
		}
	}
}
/*fieldtext*/
SETCOMPONENTVAL.plugins["fieldtext"]=function(el,objvalue){
	console.log("fieldtext");
	if(objvalue != "")
	{
		$(el).find("input").val(objvalue);
	}
}