/*创建加强字段*/
var FORMTYPE='-1';//-1全部，1居民通,0企业通
var ALLCOUNT=0;//所有条数
var NOWPAGE=1;//当前选择的页
var SEARCHVALUE='';//查询的内容
$(function(){
	pageInit(1);
})
function pageInit(page){
	$.ajax({
		url:"../fixation/list",
        type: "GET",
        async: false,
        data:{
        	page:page,
        	pageSize:10,
        	fixationFieldName:encodeURI(SEARCHVALUE),
        	formType:FORMTYPE,
        },
        success: function(data){
        	//console.log(data);
        	if(data.success == true)
        	{
        		ALLCOUNT=data.returnValue.count;
        		NOWPAGE=page;
        		$(".allcount").text(ALLCOUNT);
        		$("#sofupage").html("");
        		$("#sofupage").off();
        		$("#sofupage").SOFUPage({
						Style: "Twitter-red",
						NextPrev: false,
						FirstVal: '首页',
						LastVal:'末页',
						AllCount:ALLCOUNT,
						AllPage:Math.ceil(ALLCOUNT/10),
						NowPage:NOWPAGE,
						MaxShow: 5,
						PageCount: 10,
						Href: "javascript:pageInit('{page}')",
						Target: "_self",
						IsCurAble: true,
						OnChange: function (page) {
							pageInit(page);
						}
				});
        		
        		
        		var returnValue=data.returnValue;
        		var list=returnValue.data;
        		var elcontent='';
        		if(list.length == 0)
        		{
        			$(".nodata").show();
        		}else{
        			$(".nodata").hide();
        		}
        		for(var i=0;i<list.length;i++)
        		{
        			var item=list[i];
        			var formType='';
        			if(item.formType == "1")
        			{
        				formType="居民通";
        			}else if(item.formType == "0"){
        				formType="企业通";
        			}
        			var subscribe='';
        			if(item.subscribe == '0')
        			{
        				subscribe="否";
        			}else{
        				subscribe="是";
        			}
        			var edit_content=JSON.stringify(item);
        			
        			elcontent+="<div class='item_box'>"
	        						+"<div class='col-xs-3 color_508bea'>"+item.fixationFieldName+"</div>"
	        						+"<div class='col-xs-1 color_666'>"+formType+"</div>"
	        						+"<div class='col-xs-2 color_666'>"+item.apiUrl+"</div>"
	        						+"<div class='col-xs-1 color_666'>"+item.apiModelId+"</div>"
	        						+"<div class='col-xs-1 color_666'>"+item.apiField+"</div>"
	        						+"<div class='col-xs-1 color_666'>"+subscribe+"</div>"
	        						+"<div class='col-xs-3 color_666'>"
		        						+"<a class='edit_btn' data-content='"+edit_content+"'>修改</a>"
		        						+"<span class='a_line'>|</span>"
		        						+"<a class='delete_btn' data-id='"+item.id+"'>删除</a>"
		        					+"</div>"
		        				+"</div>";	
        		}
        		
        		$(".list_content").html(elcontent);
        		
        	}else{
        		showValiteModal(data.errorReason);
        	}
        }
	})
}
//切换平台类型的时候
$(".select_formtype").on("change",function(){
	FORMTYPE=$(this).val();
	SEARCHVALUE='';
	pageInit(1);
})
//增加字段
$(".add_filed_btn").on("click",function(){

	var formType=$.trim($(".add_formtype").val());
	var fixationFieldName=$.trim($('.add_fixationFieldName').val());
	var apiModelId=$.trim($(".add_apiModelId").val());
	var apiUrl=$.trim($(".add_apiUrl").val());
	var apiField=$.trim($(".add_apiField").val());
	var subscribe=$.trim($(".add_subscribe").val());
	if(fixationFieldName == "")
	{
		showValiteModal("加强字段名称不能为空");
		return false;
	}
	if(apiModelId == "")
	{
		showValiteModal("模型ID不能为空");
		return false;
	}
	if(apiUrl == "")
	{
		showValiteModal("接口URL不能为空");
		return false;
	}else if(!isURL(apiUrl))
	{
		
		showValiteModal("接口URL格式不对");
		return false;
	}
	
	if(apiField == "")
	{
		
		showValiteModal("接口字段不能为空");
		return false;
	}
	//判断字段名不能有中文
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(apiField) == true)
	{
		showValiteModal("接口字段名格式不对");
		return false;
	}

	$(".mask").show();
	$.ajax({
		type:"post",
		url:"../fixation/add",
		async:true,
		data:{
			formType:formType,
			fixationFieldName:fixationFieldName,
			apiModelId:apiModelId,
			apiUrl:apiUrl,
			apiField:apiField,
			subscribe:subscribe
		},
		success:function(data){
			$(".mask").hide();
			if(data.success == true)
			{
				$("#createaccount").modal("hide");
				showtip(true,"创建成功");
				SEARCHVALUE='';
				pageInit(1);
				$('.add_fixationFieldName').val("");
				$(".add_apiModelId").val("");
				$(".add_apiUrl").val("");
				$(".add_apiField").val("");
			}else{
				showValiteModal(data.errorReason);
			}
		}
	});
	
})

