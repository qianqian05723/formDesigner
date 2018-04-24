package com.wingconn.govForm.service.impl;

import com.alibaba.fastjson.JSON;
import com.wingconn.govForm.domain.FormDesignDO;
import com.wingconn.govForm.mapper.FormDesignMapper;
import com.wingconn.govForm.service.FormDesignService;
import com.wingconn.govForm.util.FilenameUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 17:14.
 */
@Service
public class FormDesignServiceImpl implements FormDesignService {
    @Autowired
    private FormDesignMapper formDesignMapper;

    /**
     * 添加一条表单记录（场景：第一次保存）
     * @param formDesignDO
     * @return 是否操作成功
     */
    @Transactional
    @Override
    public boolean saveOne(FormDesignDO formDesignDO) {
        String formId = FilenameUtil.getUniqueFormId();
        formDesignDO.setFormId(formId);
        return 1 == formDesignMapper.saveOne(formDesignDO);
    }

    /**
     * 发布时添加一条表单记录（场景：第一次保存，或者没有保存直接发布时调用）
     * @param formDesignDO
     * @return 是否操作成功
     */
    @Transactional
    @Override
    public boolean saveOnePublish(FormDesignDO formDesignDO) {
        String formId = FilenameUtil.getUniqueFormId();
        formDesignDO.setFormId(formId);
        return 1 == formDesignMapper.saveOnePublish(formDesignDO);
    }

    /**
     * 应用场景（应用在第二次及以后保存，或者发布时（已经保存过））
     * 更新表单记录内容
     * @param formDesignDO
     * @return
     */
    @Transactional
    @Override
    public boolean updateOne(FormDesignDO formDesignDO) {
        return 1 == formDesignMapper.updateOne(formDesignDO);
    }

    /**
     * 应用场景（发布时应用）
     * 发布时 更新表单记录内容
     * @param formDesignDO
     * @return
     */
    @Transactional
    @Override
    public boolean updateOnePublish(FormDesignDO formDesignDO) {
        return 1 == formDesignMapper.updateOnePublish(formDesignDO);
    }

    /**
     * 获取指定 formId 的对象
     * @param formId
     * @return
     */
    @Override
    public FormDesignDO getByFormId(String formId) {
        return formDesignMapper.getByFormId(formId);
    }

    /**
     * 判断是否是重新发布
     * @param formId
     * @return
     */
    @Override
    public boolean isPublished(String formId) {
        return 1 == formDesignMapper.isPublished(formId);
    }

    /**
     * 获取某一指定页的对象列表
     * @param offset
     * @param limit
     * @return
     */
    @Override
    public List<FormDesignDO> listByPage(int offset, int limit, String formName) {
        return formDesignMapper.page(offset, limit, formName);
    }

    /**
     * 获取所有的记录
     * @return
     */
    @Override
    public int countAllRecords(String formName) {
        return formDesignMapper.count(formName);
    }

    /**
     * 发布
     * @param formId
     * @return
     */
    @Transactional
    @Override
    public boolean publish(String formId) {
        return 1 == formDesignMapper.publish(formId);
    }

    /**
     * 设为模板
     * @param formId
     * @return
     */
    @Transactional
    @Override
    public boolean setAsTemplate(String formId) {
        return 1 == formDesignMapper.setAsTemplate(formId);
    }


    @Override
    public String getEditContentByFormId(String formId) {
        FormDesignDO formDesignDO = formDesignMapper.getEditContentByFormId(formId);
        if (null != formDesignDO) {
            Map<String, String> designMap = new HashMap<>();
            designMap.put("formName", formDesignDO.getFormName());
            designMap.put("formEditContent", formDesignDO.getFormEditContent());
            designMap.put("formDescribe", formDesignDO.getFormDescribe());
            designMap.put("formType", formDesignDO.getFormType());
            return JSON.toJSONString(designMap);
        }
        return null;
    }

    @Override
    public String getPublishedContentByFormId(String formId) {
        return formDesignMapper.getPublishedContentByFormId(formId);
    }

    @Override
    public boolean removeByFormId(String formId) {
        return 1 == formDesignMapper.removeByFormId(formId);
    }
}
