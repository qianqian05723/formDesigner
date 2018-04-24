package com.wingconn.govForm.constant;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-17 14:14.
 */
public class ServerMsgConstants {
    public static final String HTML_SAVE_EXCEPTION = "html写入服务器view目录异常";
    public static final String FORM_INSERT_EXCEPTION = "表单写入数据库异常";
    public static final String GET_FILE_INPUT_STREAM_EXCEPTION = "获取html文件输入流上传FTP异常";

    public static final String DOWNLOAD_FILE_FROM_FTP_EXCEPTION = "从FTP下载文件异常";


    public static final String CREATE_DIRECTORY_VIEW_EXCEPTION = "创建View目录异常";

    public static final String ADD_TABLE_COLUMNS_EXCEPTION = "添加表字段异常";

    // 加强字段操作
    public static final String FIXATION_FIELD_SAVE_EX = "加强字段添加异常";
    public static final String FIXATION_FIELD_UPDATE_EX = "加强字段更新异常";


    // 读取html前后缀文件异常
    public static final String READ_HTML_SUFFIX_PREFIX_EX = "读取html前后缀文件异常";

    // 生成的form表单文件存放的位置
    public static final String FORM_STORAGE_PATH = "/WEB-INF/classes/templates/form.html";

    // 传递的参数不是居民通或者企业通
    public static final String FORM_TYPE_ERROR = "表单类型在企业通和居民通之外";

    // 生成的加强字段的配置文件
    public static final String FIXATION_JSON_PATH = "/WEB-INF/classes/fixation.json";

    // 解压 war 包时异常
    public static final String UNPACK_WAR_ERROR = "解压WAR包异常";

    // 压缩 war 包时异常
    public static final String PACK_WAR_ERROR = "压缩WAR包异常";

    public static final String DELETE_FORM_PROJECT_ERROR = "删除生成的表单填写工程异常";

    public static final String WRITE_MODEL_JSON_FILE_ERROR = "创建模型资源配置文件异常";

    public static final String CREATE_TABLE_ERROR = "创建动态表异常";

    public static final String GENERATE_WAR_PACKAGE_ERROR = "创建war包异常";

    public static final String GENERATE_MODEL_ERROR = "创建模型资源文件异常";

    public static final String DOWNLOAD_FIEL_TYPE_NOT_MATCH = "下载文件类型不匹配";
}
