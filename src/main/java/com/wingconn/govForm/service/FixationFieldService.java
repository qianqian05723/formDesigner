package com.wingconn.govForm.service;

import com.wingconn.govForm.domain.FixationFieldDO;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 15:45.
 */
public interface FixationFieldService {

    boolean saveOne(FixationFieldDO fixationFieldDO);


    boolean updateOne(FixationFieldDO fixationFieldDO);

    FixationFieldDO getById(Integer id);

    boolean removeById(Integer id);

    List<FixationFieldDO> listPage(int offset, int limit);

    List<FixationFieldDO> listFormTypePage(int offset, int limit, String formType);

    List<FixationFieldDO> listFilterPage(int offset, int limit, String filter);

    List<FixationFieldDO> listFormTypeFilterPage(int offset, int limit, String filter, String formType);

    int countAllRecords();

    int countAllRecords(String formType, String fixationFieldName);

    boolean exist(FixationFieldDO fixationFieldDO);

    List<FixationFieldDO> listField(List<Integer> ids);
}