//修改字段
$(".list_content").on("click",".edit_btn",function(){
	var item=JSON.parse($(this).attr("data-content"));
	
	$(".edit_fixationFieldName").val(item.fixationFieldName);
	$(".edit_apiUrl").val(item.apiUrl);
	$(".edit_apiModelId").val(item.apiModelId);
	$(".edit_apiField").val(item.apiField);
	$(".edit_id").val(item.id);
	
	if(item.formType == "1")
	{
		$(".edit_formtype").find("option[value='1']").attr("selected",true); 
	}else if(item.formType == "0"){
		$(".edit_formtype").find("option[value='0']").attr("selected",true);
	}
	if(item.subscribe == '0')
	{
		$(".edit_subscribe").find("option[value='0']").attr("selected",true);
	}else if(item.subscribe == '1')
	{
		$(".edit_subscribe").find("option[value='1']").attr("selected",true);
	}
	
	$("#edit_field").modal("show");
})

//修改字段的时候保存
$(".edit_filed_btn").on("click",function(){
	var formType=$.trim($(".edit_formtype").val());
	var fixationFieldName=$.trim($('.edit_fixationFieldName').val());
	var apiModelId=$.trim($(".edit_apiModelId").val());
	var apiUrl=$.trim($(".edit_apiUrl").val());
	var apiField=$.trim($(".edit_apiField").val());
	var subscribe=$.trim($(".edit_subscribe").val());
	var id=$.trim($(".edit_id").val());
	
	if(fixationFieldName == "")
	{
		showValiteModal("加强字段名称不能为空");
		return false;
	}
	if(apiModelId == "")
	{
		showValiteModal("模型ID不能为空");
		return false;
	}
	if(apiUrl == "")
	{
		showValiteModal("接口URL不能为空");
		return false;
	}else if(!isURL(apiUrl))
	{
		
		showValiteModal("接口URL格式不对");
		return false;
	}
	
	if(apiField == "")
	{
		
		showValiteModal("接口字段不能为空");
		return false;
	}
	//判断字段名不能有中文
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(apiField) == true)
	{
		showValiteModal("接口字段名格式不对");
		return false;
	}
	
	$(".mask").show();
	$.ajax({
		type:"put",
		url:"../fixation/update",
		async:true,
		data:{
			formType:formType,
			fixationFieldName:fixationFieldName,
			apiModelId:apiModelId,
			apiUrl:apiUrl,
			apiField:apiField,
			subscribe:subscribe,
			id:id
		},
		success:function(data){
			if(data.success == true)
			{
				$(".mask").hide();
				$("#edit_field").modal("hide");
				showtip(true,"修改成功");
				SEARCHVALUE='';
				pageInit(NOWPAGE);
			}else{
				showValiteModal(data.errorReason);
			}
		}
	});
})

//点击删除,弹出模态框
$(".list_content").on("click",".delete_btn",function(){
	var id=$(this).attr("data-id");
	$("#dialog_delete").find(".dialog_delete_btn").attr("data-id",id);
	$("#dialog_delete").modal("show");
	
})
//点击删除
$("#dialog_delete").on("click",".dialog_delete_btn",function(){
	var id=$(this).attr("data-id");
	$.ajax({
		type:"delete",
		url:"../fixation/delete/"+id,
		async:true,
		success:function(data){
			console.log(data);
			if(data.success == true)
			{
				SEARCHVALUE='';
				pageInit(1);
				$("#dialog_delete").modal("hide");
				showtip(true,"删除成功");
			}else{
				showValiteModal(data.errorReason);
			}
		}
	});
})
//查询
$(".search_btn").on("click",function(){
	SEARCHVALUE=$.trim($(".search_val").val());
	pageInit(1);
})

//弹出验证模态框
function showValiteModal(text){
	$("#valiteModal").find(".txt_tip").text(text);
	$("#valiteModal").modal("show");
	$('#valiteModal').css({"z-index":"1052"});
	$('#valiteModal').siblings(".modal-backdrop:last").css({"z-index":"1051"});
}
//判断url格式是否正确
function isURL(str_url) {// 验证url  
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"  
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@  
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
    + "|" // 允许IP和DOMAIN（域名）  
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
    + "[a-z]{2,6})" // first level domain- .com or .museum  
    + "(:[0-9]{1,4})?" // 端口- :80  
    + "((/?)|" // a slash isn't required if there is no file name  
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  
    var re = new RegExp(strRegex);  
    return re.test(str_url);  
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