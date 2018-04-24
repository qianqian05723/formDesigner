package com.wingconn.govForm.service;

import com.wingconn.govForm.dao.FtpDAO;
import com.wingconn.govForm.property.FTPServerProperties;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.util.FilenameUtil;
import com.wingconn.govForm.util.ResultFactory;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-17 10:16.
 */
@Service
public interface HtmlFileFtpUploadService {

    /**
     * 上传文件表单模板页面
     * @param formId 表单 id
     * @return
     */
    boolean uploadFile(String formId, String html);

//    /**
//     * 删除 FTP 中存在的 html 表单文件
//     * @param filename html文件名
//     * @return
//     */
//    public Result deleteFile(String form) {
//        boolean isDelete = ftpDao.delete(property, filename);
//        return getResultByBoolean(isDelete);
//    }

    /**
     * 下载 FTP 中得 html 表单文件
     * @param formId
     * @return
     */
    String downloadFile(String formId);


//    /**
//     * 根据参数创建 Result
//     * @param flag
//     * @return
//     */
//    private Result getResultByBoolean(boolean flag) {
//        if (flag) {
//            return ResultFactory.success();
//        } else {
//            return ResultFactory.failResult();
//        }
//    }
}
