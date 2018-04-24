/*radio控件*/
LPB.plugins['radio'] = function (active_component) {
	console.log(active_component);
	var plugins = 'radio';
	var aline_type="portrait";//portrait纵向 horizontal横向
	
	
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	var optionlistStr='';
	$(active_component).find(".radio").each(function(index,el){
		var checked='';
		if(!!$(this).find("input").attr("checked"))
		{
			checked="checked";
		}
		var value=$(this).find("input").val();
		optionlistStr+="<li class='mt10 radio_edit_optionitem'>"
							+"<input type='radio'  "+checked+" class='radio_edit' name='radio_edit' data-toggle='tooltip' data-placement='bottom' title='设为默认'/>"
							+"<input type='text' class='option_value'  placeholder='选项' value='"+value+"'/>"
							+"<i class='fa fa-plus-circle radio_add_option'></i>"
							+"<i class='fa fa-minus-circle radio_minus_option'></i>"
							+"<p class='error_tip'>选项不能为空</p>"
						+"</li>";
						
		})
	
	if($(active_component).find(".radio").hasClass("horizontal_array"))
	{
		aline_type="horizontal";
		$("#editComponent").find(".portrait_btn").removeClass("select_aline");
		$("#editComponent").find(".horizontal_btn").addClass("select_aline");
		
	}else{
		aline_type="portrait";
		$("#editComponent").find(".horizontal_btn").removeClass("select_aline");
		$("#editComponent").find(".portrait_btn").addClass("select_aline");
	}
	
	
	//获取编辑页面
 	var editPage = $("#editComponent");
 	
	$(editPage).find(".component_title").val(title);//标题
	$(editPage).find(".optionlist").html(optionlistStr);//选项列表
	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
	
	
	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	
	
	//添加选项
	$(editPage).on("click",".radio_add_option",function(){
		var index=$(this).index(".radio_add_option");//要插入的索引地方
		
		$(this).parent().parent().find(".radio_minus_option:first").show();
		
		var el='<li class="mt10">'
					+'<input type="radio" class="radio_edit" name="radio_edit" data-toggle="tooltip" data-placement="bottom" title="设为默认"/>'
					+'<input type="text" class="option_value" placeholder="选项" value=""/>'
					+'<i class="fa fa-plus-circle radio_add_option"></i>'
					+'<i class="fa fa-minus-circle radio_minus_option"></i>'
					+'<p class="error_tip">选项不能为空</p>'
				+'</li>';
		
		$(this).parent().after(el);
		
		//添加的排列方式
		var horizontalclass='';
		if(aline_type == "horizontal")
		{
			horizontalclass="horizontal_array";
		}
		
		var componentEl='<div class="radio  '+horizontalclass+'">'
							+'<label>'
								+'<input class="remove-disabled" type="radio" name="optionsRadios"  value="选项" disabled>'
								+"<span>选项</span> "
							+'</label>'
						+'</div>';
		$($(active_component).find(".radio")[index]).after(componentEl);
		
	})
	
	//删除选项
	$(editPage).on("click",".radio_minus_option",function(){
		var index=$(this).index(".radio_minus_option");//要删除的索引地方
		
		if($(this).parent().parent().find("li").length == 2)
		{
			$(this).parent().parent().find(".radio_minus_option:first").hide();
		}
		
		$(this).parent().remove();
		$($(active_component).find(".radio")[index]).remove();
		
	})
	
	//选项输入框失去焦点
	$(editPage).on("blur",".option_value",function(){
		var index=$(this).index(".option_value");//索引位置
		var value=$(this).val();
		if(value == "")
		{
			$(this).parent().parent().find(".error_tip").eq(index).show();
			$(this).parent().css({
				'height':"50px"
			})
			return false;
		}else{
			$(this).parent().parent().find(".error_tip").eq(index).hide();
			$(this).parent().css({
				'height':"30px"
			})
		}
		
		$($(active_component).find(".radio")[index]).find("input").val(value);
		$($(active_component).find(".radio")[index]).find("span").text(value);
	})
	$(editPage).on("focus",".option_value",function(){
		var value=$(this).val();
		if(value == "选项")
		{
			$(this).val("");
		}
	})
	
	
	
	//单选框选中设置默认值
	$(editPage).on("change",".radio_edit",function(){
		var index=$(this).index(".radio_edit");//索引位置
		
		$(active_component).find("input").removeAttr("checked");
		$($(active_component).find(".radio")[index]).find("input").attr("checked","checked");
	})
	
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
	
	//纵向排列
	$(editPage).on("click",".portrait_btn",function(){
		$(editPage).find(".horizontal_btn").removeClass("select_aline");
		$(this).addClass("select_aline");
		$(active_component).find(".radio").removeClass("horizontal_array");
		aline_type="portrait";
	})
	//横向排列
	$(editPage).on("click",".horizontal_btn",function(){
		$(editPage).find(".portrait_btn").removeClass("select_aline");
		$(this).addClass("select_aline");
		$(active_component).find(".radio").addClass("horizontal_array");
		aline_type="horizontal";
	})
}

