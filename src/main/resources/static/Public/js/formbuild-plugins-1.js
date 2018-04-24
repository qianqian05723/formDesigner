/*e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交*/

/*
    文本框控件 text
*/
LPB.plugins["text"] = function (active_component) {
  //获取编辑组件的ID
  var componentID = active_component.attr("id").split("_")[1];
  //获取编辑组件字段
  var componentName = active_component.find("#componentName_" +componentID);
  var componentContent = active_component.find("#componentIndex_"+componentID);
  var requireMark = active_component.find(".required_red");
  var fontNumber = active_component.find(".control-label");
  var iconWidth = active_component.find("#icon-width");
  //获取编辑页面
  var editPage = $("#editComponent");

  /*跳转编辑页面  初始化值*/
  $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
  $(editPage).find("#defaultValue_" + componentID).val(active_component.attr("data-value"));

  if(active_component.attr("data-required") == "true"){
      $(editPage).find("#required_" + componentID).prop("checked",true);
  }
  if(active_component.attr("data-minLength") != ""){
      $(editPage).find("#minLength_" + componentID).prop("checked",true);
      $(editPage).find("#minLengthValue_" + componentID).val(active_component.attr("data-minLength"));
  }
  if(active_component.attr("data-maxLength") != ""){
      $(editPage).find("#maxLength_" + componentID).prop("checked",true);
      $(editPage).find("#maxLengthValue_" + componentID).val(active_component.attr("data-maxLength"));
  }
  if(active_component.attr("data-errorContent") != ""){
      $(editPage).find("#errorContent_" + componentID).prop("checked",true);
      $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
  }
  if(active_component.attr("data-width") != ""){
      $(editPage).find("#width_" + componentID).prop("checked",true);
      $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
  }
  if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
  }
  //给编辑页面的编辑框添加事件
  $(editPage).on( "blur","#componentName_" + componentID, function(e){
      //获取编辑的值
      var editComponentName = $(editPage).find("#componentName_" + componentID).val();
      //赋值到表单属性
      if(editComponentName != ""){
          $(componentName).text(editComponentName);
          active_component.attr("data-componentName",editComponentName);
      }else{
          $(componentName).text("未命名");
      }
  });
  $(editPage).on("blur","#defaultValue_" + componentID, function(e){
      //获取编辑的值
      var editDefaultValue =$(editPage).find("#defaultValue_" + componentID).val();
      //赋值到表单属性
      $(componentContent).val(editDefaultValue);
      active_component.attr("data-value",editDefaultValue);
  });
  $(editPage).on("click","#required_" + componentID, function(e){
      //获取编辑的值
      var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
      //赋值到表单属性
      if(editRequired){
          $(requireMark).css("display","inline-block");
          active_component.attr("data-required",true);
      }else{
          $(requireMark).css("display","none");
          active_component.attr("data-required",false);
      }
  });
  $(editPage).on("click","#minLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLength){
            if(editMaxLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                        fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                        active_component.attr("data-minLength",editMinLengthValue);
                        active_component.attr("data-maxLength",editMaxLengthValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-maxLength","");
                        fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    }
                }
            }else{
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }
        }else{
            if(editMaxLength){
                active_component.attr("data-minLength","");
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-minLength","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
  });
    $(editPage).on("blur","#minLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLengthValue != ""){
            $(editPage).find("#minLength_" + componentID).prop("checked",true);
            editMinLength = true;
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                    fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                    $(editPage).find("#errorTip_" + componentID).css("display","none");
                }else{
                    $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                    active_component.attr("data-maxLength","");
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                }
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength && editMaxLength != true){
            if(editMinLengthValue != ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on("click","#maxLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLength){
            if(editMinLength ){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                        fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                        active_component.attr("data-minLength",editMinLengthValue);
                        active_component.attr("data-maxLength",editMaxLengthValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-maxLength","");
                        fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    }
                }
            }else{
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }
        }else{
            if(editMinLength ){
                active_component.attr("data-maxLength","");
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-maxLength","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });
    $(editPage).on( "blur","#maxLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLengthValue != ""){
            $(editPage).find("#maxLength_" + componentID).prop("checked",true);
            editMaxLength = true;
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                    fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                    $(editPage).find("#errorTip_" + componentID).css("display","none");
                }else{
                    $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                    active_component.attr("data-maxLength","");
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                }

            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength != true && editMaxLength){
            if(editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
  $(editPage).on("blur","#errorContentValue_" + componentID, function(e){
      //获取编辑的值
      var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
      var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
      //赋值到表单属性
      if(editErrorContent){
          if( editErrorContentValue != ""){
              active_component.attr("data-errorContent",editErrorContentValue);
          }else{
              $(editPage).find("#errorContentValue_" + componentID).focus();
          }
      }else{
          $(editPage).find("#errorContent_" + componentID).focus();
      }
  });
  $(editPage).on("click","#width_" + componentID, function(e){
      //获取编辑的值
      var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
      var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
      //赋值到表单属性
      if(editWidth ){
          $(editPage).find(".component-newRow").css("display","inline-block");
          if(editWidthValue != ""){
              iconWidth.addClass("icon-grid");
              if(editWidthValue == "25%"){
                  iconWidth.addClass("icon-grid-1");
              }else if(editWidthValue == "50%"){
                  iconWidth.addClass("icon-grid-2");
              }else if(editWidthValue == "75%"){
                  iconWidth.addClass("icon-grid-3");
              }
              active_component.attr("data-width",editWidthValue);
              $(active_component).css("width",editWidthValue);
          }
      }else{
          $(editPage).find("#newRow_" + componentID).prop("checked",false);
          $(editPage).find(".component-newRow").css("display","none");
          iconWidth.removeClass();
          active_component.attr("data-newRow",false);
          active_component.attr("data-width","");
          $(active_component).css("width","100%");
      }
  });
  $(editPage).on("blur","#widthValue_" + componentID, function(e){
      //获取编辑的值
      var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
      //赋值到表单属性
      if(editWidthValue != ""){
          iconWidth.removeClass();
          iconWidth.addClass("icon-grid");
          $(editPage).find("#width_" + componentID).prop("checked",true);
          $(editPage).find(".component-newRow").css("display","inline-block");
          if(editWidthValue == "25%"){
              iconWidth.addClass("icon-grid-1");
          }else if(editWidthValue == "50%"){
              iconWidth.addClass("icon-grid-2");
          }else if(editWidthValue == "75%"){
              iconWidth.addClass("icon-grid-3");
          }
          active_component.attr("data-width",editWidthValue);
          $(active_component).css("width",editWidthValue);
      }else{
          iconWidth.removeClass();
          $(editPage).find(".component-newRow").css("display","none");
          $(editPage).find("#width_" + componentID).prop("checked",false);
          active_component.attr("data-width","");
          $(active_component).css("width","100%");
      }
  });
  $(editPage).on("click","#newRow_" + componentID, function(e){
      //获取编辑的值
      var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
      //赋值到表单属性
      if(editNewRow){
          active_component.attr("data-newRow",true);
          active_component.addClass("clear")
      }else{
          active_component.attr("data-newRow",false);
          active_component.removeClass("clear")
      }
  });
};

/* *****************************************************
 文本框控件 textarea
 */
LPB.plugins["textarea"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentContent = active_component.find("#componentIndex_"+componentID);
    var requireMark = active_component.find(".required_red");
    var fontNumber = active_component.find(".control-label");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    $(editPage).find("#defaultValue_" + componentID).val(active_component.attr("data-value"));

    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-minLength") != ""){
        $(editPage).find("#minLength_" + componentID).prop("checked",true);
        $(editPage).find("#minLengthValue_" + componentID).val(active_component.attr("data-minLength"));
    }
    if(active_component.attr("data-maxLength") != ""){
        $(editPage).find("#maxLength_" + componentID).prop("checked",true);
        $(editPage).find("#maxLengthValue_" + componentID).val(active_component.attr("data-maxLength"));
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName)
        }else{
            $(componentName).text("未命名");
        }
    });
    $(editPage).on( "blur","#defaultValue_" + componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#defaultValue_" + componentID).val();
        //赋值到表单属性
        $(componentContent).val(editDefaultValue);
        active_component.attr("data-value",editDefaultValue)
    });
    $(editPage).on("click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on("click","#minLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLength){
            if(editMaxLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                        fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                        active_component.attr("data-minLength",editMinLengthValue);
                        active_component.attr("data-maxLength",editMaxLengthValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-maxLength","");
                        fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    }
                }
            }else{
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }
        }else{
            if(editMaxLength){
                active_component.attr("data-minLength","");
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-minLength","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });
    $(editPage).on("blur","#minLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLengthValue != ""){
            $(editPage).find("#minLength_" + componentID).prop("checked",true);
            editMinLength = true;
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                    fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                    $(editPage).find("#errorTip_" + componentID).css("display","none");
                }else{
                    $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                    active_component.attr("data-maxLength","");
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                }
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength && editMaxLength != true){
            if(editMinLengthValue != ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on("click","#maxLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLength ){
            if(editMinLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                        fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                        active_component.attr("data-minLength",editMinLengthValue);
                        active_component.attr("data-maxLength",editMaxLengthValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-maxLength","");
                        fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    }
                }
            }else{
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }
        }else{
            if(editMinLength){
                active_component.attr("data-maxLength","");
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-maxLength","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });
    $(editPage).on("blur","#maxLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLengthValue != ""){
            $(editPage).find("#maxLength_" + componentID).prop("checked",true);
            editMaxLength = "checked";
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                    fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                    $(editPage).find("#errorTip_" + componentID).css("display","none");
                }else{
                    $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                    active_component.attr("data-maxLength","");
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                }
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength != true && editMaxLength){
            if(editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on("blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};
/* *****************************************************
 数字 number
 */
LPB.plugins["number"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentContent = active_component.find("#componentIndex_"+componentID);
    var requireMark = active_component.find(".required_red");
    var fontNumber = active_component.find(".control-label");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    $(editPage).find("#defaultValue_" + componentID).val(active_component.attr("data-value"));
    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-minLength") != ""){
        $(editPage).find("#minLength_" + componentID).prop("checked",true);
        $(editPage).find("#minLengthValue_" + componentID).val(active_component.attr("data-minLength"));
    }
    if(active_component.attr("data-maxLength") != ""){
        $(editPage).find("#maxLength_" + componentID).prop("checked",true);
        $(editPage).find("#maxLengthValue_" + componentID).val(active_component.attr("data-maxLength"));
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("数字");
        }
    });
    $(editPage).on("blur","#defaultValue_" + componentID,function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#defaultValue_" + componentID).val();
        //赋值到表单属性
        $(componentContent).val(editDefaultValue);
        active_component.attr("data-value",editDefaultValue);
    });
    $(editPage).on("click","#required_" + componentID,function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on("click","#minLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLength){
            if(editMaxLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                        fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"-"+editMaxLengthValue+"之间的数字）");
                        active_component.attr("data-minLength",editMinLengthValue);
                        active_component.attr("data-maxLength",editMaxLengthValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-maxLength","");
                        fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                    }
                }
            }else{
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }
        }else{
            if(editMaxLength){
                active_component.attr("data-minLength","");
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（请输入不大于"+editMaxLengthValue+"的数字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-minLength","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });
    $(editPage).on( "blur","#minLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLengthValue != ""){
            $(editPage).find("#minLength_" + componentID).prop("checked",true);
            editMinLength = true;
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                    fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"-"+editMaxLengthValue+"之间的数字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                    $(editPage).find("#errorTip_" + componentID).css("display","none");
                }else{
                    $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                    active_component.attr("data-maxLength","");
                    fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                }
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（请输入不大于"+editMaxLengthValue+"的数字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength && editMaxLength != true){
            if(editMinLengthValue != ""){
                fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                active_component.attr("data-minLength",editMinLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on("click","#maxLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLength){
            if(editMinLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                        fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"-"+editMaxLengthValue+"之间的数字）");
                        active_component.attr("data-minLength",editMinLengthValue);
                        active_component.attr("data-maxLength",editMaxLengthValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-maxLength","");
                        fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                    }
                }
            }else{
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（请输入不大于"+editMaxLengthValue+"的数字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }
        }else{
           if(editMinLength){
               active_component.attr("data-maxLength","");
               if(editMinLengthValue != ""){
                   fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                   active_component.attr("data-minLength",editMinLengthValue);
               }
           }else{
               fontNumber.attr("data-afterContent","");
               active_component.attr("data-maxLength","");
           }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });
    $(editPage).on( "blur","#maxLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLengthValue != ""){
            $(editPage).find("#maxLength_" + componentID).prop("checked",true);
            editMaxLength = true;
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                if(parseInt(editMaxLengthValue) > parseInt(editMinLengthValue)){
                    fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"-"+editMaxLengthValue+"之间的数字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                    $(editPage).find("#errorTip_" + componentID).css("display","none");
                }else{
                    $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                    active_component.attr("data-maxLength","");
                    fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                }
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（请输入不大于"+editMaxLengthValue+"的数字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（请输入"+editMinLengthValue+"及以上的数字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength != true && editMaxLength){
            if(editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（请输入不大于"+editMaxLengthValue+"的数字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on("blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};
/* ******************************************************
 时间 time
 */
LPB.plugins["time"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentHour = active_component.find("#componentHour_"+componentID);
    var componentMinute = active_component.find("#componentMinute_"+componentID);
    var componentSecond = active_component.find("#componentSecond_"+componentID);
    var requireMark = active_component.find(".required_red");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    $(editPage).find("#defaultHourValue_" + componentID).val(active_component.attr("data-hourValue"));
    $(editPage).find("#defaultMinuteValue_" + componentID).val(active_component.attr("data-minuteValue"));
    $(editPage).find("#defaultSecondValue_" + componentID).val(active_component.attr("data-secondValue"));
    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-addSecond") == "true"){
        $(editPage).find("#addSecond_" + componentID).prop("checked",true);
    }
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("时间");
        }
    });
    $(editPage).on("blur","#defaultHourValue_" + componentID, function(e){
        //获取编辑的值
        var editDefaultHourValue =$(editPage).find("#defaultHourValue_" + componentID).val();
        //赋值到表单属性
        $(componentHour).val(editDefaultHourValue);
        active_component.attr("data-hourValue",editDefaultHourValue);
    });
    $(editPage).on("blur","#defaultMinuteValue_" + componentID, function(e){
        //获取编辑的值
        var editDefaultMinValue =$(editPage).find("#defaultMinuteValue_" + componentID).val();
        //赋值到表单属性
        $(componentMinute).val(editDefaultMinValue);
        active_component.attr("data-minuteValue",editDefaultMinValue);
    });
    $(editPage).on("blur","#defaultSecondValue_" + componentID, function(e){
        //获取编辑的值
        var editDefaultSecondValue =$(editPage).find("#defaultSecondValue_" + componentID).val();
        //赋值到表单属性
        $(componentSecond).val(editDefaultSecondValue);
        active_component.attr("data-secondValue",editDefaultSecondValue);
    });
    $(editPage).on("click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on( "blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
    $(editPage).on("click","#addSecond_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#addSecond_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            $(editPage).find(".hideSecondSelect").css("display","inline-block");
            $(componentSecond).css("display","inline-block");
            active_component.attr("data-addSecond",true);
        }else{
            $(editPage).find(".hideSecondSelect").css("display","none");
            $(componentSecond).css("display","none");
            active_component.attr("data-secondValue","");
             active_component.attr("data-addSecond",false);
            $(componentSecond).val("");
            $(editPage).find("#defaultSecondValue_" + componentID).val("");
        }
    });
};
/* ******************************************************
 日期 date
 */
