package com.wingconn.govForm.service;

import com.wingconn.govForm.domain.FormUpdateMarkDO;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 16:27.
 */
public interface FormUpdateMarkService {
    /**
     * 添加一条新记录
     * @param formUpdateMarkDO
     * @return
     */
    boolean saveNewOne(FormUpdateMarkDO formUpdateMarkDO);

    boolean saveModifyOne(FormUpdateMarkDO formUpdateMarkDO);

    boolean removeByFormId(String formId);
}
