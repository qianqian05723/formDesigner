package com.wingconn.govForm.service;

import com.wingconn.govForm.to.FixationIdComponentTO;
import org.springframework.core.io.Resource;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 16:16.
 */
public interface ConfigureFileService {
    boolean writeFixationFieldsInProject(String formId, List<FixationIdComponentTO> fcList);

    boolean writeModelConfigure(String formId, String formName, String formMeta);

    boolean writeFormHtmlFileInProject(String formId, String html);

    boolean packWar(String formId);

    boolean unpackWar(String formType, String formId);

    boolean generateWar(String formType, String formId, String html, List<FixationIdComponentTO> fcList);

    Resource loadAsResource(String filename);
}

