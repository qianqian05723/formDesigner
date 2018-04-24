package com.wingconn.govForm.factory;

import com.wingconn.govForm.domain.FormUpdateMarkDO;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 16:35.
 */
public class FormUpdateMarkFactory {

    /**
     * 创建一个实例
     * @param formId
     * @param formType
     * @return
     */
    public static FormUpdateMarkDO createFormUpdateMark(String formId, String formType, String createrId) {
        FormUpdateMarkDO formUpdateMarkDO = new FormUpdateMarkDO();
        formUpdateMarkDO.setFormId(formId);
        formUpdateMarkDO.setFormType(formType);
        formUpdateMarkDO.setCreaterId(createrId);
        return formUpdateMarkDO;
    }
}
