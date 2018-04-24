package com.wingconn.govForm.model;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 14:18.
 */

/**
 * 模型数据中的 property
 */
public class AppModelProperty {
    private String modelState = "normal";
    private String dataService = "mongo";
    private String dataAppWritable = "";
    private String isTenantRelated = "true";
    private String shareFlag = "false";
    private String publishFlag = "false";
    private String modelName_en = "";
    private String modelName_cn = "";
    private String modelDescription = "";
    private String modelVersion = "v1.0.0";
    private String appId = "";
    private String modelId = "";

    public String getModelState() {
        return modelState;
    }

    public void setModelState(String modelState) {
        this.modelState = modelState;
    }

    public String getDataService() {
        return dataService;
    }

    public void setDataService(String dataService) {
        this.dataService = dataService;
    }

    public String getDataAppWritable() {
        return dataAppWritable;
    }

    public void setDataAppWritable(String dataAppWritable) {
        this.dataAppWritable = dataAppWritable;
    }

    public String getIsTenantRelated() {
        return isTenantRelated;
    }

    public void setIsTenantRelated(String isTenantRelated) {
        this.isTenantRelated = isTenantRelated;
    }

    public String getShareFlag() {
        return shareFlag;
    }

    public void setShareFlag(String shareFlag) {
        this.shareFlag = shareFlag;
    }

    public String getPublishFlag() {
        return publishFlag;
    }

    public void setPublishFlag(String publishFlag) {
        this.publishFlag = publishFlag;
    }

    public String getModelName_en() {
        return modelName_en;
    }

    public void setModelName_en(String modelName_en) {
        this.modelName_en = modelName_en;
    }

    public String getModelName_cn() {
        return modelName_cn;
    }

    public void setModelName_cn(String modelName_cn) {
        this.modelName_cn = modelName_cn;
    }

    public String getModelDescription() {
        return modelDescription;
    }

    public void setModelDescription(String modelDescription) {
        this.modelDescription = modelDescription;
    }

    public String getModelVersion() {
        return modelVersion;
    }

    public void setModelVersion(String modelVersion) {
        this.modelVersion = modelVersion;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    @Override
    public String toString() {
        return "AppModelProperty{" +
                "modelState='" + modelState + '\'' +
                ", dataService='" + dataService + '\'' +
                ", dataAppWritable='" + dataAppWritable + '\'' +
                ", isTenantRelated='" + isTenantRelated + '\'' +
                ", shareFlag='" + shareFlag + '\'' +
                ", publishFlag='" + publishFlag + '\'' +
                ", modelName_en='" + modelName_en + '\'' +
                ", modelName_cn='" + modelName_cn + '\'' +
                ", modelDescription='" + modelDescription + '\'' +
                ", modelVersion='" + modelVersion + '\'' +
                ", appId='" + appId + '\'' +
                ", modelId='" + modelId + '\'' +
                '}';
    }
}
