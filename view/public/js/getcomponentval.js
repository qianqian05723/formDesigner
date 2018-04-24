(function() {
    var GETCOMPONENTVAL=window.GETCOMPONENTVAL=window.GETCOMPONENTVAL||{
            plugins: []
        }
})();
/*text*/
GETCOMPONENTVAL.plugins["text"]=function(el){
	var value=$.trim($(el).find("input").val());
	var required=$(el).attr("data-required");//是否必填项
	var component_title=$(el).attr("data-componentname");	
	var minlength=Number($(el).attr("data-minlength"));
	var maxlength=Number($(el).attr("data-maxlength"));
	if(!!minlength && !!maxlength && SAVEFLAG)
	{
		if(value.length<minlength || value.length> maxlength && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请填写"+minlength+"—"+maxlength+"个字");
			return 'false';
		}
	}
	
	if(!!minlength)
	{
		if(value.length<minlength && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请填写不少于"+minlength+"个字");
			return 'false';
		}
	}
	
	if(!!maxlength)
	{
		if(value.length>maxlength && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请填写不大于"+maxlength+"个字");
			return 'false';
		}
	}
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}else{
		return value;
	}
	
}
/*textarea*/
GETCOMPONENTVAL.plugins["textarea"]=function(el){
	var value=$.trim($(el).find("textarea").val());
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	var minlength=Number($(el).attr("data-minlength"));
	var maxlength=Number($(el).attr("data-maxlength"));
	
	if(!!minlength && !!maxlength && SAVEFLAG)
	{
		if(value.length<minlength || value.length> maxlength)
		{
			valiteModal("'"+component_title+"'请填写"+minlength+"—"+maxlength+"个字");
			return 'false';
		}
	}
	
	if(!!minlength && SAVEFLAG)
	{
		if(value.length<minlength)
		{
			valiteModal("'"+component_title+"'请填写不少于"+minlength+"个字");
			return 'false';
		}
	}
	
	if(!!maxlength && SAVEFLAG)
	{
		if(value.length>maxlength)
		{
			valiteModal("'"+component_title+"'请填写不大于"+maxlength+"个字");
			return 'false';
		}
	}
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}else{
		return value;
	}
}
/*radio*/
GETCOMPONENTVAL.plugins['radio']=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).find(".component_title").text();
	
	var value='';
	var selectindex=0;
    $(el).find("input").each(function(index,el_child){
    	if($(el_child).is(':checked') == true)
    	{
    		value=$(el_child).val();
    		selectindex=index;
    	}
    })
    if((required == "true" || required == true) && value == "" && SAVEFLAG)
    {
    	valiteModal("'"+component_title+"' 是必填项");
    	return 'false';
    }
    if(value == "")
    {
    	 return value;
    }else{
    	return {index:selectindex,value:value};
    }
   
};
/*checkbox*/
GETCOMPONENTVAL.plugins['checkbox']=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).find(".component_title").text();
	var minlength=Number($(el).attr("data-minlength"));
	var maxlength=Number($(el).attr("data-maxlength"));
	
    var value='';
    var selectindex=0;
    var objArray=[];
     $(el).find("input").each(function(index,el_child){
    	if($(el_child).is(':checked') == true)
    	{
    		value=$(el_child).val();
    		selectindex=index;
    		objArray.push({index:selectindex,value:value});
    	}
    })
    if((required == "true" || required == true) && objArray.length == 0 && SAVEFLAG)
    {
    	valiteModal("'"+component_title+"' 是必填项");
    	return 'false';
    }
    if(!!minlength && !!maxlength && SAVEFLAG)
    {
    	if(objArray.length<minlength && objArray.length>maxlength && SAVEFLAG)
    	{
    		valiteModal("'"+component_title+"'请选择"+minlength+"—"+maxlength+"个选项");
    		return 'false';
    	}
    }
    if(!!minlength)
    {
    	if(objArray.length<minlength && SAVEFLAG)
    	{
    		valiteModal("'"+component_title+"'请选择不少于"+minlength+"个选项");
    		return 'false';
    	}
    }
    if(!!maxlength)
    {
    	if(objArray.length>maxlength && SAVEFLAG)
    	{
    		valiteModal("'"+component_title+"'请选择不大于"+maxlength+"个选项");
    		return 'false';
    	}
    }
    
    if(objArray.length == 0)
    {
     	 return "";
    }else{
    	return objArray;
    }
};

