package com.wingconn.govForm.mapper;

import com.wingconn.govForm.domain.FormDesignDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 10:30.
 */
@Mapper
public interface FormDesignMapper {

    /**
     * 添加一个 form 表单
     * @param formDesignDO
     * @return
     */
    int saveOne(FormDesignDO formDesignDO);

    /**
     * 发布时添加一个 form 表单
     * @param formDesignDO
     * @return
     */
    int saveOnePublish(FormDesignDO formDesignDO);

    /**
     * 修改 form 表单
     * @param formDesignDO
     * @return
     */
    int updateOne(FormDesignDO formDesignDO);

    /**
     * 发布时修改 form 表单
     * @param formDesignDO
     * @return
     */
    int updateOnePublish(FormDesignDO formDesignDO);

    /**
     * 发布 form 表单
     * @param formId
     * @return
     */
    int publish(String formId);

    int setAsTemplate(@Param("formId") String formId);

    /**
     * 查找 form 表单
     * @param formId
     * @return
     */
    FormDesignDO getByFormId(String formId);


    int isPublished(@Param("formId") String formId);

    /**
     * 判断 formId 是否存在
     * @param formId
     * @return
     */
    int exist(String formId);

    /**
     * 总的条数
     * @return
     */
    int count(@Param("formName") String formName);

    /**
     * 获取一页
     * @param offset
     * @param limit
     * @return
     */
    List<FormDesignDO> page(@Param("offset") int offset, @Param("limit") int limit, @Param("formName") String formName);

    FormDesignDO getEditContentByFormId(@Param("formId") String formId);

    String getPublishedContentByFormId(@Param("formId") String formId);

    int removeByFormId(@Param("formId") String formId);
}
