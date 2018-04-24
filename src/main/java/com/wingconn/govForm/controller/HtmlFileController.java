package com.wingconn.govForm.controller;

import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.service.HtmlFileFtpUploadService;
import com.wingconn.govForm.util.ResultFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URLDecoder;
import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-16 15:52.
 */
@Controller
@RequestMapping(value = "/design/html")
public class HtmlFileController {
//    private static final Logger LOGGER = LoggerFactory.getLogger(HtmlFileController.class);
//
//    @Autowired
//    private HtmlFileFtpUploadService service;
//
//    /**
//     * 上传 html 表单模板文件
//     * @param html 文件内容
//     * @param formData 表单控件名
//     * @return
//     */
//    @RequestMapping(value = "/temporary/storage", method = RequestMethod.POST, produces = "application/json")
//    @ResponseBody
//    public Result uploadFile(@RequestParam(value = "html") String html,
//                             @RequestParam(value = "formData") List<String> formData,
//                             @RequestParam(value = "filename", required = false) String filename) {
//        LOGGER.debug("html:\n" + html);
//        LOGGER.debug("upload");
//        LOGGER.debug("filename: " + filename + "名字");
//        try {
//            html = URLDecoder.decode(html, "UTF-8");
//        } catch (UnsupportedEncodingException e) {
//            LOGGER.error("不支持UTF-8Decode", e);
//            return ResultFactory.codeFailResult();
//        }
//        InputStream inputStream = null;
//        try {
//            inputStream = new ByteArrayInputStream(html.getBytes("UTF-8"));
//        } catch (UnsupportedEncodingException e) {
//            LOGGER.debug("不支持UTF-8格式转换", e);
//            return ResultFactory.codeFailResult();
//        }
//
//        return service.uploadFile(inputStream, filename);
//    }
//
//    /**
//     * 删除已存在的 html 表单模板文件
//     * @param filename 文件名
//     * @return
//     */
//    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, produces = "application/json")
//    @ResponseBody
//    public Result deleteFile(@RequestParam(value = "filename") String filename) {
//        LOGGER.debug("delete");
//        return service.deleteFile(filename);
//    }
//
//    /**
//     * 下载已存在的 html 表单模板文件
//     * @param filename 文件名
//     * @return
//     */
//    @RequestMapping(value = "/download", method = RequestMethod.GET, produces = "application/json")
//    @ResponseBody
//    public Result downloadFile(@RequestParam(value = "filename") String filename) {
//        LOGGER.debug("download: " + filename);
//        return service.downloadFile(filename);
//    }
}