/*dropdown*/
GETCOMPONENTVAL.plugins['dropdown']=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).find(".component_title").text();
	
	var value=$.trim($(el).find(".component_dropdownbtn").text());
	var defaultvalue=$.trim($(el).find(".dropdown_item_default").text());//默认选项，既没有选项任何选项
	
	if((required == "true" || required == true) && value == defaultvalue && SAVEFLAG)
	{
		//没有选择
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	if(value == defaultvalue)
	{
		return "";
	}else{
		return value;
	}	
}
/*数字*/
GETCOMPONENTVAL.plugins["number"]=function(el){
	var value=$.trim($(el).find("input").val());
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	var minlength=Number($(el).attr("data-minlength"));
	var maxlength=Number($(el).attr("data-maxlength"));
	
	if(!!minlength && !!maxlength && SAVEFLAG)
	{
		if(value<minlength || value> maxlength && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请填写"+minlength+"—"+maxlength+"之间数字");
			return 'false';
		}
	}
	if(!!minlength  && SAVEFLAG)
	{
		if(value<minlength && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请填写不小于"+minlength+"的数字");
			return 'false';
		}
	}
	if(!!maxlength  && SAVEFLAG)
	{
		if(value>maxlength && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请填写不大于"+maxlength+"的数字");
			return 'false';
		}
	}
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}else{
		return value;
	}
}
/*时间*/
GETCOMPONENTVAL.plugins["time"]=function(el){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	var addsecond=$(el).attr("data-addsecond");//是否精确到秒
	
	var hourvalue=$(el).find("#componentHour_"+idValue).val();
	var minutevalue=$(el).find("#componentMinute_"+idValue).val();
	var secondvalue=$(el).find("#componentSecond_"+idValue).val();
	
	if(addsecond == "true")
	{
		if((required == "true" || required == true) && (hourvalue == ""|| minutevalue =="" || secondvalue=="") && SAVEFLAG)
		{
			valiteModal("'"+component_title+"' 是必填项");
			return 'false';
		}
	}else{
		if((required == "true" || required == true) && (hourvalue == ""|| minutevalue =="") && SAVEFLAG)
		{
			valiteModal("'"+component_title+"' 是必填项");
			return 'false';
		}
	}
	
	if(addsecond == "true")
	{
		var obj={
			hourvalue:hourvalue,
			minutevalue:minutevalue,
			secondvalue:secondvalue
		}
		return obj;
	}else{
		var obj={
			hourvalue:hourvalue,
			minutevalue:minutevalue,
		}
		return obj;
	}
	
}
/*日期*/
GETCOMPONENTVAL.plugins["date"]=function(el){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	
	var datestartvalue=$(el).attr("data-datestartvalue");
	var dateendvalue=$(el).attr("data-dateendvalue");
	var datestart = (new Date(datestartvalue)).getTime();
	var dateend=(new Date(dateendvalue)).getTime();
	
	var value=$(el).find("input").val();
	var valuetime=(new Date(value)).getTime();
	
	if(!!datestartvalue && !!dateendvalue  && SAVEFLAG)
	{
		if(valuetime<datestart || valuetime>dateend && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请选择"+datestartvalue+"至"+dateendvalue+"之间的日期");
			return 'false';
		}
	}
	if(!!datestartvalue  && SAVEFLAG)
	{
		if(valuetime<datestart && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请选择"+datestartvalue+"之后的日期");
			return 'false';
		}
	}
	
	if(!!dateendvalue  && SAVEFLAG)
	{
		if(valuetime>dateend && SAVEFLAG)
		{
			valiteModal("'"+component_title+"'请选择"+dateendvalue+"之前的日期");
			return 'false';
		}
	}
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}else{
		return value;
	}
	
}
/*邮箱*/
GETCOMPONENTVAL.plugins["email"]=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	var value=$.trim($(el).find("input").val());
	
	var RegEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if (RegEmail.test(value))
	{
		
	}else if(SAVEFLAG && (required == "true" || required == true)){
		
		valiteModal("'"+component_title+"'不是正确的邮箱格式");
		return 'false';
		
	}else if(SAVEFLAG){
		valiteModal("'"+component_title+"'不是正确的邮箱格式");
		return 'false';
	}
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	
	return value;
}
/*手机*/
GETCOMPONENTVAL.plugins["mobilePhone"]=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	var value=$.trim($(el).find("input").val());
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	return value;
}
/*电话*/
GETCOMPONENTVAL.plugins["telephone"]=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).attr("data-componentname");
	var value=$.trim($(el).find("input").val());
	
	if((required == "true" || required == true) && value == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	return value;
}

