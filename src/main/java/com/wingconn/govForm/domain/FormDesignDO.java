package com.wingconn.govForm.domain;

import java.util.Date;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 9:47.
 */
public class FormDesignDO {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 表单ID
     */
    private String formId;

    /**
     * 表单名称
     */
    private String formName;

    /**
     * 表单元数据
     */
    private String formMeta;

    /**
     * 类型（0：企业通；1：居民通）
     */
    private String formType;

    /**
     * 表单状态（0：新增；1：发布）
     */
    private String status;

    /**
     * 是否为模板（0：不是模板；1：模板）
     */
    private String template;

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
     * 编辑态表单内容
     */
    private String formEditContent;

    /**
     * 发布态表单内容
     */
    private String formPublishContent;

    /**
     * 表单描述
     */
    private String formDescribe;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public String getFormName() {
        return formName;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public String getFormMeta() {
        return formMeta;
    }

    public void setFormMeta(String formMeta) {
        this.formMeta = formMeta;
    }

    public String getFormType() {
        return formType;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
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

    public String getFormEditContent() {
        return formEditContent;
    }

    public void setFormEditContent(String formEditContent) {
        this.formEditContent = formEditContent;
    }

    public String getFormDescribe() {
        return formDescribe;
    }

    public void setFormDescribe(String formDescribe) {
        this.formDescribe = formDescribe;
    }

    public String getFormPublishContent() {
        return formPublishContent;
    }

    public void setFormPublishContent(String formPublishContent) {
        this.formPublishContent = formPublishContent;
    }

    @Override
    public String toString() {
        return "FormDesignDO{" +
                "id=" + id +
                ", formId='" + formId + '\'' +
                ", formName='" + formName + '\'' +
                ", formMeta='" + formMeta + '\'' +
                ", formType='" + formType + '\'' +
                ", status='" + status + '\'' +
                ", template='" + template + '\'' +
                ", createrId='" + createrId + '\'' +
                ", createrName='" + createrName + '\'' +
                ", createDate=" + createDate +
                ", modifierId='" + modifierId + '\'' +
                ", modifierName='" + modifierName + '\'' +
                ", updateDate=" + updateDate +
                ", formEditContent='" + formEditContent + '\'' +
                ", formPublishContent='" + formPublishContent + '\'' +
                ", formDescribe='" + formDescribe + '\'' +
                '}';
    }
}