/*checkbox控件*/
LPB.plugins['checkbox'] = function (active_component) {
	
	var plugins = 'checkbox';
	var aline_type="portrait";//portrait纵向 horizontal横向
	
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	var optionlistStr='';
	$(active_component).find(".checkbox").each(function(index,el){
		var checked='';
		if(!!$(this).find("input").attr("checked"))
		{
			checked="checked";
		}
		var value=$(this).find("input").val();
		optionlistStr+="<li class='mt10 checked_edit_optionitem'>"
							+"<input type='checkbox'  "+checked+" class='checked_edit' name='checked_edit' data-toggle='tooltip' data-placement='bottom' title='设为默认'/>"
							+"<input type='text' class='option_value'  placeholder='选项' value='"+value+"'/>"
							+"<i class='fa fa-plus-circle checked_add_option'></i>"
							+"<i class='fa fa-minus-circle checked_minus_option'></i>"
							+"<p class='error_tip'>选项不能为空</p>"
						+"</li>";
						
		})
	//布局
	if($(active_component).find(".checkbox").hasClass("horizontal_array"))
	{
		aline_type="horizontal";
		$("#editComponent").find(".portrait_btn").removeClass("select_aline");
		$("#editComponent").find(".horizontal_btn").addClass("select_aline");
		
	}else{
		aline_type="portrait";
		$("#editComponent").find(".horizontal_btn").removeClass("select_aline");
		$("#editComponent").find(".portrait_btn").addClass("select_aline");
	}
	//最少选择项和最多选择项
	var pluginsMinlength=$(active_component).attr("data-minlength");
	var pluginsMaxlength=$(active_component).attr("data-maxlength");
	
	
	//获取编辑页面
 	var editPage = $("#editComponent");
 	
	$(editPage).find(".component_title").val(title);//标题
	$(editPage).find(".optionlist").html(optionlistStr);//选项列表
	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
	
	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	//设置最多选项和最少选项
	if(pluginsMinlength!='')
	{
		$(editPage).find(".minlength_check").attr("checked","checked");
		$(editPage).find(".minlength_val").val(pluginsMinlength);
	}
	if(pluginsMaxlength !='')
	{
		$(editPage).find(".maxlength_check").attr("checked","checked");
		$(editPage).find(".maxlength_val").val(pluginsMaxlength);
	}
	
	//添加选项
	$(editPage).on("click",".checked_add_option",function(){
		var index=$(this).index(".checked_add_option");//要插入的索引地方
		
		$(this).parent().parent().find(".checked_minus_option:first").show();
		
		var el='<li class="mt10">'
					+'<input type="checkbox" class="checked_edit" name="checked_edit" data-toggle="tooltip" data-placement="bottom" title="设为默认"/>'
					+'<input type="text" class="option_value" placeholder="选项" value=""/>'
					+'<i class="fa fa-plus-circle checked_add_option"></i>'
					+'<i class="fa fa-minus-circle checked_minus_option"></i>'
					+'<p class="error_tip">选项不能为空</p>'
				+'</li>';
		
		$(this).parent().after(el);
		
		//添加的排列方式
		var horizontalclass='';
		if(aline_type == "horizontal")
		{
			horizontalclass="horizontal_array";
		}
		
		var componentEl='<div class="checkbox  '+horizontalclass+'">'
							+'<label>'
								+'<input class="remove-disabled" type="checkbox" name="optionsRadios"  value="选项" disabled>'
								+"<span>选项</span> "
							+'</label>'
						+'</div>';
		$($(active_component).find(".checkbox")[index]).after(componentEl);
		
	})
	
	
	//删除选项
	$(editPage).on("click",".checked_minus_option",function(){
		var index=$(this).index(".checked_minus_option");//要删除的索引地方
		
		if($(this).parent().parent().find("li").length == 2)
		{
			$(this).parent().parent().find(".checked_minus_option:first").hide();
		}
		
		$(this).parent().remove();
		$($(active_component).find(".checkbox")[index]).remove();
		
	})
	
	
	//选项输入框失去焦点
	$(editPage).on("blur",".option_value",function(){
		var index=$(this).index(".option_value");//索引位置
		var value=$(this).val();
		if(value == "")
		{
			$(this).parent().parent().find(".error_tip").eq(index).show();
			$(this).parent().css({
				'height':"50px"
			})
			return false;
		}else{
			$(this).parent().parent().find(".error_tip").eq(index).hide();
			$(this).parent().css({
				'height':"30px"
			})
		}
		
		$($(active_component).find(".checkbox")[index]).find("input").val(value);
		$($(active_component).find(".checkbox")[index]).find("span").text(value);
	})
	$(editPage).on("focus",".option_value",function(){
		var value=$(this).val();
		if(value == "选项")
		{
			$(this).val("");
		}
	})
	
	
	//单选框选中设置默认值
	$(editPage).on("change",".checked_edit",function(){
		var index=$(this).index(".checked_edit");//索引位置
		
		if($(this).is(":checked"))
		{
			$($(active_component).find(".checkbox")[index]).find("input").attr("checked","checked");
		}else{
			$($(active_component).find(".checkbox")[index]).find("input").removeAttr("checked");
		}
		
	})
	
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
	
	//纵向排列
	$(editPage).on("click",".portrait_btn",function(){
		$(editPage).find(".horizontal_btn").removeClass("select_aline");
		$(this).addClass("select_aline");
		$(active_component).find(".checkbox").removeClass("horizontal_array");
		aline_type="portrait";
	})
	//横向排列
	$(editPage).on("click",".horizontal_btn",function(){
		$(editPage).find(".portrait_btn").removeClass("select_aline");
		$(this).addClass("select_aline");
		$(active_component).find(".checkbox").addClass("horizontal_array");
		aline_type="horizontal";
	})
	
	//最少选择项checkbox
	$(editPage).on("change",".minlength_check",function(){
		
		//判读是否选择了最多项
		var maxlength='';
		if($(editPage).find(".maxlength_check").is(":checked") && islengthvalue($(editPage).find(".maxlength_val").val()))
		{
			maxlength=islengthvalue($(editPage).find(".maxlength_val").val());
		}
		
		
		if($(this).is(":checked"))
		{
			var value=Number($(editPage).find(".minlength_val").val());
			if(!isNaN(value))
			{
				//是纯数字
				//如果小于0置为空
				if(value<=0)
				{
					value='';
				}
				
			}else{
				value='';
			}
			
			
			if(value != '')
			{
				if(maxlength == '')
				{
					var text="(最少选"+value+"项)";
					$(active_component).find(".checkbox_select_num").text(text);
					$(active_component).attr("data-minlength",value);
				}else{
					var text="(选"+value+"-"+maxlength+"项)";
					$(active_component).find(".checkbox_select_num").text(text);
					$(active_component).attr("data-minlength",value);
				}
				
				
			}else{
				if(maxlength == '')
				{
					$(active_component).find(".checkbox_select_num").text("");
					$(active_component).attr("data-minlength","");
				}else{
					var text="(最多选"+maxlength+"项)";
					$(active_component).find(".checkbox_select_num").text(text);
					$(active_component).attr("data-minlength","");
				}
				
			}
			
		}else{
			//取消
			if(maxlength == '')
			{
				$(active_component).find(".checkbox_select_num").text("");
				$(active_component).attr("data-minlength","");
			}else{
				var text="(最多选"+maxlength+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(active_component).attr("data-minlength","");
			}
		}
	})
	//最少选择项input
	$(editPage).on("blur",".minlength_val",function(){
		
		//判读是否选择了最多项
		var maxlength='';
		if($(editPage).find(".maxlength_check").is(":checked") && islengthvalue($(editPage).find(".maxlength_val").val()))
		{
			maxlength=islengthvalue($(editPage).find(".maxlength_val").val());
		}
		
		var value=Number($(this).val());
		if(!isNaN(value))
		{
			//是纯数字
			//如果小于0置为空
			if(value<=0)
			{
				value='';
			}
		}else{
			value='';
		}
		
		if(value != '')
		{
			if(maxlength == '')
			{
				var text="(最少选"+value+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(editPage).find(".minlength_check").attr("checked","checked");
				$(active_component).attr("data-minlength",value);
			}else{
				var text="(选"+value+"-"+maxlength+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(editPage).find(".minlength_check").attr("checked","checked");
				$(active_component).attr("data-minlength",value);
			}
			
			
		}else{
			if(maxlength == '')
			{
				$(active_component).find(".checkbox_select_num").text("");
				$(active_component).attr("data-minlength","");
			}else{
				var text="(最多选"+maxlength+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(editPage).find(".minlength_check").removeAttr("checked");
				$(active_component).attr("data-minlength","");
			}
			
		}
		
	})
	
	
	//最多选择项checkbox
	$(editPage).on("change",".maxlength_check",function(){
		
		//判断是否选了最少选项
		var minlength='';
		if($(editPage).find(".minlength_check").is(":checked") && islengthvalue($(editPage).find(".minlength_val").val()))
		{
			minlength=islengthvalue($(editPage).find(".minlength_val").val());
		}
		
		if($(this).is(":checked"))
		{
			var value=Number($(editPage).find(".maxlength_val").val());
			if(!isNaN(value))
			{
				//是纯数字
				//如果小于0置为空
				if(value<=0)
				{
					value='';
				}
				
			}else{
				value='';
			}
			
			if(value != '')
			{
				
				if(minlength == "")
				{
					var text="(最多选"+value+"项)";
					$(active_component).find(".checkbox_select_num").text(text);
					$(active_component).attr("data-maxlength",value);
				}else{
					var text="(选"+minlength+"-"+value+"项)";
					$(active_component).find(".checkbox_select_num").text(text);
					$(active_component).attr("data-maxlength",value);
				}
				
			}else{
				
				if(minlength == "")
				{
					$(active_component).find(".checkbox_select_num").text("");
					$(active_component).attr("data-maxlength","");
				}else{
					var text="(最少选"+minlength+"项)";
					$(active_component).find(".checkbox_select_num").text(text);
					$(active_component).attr("data-maxlength","");
				}
				
			}
			
		}else{
			//取消
			if(minlength == "")
			{
				$(active_component).find(".checkbox_select_num").text("");
				$(active_component).attr("data-maxlength","");
			}else{
				var text="(最少选"+minlength+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(active_component).attr("data-maxlength","");
			}
			
		}
	})
	//最多选项input
	$(editPage).on("blur",".maxlength_val",function(){
		
		//判断是否选了最少选项
		var minlength='';
		if($(editPage).find(".minlength_check").is(":checked") && islengthvalue($(editPage).find(".minlength_val").val()))
		{
			minlength=islengthvalue($(editPage).find(".minlength_val").val());
		}
		
		var value=Number($(this).val());
		if(!isNaN(value))
		{
			//是纯数字
			//如果小于0置为空
			if(value<=0)
			{
				value='';
			}
		}else{
			value='';
		}
		
		if(value != '')
		{
			
			if(minlength == "")
			{
				var text="(最多选"+value+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(editPage).find(".maxlength_check").attr("checked","checked");
				$(active_component).attr("data-maxlength",value);
			}else{
				var text="(选"+minlength+"-"+value+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(editPage).find(".maxlength_check").attr("checked","checked");
				$(active_component).attr("data-maxlength",value);
			}
			
		}else{
			if(minlength == "")
			{
				$(active_component).find(".checkbox_select_num").text("");
				$(editPage).find(".maxlength_check").removeAttr("checked");
				$(active_component).attr("data-maxlength","");
			}else{
				var text="(最少选"+minlength+"项)";
				$(active_component).find(".checkbox_select_num").text(text);
				$(editPage).find(".maxlength_check").removeAttr("checked");
				$(active_component).attr("data-maxlength","");
			}
			
		}
	})
	
	//判读最多项和最少项的输入值是否正确
	function islengthvalue(val){
		 var value=Number(val);
		 if(!isNaN(value))
		{
			//是纯数字
			//如果小于0置为空
			if(value<=0)
			{
				return false;
			}
		}else{
			return false;
		}
		
		return val;
	}
}

