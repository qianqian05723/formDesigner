package com.wingconn.govForm.domain;

import java.util.Date;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 10:17.
 */
public class FixationFieldDO {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 类型（0：企业通；1：居民通）
     */
    private String formType;

    /**
     * 增强字段显示名称
     */
    private String fixationFieldName;

    /**
     * 两通中要访问的数据的模型ID
     */
    private String apiModelId;

    /**
     * 接口地址
     */
    private String apiUrl;

    /**
     * 接口字段（加强字段）
     */
    private String apiField;

    /**
     * 创建人ID
     */
    private String createrId;

    /**
     * 创建人姓名
     */
    private String createrName;

    /**
     * 创建时间
     */
    private Date createDate;

    /**
     * 修改人ID
     */
    private String modifierId;

    /**
     * 修改人姓名
     */
    private String modifierName;

    /**
     * 修改时间
     */
    private Date updateDate;

    /**
     * 是否需要订阅
     */
    private String subscribe;

    public String getSubscribe() {
        return subscribe;
    }

    public void setSubscribe(String subscribe) {
        this.subscribe = subscribe;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFormType() {
        return formType;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    public String getFixationFieldName() {
        return fixationFieldName;
    }

    public void setFixationFieldName(String fixationFieldName) {
        this.fixationFieldName = fixationFieldName;
    }

    public String getApiModelId() {
        return apiModelId;
    }

    public void setApiModelId(String apiModelId) {
        this.apiModelId = apiModelId;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getApiField() {
        return apiField;
    }

    public void setApiField(String apiField) {
        this.apiField = apiField;
    }

    public String getCreaterId() {
        return createrId;
    }

    public void setCreaterId(String createrId) {
        this.createrId = createrId;
    }

    public String getCreaterName() {
        return createrName;
    }

    public void setCreaterName(String createrName) {
        this.createrName = createrName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getModifierId() {
        return modifierId;
    }

    public void setModifierId(String modifierId) {
        this.modifierId = modifierId;
    }

    public String getModifierName() {
        return modifierName;
    }

    public void setModifierName(String modifierName) {
        this.modifierName = modifierName;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public String toString() {
        return "FixationFieldDO{" +
                "id=" + id +
                ", formType='" + formType + '\'' +
                ", fixationFieldName='" + fixationFieldName + '\'' +
                ", apiModelId='" + apiModelId + '\'' +
                ", apiUrl='" + apiUrl + '\'' +
                ", apiField='" + apiField + '\'' +
                ", createrId='" + createrId + '\'' +
                ", createrName='" + createrName + '\'' +
                ", createDate=" + createDate +
                ", modifierId='" + modifierId + '\'' +
                ", modifierName='" + modifierName + '\'' +
                ", updateDate=" + updateDate +
                ", subscribe='" + subscribe + '\'' +
                '}';
    }
}