LPB.plugins["date"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    var isSelect = active_component.hasClass("component_select");
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentDate = active_component.find("#componentDate_"+componentID);
    var requireMark = active_component.find(".required_red");
    var fontNumber = active_component.find(".control-label");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    $(editPage).find("#editDatePicker_" + componentID).val(active_component.attr("data-dateDefaultValue"));

    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    $(editPage).find("#dateStartValue_" + componentID).val(active_component.attr("data-dateStartValue"));
    if(active_component.attr("data-dateStartValue") != ""){
        $(editPage).find("#dateStart_" + componentID).prop("checked",true);
    }
    $(editPage).find("#dateEndValue_" + componentID).val(active_component.attr("data-dateEndValue"));
    if(active_component.attr("data-dateEndValue") != ""){
        $(editPage).find("#dateEnd_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }

    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("日期");
        }
    });
    //初始化日期控件
    var datepicker_CurrentInput;
    // 设置DatePicker 的默认设置
    $.datepicker.setDefaults({
        showButtonPanel: true,
        closeText: '清除',
        beforeShow: function (input, inst) {
            datepicker_CurrentInput = input;
        }
    });
    $(".ui-datepicker-close").on("click", function () {
        var ids = (datepicker_CurrentInput.id).split("_");
        if(isSelect){
            if(ids[0] == "editDatePicker"){
                datepicker_CurrentInput.value = "";
                active_component.attr("data-dateDefaultValue","");
                $(componentDate).val("");
            }else if(ids[0] == "dateStartValue"){
                datepicker_CurrentInput.value = "";
                active_component.attr("data-dateStartValue","");
                $(editPage).find("#dateStart_" + componentID).prop("checked",false);
                fontNumber.attr("data-afterContent","");
                var dateEnd =$(editPage).find("#dateEnd_" + componentID).is(":checked");
                var dateEndValue = $(editPage).find("#dateEndValue_" + componentID).val();
                if(dateEnd){
                    active_component.attr("data-dateStartValue","");
                    if(dateEndValue != ""){
                        fontNumber.attr("data-afterContent","（请选择不晚于"+dateEndValue+"的日期）");
                        active_component.attr("data-dateEndValue",dateEndValue);
                    }
                }
            }else if(ids[0] == "dateEndValue"){
                datepicker_CurrentInput.value = "";
                active_component.attr("data-dateEndValue","");
                $(editPage).find("#dateEnd_" + componentID).prop("checked",false);
                fontNumber.attr("data-afterContent","");
                var dateStart =$(editPage).find("#dateStart_" + componentID).is(":checked");
                var dateStartValue = $(editPage).find("#dateStartValue_" + componentID).val();
                if(dateStart){
                    active_component.attr("data-dateEndValue","");
                    if(dateStartValue != ""){
                        fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                        active_component.attr("data-dateStartValue",dateStartValue);
                    }
                }
            }
        }
    });

    $(editPage).find("#editDatePicker_"+componentID).datepicker({
        format: "yyyy-mm-dd",
        onSelect:function () {
            var editDefaultDateValue =$(editPage).find("#editDatePicker_" + componentID).val();
            //赋值到表单属性
            $(componentDate).val(editDefaultDateValue);
            active_component.attr("data-dateDefaultValue",editDefaultDateValue);
        }
    });

    $(editPage).on("click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on("click","#dateStart_" + componentID, function(e){
        //获取编辑的值
        var dateStart =$(editPage).find("#dateStart_" + componentID).is(":checked");
        var dateStartValue = $(editPage).find("#dateStartValue_" + componentID).val();
        var dateEnd =$(editPage).find("#dateEnd_" + componentID).is(":checked");
        var dateEndValue = $(editPage).find("#dateEndValue_" + componentID).val();

        if(dateStart){
            if(dateEnd){
                if(dateStartValue != "" && dateEndValue != ""){
                    if(dateEndValue > dateStartValue){
                        fontNumber.attr("data-afterContent","（请选择"+dateStartValue+"到"+dateEndValue+"之间的日期）");
                        active_component.attr("data-dateStartValue",dateStartValue);
                        active_component.attr("data-dateEndValue",dateEndValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-dateEndValue","");
                        fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    }
                }
            }else{
                if(dateStartValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    active_component.attr("data-dateStartValue",dateStartValue);
                }
            }
        }else{
            if(dateEnd){
                active_component.attr("data-dateStartValue","");
                if(dateEndValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不晚于"+dateEndValue+"的日期）");
                    active_component.attr("data-dateEndValue",dateEndValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-dateStartValue","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });

    $(editPage).find("#dateStartValue_"+componentID).datepicker({
        format: "yyyy-mm-dd",
        onSelect:function () {
            var dateStart =$(editPage).find("#dateStart_" + componentID).is(":checked");
            var dateStartValue = $(editPage).find("#dateStartValue_" + componentID).val();
            var dateEnd =$(editPage).find("#dateEnd_" + componentID).is(":checked");
            var dateEndValue = $(editPage).find("#dateEndValue_" + componentID).val();

            if(dateStartValue != ""){
                $(editPage).find("#dateStart_" + componentID).prop("checked",true);
                dateStart = "checked";
            }
            if(dateStart && dateEnd){
                if(dateStartValue != "" && dateEndValue != ""){
                    if(dateEndValue > dateStartValue){
                        fontNumber.attr("data-afterContent","（请选择"+dateStartValue+"到"+dateEndValue+"之间的日期）");
                        active_component.attr("data-dateStartValue",dateStartValue);
                        active_component.attr("data-dateEndValue",dateEndValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-dateEndValue","");
                        fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    }
                }else if(dateStartValue == "" && dateEndValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不晚于"+dateEndValue+"的日期）");
                    active_component.attr("data-dateEndValue",dateEndValue);
                    $(editPage).find("#dateStart_" + componentID).prop("checked",false);
                    active_component.attr("data-dateStartValue","");
                }else if(dateStartValue != "" && dateEndValue == ""){
                    fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    active_component.attr("data-dateStartValue",dateStartValue);
                    $(editPage).find("#dateEnd_" + componentID).prop("checked",false);
                    active_component.attr("data-dateEndValue","");
                }else{
                    $(editPage).find("#dateStart_" + componentID).prop("checked",false);
                    active_component.attr("data-dateStartValue","");
                    $(editPage).find("#dateEnd_" + componentID).prop("checked",false);
                    active_component.attr("data-dateEndValue","");
                }
            }else if(dateStart && dateEnd != true){
                if(dateStartValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    active_component.attr("data-dateStartValue",dateStartValue);
                }else{
                    fontNumber.attr("data-afterContent","");
                    $(editPage).find("#dateStart_" + componentID).prop("checked",false);
                    active_component.attr("data-dateStartValue","");
                }
            }else{
                active_component.attr("data-dateStartValue","");
                active_component.attr("data-dateEndValue","");
            }
        }
    });

    $(editPage).on("click","#dateEnd_" + componentID, function(e){
        //获取编辑的值
        var dateStart =$(editPage).find("#dateStart_" + componentID).is(":checked");
        var dateStartValue = $(editPage).find("#dateStartValue_" + componentID).val();
        var dateEnd =$(editPage).find("#dateEnd_" + componentID).is(":checked");
        var dateEndValue = $(editPage).find("#dateEndValue_" + componentID).val();

        if(dateEnd){
            if(dateStart){
                if(dateStartValue != "" && dateEndValue != ""){
                    if(dateEndValue > dateStartValue){
                        fontNumber.attr("data-afterContent","（请选择"+dateStartValue+"到"+dateEndValue+"之间的日期）");
                        active_component.attr("data-dateStartValue",dateStartValue);
                        active_component.attr("data-dateEndValue",dateEndValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-dateEndValue","");
                        fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    }
                }
            }else{
                if(dateEndValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不晚于"+dateEndValue+"的日期）");
                    active_component.attr("data-dateEndValue",dateEndValue);
                }
            }
        }else{
            if(dateStart){
                active_component.attr("data-dateEndValue","");
                if(dateStartValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    active_component.attr("data-dateStartValue",dateStartValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-dateEndValue","");
            }
            $(editPage).find("#errorTip_" + componentID).css("display","none");
        }
    });

    $(editPage).find("#dateEndValue_"+componentID).datepicker({
        format: "yyyy-mm-dd",
        onSelect:function () {
            var dateStart =$(editPage).find("#dateStart_" + componentID).is(":checked");
            var dateStartValue = $(editPage).find("#dateStartValue_" + componentID).val();
            var dateEnd =$(editPage).find("#dateEnd_" + componentID).is(":checked");
            var dateEndValue = $(editPage).find("#dateEndValue_" + componentID).val();

            if(dateEndValue != ""){
                $(editPage).find("#dateEnd_" + componentID).prop("checked",true);
                dateEnd = "checked";
            }
            if(dateStart && dateEnd){
                if(dateStartValue != "" && dateEndValue != ""){
                    if(dateEndValue > dateStartValue){
                        fontNumber.attr("data-afterContent","（请选择"+dateStartValue+"到"+dateEndValue+"之间的日期）");
                        active_component.attr("data-dateStartValue",dateStartValue);
                        active_component.attr("data-dateEndValue",dateEndValue);
                        $(editPage).find("#errorTip_" + componentID).css("display","none");
                    }else{
                        $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
                        active_component.attr("data-dateEndValue","");
                        fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    }
                }else if(dateStartValue == "" && dateEndValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不晚于"+dateEndValue+"的日期）");
                    active_component.attr("data-dateEndValue",dateEndValue);
                    $(editPage).find("#dateStart_" + componentID).prop("checked",false);
                    active_component.attr("data-dateStartValue","");
                }else if(dateStartValue != "" && dateEndValue == ""){
                    fontNumber.attr("data-afterContent","（请选择不早于"+dateStartValue+"的日期）");
                    active_component.attr("data-dateStartValue",dateStartValue);
                    $(editPage).find("#dateEnd_" + componentID).prop("checked",false);
                    active_component.attr("data-dateEndValue","");
                }else{
                    $(editPage).find("#dateStart_" + componentID).prop("checked",false);
                    active_component.attr("data-dateStartValue","");
                    $(editPage).find("#dateEnd_" + componentID).prop("checked",false);
                    active_component.attr("data-dateEndValue","");
                }
            }else if(dateStart != true && dateEnd){
                if(dateEndValue != ""){
                    fontNumber.attr("data-afterContent","（请选择不晚于"+dateEndValue+"的日期）");
                    active_component.attr("data-dateEndValue",dateEndValue);
                }else{
                    fontNumber.attr("data-afterContent","");
                    $(editPage).find("#dateEnd_" + componentID).prop("checked",false);
                    active_component.attr("data-dateEndValue","");
                }
            }else{
                active_component.attr("data-dateStartValue","");
                active_component.attr("data-dateEndValue","");
            }
        }
    });

    $(editPage).on("blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};
/* *****************************************************
 邮箱 email
 */
LPB.plugins["email"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var requireMark = active_component.find(".required_red");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("邮箱");
        }
    });
    $(editPage).on( "click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on("blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on( "click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on( "blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID,  function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};
/* *****************************************************
 手机 mobilePhone
 */
LPB.plugins["mobilePhone"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentContent = active_component.find("#componentIndex_"+componentID);
    var requireMark = active_component.find(".required_red");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    $(editPage).find("#defaultValue_" + componentID).val(active_component.attr("data-value"));
    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("手机");
        }
    });
    $(editPage).on("blur","#defaultValue_" + componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#defaultValue_" + componentID).val();
        //赋值到表单属性
        $(componentContent).val(editDefaultValue);
        active_component.attr("data-value",editDefaultValue);
    });
    $(editPage).on("click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on( "blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};
/* *****************************************************
 电话 telephone
 */
LPB.plugins["telephone"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentContent = active_component.find("#componentIndex_"+componentID);
    var requireMark = active_component.find(".required_red");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    $(editPage).find("#defaultValue_" + componentID).val(active_component.attr("data-value"));
    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("电话");
        }
    });
    $(editPage).on("blur","#defaultValue_" + componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#defaultValue_" + componentID).val();
        //赋值到表单属性
        $(componentContent).val(editDefaultValue);
        active_component.attr("data-value",editDefaultValue);
    });
    $(editPage).on("click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on( "blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID, function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "25%"){
                    iconWidth.addClass("icon-grid-1");
                }else if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "25%"){
                iconWidth.addClass("icon-grid-1");
            }else if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");

            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on("click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};
/*
 地址 address
 */
LPB.plugins["address"] = function (active_component) {
    //获取编辑组件的ID
    var componentID = active_component.attr("id").split("_")[1];
    //获取编辑组件字段
    var componentName = active_component.find("#componentName_" +componentID);
    var componentDistpicker = active_component.find("#distpicker_" +componentID);
    var componentProvince = active_component.find("#componentProvince_"+componentID);//省
    var componentCity = active_component.find("#componentCity_"+componentID);//市
    var componentDistrict = active_component.find("#componentDistrict_"+componentID);//区
    var componentDetail = active_component.find("#componentDetail_"+componentID);//详细地址
    var requireMark = active_component.find(".required_red");
    var iconWidth = active_component.find("#icon-width");
    //获取编辑页面
    var editPage = $("#editComponent");

    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_" + componentID).attr("placeholder",active_component.attr("data-componentName"));
    if(active_component.attr("data-required") == "true"){
        $(editPage).find("#required_" + componentID).prop("checked",true);
    }
    if(active_component.attr("data-provinceValue") != ""){
        $(editPage).find("#provinceValue_" + componentID).val(active_component.attr("data-provinceValue"));
    }
    $(editPage).find("#city_" + componentID).prop("checked",true);
    if(active_component.attr("data-cityValue") != ""){
        $(editPage).find("#cityValue_" + componentID).val(active_component.attr("data-cityValue"));
    }
    $(editPage).find("#district_" + componentID).prop("checked",true);
    if(active_component.attr("data-districtValue") != ""){
        $(editPage).find("#districtValue_" + componentID).val(active_component.attr("data-districtValue"));
    }
    $(editPage).find("#detail_" + componentID).prop("checked",true);
    if(active_component.attr("data-detailValue") != ""){
        $(editPage).find("#detailValue_" + componentID).val(active_component.attr("data-detailValue"));
    }
    if(active_component.attr("data-errorContent") != ""){
        $(editPage).find("#errorContent_" + componentID).prop("checked",true);
        $(editPage).find("#errorContentValue_" + componentID).val(active_component.attr("data-errorContent"));
    }
    if(active_component.attr("data-width") != ""){
        $(editPage).find("#width_" + componentID).prop("checked",true);
        $(editPage).find("#widthValue_" + componentID).val(active_component.attr("data-width"));
    }
    if(active_component.attr("data-newRow") == true){
        $(editPage).find("#newRow_" + componentID).prop("checked",true);
    }
    //初始化地址控件
    $(editPage).find("#distpicker_edit_"+componentID).distpicker({
        province: '江苏省',
        city: '苏州市',
        autoSelect: false
    });
    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_" + componentID, function(e){
        //获取编辑的值
        var editComponentName = $(editPage).find("#componentName_" + componentID).val();
        //赋值到表单属性
        if(editComponentName != ""){
            $(componentName).text(editComponentName);
            active_component.attr("data-componentName",editComponentName);
        }else{
            $(componentName).text("未命名");
        }
    });
    //省
    $(editPage).on("blur","#provinceValue_" + componentID, function(e){
        //获取编辑的值
        var editProvinceValue = $(editPage).find("#provinceValue_" + componentID).val();
        //赋值到表单属性
        if(editProvinceValue != ""){
            $(componentDistpicker).distpicker('reset',true);
            $(componentProvince).val(editProvinceValue);
            active_component.attr("data-provinceValue",editProvinceValue);
            active_component.attr("data-cityValue","");
        }
    });
    //市
    $(editPage).on("click","#city_" + componentID, function(e){
        //获取编辑的值
        var editCity=$(editPage).find("#city_" + componentID).is(":checked");
        var editCityValue = $(editPage).find("#cityValue_" + componentID).val();
        var editProvinceValue = $(editPage).find("#provinceValue_" + componentID).val();
        //赋值到表单属性
        if(editCity){
            $(editPage).find("#errorTip_" + componentID).css("display","none");
            $(componentCity).css("display","inline-block");
            distpickerPositionByAddress(editProvinceValue,editCityValue,"");
            active_component.attr("data-cityValue",editCityValue);
        }else{
            $(componentCity).css("display","none");
            active_component.attr("data-cityValue","");
        }
    });
    $(editPage).on("blur","#cityValue_" + componentID, function(e){
        //获取编辑的值
        var editCity=$(editPage).find("#city_" + componentID).is(":checked");
        var editCityValue = $(editPage).find("#cityValue_" + componentID).val();
        var editProvinceValue = $(editPage).find("#provinceValue_" + componentID).val();
        //赋值到表单属性
        if(editCity){
            $(editPage).find("#errorTip_" + componentID).css("display","none");
            $(componentCity).css("display","inline-block");
            distpickerPositionByAddress(editProvinceValue,editCityValue,"");
            active_component.attr("data-cityValue",editCityValue);
        }
    });
    //区
    $(editPage).on("click","#district_" + componentID, function(e){
        //获取编辑的值
        var editDistrict=$(editPage).find("#district_" + componentID).is(":checked");
        var editDistrictValue = $(editPage).find("#districtValue_" + componentID).val();
        var editCity=$(editPage).find("#city_" + componentID).is(":checked");
        var editCityValue = $(editPage).find("#cityValue_" + componentID).val();
        var editProvinceValue = $(editPage).find("#provinceValue_" + componentID).val();
        //赋值到表单属性
        if(editCity){
            if(editDistrict){
                $(componentDistrict).css("display","inline-block");
                distpickerPositionByAddress(editProvinceValue,editCityValue,editDistrictValue);
                active_component.attr("data-districtValue",editDistrictValue);
            }else{
                $(componentDistrict).css("display","none");
                active_component.attr("data-districtValue","");
            }
        }else{
            $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
        }
    });
    $(editPage).on("blur","#districtValue_" + componentID, function(e){
        //获取编辑的值
        var editDistrict=$(editPage).find("#district_" + componentID).is(":checked");
        var editDistrictValue = $(editPage).find("#districtValue_" + componentID).val();
        var editCity=$(editPage).find("#city_" + componentID).is(":checked");
        var editCityValue = $(editPage).find("#cityValue_" + componentID).val();
        var editProvinceValue = $(editPage).find("#provinceValue_" + componentID).val();
        //赋值到表单属性
        if(editCity){
            if(editDistrict){
                $(componentDistrict).css("display","inline-block");
                distpickerPositionByAddress(editProvinceValue,editCityValue,editDistrictValue);
                active_component.attr("data-districtValue",editDistrictValue);
            }
        }else{
            $(editPage).find("#errorTip_" + componentID).css("display","inline-block");
        }
    });
    //给target区域的地址控件赋值
    function distpickerPositionByAddress(province, city, district) {
        $(componentProvince).val(province);
        $(componentProvince).trigger("change");
        $(componentCity).val(city);
        $(componentCity).trigger("change");
        $(componentDistrict).val(district);
        $(componentDistrict).trigger("change");
    }
    //详细地址
    $(editPage).on("click","#detail_" + componentID, function(e){
        //获取编辑的值
        var editDetail=$(editPage).find("#detail_" + componentID).is(":checked");
        var editDetailValue = $(editPage).find("#detailValue_" + componentID).val();
        //赋值到表单属性
        if(editDetail){
            $(componentDetail).css("display","inline-block");
            if(editDetailValue != ""){
                //初始化，在赋值
                $(componentDetail).val(editDetailValue);
                active_component.attr("data-detailValue",editDetailValue);
            }
        }else{
            $(componentDetail).css("display","none");
            active_component.attr("data-detailValue","");
        }
    });
    $(editPage).on( "blur","#detailValue_" + componentID, function(e){
        //获取编辑的值
        var editDetail=$(editPage).find("#detail_" + componentID).is(":checked");
        var editDetailValue = $(editPage).find("#detailValue_" + componentID).val();
        //赋值到表单属性
        if(editDetail){
            $(componentDetail).css("display","inline-block");
            if(editDetailValue != ""){
                $(componentDetail).val(editDetailValue);
                active_component.attr("data-detailValue",editDetailValue);
            }else{
                $(componentDetail).val("");
                active_component.attr("data-detailValue","");
            }
        }
    });

    $(editPage).on( "click","#required_" + componentID, function(e){
        //获取编辑的值
        var editRequired=$(editPage).find("#required_" + componentID).is(":checked");
        //赋值到表单属性
        if(editRequired){
            $(requireMark).css("display","inline-block");
            active_component.attr("data-required",true);
        }else{
            $(requireMark).css("display","none");
            active_component.attr("data-required",false);
        }
    });
    $(editPage).on("click","#minLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLength){
            if(editMaxLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }else{
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }
        }else{
            if(editMaxLength){
                active_component.attr("data-minLength","");
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-minLength","");
            }
        }
    });
    $(editPage).on("blur","#minLengthValue_" + componentID,function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMinLengthValue != ""){
            $(editPage).find("#minLength_" + componentID).prop("checked",true);
            editMinLength = "checked";
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                active_component.attr("data-maxLength",editMaxLengthValue);
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength && editMaxLength != true){
            if(editMinLengthValue != ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on( "click","#maxLength_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLength){
            if(editMinLength){
                if(editMinLengthValue != "" && editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }else{
                if(editMaxLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                    active_component.attr("data-maxLength",editMaxLengthValue);
                }
            }
        }else{
            if(editMinLength){
                active_component.attr("data-maxLength","");
                if(editMinLengthValue != ""){
                    fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                    active_component.attr("data-minLength",editMinLengthValue);
                }
            }else{
                fontNumber.attr("data-afterContent","");
                active_component.attr("data-maxLength","");
            }
        }
    });
    $(editPage).on( "blur","#maxLengthValue_" + componentID, function(e){
        //获取编辑的值
        var editMinLength =$(editPage).find("#minLength_" + componentID).is(":checked");
        var editMinLengthValue = $(editPage).find("#minLengthValue_" + componentID).val();
        var editMaxLength =$(editPage).find("#maxLength_" + componentID).is(":checked");
        var editMaxLengthValue = $(editPage).find("#maxLengthValue_" + componentID).val();

        if(editMaxLengthValue != ""){
            $(editPage).find("#maxLength_" + componentID).prop("checked",true);
            editMaxLength = true;
        }
        if(editMinLength && editMaxLength){
            if(editMinLengthValue != "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（请填写"+editMinLengthValue+"-"+editMaxLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                active_component.attr("data-maxLength",editMaxLengthValue);
            }else if(editMinLengthValue == "" && editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
            }else if(editMinLengthValue != "" && editMaxLengthValue == ""){
                fontNumber.attr("data-afterContent","（最少请填写"+editMinLengthValue+"个字）");
                active_component.attr("data-minLength",editMinLengthValue);
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }else{
                $(editPage).find("#minLength_" + componentID).prop("checked",false);
                active_component.attr("data-minLength","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else if(editMinLength != true && editMaxLength){
            if(editMaxLengthValue != ""){
                fontNumber.attr("data-afterContent","（最多请填写"+editMaxLengthValue+"个字）");
                active_component.attr("data-maxLength",editMaxLengthValue);
            }else{
                fontNumber.attr("data-afterContent","");
                $(editPage).find("#maxLength_" + componentID).prop("checked",false);
                active_component.attr("data-maxLength","");
            }
        }else{
            active_component.attr("data-minLength","");
            active_component.attr("data-maxLength","");
        }
    });
    $(editPage).on("blur","#errorContentValue_" + componentID, function(e){
        //获取编辑的值
        var editErrorContent=$(editPage).find("#errorContent_" + componentID).is(":checked");
        var editErrorContentValue = $(editPage).find("#errorContentValue_" + componentID).val();
        //赋值到表单属性
        if(editErrorContent){
            if( editErrorContentValue != ""){
                active_component.attr("data-errorContent",editErrorContentValue);
            }else{
                $(editPage).find("#errorContentValue_" + componentID).focus();
            }
        }else{
            $(editPage).find("#errorContent_" + componentID).focus();
        }
    });
    $(editPage).on("click","#width_" + componentID,  function(e){
        //获取编辑的值
        var editWidth=$(editPage).find("#width_" + componentID).is(":checked");
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidth){
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue != ""){
                iconWidth.addClass("icon-grid");
                if(editWidthValue == "50%"){
                    iconWidth.addClass("icon-grid-2");
                }else if(editWidthValue == "75%"){
                    iconWidth.addClass("icon-grid-3");
                }
                active_component.attr("data-width",editWidthValue);
                $(active_component).css("width",editWidthValue);
            }
        }else{
            $(editPage).find("#newRow_" + componentID).prop("checked",false);
            $(editPage).find(".component-newRow").css("display","none");
            iconWidth.removeClass();
            active_component.attr("data-newRow",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on( "blur","#widthValue_" + componentID, function(e){
        //获取编辑的值
        var editWidthValue = $(editPage).find("#widthValue_" + componentID).val();
        //赋值到表单属性
        if(editWidthValue != ""){
            iconWidth.removeClass();
            iconWidth.addClass("icon-grid");
            $(editPage).find("#width_" + componentID).prop("checked",true);
            $(editPage).find(".component-newRow").css("display","inline-block");
            if(editWidthValue == "50%"){
                iconWidth.addClass("icon-grid-2");
            }else if(editWidthValue == "75%"){
                iconWidth.addClass("icon-grid-3");
            }
            active_component.attr("data-width",editWidthValue);
            $(active_component).css("width",editWidthValue);
        }else{
            iconWidth.removeClass();
            $(editPage).find(".component-newRow").css("display","none");
            $(editPage).find("#width_" + componentID).prop("checked",false);
            active_component.attr("data-width","");
            $(active_component).css("width","100%");
        }
    });
    $(editPage).on( "click","#newRow_" + componentID, function(e){
        //获取编辑的值
        var editNewRow=$(editPage).find("#newRow_" + componentID).is(":checked");
        //赋值到表单属性
        if(editNewRow){
            active_component.attr("data-newRow",true);
            active_component.addClass("clear")
        }else{
            active_component.attr("data-newRow",false);
            active_component.removeClass("clear")
        }
    });
};

/*
 分类标题 groupTitle
 */
LPB.plugins["groupTitle"] = function (active_component) {
    var componentID = active_component.attr("id").split("_")[1];
    //获取组件
    var componentContent = active_component.find("#groupTitle_"+componentID);
    //获取编辑页面
    var editPage = $("#editComponent");
    /*跳转编辑页面  初始化值*/
    $(editPage).find("#componentName_"+componentID).val(active_component.attr("data-value"));

    $(editPage).find("#backgroundColorValue_"+componentID).css("background-color",active_component.attr("data-backgroundColor"));
    $(editPage).find("#opacity_"+componentID).val(active_component.attr("data-opacity"));
    $(editPage).find("#backgroundColorValueDisplay_"+componentID).html(active_component.attr("data-backgroundColor"));

    $(editPage).find("#borderTopColorValue_"+componentID).css("background-color",active_component.attr("data-borderTopColorValue"));
    $(editPage).find("#borderTopWidthValue_"+componentID).val(active_component.attr("data-borderTopWidthValue"));
    $(editPage).find("#borderTopColorValueDisplay_"+componentID).html(active_component.attr("data-borderTopColorValue"));

    $(editPage).find("#fontFamilyValue_"+componentID).val(active_component.attr("data-fontFamily"));
    $(editPage).find("#fontSizeValue_"+componentID).val(active_component.attr("data-fontSize"));
    $(editPage).find("#fontWeightValue_"+componentID).val(active_component.attr("data-fontWeight"));
    $(editPage).find("#fontColorValue_"+componentID).css("background-color",active_component.attr("data-fontColor"));
    $(editPage).find("#fontColorValueValueDisplay_"+componentID).html(active_component.attr("data-fontColor"));

    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#componentName_"+componentID , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#componentName_"+componentID).val();
        //赋值到表单属性
        $(componentContent).html(editDefaultValue);
        active_component.attr("data-value",editDefaultValue);
    });

    //初始化编辑页面取色器
    $("#backgroundColorValue_"+componentID).colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(editPage).find("#backgroundColorValueDisplay_"+componentID).html("#"+hex);
            $(componentContent).css("background-color","#"+hex);
            active_component.attr("data-backgroundColor","#"+hex);
        }
    });

    $(editPage).on("blur","#opacity_"+componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#opacity_"+componentID).val();
        //赋值到表单属性
        $(componentContent).css("opacity",editDefaultValue);
        active_component.attr("data-opacity",editDefaultValue);
    });

    $("#borderTopColorValue_"+componentID).colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(editPage).find("#borderTopColorValueDisplay_"+componentID).html("#"+hex);
            $(componentContent).css("border-top-color","#"+hex);
            active_component.attr("data-borderTopColorValue","#"+hex);
        }
    });

    $(editPage).on("blur","#borderTopWidthValue_"+componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#borderTopWidthValue_"+componentID).val();
        //赋值到表单属性
        $(componentContent).css("border-top-width",editDefaultValue);
        active_component.attr("data-borderTopWidthValue",editDefaultValue);
    });

    $(editPage).on("blur","#fontFamilyValue_"+componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontFamilyValue_"+componentID).val();
        //赋值到表单属性
        $(componentContent).css("font-family",editDefaultValue);
        active_component.attr("data-fontFamily",editDefaultValue);
    });

    $(editPage).on("blur","#fontSizeValue_"+componentID , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontSizeValue_"+componentID).val();
        //赋值到表单属性
        $(componentContent).css("font-size",editDefaultValue);
        active_component.attr("data-fontSize",editDefaultValue);
    });

    $(editPage).on("blur","#fontWeightValue_"+componentID, function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontWeightValue_"+componentID).val();
        //赋值到表单属性
        $(componentContent).css("font-weight",editDefaultValue);
        active_component.attr("data-fontWeight",editDefaultValue);
    });

    $("#fontColorValue_"+componentID).colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(editPage).find("#fontColorValueValueDisplay_"+componentID).html("#"+hex);
            $(componentContent).css("color","#"+hex);
            active_component.attr("data-fontColor","#"+hex);
        }
    });
};
/*
 提交按钮 btnSubmit
 */
