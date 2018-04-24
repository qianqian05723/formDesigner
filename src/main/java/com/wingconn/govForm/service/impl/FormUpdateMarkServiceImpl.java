package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.domain.FormUpdateMarkDO;
import com.wingconn.govForm.mapper.FormUpdateMarkMapper;
import com.wingconn.govForm.service.FormUpdateMarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 16:28.
 */
@Service
public class FormUpdateMarkServiceImpl implements FormUpdateMarkService {

    private final FormUpdateMarkMapper formUpdateMarkMapper;

    @Autowired
    public FormUpdateMarkServiceImpl(FormUpdateMarkMapper formUpdateMarkMapper) {
        this.formUpdateMarkMapper = formUpdateMarkMapper;
    }

    @Override
    public boolean saveNewOne(FormUpdateMarkDO formUpdateMarkDO) {
        return 1 == formUpdateMarkMapper.saveNewOne(formUpdateMarkDO);
    }

    @Override
    public boolean saveModifyOne(FormUpdateMarkDO formUpdateMarkDO) {
        return 1 == formUpdateMarkMapper.saveModifyOne(formUpdateMarkDO);
    }

    @Override
    public boolean removeByFormId(String formId) {
        return 0 != formUpdateMarkMapper.removeByFormIdInLogic(formId);
    }
}
