package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.domain.FixationFieldDO;
import com.wingconn.govForm.mapper.FixationFieldMapper;
import com.wingconn.govForm.service.FixationFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 15:47.
 */
@Service
public class FixationFieldServiceImpl implements FixationFieldService {
    private FixationFieldMapper fixationFieldMapper;

    @Autowired
    public FixationFieldServiceImpl(FixationFieldMapper fixationFieldMapper) {
        this.fixationFieldMapper = fixationFieldMapper;
    }

    @Override
    public boolean saveOne(FixationFieldDO fixationFieldDO) {
        return 1 == fixationFieldMapper.saveOne(fixationFieldDO);
    }

    @Override
    public boolean updateOne(FixationFieldDO fixationFieldDO) {
        return 1 == fixationFieldMapper.updateOne(fixationFieldDO);
    }

    @Override
    public FixationFieldDO getById(Integer id) {
        return fixationFieldMapper.getById(id);
    }

    @Override
    public boolean removeById(Integer id) {
        return 1 == fixationFieldMapper.removeById(id);
    }

    @Override
    public List<FixationFieldDO> listPage(int offset, int limit) {
        return fixationFieldMapper.listPage(offset, limit);
    }

    @Override
    public List<FixationFieldDO> listFormTypePage(int offset, int limit, String formType) {
        return fixationFieldMapper.listFormTypePage(offset, limit, formType);
    }

    @Override
    public List<FixationFieldDO> listFilterPage(int offset, int limit, String filter) {
        return fixationFieldMapper.listFilterPage(offset, limit, filter);
    }

    @Override
    public List<FixationFieldDO> listFormTypeFilterPage(int offset, int limit, String filter, String formType) {
        return fixationFieldMapper.listFormTypeFilterPage(offset, limit, filter, formType);
    }

    @Override
    public int countAllRecords() {
        return fixationFieldMapper.countAllRecords();
    }

    @Override
    public int countAllRecords(String formType, String fixationFieldName) {
        return fixationFieldMapper.countFilterRecords(formType, fixationFieldName);
    }

    @Override
    public boolean exist(FixationFieldDO fixationFieldDO) {
        return fixationFieldMapper.exist(fixationFieldDO) > 0;
    }

    @Override
    public List<FixationFieldDO> listField(List<Integer> idList) {
        return fixationFieldMapper.listField(idList);
    }
}
