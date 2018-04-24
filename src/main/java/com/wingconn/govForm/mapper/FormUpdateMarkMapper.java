package com.wingconn.govForm.mapper;

import com.wingconn.govForm.domain.FormUpdateMarkDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 15:18.
 */
@Mapper
public interface FormUpdateMarkMapper {

    /**
     * 向数据库中插入一条
     * @param formUpdateMarkDO
     * @return
     */
    int saveNewOne(FormUpdateMarkDO formUpdateMarkDO);

    /**
     * 重新发布
     * @param formUpdateMarkDO
     * @return
     */
    int saveModifyOne(FormUpdateMarkDO formUpdateMarkDO);

    /**
     * 更新一条记录
     * @param formUpdateMarkDO
     * @return
     */
    int updateOne(FormUpdateMarkDO formUpdateMarkDO);

    /**
     * 查找一条记录
     * @param formId
     * @return
     */
    FormUpdateMarkDO getByFormId(@Param("formId") String formId);



    /**
     * 逻辑上删除一条
     * @param formId
     * @return
     */
    int removeByFormIdInLogic(@Param("formId") String formId);
}
