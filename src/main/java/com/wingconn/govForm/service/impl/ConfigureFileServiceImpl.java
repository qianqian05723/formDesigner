package com.wingconn.govForm.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.constant.TongEnum;
import com.wingconn.govForm.domain.FixationFieldDO;
import com.wingconn.govForm.factory.FixationIdComponentTOFactory;
import com.wingconn.govForm.property.StorageProperties;
import com.wingconn.govForm.service.ConfigureFileService;
import com.wingconn.govForm.service.FixationFieldService;
import com.wingconn.govForm.to.FixationIdComponentTO;
import com.wingconn.govForm.util.ModelConfigureUtil;
import com.wingconn.govForm.util.StringUtils;
import com.wingconn.govForm.util.WarOperateUtil;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 16:21.
 */
@Service
public class ConfigureFileServiceImpl implements ConfigureFileService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ConfigureFileServiceImpl.class);

    private final FixationFieldService fixationFieldService;

    private final Path configPath;
    private String htmlPrefix;
    private String htmlSuffix;

    @Autowired
    public ConfigureFileServiceImpl(FixationFieldService fixationFieldService, StorageProperties storageProperties) {
        this.fixationFieldService = fixationFieldService;
        configPath = Paths.get(storageProperties.getConfig());
        try {
            htmlPrefix = FileUtils.readFileToString(Paths.get(storageProperties.getHtmlPrefix()).toFile(), "utf-8");
            htmlSuffix = FileUtils.readFileToString(Paths.get(storageProperties.getHtmlSuffix()).toFile(), "utf-8");
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.READ_HTML_SUFFIX_PREFIX_EX, e);
        }
    }


    @Override
    public boolean writeFixationFieldsInProject(String formId, List<FixationIdComponentTO> fcList) {
        List<FixationIdComponentTO> dealFixationList = new ArrayList<>(fcList.size());
        if (fcList.size() != 0) {
            List<Integer> idList = fcList.stream().map(f -> Integer.parseInt(f.getFieldId())).collect(Collectors.toList());

            List<FixationFieldDO> fixationFieldDOList = fixationFieldService.listField(idList);
            List<FixationIdComponentTO> notExist = new ArrayList<>();
            boolean exist = false;
            for (FixationIdComponentTO fct : fcList) {
                for (FixationFieldDO ffd : fixationFieldDOList) {
                    if (StringUtils.equals(ffd.getId().toString(), fct.getFieldId())) {
                        fct.setApiUrl(ffd.getApiUrl());
                        fct.setApiField(ffd.getApiField());
                        fct.setApiModelId(ffd.getApiModelId());
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    notExist.add(fct);
                }
            }
            fcList.removeAll(notExist);
        }

        for (FixationIdComponentTO fct : fcList) {
            if (!dealFixationList.contains(fct)) {
                dealFixationList.add(FixationIdComponentTOFactory.copy(fct));
            } else {
                FixationIdComponentTO f = dealFixationList.get(dealFixationList.indexOf(fct));
                f.setId(f.getId() + "," + fct.getId());
                f.setApiField(f.getApiField() + "," + fct.getApiField());
            }
        }

        Gson gson = new GsonBuilder().setPrettyPrinting().excludeFieldsWithoutExposeAnnotation().create();

        String json = gson.toJson(dealFixationList);

        LOGGER.debug("fixation: \n" + json);

        Path fixationJsonPath = getPath(formId + ServerMsgConstants.FIXATION_JSON_PATH);

        try {
            FileUtils.writeStringToFile(fixationJsonPath.toFile(), json, "utf-8");
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.HTML_SAVE_EXCEPTION, e);
            return false;
        }

        return true;
    }

    @Override
    public boolean writeModelConfigure(String formId, String formName, String formMeta) {
        String modelStr = ModelConfigureUtil.getModelJsonStr(formId, formName, formMeta);
        Path modelPath = configPath.resolve(ModelConfigureUtil.createModelId(formId) + ".json") ;

        try {
            FileUtils.writeStringToFile(modelPath.toFile(), modelStr, "UTF-8");
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.WRITE_MODEL_JSON_FILE_ERROR + " formId:" + formId, e);
            return false;
        }

        return true;
    }

    @Override
    public boolean writeFormHtmlFileInProject(String formId, String html) {
        Path formPath = getPath(formId + ServerMsgConstants.FORM_STORAGE_PATH);

        String htmlContent = htmlPrefix + html + htmlSuffix;
        try {
            FileUtils.writeStringToFile(formPath.toFile(), htmlContent, "utf-8");
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.HTML_SAVE_EXCEPTION, e);
            return false;
        }

        return true;
    }

    /**
     * 获取根据formType 和 formId 得到的路径 path
     * @param relativePath
     * @return
     */
    private Path getPath(String relativePath) {
        return configPath.resolve(relativePath);
    }

    @Override
    public boolean packWar(String formId) {
        Path projectPath = getPath(formId);

        return WarOperateUtil.zipWar(projectPath);

    }

    @Override
    public boolean unpackWar(String formType, String formId) {
        Path warPath;
        if (StringUtils.equals(TongEnum.ENTERPRISE.getType(), formType)) {
            warPath = configPath.resolve(StringUtils.appendWarSuffix(TongEnum.ENTERPRISE.getName()));
        } else if (StringUtils.equals(TongEnum.RESIDENT.getType(), formType)) {
            warPath = configPath.resolve(StringUtils.appendWarSuffix(TongEnum.RESIDENT.getName()));
        } else {
            LOGGER.error(ServerMsgConstants.FORM_TYPE_ERROR + " type=" + formType);
            return false;
        }

        Path formPath = warPath.getParent().resolve(formId);

        return WarOperateUtil.unZipWar(warPath, formPath);
    }

    @Override
    public boolean generateWar(String formType, String formId, String html, List<FixationIdComponentTO> fcList) {
        boolean unpack = unpackWar(formType, formId);
        if (!unpack) {
            return false;
        }

        boolean formHtml = writeFormHtmlFileInProject(formId, html);
        if (!formHtml) {
            return false;
        }

        boolean fixation = writeFixationFieldsInProject(formId, fcList);
        if (!fixation) {
            return false;
        }

        boolean pack = packWar(formId);
        if (!pack) {
            return false;
        }

        Path formPath = getPath(formId);
        try {
            FileUtils.deleteDirectory(formPath.toFile());
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.DELETE_FORM_PROJECT_ERROR + " formId:" + formId, e);
        }

        return true;
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = getPath(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
        } catch (MalformedURLException e) {
            LOGGER.error("资源路径异常", e);
        }
        return null;
    }
}