/*下拉框*/
LPB.plugins['dropdown'] = function (active_component) {
	var plugins = 'dropdown';
	
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	var optionlistStr='';
	$(active_component).find(".dropdown_item").each(function(index,el){
		var checked='';//默认项
		if($(this).hasClass("dropdown_selected"))
		{
			checked="checked";
		}
		var value=$(this).text();
		optionlistStr+="<li class='mt10'>"
							+"<input type='radio' "+checked+" class='radio_edit' name='radio_edit' data-toggle='tooltip' data-placement='bottom' title='设为默认'/>"
							+"<input type='text' class='option_value' placeholder='选项' value='"+value+"'/>"
							+"<i class='fa fa-plus-circle radio_add_option'></i>"
							+"<i class='fa fa-minus-circle radio_minus_option'></i>"
							+"<p class='error_tip'>选项不能为空</p>"
						+"</li>";
	})
	
	var component_dropdown_prompt=$.trim($(active_component).find(".component_dropdownbtn").text());//默认显示的文案
	var data_width=$(active_component).attr("data-width");
	var new_rowflg=$(active_component).hasClass("new_row");
	//获取编辑页面
 	var editPage = $("#editComponent");
 	$(editPage).find(".component_title").val(title);//标题
 	$(editPage).find(".optionlist").html(optionlistStr);//选项列表
 	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
	
	$(editPage).find(".component_dropdown_prompt").val(component_dropdown_prompt);
	//判断是否设置了宽度
	if(data_width != "")
	{
		$(editPage).find(".layout_checkbox").attr("checked","checked");
		$(editPage).find(".select_layout_btn").find("option[value='"+data_width+"']").attr("selected",true);
	}
	//判断是否选择了新起一行
	if(!!new_rowflg)
	{
		$(editPage).find(".new_row_box").show();
		$(editPage).find(".new_row_checkbox").attr("checked","checked");
	}
	
	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	
	
	
	//添加选项
	$(editPage).on("click",".radio_add_option",function(){
		var index=$(this).index(".radio_add_option");//要插入的索引地方
		
		$(this).parent().parent().find(".radio_minus_option:first").show();
		
		var el='<li class="mt10">'
					+'<input type="radio" class="radio_edit" name="radio_edit" data-toggle="tooltip" data-placement="bottom" title="设为默认"/>'
					+'<input type="text" class="option_value" placeholder="选项" value=""/>'
					+'<i class="fa fa-plus-circle radio_add_option"></i>'
					+'<i class="fa fa-minus-circle radio_minus_option"></i>'
					+'<p class="error_tip">选项不能为空</p>'
				+'</li>';
		
		$(this).parent().after(el);

		var componentEl="<li class='dropdown_item dropdown_item_el component_dropdownbtn_el'>选项</li>";
		$($(active_component).find(".dropdown_item")[index]).after(componentEl);
		
	})
	
	//删除选项
	$(editPage).on("click",".radio_minus_option",function(){
		var index=$(this).index(".radio_minus_option");//要删除的索引地方
		
		if($(this).parent().parent().find("li").length == 2)
		{
			$(this).parent().parent().find(".radio_minus_option:first").hide();
		}
		
		$(this).parent().remove();
		$($(active_component).find(".dropdown_item")[index]).remove();
		//判断是否是被设置为默认值的，如果被设置成默认值的，要修改默认值
		if($(this).parent().find(".radio_edit").is(":checked"))
		{
			$(active_component).attr("data-default-selected","");
		}
	})
	
	//选项输入框失去焦点
	$(editPage).on("blur",".option_value",function(){
		var index=$(this).index(".option_value");//索引位置
		var value=$(this).val();
		//判断是否是被设置为默认值的，如果被设置成默认值的，要修改默认值
		if($(this).parent().find(".radio_edit").is(":checked"))
		{
			$(active_component).attr("data-default-selected",value);
		}
		
		if(value == "")
		{
			$(this).parent().parent().find(".error_tip").eq(index).show();
			$(this).parent().css({
				'height':"50px"
			})
			return false;
		}else{
			$(this).parent().parent().find(".error_tip").eq(index).hide();
			$(this).parent().css({
				'height':"30px"
			})
		}
		
		$($(active_component).find(".dropdown_item")[index]).text(value);
	})
	$(editPage).on("focus",".option_value",function(){
		var value=$(this).val();
		if(value == "选项")
		{
			$(this).val("");
		}
	})
	
	
	//单选框选中设置默认值
	$(editPage).on("change",".radio_edit",function(){
		var index=$(this).index(".radio_edit");//索引位置
		
		var value=$(this).parent().find(".option_value").val();
		$(active_component).attr("data-default-selected",value);
	})
	
	//自定义选择默认文案
	$(editPage).on("blur",".component_dropdown_prompt",function(){
		
		var value=$.trim($(this).val());
		if(value == "")
		{
			$(active_component).find(".component_dropdownbtn").text("请选择");
			$(active_component).find(".dropdown_item_default").text("请选择");
		}else{
			$(active_component).find(".component_dropdownbtn").text(value);
			$(active_component).find(".dropdown_item_default").text(value);
		}
		
	})
	
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
	
	//宽度占用整行的checkbox
	$(editPage).on("change",".layout_checkbox",function(){
		var value=$(this).parent().find("select").val();
		if($(this).is(":checked"))
		{
			if(value == '')
			{
				$(active_component).css({
					'width':'100%'
				})
				$(active_component).attr("data-width","");
			}else{
				$(active_component).css({
					'width':Number(value)*100+"%"
				})
				$(active_component).attr("data-width",value);
			}
			$(editPage).find(".new_row_box").show();
		}else{
			$(active_component).css({
				'width':'100%'
			})
			$(active_component).attr("data-width","");
			$(editPage).find(".new_row_box").hide();
			$(editPage).find(".new_row_checkbox").removeAttr("checked");
			$(active_component).removeClass("new_row");
		}
	})
	
	//选择宽度变化时触发
	$(editPage).on("change",".select_layout_btn",function(){
		var value=$(this).val();
		if(value == "")
		{
			$(editPage).find(".layout_checkbox").removeAttr("checked");
			$(active_component).css({
				'width':'100%'
			})
			$(active_component).attr("data-width","");
			$(editPage).find(".new_row_box").hide();
			$(editPage).find(".new_row_checkbox").removeAttr("checked");
			$(active_component).removeClass("new_row");
			
		}else{
			$(editPage).find(".layout_checkbox").attr("checked","checked");
			$(active_component).css({
					'width':Number(value)*100+"%"
			})
			$(active_component).attr("data-width",value);
			$(editPage).find(".new_row_box").show();
		}
	})
	
	//新起一行
	$(editPage).on("change",".new_row_checkbox",function(){
		if($(this).is(":checked"))
		{
			$(active_component).addClass("new_row");
		}else{
			$(active_component).removeClass("new_row");
		}
	})
}
/*上传图片*/
LPB.plugins['uploadimg']=function(active_component){
	var plugins = 'uploadimg';
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	
	
	//获取编辑页面
 	var editPage = $("#editComponent");
 	$(editPage).find(".component_title").val(title);//标题
 	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
	
	
	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
}
/*上传附件*/
LPB.plugins['uploadfile']=function(active_component){
	var plugins = 'uploadfile';
	
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	
	
	//获取编辑页面
 	var editPage = $("#editComponent");
 	$(editPage).find(".component_title").val(title);//标题
 	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
	
	
	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
}

