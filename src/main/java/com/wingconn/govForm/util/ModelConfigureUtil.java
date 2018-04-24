package com.wingconn.govForm.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.wingconn.govForm.constant.AppModelConstant;
import com.wingconn.govForm.factory.ColumnInfoTOFactory;
import com.wingconn.govForm.model.AppModel;
import com.wingconn.govForm.model.AppModelContent;
import com.wingconn.govForm.model.AppModelDataSchema;
import com.wingconn.govForm.model.AppModelProperty;
import com.wingconn.govForm.to.ColumnInfoTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 10:16.
 */
public class ModelConfigureUtil {
    private static Logger LOGGER = LoggerFactory.getLogger(ModelConfigureUtil.class);

    public static String getModelJsonStr(String formId, String formName, String formMeta) {
        List<ColumnInfoTO> cfList = resolveFormMeta(formMeta);
        AppModel model = assembleModel(StringUtils.addSuffixVersion(formId), createModelId(formId), formName,cfList);
//        String jsonStr = JSON.toJSONString(model);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        List<AppModel> appModelList = new ArrayList<>();
        appModelList.add(model);
        return gson.toJson(appModelList);
    }

    private static AppModel assembleModel(String appId, String modelId, String formName, List<ColumnInfoTO> columnList) {
        AppModelProperty property = new AppModelProperty();

        property.setDataAppWritable(appId);
        property.setModelName_en(StringUtils.removeSuffixVersion(modelId));
        property.setModelName_cn(formName);
        property.setModelDescription(formName);
        property.setAppId(appId);
        property.setModelId(modelId);

        LOGGER.debug(property.toString());


        AppModelContent content = new AppModelContent();

        AppModelDataSchema dataSchema = new AppModelDataSchema();
        Map<String, ColumnInfoTO> properties = new HashMap<>(columnList.size());
        for (ColumnInfoTO c : columnList) {
            properties.put(c.getId(), c);
        }
        dataSchema.setProperties(properties);
        content.setDataSchema(dataSchema);

        List<String> required = new ArrayList<>(2);
        required.add(AppModelConstant.FORM_ID);
        required.add(AppModelConstant.FORM_INSTANCE_ID);
        dataSchema.setRequired(required);

        LOGGER.debug(content.toString());


        AppModel model = new AppModel(property, content);
        String path = createPath(appId, modelId);
        model.setPath(path);
        LOGGER.debug(model.toString());

        return model;
    }

    /**
     * 解析 formMeta 字段，这里面是动态表数据库中的字段
     * 去除主键id，加上 formId
     * @param formMeta
     * @return
     */
    private static List<ColumnInfoTO> resolveFormMeta(String formMeta) {
        JSONArray array = JSONArray.parseArray(formMeta);

        List<ColumnInfoTO> cfList = new ArrayList<>(array.size());
        for (int i = 0; i < array.size(); i++) {
            JSONObject element = array.getJSONObject(i);
            Set<String> componentSet = element.keySet();
            for (String component : componentSet) {
                ColumnInfoTO componentFieldTO = new ColumnInfoTO();
                componentFieldTO.setId(component);
                componentFieldTO.setDescribe(element.getJSONObject(component).getString("fieldName"));
                cfList.add(componentFieldTO);
                LOGGER.debug(componentFieldTO.toString());
            }
        }

        // 添加表单列
        cfList.add(ColumnInfoTOFactory.newInstance(AppModelConstant.FORM_ID, AppModelConstant.FORM_DESCRIBE));
        // 添加表单实例列
        cfList.add(ColumnInfoTOFactory.newInstance(AppModelConstant.FORM_INSTANCE_ID, AppModelConstant.INSTANCE_DESCRIBE));

        return cfList;
    }

    /**
     * 创建 modelId
     * @param formId
     * @return
     */
    public static String createModelId(String formId) {
        String appId = StringUtils.addSuffixVersion(formId);
        return appId + "_AppModel_" + appId;
    }

    /**
     * 创建 path
     * @param appId
     * @param modelId
     * @return
     */
    private static String createPath(String appId, String modelId) {
        if (StringUtils.isEmpty(appId)) {
            appId = "";
        }
        if (StringUtils.isEmpty(modelId)) {
            modelId = "";
        }
        return "APPMeta/" + appId + "/AppModel/" + modelId;
    }
}