LPB.plugins["btnSubmit"] = function (active_component) {
    //获取组件
    var componentContent = active_component.find("#input_btn_submit");
    //获取编辑页面
    var editPage = $("#editComponent");
    /*跳转编辑页面  初始化值*/
    $(editPage).find("#backgroundColorValue" ).css("background-color",active_component.attr("data-backgroundColor"));
    $(editPage).find("#paddingValue" ).val(active_component.attr("data-padding"));
    $(editPage).find("#shadowValue" ).val(active_component.attr("data-shadow"));

    $(editPage).find("#fontFamilyValue" ).val(active_component.attr("data-fontFamily"));
    $(editPage).find("#fontSizeValue" ).val(active_component.attr("data-fontSize"));
    $(editPage).find("#fontWeightValue" ).val(active_component.attr("data-fontWeight"));
    $(editPage).find("#fontColorValue" ).css("background-color",active_component.attr("data-fontColor"));

    $(editPage).find("#borderColorValue" ).css("background-color",active_component.attr("data-borderColor"));
    $(editPage).find("#borderWidthValue" ).val(active_component.attr("data-borderWidth"));

    if(active_component.attr("data-layout") == "0"){
        $(editPage).find("#left" ).addClass("radio-selected");
        $(editPage).find("#center" ).removeClass("radio-selected");
        $(editPage).find("#right" ).removeClass("radio-selected");
    }else if(active_component.attr("data-layout") == "35%"){
        $(editPage).find("#left" ).removeClass("radio-selected");
        $(editPage).find("#center" ).addClass("radio-selected");
        $(editPage).find("#right" ).removeClass("radio-selected");
    }else if(active_component.attr("data-layout") == "65%"){
        $(editPage).find("#left" ).removeClass("radio-selected");
        $(editPage).find("#center" ).removeClass("radio-selected");
        $(editPage).find("#right" ).addClass("radio-selected");
    }

    //初始化编辑页面取色器
    $("#backgroundColorValue").colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(componentContent).css("background-color","#"+hex);
            active_component.attr("data-backgroundColor","#"+hex);
        }
    });

    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#paddingValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#paddingValue").val();
        //赋值到表单属性
        $(componentContent).css("padding",editDefaultValue);
        active_component.attr("data-padding",editDefaultValue);
    });

    $(editPage).on("blur","#shadowValue" ,  function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#shadowValue").val();
        //赋值到表单属性
        if(editDefaultValue == "true"){
            $(componentContent).addClass("btnShadow");
            active_component.attr("data-shadow",editDefaultValue);
        }else{
            $(componentContent).removeClass("btnShadow");
            active_component.attr("data-shadow","");
        }
    });

    $(editPage).on("blur","#fontFamilyValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontFamilyValue").val();
        //赋值到表单属性
        $(componentContent).css("font-family",editDefaultValue);
        active_component.attr("data-fontFamily",editDefaultValue);
    });

    $(editPage).on("blur","#fontSizeValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontSizeValue").val();
        //赋值到表单属性
        $(componentContent).css("font-size",editDefaultValue);
        active_component.attr("data-fontSize",editDefaultValue);
    });

    $(editPage).on("blur","#fontWeightValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontWeightValue").val();
        //赋值到表单属性
        $(componentContent).css("font-weight",editDefaultValue);
        active_component.attr("data-fontWeight",editDefaultValue);
    });

    $("#fontColorValue").colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(componentContent).css("color","#"+hex);
            active_component.attr("data-fontColor","#"+hex);
        }
    });

    $("#borderColorValue").colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(componentContent).css("border-color","#"+hex);
            $(componentContent).css("border-style","solid");
            active_component.attr("data-borderColor","#"+hex);
        }
    });

    $(editPage).on("blur","#borderWidthValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#borderWidthValue").val();
        //赋值到表单属性
        $(componentContent).css("border-width",editDefaultValue);
        $(componentContent).css("border-style","solid");
        active_component.attr("data-borderWidth",editDefaultValue);
    });

    $(editPage).on( "click","#layoutLeft" , function(e){
        $(editPage).find("#left").addClass("radio-selected");
        $(editPage).find("#center").removeClass("radio-selected");
        $(editPage).find("#right").removeClass("radio-selected");
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#layoutLeft").val();
        //赋值到表单属性
        active_component.css("margin-left",editDefaultValue);
        active_component.attr("data-layout",editDefaultValue);
    });

    $(editPage).on("click","#layoutCenter" , function(e){
        $(editPage).find("#left").removeClass("radio-selected");
        $(editPage).find("#center").addClass("radio-selected");
        $(editPage).find("#right").removeClass("radio-selected");
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#layoutCenter").val();
        //赋值到表单属性
        active_component.css("margin-left",editDefaultValue);
        active_component.attr("data-layout",editDefaultValue);
    });

    $(editPage).on( "click","#layoutRight" , function(e){
        $(editPage).find("#left").removeClass("radio-selected");
        $(editPage).find("#center").removeClass("radio-selected");
        $(editPage).find("#right").addClass("radio-selected");
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#layoutRight").val();
        //赋值到表单属性
        active_component.css("margin-left",editDefaultValue);
        active_component.attr("data-layout",editDefaultValue);
    });
}
/*
 暂存按钮 btnTemporary
 */
