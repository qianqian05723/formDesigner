package com.wingconn.govForm.factory;

import com.wingconn.govForm.domain.FormDesignDO;
import com.wingconn.govForm.domain.FormUpdateMarkDO;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 16:01.
 */
public class FormDesignFactory {
    /**
     * 创建一个发布时的实例
     * @param formId
     * @param formType
     * @return
     */
    public static FormDesignDO createFormDesign(String formId, String formMeta, String formName, String formType, String formEditContent, String formDescribe, String createrId, String formPublishContent) {
        // 创建存储的 FormDesignDO
        FormDesignDO formDesignDO = new FormDesignDO();
        formDesignDO.setFormId(formId);
        formDesignDO.setFormMeta(formMeta);
        formDesignDO.setFormName(formName);
        formDesignDO.setFormType(formType);
        formDesignDO.setFormEditContent(formEditContent);
        formDesignDO.setFormDescribe(formDescribe);
        formDesignDO.setCreaterId(createrId);
        formDesignDO.setFormPublishContent(formPublishContent);
        return formDesignDO;
    }

    /**
     * 创建一个保存时的实例
     * @param formId
     * @param formType
     * @return
     */
    public static FormDesignDO createFormDesign(String formId, String formMeta, String formName, String formType, String formEditContent, String formDescribe, String createrId) {
        // 创建存储的 FormDesignDO
        FormDesignDO formDesignDO = new FormDesignDO();
        formDesignDO.setFormId(formId);
        formDesignDO.setFormMeta(formMeta);
        formDesignDO.setFormName(formName);
        formDesignDO.setFormType(formType);
        formDesignDO.setFormEditContent(formEditContent);
        formDesignDO.setFormDescribe(formDescribe);
        formDesignDO.setCreaterId(createrId);
        return formDesignDO;
    }
}
