package com.wingconn.govForm.domain;

import java.util.Date;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 10:12.
 */
public class FormUpdateMarkDO {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 表单ID
     */
    private String formId;

    /**
     * 类型（0：企业通；1：居民通）
     */
    private String formType;

    /**
     * 表单修改标示（0：新增；1：修改；2：删除）
     */
    private String updateMark;

    /**
     * 是否已经删除（0：否；1：是）
     */
    private String deleted;

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

    public String getFormType() {
        return formType;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    public String getUpdateMark() {
        return updateMark;
    }

    public void setUpdateMark(String updateMark) {
        this.updateMark = updateMark;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
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
        return "FormUpdateMarkDomain{" +
                "id=" + id +
                ", formId='" + formId + '\'' +
                ", formType='" + formType + '\'' +
                ", updateMark='" + updateMark + '\'' +
                ", deleted='" + deleted + '\'' +
                ", createrId='" + createrId + '\'' +
                ", createrName='" + createrName + '\'' +
                ", createDate=" + createDate +
                ", modifierId='" + modifierId + '\'' +
                ", modifierName='" + modifierName + '\'' +
                ", updateDate=" + updateDate +
                '}';
    }
}
