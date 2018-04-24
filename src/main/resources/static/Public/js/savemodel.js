/**
 * Created by admin on 2017/6/27.
 */
(function() {
    var SAVE=window.SAVE=window.SAVE||{
            plugins: []
        }
})();
/*text*/
SAVE.plugins['text']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
            fieldName:fieldName
            };
}
/*textarea*/
SAVE.plugins['textarea']=function(active_component){
    var fieldId=$(active_component).find("textarea").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
}
/*radio*/
SAVE.plugins['radio']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*checkbox*/
SAVE.plugins['checkbox']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
            fieldName:fieldName
            };
};
/*dropdown*/
SAVE.plugins['dropdown']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
            fieldName:fieldName
    };
};
/*number*/
SAVE.plugins['number']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*time*/
SAVE.plugins['time']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*date*/
SAVE.plugins['date']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*email*/
SAVE.plugins['email']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*mobilePhone*/
SAVE.plugins['mobilePhone']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*telephone*/
SAVE.plugins['telephone']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*address*/
SAVE.plugins['address']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*uploadimg*/
SAVE.plugins['uploadimg']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*uploadfile*/
SAVE.plugins['uploadfile']=function(active_component){
    var fieldId=$(active_component).find("input").attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*cascadedropdown*/
SAVE.plugins['cascadedropdown']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};

/*table*/
SAVE.plugins['table']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*table*/
SAVE.plugins['fieldtext']=function(active_component){
    var fieldId=$(active_component).attr("id");
    var fieldName=$(active_component).find(".component_title").text();
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};
/*groupTitle*/
SAVE.plugins['groupTitle']=function(active_component){
    var fieldId=$(active_component).find(".groupTitle").attr("id");
    var fieldName=$(active_component).attr("data-componentname");
    return {fieldId:fieldId,
        fieldName:fieldName
    };
};