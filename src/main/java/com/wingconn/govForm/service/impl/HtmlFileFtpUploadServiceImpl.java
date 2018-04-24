package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.dao.FtpDAO;
import com.wingconn.govForm.property.FTPServerProperties;
import com.wingconn.govForm.property.StorageProperties;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.service.HtmlFileFtpUploadService;
import com.wingconn.govForm.util.FilenameUtil;
import com.wingconn.govForm.util.ResultFactory;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 9:39.
 */
@Service
public class HtmlFileFtpUploadServiceImpl implements HtmlFileFtpUploadService {
    private static final Logger LOGGER = LoggerFactory.getLogger(HtmlFileFtpUploadServiceImpl.class);

    private final FtpDAO ftpDao;

    private final FTPServerProperties property;

    /**
     * html 表单在服务器存储路径
     */
    private final Path rootLocation;

    private String htmlPrefix;

    private String htmlSuffix;

    @Autowired
    public HtmlFileFtpUploadServiceImpl(FtpDAO ftpDao, FTPServerProperties property, StorageProperties properties) {
        this.ftpDao = ftpDao;
        this.property = property;
        this.rootLocation = Paths.get(properties.getLocation());
        try {
            htmlPrefix = FileUtils.readFileToString(Paths.get(properties.getHtmlPrefix()).toFile(), "utf-8");
            htmlSuffix = FileUtils.readFileToString(Paths.get(properties.getHtmlSuffix()).toFile(), "utf-8");
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.READ_HTML_SUFFIX_PREFIX_EX, e);
        }
    }

    /**
     * 上传 表单模板页面 到 view 目录
     * @param formId
     * @return
     */
    public boolean uploadFile(String formId, String html) {
        String htmlName = FilenameUtil.addHtmlSuffix(formId);
        Path formIdPath = rootLocation.resolve(htmlName);
        String htmlContent = htmlPrefix + html + htmlSuffix;
        try {
            FileUtils.writeStringToFile(formIdPath.toFile(), htmlContent, "utf-8");
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.HTML_SAVE_EXCEPTION, e);
        }

        try (InputStream is = new ByteArrayInputStream(htmlContent.getBytes("utf-8"))) {
            return ftpDao.upload(property, htmlName, is);
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.GET_FILE_INPUT_STREAM_EXCEPTION, e);
            return false;
        }
    }

    /**
     * 下载 FTP 中得 html 表单文件
     * @param formId
     * @return
     */
    public String downloadFile(String formId) {
        return ftpDao.download(property, FilenameUtil.addHtmlSuffix(formId));
    }


}