/*两级下拉框*/
LPB.plugins['cascadedropdown']=function(active_component){
	var plugins = 'cascadedropdown';
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	
	var parent_prompt=$.trim($(active_component).find(".component_cascadedropdown_parent").text());//一级默认文案
	var child_prompt=$.trim($(active_component).find(".component_cascadedropdown_child").text());//二级文案
	var parentItem='';
	var childItem='';
	$(active_component).find(".cascadedropdown_parent_item").each(function(index,el){
		
		if(!$(this).hasClass("dropdown_item_default"))
		{
			parentItem+="<div class='cascade_item'>"
					+"<div class='optionlist_parent'>"
						+"<span class='parent_choice_value'>"+$(el).find("span").text()+"</span>" 
						+"<input  class='parent_option_value' type='text' placeholder='一级选项' value='"+$(el).find("span").text()+"'/>"
						+"<i class='fa fa-plus-circle parent_add_option'></i>"
						+"<i class='fa fa-minus-circle parent_minus_option'></i>"
						+"<p class='error_tip'>选项不能为空</p>"
					+"</div>";
		
			childItem="<ul class='optionlist_child'>";
			$(el).find(".child_item").each(function(index,el){
				childItem+="<li>"
							+"<input class='child_option_value' type='text' placeholder='二级选项' value='"+$(el).text()+"' data-cache='"+$(el).text()+"'/>"
							+"<i class='fa fa-plus-square-o child_add_option'></i>"
							+"<i class='fa fa-minus-square-o child_minus_option'></i>"
							+"<p class='error_tip'>选项不能为空</p>"
						+"</li>";
			})
			childItem+="</ul>";
			parentItem=parentItem+childItem+"</div>";
		}
			
	})
		
	
	
	//获取编辑页面
 	var editPage = $("#editComponent");
	$(editPage).find(".component_title").val(title);//标题
	$(editPage).find(".optionlist").html(parentItem);//选项列表
	$(editPage).find(".parent_prompt").val(parent_prompt);
	$(editPage).find(".child_prompt").val(child_prompt);
	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
	
	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	
	//点击父选项,切换父选项
	$(editPage).on("click",".cascade_item",function(e){
		
		$(editPage).find(".error_tip").hide();
		
		var choice_value=$(this).find(".parent_choice_value").text();
		$(this).find(".parent_option_value").val(choice_value);
		
		$(editPage).find(".child_option_value").each(function(){
			$(this).val($(this).attr("data-cache"));
		})
		
		
		$(editPage).find(".cascade_item").removeClass("expand");
		$(this).addClass("expand");
	})
	
	//编辑一级的选项
	$(editPage).on("blur",".parent_option_value",function(){
		var value=$(this).val();
		var index=$(this).index(".parent_option_value");//获取index位置
		if(value == "")
		{
			$(this).parent(".optionlist_parent").find(".error_tip").show();
			return false;
		}else{
			$(this).parent(".optionlist_parent").find(".error_tip").hide();
		}
		$(this).parent(".optionlist_parent").find(".parent_choice_value").text(value);
		
		$($(active_component).find(".cascadedropdown_parent_item")[index+1]).find("span").text(value);
	})
	//一级的选项获取焦点
	$(editPage).on("focus",".parent_option_value",function(e){
		var value=$(this).val();
		if(value == "选项")
		{
			$(this).val("");
		}
	})
	$(editPage).on("click",".parent_option_value",function(e){
		e.stopPropagation();
	})
	
	
	//编辑二级选项
	$(editPage).on("click",".child_option_value",function(e){
		e.stopPropagation();
	})
	$(editPage).on("focus",".child_option_value",function(e){
		var value=$(this).val();
		if(value == "子选项")
		{
			$(this).val("");
		}
	})
	$(editPage).on("blur",".child_option_value",function(e){
		var value=$(this).val();
		
		var parent_index=$(this).parents(".cascade_item").index(".cascade_item");//一级index位置
		
		var liEl=$(this).parent("li");//获取父级的li
		var index_child=$(this).parent().parent().find("li").index(liEl);//获取二级选项index位置
		
		if(value == "")
		{
			$(this).parent().find(".error_tip").show();
			return false;
		}else{
			$(this).parent().find(".error_tip").hide();
		}
		
		$($($(active_component).find(".cascadedropdown_parent_item")[parent_index+1]).find(".child_item")[index_child]).text(value);
		$(this).attr("data-cache",value);
	})
	
	
	
	//添加一级选项
	$(editPage).on("click",".parent_add_option",function(e){
		e.stopPropagation();
		var index=$(this).index(".parent_add_option");
		
		$(this).parent().parent().parent().find(".parent_minus_option:first").show();
		
		var el="<div class='cascade_item'>"
					+"<div class='optionlist_parent'>"
						+"<span class='parent_choice_value'>选项</span>"
						+"<input  class='parent_option_value' type='text' placeholder='选项' value=''/>"
						+"<i class='fa fa-plus-circle parent_add_option'></i>"
						+"<i class='fa fa-minus-circle parent_minus_option'></i>"
						+"<p class='error_tip'>选项不能为空</p>"
					+"</div>"
					+"<ul class='optionlist_child'>"
						+"<li>"
							+"<input class='child_option_value' type='text' placeholder='二级选项' value='子选项'  data-cache='子选项'/>"
							+"<i class='fa fa-plus-square-o child_add_option'></i>"
							+"<i class='fa fa-minus-square-o child_minus_option'></i>"
							+"<p class='error_tip'>选项不能为空</p>"
						+"</li>"
						+"<li>"
							+"<input class='child_option_value' type='text' placeholder='二级选项' value='子选项'  data-cache='子选项'/>"
							+"<i class='fa fa-plus-square-o child_add_option'></i>"
							+"<i class='fa fa-minus-square-o child_minus_option'></i>"
							+"<p class='error_tip'>选项不能为空</p>"
						+"</li>"
					+"</ul>"
				+"</div>";
		$(this).parent().parent().after(el);
		
		var componentEl="<li class='dropdown_item cascadedropdown_parent_item dropdown_item_el'>"
							+"<span>选项</span>"
							+"<ul class='cascadedropdown_child_content'>"
								+"<li class='dropdown_item_childel child_default_childitem'>请选择</li>"
								+"<li  class='dropdown_item child_item dropdown_item_childel'>子选项</li>"
								+"<li  class='dropdown_item child_item dropdown_item_childel'>子选项</li>"
							+"</ul>"
						+"</li>";
						
		$($(active_component).find(".cascadedropdown_parent_item")[index]).after(componentEl);
	})
	
	
	//删除一级选项
	$(editPage).on("click",".parent_minus_option",function(e){
		e.stopPropagation();
		var index=$(this).index(".parent_minus_option");
		
		console.log($(this).parent().parent().parent().find(".cascade_item").length);
		
		if($(this).parent().parent().parent().find(".cascade_item").length == 2)
		{
			$(this).parent().parent().parent().find(".parent_minus_option:first").hide();
		}
		
		$(this).parent().parent(".cascade_item").remove();
		
		$($(active_component).find(".cascadedropdown_parent_item")[index]).remove();
	})
	
	
	//添加二级子选项
	$(editPage).on("click",".child_add_option",function(e){
		e.stopPropagation();
		
		$(this).parent().parent().find(".child_minus_option:first").show();
		
		var parent_index=$(this).parents(".cascade_item").index(".cascade_item");//一级index位置
		
		var liEl=$(this).parent("li");//获取父级的li
		var index_child=$(this).parent().parent().find("li").index(liEl);//获取二级选项index位置
		
		var el="<li>"
					+"<input class='child_option_value' type='text' placeholder='二级选项' value='子选项'  data-cache='子选项'/>"
					+"<i class='fa fa-plus-square-o child_add_option'></i>"
					+"<i class='fa fa-minus-square-o child_minus_option'></i>"
					+"<p class='error_tip'>选项不能为空</p>"
				+"</li>";
		$(this).parent().after(el);
		
		var componentEl="<li  class='dropdown_item child_item dropdown_item_childel'>子选项</li>";
		
		$($($(active_component).find(".cascadedropdown_parent_item")[parent_index]).find(".child_item")[index_child]).after(componentEl);
		
	})
	
	//删除二级子选项
	$(editPage).on("click",".child_minus_option",function(e){
		e.stopPropagation();
		
		var parent_index=$(this).parents(".cascade_item").index(".cascade_item");//一级index位置
		var liEl=$(this).parent("li");//获取父级的li
		var index_child=$(this).parent().parent().find("li").index(liEl);//获取二级选项index位置
		
		if($(this).parent().parent().find("li").length == 2)
		{
			$(this).parent().parent().find(".child_minus_option:first").hide();
		}
		$(this).parent().remove();
		$($($(active_component).find(".cascadedropdown_parent_item")[parent_index]).find(".child_item")[index_child]).remove();
		
		
	})
	
	//修改一级选项的默认文案
	$(editPage).on("blur",".parent_prompt",function(){
		var value=$(this).val();
		if(value == "")
		{
			value="请选择";
		}
		$(active_component).find(".component_cascadedropdown_parent").text(value);
		$(active_component).find(".dropdown_item_default").find("span").text(value);
		
	})
	//修改二级选项默认文案
	$(editPage).on("blur",".child_prompt",function(){
		var value=$(this).val();
		if(value == "")
		{
			value="请选择";
		}
		$(active_component).find(".component_cascadedropdown_child").text(value);
		$(active_component).find(".child_default_childitem").text(value);
	})
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
}

