package com.wingconn.govForm.controller;

import com.alibaba.fastjson.JSONArray;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.wingconn.govForm.constant.RespFailCodeAndMsgEnum;
import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.domain.FormDesignDO;
import com.wingconn.govForm.factory.FormDesignFactory;
import com.wingconn.govForm.factory.FormUpdateMarkFactory;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.service.*;
import com.wingconn.govForm.to.FixationIdComponentTO;
import com.wingconn.govForm.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 9:44.
 */
@Controller
@RequestMapping(value = "/form/design")
public class FormDesignController {
    private static final Logger LOGGER = LoggerFactory.getLogger(FormDesignController.class);

    private final FormDesignService formDesignService;

    private final HtmlFileFtpUploadService htmlFileFtpUploadService;

    private final FormUpdateMarkService formUpdateMarkService;

    private final CreateTableService createTableService;

    private final ConfigureFileService configureFileService;

    @Autowired
    public FormDesignController(FormDesignService formDesignService, HtmlFileFtpUploadService htmlFileFtpUploadService,
                                FormUpdateMarkService formUpdateMarkService, CreateTableService createTableService,
                                ConfigureFileService configureFileService) {
        this.formDesignService = formDesignService;
        this.htmlFileFtpUploadService = htmlFileFtpUploadService;
        this.formUpdateMarkService = formUpdateMarkService;
        this.createTableService = createTableService;
        this.configureFileService = configureFileService;
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public Result save(@RequestParam("formEditContent") String formEditContent,
                       @RequestParam("formMeta") String formMeta,
                       @RequestParam("formName") String formName,
                       @RequestParam("formType") String formType,
                       @RequestParam(value = "formDescribe", required = false, defaultValue = "") String formDescribe,
                       @RequestParam(value = "formId", required = false) String formId) {
        LOGGER.debug("formEditContent:" + formEditContent);
        LOGGER.debug("formMeta: " + formMeta);
        LOGGER.debug("formName: " + formName);
        LOGGER.debug("formType: " + formType);
        LOGGER.debug("formDescribe: " + formDescribe);
        LOGGER.debug("formId: " + formId);

        // 创建存储的 FormDesignDO
        FormDesignDO formDesignDO = FormDesignFactory.createFormDesign(formId, formMeta, formName, formType, formEditContent, formDescribe, "admin");
        boolean affect;
        if (StringUtils.isNullOrEmpty(formId)) {
            affect = formDesignService.saveOne(formDesignDO);
        } else {
            affect = formDesignService.updateOne(formDesignDO);
        }

        if (!affect) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_PARAM_NOT_CORRECT.getErrorCode(),
                    RespFailCodeAndMsgEnum.REQUEST_PARAM_NOT_CORRECT.getErrorMsg());
        }