LPB.plugins["btnTemporary"] = function (active_component) {
    //获取组件
    var componentContent = active_component.find("#input_btn_temporary");
    //获取编辑页面
    var editPage = $("#editComponent");
    /*跳转编辑页面  初始化值*/
    $(editPage).find("#backgroundColorValue" ).css("background-color",active_component.attr("data-backgroundColor"));
    $(editPage).find("#paddingValue" ).val(active_component.attr("data-padding"));
    $(editPage).find("#shadowValue" ).val(active_component.attr("data-shadow"));

    $(editPage).find("#fontFamilyValue" ).val(active_component.attr("data-fontFamily"));
    $(editPage).find("#fontSizeValue" ).val(active_component.attr("data-fontSize"));
    $(editPage).find("#fontWeightValue" ).val(active_component.attr("data-fontWeight"));
    $(editPage).find("#fontColorValue" ).css("background-color",active_component.attr("data-fontColor"));

    $(editPage).find("#borderColorValue" ).css("background-color",active_component.attr("data-borderColor"));
    $(editPage).find("#borderWidthValue" ).val(active_component.attr("data-borderWidth"));

    //初始化编辑页面取色器
    $("#backgroundColorValue").colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(componentContent).css("background-color","#"+hex);
            active_component.attr("data-backgroundColor","#"+hex);
        }
    });

    //给编辑页面的编辑框添加事件
    $(editPage).on("blur","#paddingValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#paddingValue").val();
        //赋值到表单属性
        $(componentContent).css("padding",editDefaultValue);
        active_component.attr("data-padding",editDefaultValue);
    });

    $(editPage).on("blur","#shadowValue" ,  function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#shadowValue").val();
        //赋值到表单属性
        if(editDefaultValue == "true"){
            $(componentContent).addClass("btnShadow");
            active_component.attr("data-shadow",editDefaultValue);
        }else{
            $(componentContent).removeClass("btnShadow");
            active_component.attr("data-shadow","");
        }
    });

    $(editPage).on("blur","#fontFamilyValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontFamilyValue").val();
        //赋值到表单属性
        $(componentContent).css("font-family",editDefaultValue);
        active_component.attr("data-fontFamily",editDefaultValue);
    });

    $(editPage).on("blur","#fontSizeValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontSizeValue").val();
        //赋值到表单属性
        $(componentContent).css("font-size",editDefaultValue);
        active_component.attr("data-fontSize",editDefaultValue);
    });

    $(editPage).on("blur","#fontWeightValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#fontWeightValue").val();
        //赋值到表单属性
        $(componentContent).css("font-weight",editDefaultValue);
        active_component.attr("data-fontWeight",editDefaultValue);
    });

    $("#fontColorValue").colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(componentContent).css("color","#"+hex);
            active_component.attr("data-fontColor","#"+hex);
        }
    });

    $("#borderColorValue").colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css("background-color","#"+hex);
            $(componentContent).css("border-color","#"+hex);
            $(componentContent).css("border-style","solid");
            active_component.attr("data-borderColor","#"+hex);
        }
    });

    $(editPage).on("blur","#borderWidthValue" , function(e){
        //获取编辑的值
        var editDefaultValue =$(editPage).find("#borderWidthValue").val();
        //赋值到表单属性
        $(componentContent).css("border-width",editDefaultValue);
        $(componentContent).css("border-style","solid");
        active_component.attr("data-borderWidth",editDefaultValue);
    });
};