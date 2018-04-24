var FORMTYPE='';//-1全部，1居民通,0企业通
var ALLCOUNT=0;//所有条数
var NOWPAGE=1;//当前选择的页
var FORMID='';
var SEARCHFILEDVALUE="";
$(function() {
	//判断是企业通还是居民通，如果没有跳转到index页面
	FORMTYPE=sessionStorage.getItem("formType");
	if(!!FORMTYPE)
	{
		if(FORMTYPE == "0")
		{
			$(".title_name").text("政务表单简易填报系统(企业通)");
		}else if(FORMTYPE == "1")
		{
			$(".title_name").text("政务表单简易填报系统(居民通)");
		}
	}else{
		location.href="index.html";
	}
	FORMID=sessionStorage.getItem("formId");
	getfield(1);//获取加载字段
	
	//保存表单
	$(".btn-save").on("click", function() {
		var objArray = [];
		$("#target").find(".component").each(function(index, el) {
			var type = $(this).attr("data-type");
			//跳过标题控件
			if(type == "groupTitle")
			{
				return true;
			}
			var callbackobj = SAVE.plugins[type](el);
			var obj = new Object();
			obj[callbackobj.fieldId] = {
				fieldName: callbackobj.fieldName,
				type: type
			};

			objArray.push(obj);
		})
		var formEditContent = $(".container").html();
		var formName = $.trim($("#form_name").val());
		var formDescribe =$.trim($("#form_describe").val());
		if(formName == "")
		{
			formName="未命名表单";
		}
		$.ajax({
			type:"post",
			url:"../form/design/save",
			async:true,
			data:{
				formEditContent:formEditContent,
				formMeta:JSON.stringify(objArray),
				formType:FORMTYPE,
				formName:formName,
				formDescribe:formDescribe,
				formId:FORMID
			},
			success:function(data){
				console.log(data);
				if(data.success == true)
				{
					FORMID=data.returnValue;
					showtip(true,"保存成功");
				}else{
					showtip(false,data.errorReason);
				}
			}
		});
	});
	
	//选择加载字段
	$("#fildemodel").on("change",".field_select_check",function(){
		console.log($(this).is(':checked'));
		if($(this).is(':checked') == true)
		{
			
			var id=$(this).attr("data-id");
			var name=$(this).parent().parent().find(".field_name").text();
			var content=$(this).attr("data-content");
			var el="<div class='component item mt10' id='fieldtext"+id+"' data-id="+id+" data-type='fieldtext' >"
					+name
					+"</div>";
			$(".field_content").append(el);			
			
		}else{
			var id=$(this).attr("data-id");
			var el="#fieldtext"+id;
			$(el).remove();
		}
	})
	
	//点击加强字段按钮
	$(".add_filed").on('click',function(){
		$(".list_content").find(".field_select_check").each(function(index,el){
			var id=$(this).attr("data-id");
			if(isFieldchecked(id))
			{
				$(this).attr("checked","checked");
			}
			
		})
		$("#fildemodel").modal("show");
	})
	//查询加强字段
	$(".search_field_btn").on("click",function(){
		SEARCHFILEDVALUE=$.trim($(".search_field_input").val());
		getfield(1)//获取加强字段
	})
	
	
	//发布表单
	$("#publishForm").on("click",function(){
		$(".mask").show();
		var objArray = [];
		var formItems = new Array();
		var enhanceFields=[];//加强字段整理字段
		$("#target").find(".component").each(function(index, el) {
			formItems.push($(this).attr("id"));
			var type = $(this).attr("data-type");
			//跳过标题控件
			if(type == "groupTitle")
			{
				return true;
			}
			var callbackobj = SAVE.plugins[type](el);
			var obj = new Object();
			obj[callbackobj.fieldId] = {
				fieldName: callbackobj.fieldName,
				type: type
			};
			objArray.push(obj);
			
			//获取加强字段
			if(type == "fieldtext")
			{
				enhanceFields.push({id:$(this).attr("id"),fieldId:$(this).attr("field-dataid")});
			}
		})
		
		var container = $(".container");
		var editHtml =  container.html();
		//表单标题和描述调整
		var formName = $.trim($("#form_name").val());
		var formDescribe =$.trim($("#form_describe").val());
		if(formName == "")
		{
			formName="未命名表单";
		}
		savestate();
		var html = sessionStorage.getItem("newEditHtml");
		var formType=FORMTYPE;
		//console.log(enhanceFields);
	    var param;
        if(FORMID != null && FORMID != "null" && FORMID != ""){
            param = {
                html:html,
                formEditContent:editHtml,
                formMeta:JSON.stringify(objArray),
                formName:formName,
                formType:FORMTYPE,
                formItems:formItems.toString(),
                formDescribe:formDescribe,
                formId:FORMID,
                enhanceFields:JSON.stringify(enhanceFields)
            }
        }else{
            param = {
                html:html,
                formEditContent:editHtml,
                formMeta:JSON.stringify(objArray),
                formName:formName,
                formType:FORMTYPE,
                formItems:formItems.toString(),
                formDescribe:formDescribe,
                enhanceFields:JSON.stringify(enhanceFields)
            }
        }
        $.ajax({
                type:"post",
                url:"../form/design/publish",
                contentType: "application/x-www-form-urlencoded",
                dataType:"json",
                async:true,
                data:param,
                success:function(data){
                	$(".mask").hide();
                    if(data.success = true && data.returnValue != null && data.returnValue != ""){
                        sessionStorage.setItem("currentPublishFormId",data.returnValue);
                        window.location.href = "publishsuccess.html";
                    }else{
                    	showtip(false,data.errorReason);
                    	$(".container").html(sessionStorage.getItem("oldEditHtml"));
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                	$(".mask").hide();
                    alert(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText);
                }
            });
	})
	
	
	//点击返回按钮
	$(".back_btn").on("click",function(){
		var callback = getUrlParam("callback");
		if(callback == "index"){
            location.href = "index.html";
		}else {
            location.href="formbuildtype.html?formType="+FORMTYPE;
		}

	})
})

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

//获取加强字段
function getfield(page){
	$.ajax({
		url:"../fixation/list",
        type: "GET",
        async: false,
        data:{
        	page:page,
        	pageSize:5,
        	fixationFieldName:encodeURI(SEARCHFILEDVALUE),
        	formType:FORMTYPE,
        },
        success: function(data){
        	console.log(data)
        	if(data.success == true)
        	{
        		ALLCOUNT=data.returnValue.count;
        		NOWPAGE=page;
        		$("#fildemodel").find(".allcount").text(ALLCOUNT);
        		$(".sofupage").html("");
        		$(".sofupage").off();
        		$(".sofupage").SOFUPage({
						Style: "Twitter-red",
						NextPrev: false,
						FirstVal: '首页',
						LastVal:'末页',
						AllCount:ALLCOUNT,
						AllPage:Math.ceil(ALLCOUNT/5),
						NowPage:NOWPAGE,
						MaxShow: 3,
						PageCount: 5,
						Href: "javascript:getfield('{page}')",
						Target: "_self",
						IsCurAble: true,
						OnChange: function (page) {
							getfield(page);
						}
				});
				var returnValue=data.returnValue;
        		var list=returnValue.data;
        		var elcontent='';
        		if(list.length == 0)
        		{
        			$("#fildemodel").find(".nodata").show();
        		}else{
        			$("#fildemodel").find(".nodata").hide();
        		}
        		var elcontent="";
        		for(var i=0;i<list.length;i++)
        		{
        			var item=list[i];
        			var edit_content=JSON.stringify(item);
        			var checked="";
        			if(isFieldchecked(item.id))
        			{
        				//判断是否已经被选中
        				checked="checked";
        			}
        			elcontent+="<div class='item_box'>"
	        						+"<div class='width25'><input type='checkbox'  class='field_select_check' data-id='"+item.id+"' data-content='"+edit_content+"' "+checked+"/></div>"
	        						+"<div class='field_name width75'>"+item.fixationFieldName+"</div>"
        						+"</div>";
        		}
        		$("#fildemodel").find(".list_content").html(elcontent);
        		
        	}else{
        		console.log("报错");
        	}
        }
    })    
}
//判断加强字段是否已经被选中
function isFieldchecked(id){
	var flag=false;
	$(".field_content").find(".component").each(function(index,el){
		var selectid=$(this).attr("data-id");
		if(id == selectid)
		{
			flag=true;
		}
	})
	return flag;
}

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