/*地址*/
GETCOMPONENTVAL.plugins["address"]=function(el){
	var component_id=$(el).attr("id");
	var idValue = component_id.split("_")[1];
	var required=$(el).attr("data-required");//是否必填项
	var component_title=$(el).attr("data-componentname");
	
	var provincevalue=$(el).find("#componentProvince_"+idValue).val();//获取省
	var cityvalue=$(el).find("#componentCity_"+idValue).val();//获取市
	var districtvalue=$(el).find("#componentDistrict_"+idValue).val();//获取区
	var detailvalue=$.trim($(el).find("#componentDetail_"+idValue).val());//详情地址
	
	if((required == "true" || required == true) && detailvalue == "" && SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}else{
		var obj={
			provincevalue:provincevalue,
			cityvalue:cityvalue,
			districtvalue:districtvalue,
			detailvalue:detailvalue
		}
		return obj;
	}
}

/*上传图片*/
GETCOMPONENTVAL.plugins["uploadimg"]=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).find(".component_title").text();
	var value=$(el).find("input").attr("data-src");
	console.log(value);
	if((required == "true" || required == true) && SAVEFLAG && value == "")
	{
		//没有选择
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	if(!!value)
	{
		return value;
	}else{
		return "";
	}
	
}
/*上传附件*/
GETCOMPONENTVAL.plugins["uploadfile"]=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).find(".component_title").text();
	var value=$(el).find("input").attr("data-src");
	
	if((required == "true" || required == true) && SAVEFLAG && value =="")
	{
		//没有选择
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	if(!!value)
	{
		return value;
	}else{
		return "";
	}
	
	
}

/*cascadedropdown*/
GETCOMPONENTVAL.plugins['cascadedropdown']=function(el){
		var required=$(el).attr("data-required");
		var component_title=$(el).find(".component_title").text();
		
		var parentvalue=$.trim($(el).find(".component_cascadedropdown_parent").text());
		var parentdefaultvalue=$.trim($(el).find(".dropdown_item_default").find("span").text());
		var parent_select_indx=$(el).find(".component_cascadedropdown_parent").attr("data-index");//获取一级选项的index，
		
		if((required == "true" || required == true) && parentvalue == parentdefaultvalue && SAVEFLAG)
		{
			//没有选择
			valiteModal("'"+component_title+"' 是必填项");
			return 'false';
		}
		if(parent_select_indx == "0" || parent_select_indx == "")
		{
			parentvalue='';
		}
		
		var childvalue=$.trim($(el).find(".component_cascadedropdown_child").text());
		var childdefaultvalue=$.trim($(el).find(".chiled_select_panel").find(".child_default_childitem").text());
		
		if((required == "true" || required == true) && childvalue == childdefaultvalue && SAVEFLAG)
		{
			//没有选择
			valiteModal("'"+component_title+"' 是必填项");
			return 'false';
		}
		if(childvalue == childdefaultvalue || childdefaultvalue == "")
		{
			childvalue="";
		}
		return {parentvalue:parentvalue,childvalue,childvalue,parentindex:parent_select_indx};
}

/*子表单*/
GETCOMPONENTVAL.plugins["table"]=function(el){
	var required=$(el).attr("data-required");
	var component_title=$(el).find(".component_title").text();
	 
	var objArray=[];
	var requiredflag=true;
	$(el).find(".row_item").each(function(index,row_el){
		var inputvalarr=[];
		$(row_el).find(".remove-disabled").each(function(input_index,input_el){
			var value=$.trim($(input_el).val());
			if((required == "true" || required == true) && value == "" && SAVEFLAG)
			{
				valiteModal("'"+component_title+"' 是必填项");
				requiredflag=false;
				return false;
			}
			inputvalarr.push(value);
		})
		objArray.push({index:index,valuelist:inputvalarr});
	})
	if(requiredflag)
	{
		return objArray;
	}else{
		return 'false';
	}
}

/*加强字段*/
GETCOMPONENTVAL.plugins["fieldtext"]=function(el){	
	var required="true";
	var component_title=$(el).find(".component_title").text();
	
	var value=$.trim($(el).find("input").val());
	if(value == ""&& SAVEFLAG)
	{
		valiteModal("'"+component_title+"' 是必填项");
		return 'false';
	}
	return value;
}