/*子表单表格*/
LPB.plugins['table'] = function (active_component) {
	var plugins = 'table';
	
	//获取选中控件的数据
	var title=$(active_component).find(".component_title").text();
	var rowlist="";
	$(active_component).find(".row_item").each(function(index,el){
		var value=$(this).find(".row_title").text();
		rowlist+="<li class='mt10'>"
					+"<input type='text' class='row_title_edit' placeholder='题目' value='"+value+"'/>"
					+"<i class='fa fa-plus-circle row_add_option'></i>"
					+"<i class='fa fa-minus-circle row_minus_option'></i>"
					+"<p class='error_tip'>题目不能为空</p>"
				+"</li>";
	})
	var collist="";
	$(active_component).find(".col_item").each(function(index,el){
		var value=$(this).text();
		collist+="<li class='mt10'>"
					+"<input type='text' class='col_title_edit'  placeholder='项目' value='"+value+"'/>"
					+"<i class='fa fa-plus-circle col_add_option'></i>"
					+"<i class='fa fa-minus-circle col_minus_option'></i>"
					+"<p class='error_tip'>项目不能为空</p>"
				"</li>";
	})
	
	
	//获取编辑页面
 	var editPage = $("#editComponent");
 	$(editPage).find(".component_title").val(title);//标题
 	$(editPage).find(".row_list").html(rowlist);
 	$(editPage).find(".col_list").html(collist);
	//判断是否是必填项
	if($(active_component).find(".component_title").hasClass("required_label"))
	{
		$(editPage).find(".require_check").attr("checked","checked");
	}
 	
 	
 	//设置标题
	$(editPage).find(".component_title").on("blur",function(){
		var title=$(this).val();
		if(title == "")
		{
			$(this).parent().find(".error_tip").show();
		}else{
			$(this).parent().find(".error_tip").hide();
			$(active_component).find(".component_title").text(title);
		}
	})
	$(editPage).find(".component_title").on("focus",function(){
		var title=$(this).val();
		if(title == "未命名")
		{
			$(this).val("");
		}
	})
	
	//设置行题目名称
	$(editPage).on('blur','.row_title_edit',function(){
		var index=$(this).index(".row_title_edit");
		var value=$(this).val();
		
		if(value == "")
		{
			$(this).parent().find(".error_tip").show();
			$(this).parent().css({
				'height':"50px"
			})
			return false;
		}else{
			$(this).parent().find(".error_tip").hide();
			$(this).parent().css({
				'height':"30px"
			})
		}
		$($(active_component).find(".row_title")[index]).text(value);
	})
	
	//设置行项目名称
	$(editPage).on('blur','.col_title_edit',function(){
		var index=$(this).index(".col_title_edit");
		var value=$(this).val();
		
		if(value == "")
		{
			$(this).parent().find(".error_tip").show();
			$(this).parent().css({
				'height':"50px"
			})
			return false;
		}else{
			$(this).parent().find(".error_tip").hide();
			$(this).parent().css({
				'height':"30px"
			})
		}
		$($(active_component).find(".col_item")[index]).text(value);
	})
	
	//添加行，题目
	$(editPage).on('click','.row_add_option',function(){
		var index=$(this).index(".row_add_option");//要插入的索引地方
		var col_length=$(editPage).find(".col_title_edit").length;//获取总共有几列
		
		$(this).parent().parent().find(".row_minus_option:first").show();
		
		var editcontent="<li class='mt10'>"
							+"<input class='row_title_edit' type='text'  placeholder='题目' />"
							+"<i class='fa fa-plus-circle row_add_option'></i>"
							+"<i class='fa fa-minus-circle row_minus_option'></i>"
							+"<p class='error_tip'>题目不能为空</p>"
						+"</li>";
						
		$(this).parent().after(editcontent);				
		
		var input_content="";
		for(var i=0;i<col_length;i++)
		{
			input_content+="<td><input class='remove-disabled' type='text' disabled /></td>";
		}
		var el="<tr class='row_item'>"
					+"<td class='row_title'>题目</td>"
					+input_content
				+"</tr>";
				
		$($(active_component).find(".row_item")[index]).after(el);		
	})
	//删除行
	$(editPage).on('click','.row_minus_option',function(){
		var index=$(this).index(".row_minus_option");
		
		if($(this).parent().parent().find("li").length == 2)
		{
			$(this).parent().parent().find(".row_minus_option:first").hide();
		}
		
		$(this).parent().remove();
		
		$($(active_component).find(".row_item")[index]).remove();
	})
	
	
	//添加列
	$(editPage).on('click','.col_add_option',function(){
		var index=$(this).index(".col_add_option");
		$(this).parent().parent().find(".col_minus_option:first").show();
		
		var editcontent="<li class='mt10'>"
						+"<input class='col_title_edit' type='text'  placeholder='项目' />"
						+"<i class='fa fa-plus-circle col_add_option'></i>"
						+"<i class='fa fa-minus-circle col_minus_option'></i>"
						+"<p class='error_tip'>项目不能为空</p>"
					+"</li>";
		$(this).parent().after(editcontent);
		
		var el='<th class="col_item">项目</th>';
		
		$($(active_component).find(".col_item")[index]).after(el);
		$(active_component).find(".row_item").each(function(index,el){
			var row="<td><input class='remove-disabled' type='text' disabled /></td>";
			
			$(this).find("td:last").after(row);
		})
	})
	//删除列
	$(editPage).on('click','.col_minus_option',function(){
		var index=$(this).index(".col_minus_option");
		
		if($(this).parent().parent().find("li").length == 2)
		{
			$(this).parent().parent().find(".col_minus_option:first").hide();
		}
		
		$(this).parent().remove();
		
		$($(active_component).find(".col_item")[index]).remove();
		$(active_component).find(".row_item").each(function(index,el){
			$(this).find("td:last").remove();
		})	
	})
	
	//必填项
	$(editPage).on("change",".require_check",function(){
		if($(this).is(":checked"))
		{
			$(active_component).find(".component_title").addClass("required_label");
			$(active_component).attr("data-required","true");
		}else{
			$(active_component).find(".component_title").removeClass("required_label");
			$(active_component).attr("data-required","false");
		}
	})
}