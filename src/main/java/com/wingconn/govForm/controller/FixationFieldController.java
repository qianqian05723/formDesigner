package com.wingconn.govForm.controller;

import com.wingconn.govForm.constant.RespFailCodeAndMsgEnum;
import com.wingconn.govForm.constant.RespMsgConstants;
import com.wingconn.govForm.domain.FixationFieldDO;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.service.FixationFieldService;
import com.wingconn.govForm.util.ResultFactory;
import com.wingconn.govForm.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-28 15:53.
 */
@Controller
@RequestMapping("/fixation")
public class FixationFieldController {
    private static final Logger LOGGER = LoggerFactory.getLogger(FixationFieldController.class);

    private final FixationFieldService fixationFieldService;

    @Autowired
    public FixationFieldController(FixationFieldService fixationFieldService) {
        this.fixationFieldService = fixationFieldService;
    }

    @RequestMapping(value = "/display", method = RequestMethod.GET)
    public String displayFixation() {
        return "createField";
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Result list(@RequestParam("page") Integer page,
                       @RequestParam("pageSize") Integer pageSize,
                       @RequestParam("formType") String formType,
                       @RequestParam(value = "fixationFieldName", required = false) String fixationFieldName) {
        if (page < 1 || pageSize <= 0 || pageSize > 500) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_PARAM_NOT_CORRECT.getErrorCode(),
                                            RespFailCodeAndMsgEnum.REQUEST_PARAM_NOT_CORRECT.getErrorMsg());
        }

        try {
            if (!StringUtils.isNullOrEmpty(fixationFieldName)) {
                fixationFieldName = URLDecoder.decode(fixationFieldName, "UTF-8");
                fixationFieldName = StringUtils.escapeSqlWildcard(fixationFieldName);
            }
        } catch (UnsupportedEncodingException e) {
            LOGGER.error(RespMsgConstants.CODE_ERROR, e);
        }

        List<FixationFieldDO> fixationFieldDOs;
        int countAllRecords;
        if (Integer.parseInt(formType) < 0) {
            if (StringUtils.isNullOrEmpty(fixationFieldName)) {
                fixationFieldDOs = fixationFieldService.listPage((page - 1) * pageSize, pageSize);
            } else {
                fixationFieldDOs = fixationFieldService.listFilterPage((page - 1) * pageSize, pageSize, fixationFieldName);
            }
            countAllRecords = fixationFieldService.countAllRecords(null, fixationFieldName);
        } else {
            if (StringUtils.isNullOrEmpty(fixationFieldName)) {
                fixationFieldDOs = fixationFieldService.listFormTypePage((page - 1) * pageSize, pageSize, formType);
            } else {
                fixationFieldDOs = fixationFieldService.listFormTypeFilterPage((page - 1) * pageSize, pageSize, fixationFieldName, formType);
            }
            countAllRecords = fixationFieldService.countAllRecords(formType, fixationFieldName);
        }

        // 组装返回的数据
        Map<String, Object> map = new HashMap<>();
        map.put("data", fixationFieldDOs);
        map.put("count", countAllRecords);
        return ResultFactory.success(map);
    }

    @RequestMapping(value = "/get/{fixationId}", method = RequestMethod.GET)
    @ResponseBody
    public Result getOne(@PathVariable("fixationId") Integer fixationId) {
        LOGGER.debug("fixationId: " + fixationId);
        FixationFieldDO fixation = fixationFieldService.getById(fixationId);
        if (fixation == null) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorCode(),
                    RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorMsg());
        }
        return ResultFactory.success();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Result addOne(FixationFieldDO fixationFieldDO) {
        LOGGER.debug(fixationFieldDO.toString());
        fixationFieldDO.setCreaterId("admin");
        // 判断是否已经存在
        boolean exist = fixationFieldService.exist(fixationFieldDO);
        if (exist) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.EXIST_SAME_RECORD.getErrorCode(),
                    RespFailCodeAndMsgEnum.EXIST_SAME_RECORD.getErrorMsg());
        }
        boolean save = fixationFieldService.saveOne(fixationFieldDO);
        if (!save) {
            return ResultFactory.failResult();
        }
        return ResultFactory.success();
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public Result editOne(FixationFieldDO fixationFieldDO) {
        LOGGER.debug(fixationFieldDO.toString());
        // 判断是否已经存在
        boolean exist = fixationFieldService.exist(fixationFieldDO);
        if (exist) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.EXIST_SAME_RECORD.getErrorCode(),
                    RespFailCodeAndMsgEnum.EXIST_SAME_RECORD.getErrorMsg());
        }

        boolean update = fixationFieldService.updateOne(fixationFieldDO);
        if (!update) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorCode(),
                    RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorMsg());
        }
        return ResultFactory.success();
    }

    @RequestMapping(value = "/delete/{fixationId}", method = RequestMethod.DELETE)
    @ResponseBody
    public Result deleteOne(@PathVariable("fixationId") Integer fixationId) {
        LOGGER.debug("fixationId: " + fixationId);
        boolean delete = fixationFieldService.removeById(fixationId);
        if (!delete) {
            return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorCode(),
                    RespFailCodeAndMsgEnum.REQUEST_NOT_EXIST.getErrorMsg());
        }
        return ResultFactory.success();
    }
}
