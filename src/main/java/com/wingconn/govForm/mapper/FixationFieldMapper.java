package com.wingconn.govForm.mapper;

import com.wingconn.govForm.domain.FixationFieldDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 15:07.
 */
@Mapper
public interface FixationFieldMapper {

    int saveOne(FixationFieldDO fixationFieldDO);

    int updateOne(FixationFieldDO fixationFieldDO);

    FixationFieldDO getById(@Param("id") int id);

    List<FixationFieldDO> listPage(@Param("offset") int offset,@Param("limit") int limit);

    List<FixationFieldDO> listFormTypePage(@Param("offset") int offset,@Param("limit") int limit, @Param("formType") String formType);

    List<FixationFieldDO> listFilterPage(@Param("offset") int offset, @Param("limit") int limit, @Param("filter") String filter);

    List<FixationFieldDO> listFormTypeFilterPage(@Param("offset") int offset, @Param("limit") int limit, @Param("filter") String filter, @Param("formType") String formType);

    int countAllRecords();

    int countFilterRecords(@Param("formType") String formType, @Param("fixationFieldName") String fixationFieldName);

    int removeById(@Param("id") int fixationFieldId);

    int exist(FixationFieldDO fixationFieldDO);

    List<FixationFieldDO> listField(@Param("list") List<Integer> ids);
}