        return ResultFactory.success(formDesignDO.getFormId());
//        return htmlFileService.uploadFile(inputStream, filename);
    }

    @RequestMapping(value = "/publish", method = RequestMethod.POST)
    @ResponseBody
    public Result publish(@RequestParam("html") String html,
                          @RequestParam("formEditContent") String formEditContent,
                          @RequestParam("formMeta") String formMeta,
                          @RequestParam("formName") String formName,
                          @RequestParam("formType") String formType,
                          @RequestParam("formItems") List<String> formItems,
                          @RequestParam(value = "formDescribe", required = false, defaultValue = "") String formDescribe,
                          @RequestParam(value = "formId", required = false) String formId,
                          @RequestParam(value = "enhanceFields", required = false) String enhanceFields ) {
        LOGGER.debug("html:" + html);
        LOGGER.debug("formEditContent:" + formEditContent);
        LOGGER.debug("formMeta: " + formMeta);
        LOGGER.debug("formName: " + formName);
        LOGGER.debug("formType: " + formType);
        LOGGER.debug("formItems: " + formItems);
        LOGGER.debug("formId: " + formId);
        LOGGER.debug("enhanceFields", enhanceFields);

        FormDesignDO formDesignDO = FormDesignFactory.createFormDesign(formId, formMeta, formName, formType, formEditContent, formDescribe, "admin", html);
        boolean affect;
        // 已经发布的，修改之后重新发布
        boolean isPublished = false;
        if (StringUtils.isNullOrEmpty(formId)) {
            affect = formDesignService.saveOnePublish(formDesignDO);
        } else {
            isPublished = formDesignService.isPublished(formId);
            affect = formDesignService.updateOnePublish(formDesignDO);
        }
        if (!affect) {
            return AffectUtil.noAffectDB();
        }

        // 获取 formId
        String newFormId = formDesignDO.getFormId();
        // ftp 上传文件
//        boolean upload = htmlFileFtpUploadService.uploadFile(newFormId, html);
//        if (!upload) {
//            return ResultFactory.failResult();
//        }

        // 数据提交到 t_form_update_mark
        if (isPublished) {
            // 重新发布
            boolean modify = formUpdateMarkService.saveModifyOne(FormUpdateMarkFactory.createFormUpdateMark(newFormId, formType, "admin"));
            if (!modify) {
                return AffectUtil.noAffectDB();
            }
        } else {
            // 第一次发布
            boolean save = formUpdateMarkService.saveNewOne(FormUpdateMarkFactory.createFormUpdateMark(newFormId, formType, "admin"));
            if (!save) {
                return AffectUtil.noAffectDB();
            }
        }

        // 创建动态表格
        boolean create = createTableService.createTable(newFormId, formItems);
        if (!create) {
            LOGGER.error(ServerMsgConstants.CREATE_TABLE_ERROR);
            return ResultFactory.failResult();
        }

        // 创建增强字段的配置文件
        List<FixationIdComponentTO> fctList = new ArrayList<>();
        if (!StringUtils.isNullOrEmpty(enhanceFields)) {
            JsonElement jsonElement = new JsonParser().parse(enhanceFields);
            if (jsonElement.isJsonArray()) {
                JsonArray jsonArray = (JsonArray) jsonElement;
                Gson gson = new Gson();
                for (int i = 0; i < jsonArray.size(); i++) {
                    fctList.add(gson.fromJson(jsonArray.get(i).getAsString(), FixationIdComponentTO.class));
                }
            }
        }
        // 产生企业通或居民通war包
        boolean generateWar = configureFileService.generateWar(formType, newFormId, html, fctList);
        if (!generateWar) {
            LOGGER.error(ServerMsgConstants.GENERATE_WAR_PACKAGE_ERROR);
            return ResultFactory.failResult();
        }

        // 创建模型资源文件
        boolean generateModelJson = configureFileService.writeModelConfigure(newFormId, formName, formMeta);
        if (!generateModelJson) {
            LOGGER.error(ServerMsgConstants.GENERATE_MODEL_ERROR);
            return ResultFactory.failResult();
        }


        return ResultFactory.success(newFormId);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Result listPage(@RequestParam("page") Integer page,
                           @RequestParam("pageSize") Integer pageSize,
                           @RequestParam(value = "formName", required = false) String formName) {
        if (page < 1 || pageSize <= 0 || pageSize > 500) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_PARAM_NOT_CORRECT.getErrorCode(),
                    RespFailCodeAndMsgEnum.REQUEST_PARAM_NOT_CORRECT.getErrorMsg());
        }

        List<FormDesignDO> listPage = formDesignService.listByPage((page - 1) * pageSize, pageSize, formName);
        LOGGER.debug(String.valueOf(listPage.size()));
        int count = formDesignService.countAllRecords(formName);
        List<Map<String, String>> list = new ArrayList<>(listPage.size());
        for (FormDesignDO formDesignDO : listPage) {
            Map<String, String> formDesignMap = new HashMap<>();
            formDesignMap.put("formName", formDesignDO.getFormName());
            formDesignMap.put("formId", formDesignDO.getFormId());
            formDesignMap.put("formType", formDesignDO.getFormType());
            formDesignMap.put("status", formDesignDO.getStatus());
            list.add(formDesignMap);
        }
        Map<String, Object> returnData = new HashMap<>();
        returnData.put("data", list);
        returnData.put("count", count);
        return ResultFactory.success(returnData);
    }

    @RequestMapping(value = "/remove/{formId}", method = RequestMethod.DELETE)
    @ResponseBody
    public Result removeByFormId(@PathVariable("formId") String formId) {
        LOGGER.debug(formId);
        Result result = isPublished(formId);
        boolean remove;
        if (result.isSuccess() && (Boolean) result.getReturnValue()) {
            remove = formUpdateMarkService.removeByFormId(formId);
        } else {
            remove = formDesignService.removeByFormId(formId);
        }
        if (!remove) {
            return AffectUtil.noAffectDB();
        }
        return ResultFactory.success();
    }

    @GetMapping(value = "/edit/{formId:.+}")
    @ResponseBody
    public Result getEditContentByFormId(@PathVariable("formId") String formId) {
        return ResultFactory.success(formDesignService.getEditContentByFormId(formId));
    }

    @GetMapping("/publish/{formId:.+}")
    @ResponseBody
    public Result isPublished(@PathVariable String formId) {
        return ResultFactory.success(formDesignService.isPublished(formId));
    }

    @GetMapping("/index")
    @ResponseBody
    public String index() {
        return "index";
    }

    @PostMapping("/preview")
    public @ResponseBody String preView() {
        return "preview";
    }

    @DeleteMapping("/test")
    @ResponseBody
    public String test() {
        return "test123";
    }

    /**
     * 下载 war 包，model配置文件
     * @param formId
     * @return
     */
    @GetMapping("/download/{formId}/{fileType}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable String formId, @PathVariable String fileType) {
        String filename;
        if (StringUtils.equals(fileType, "0")) {
            filename = StringUtils.appendWarSuffix(formId);
        } else if (StringUtils.equals(fileType, "1")) {
            filename = ModelConfigureUtil.createModelId(formId) + ".json";
        } else {
            LOGGER.error(ServerMsgConstants.DOWNLOAD_FIEL_TYPE_NOT_MATCH);
            return null;
        }
        Resource resource = configureFileService.loadAsResource(filename);
        if (null != resource) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        }
        return null;
    }

    @GetMapping("/published/{formId}")
    public @ResponseBody Result getPublishedContent(@PathVariable String formId) {
        String publishedContent = formDesignService.getPublishedContentByFormId(formId);
        if (StringUtils.isNullOrEmpty(publishedContent)) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorCode(),
                    RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorMsg());
        } else {
            return ResultFactory.success(publishedContent);
        }
    }

}
