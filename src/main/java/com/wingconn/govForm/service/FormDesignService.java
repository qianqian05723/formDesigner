package com.wingconn.govForm.service;

import com.wingconn.govForm.domain.FormDesignDO;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 12:00.
 */
public interface FormDesignService {

    /**
     * 添加一条记录
     * @param formDesignDO
     * @return
     */
    boolean saveOne(FormDesignDO formDesignDO);

    /**
     * 发布时添加一条新的记录
     * @param formDesignDO
     * @return
     */
    boolean saveOnePublish(FormDesignDO formDesignDO);

    /**
     * 更新一行
     * @param formDesignDO
     * @return
     */
    boolean updateOne(FormDesignDO formDesignDO);

    /**
     * 发布时更新一条记录
     * @param formDesignDO
     * @return
     */
    boolean updateOnePublish(FormDesignDO formDesignDO);

    /**
     * 查看指定 formId 的记录
     * @param formId
     * @return
     */
    FormDesignDO getByFormId(String formId);

    /**
     * 判断是否是非第一次发布
     * @return
     */
    boolean isPublished(String formId);

    /**
     * 查询某一页的记录
     * @return
     */
    List<FormDesignDO> listByPage(int offset, int limit, String formName);

    /**
     * 查询所有的记录
     * @return
     */
    int countAllRecords(String formName);

    /**
     * 把 formId 的表单发布
     * @param formId
     * @return
     */
    boolean publish(String formId);

    /**
     * 设为模板
     * @param formId
     * @return
     */
    boolean setAsTemplate(String formId);

    String getEditContentByFormId(String formId);

    String getPublishedContentByFormId(String formId);

    boolean removeByFormId(String formId);
}
