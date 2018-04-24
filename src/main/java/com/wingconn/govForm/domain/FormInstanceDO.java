package com.wingconn.govForm.domain;

import java.util.Date;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 10:00.
 */
public class FormInstanceDO {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 表单ID
     */
    private String formId;

    /**
     * 表单实例ID
     */
    private String formInstanceId;

    /**
     * 表单实例数据json
     */
    private String formInstanceData;

    /**
     * 类型（0：企业通；1：居民通）
     */
    private String formType;

    /**
     * 审批人ID
     */
    private String approverId;

    /**
     * 审批人姓名
     */
    private String approverName;

    /**
     * 审批时间
     */
    private Date approverDate;

    /**
     * 审批人意见
     */
    private String approverContent;

    /**
     * 表单状态（0：草稿；1：提交；2：审批）
     */
    private String status;

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

    public String getFormInstanceId() {
        return formInstanceId;
    }

    public void setFormInstanceId(String formInstanceId) {
        this.formInstanceId = formInstanceId;
    }

    public String getFormInstanceData() {
        return formInstanceData;
    }

    public void setFormInstanceData(String formInstanceData) {
        this.formInstanceData = formInstanceData;
    }

    public String getFormType() {
        return formType;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    public String getApproverId() {
        return approverId;
    }

    public void setApproverId(String approverId) {
        this.approverId = approverId;
    }

    public String getApproverName() {
        return approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public Date getApproverDate() {
        return approverDate;
    }

    public void setApproverDate(Date approverDate) {
        this.approverDate = approverDate;
    }

    public String getApproverContent() {
        return approverContent;
    }

    public void setApproverContent(String approverContent) {
        this.approverContent = approverContent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
    public String  toString() {
        return "FormInstanceDomain{" +
                "id=" + id +
                ", formId='" + formId + '\'' +
                ", formInstanceId='" + formInstanceId + '\'' +
                ", formInstanceData='" + formInstanceData + '\'' +
                ", formType='" + formType + '\'' +
                ", approverId='" + approverId + '\'' +
                ", approverName='" + approverName + '\'' +
                ", approverDate=" + approverDate +
                ", approverContent='" + approverContent + '\'' +
                ", status='" + status + '\'' +
                ", createrId='" + createrId + '\'' +
                ", createrName='" + createrName + '\'' +
                ", createDate=" + createDate +
                ", modifierId='" + modifierId + '\'' +
                ", modifierName='" + modifierName + '\'' +
                ", updateDate=" + updateDate +
                '}';
    }
}
