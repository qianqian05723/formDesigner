package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.service.ConfigureFileService;
import com.wingconn.govForm.to.FixationIdComponentTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 17:45.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class ConfigureFileServiceImplTest {

    @Autowired
    private ConfigureFileService configureFileService;

    @Test
    public void testWriteFixationFieldsInProject() throws Exception {
        List<FixationIdComponentTO> fctList = new ArrayList<>();
        fctList.add(new FixationIdComponentTO("component_1111111", null, null, null, "38"));
        fctList.add(new FixationIdComponentTO("component_2222222", null, null, null, "39"));
        fctList.add(new FixationIdComponentTO("component_3333333", null, null, null, "40"));
        fctList.add(new FixationIdComponentTO("component_4444444", null, null, null, "41"));
        assertTrue(configureFileService.writeFixationFieldsInProject("form_64b9168140cc4c96b6ed4b2df06eb3b2", fctList));
        assertTrue(configureFileService.writeFixationFieldsInProject("form_abfac0f998bb473c93756f5f225a613a", fctList));
    }

    @Test
    public void testWriteFormHtmlFileInProject() throws Exception {
        assertTrue(configureFileService.writeFormHtmlFileInProject("form_64b9168140cc4c96b6ed4b2df06eb3b2", "<h2>Hello world</h2>"));
        assertTrue(configureFileService.writeFormHtmlFileInProject("form_abfac0f998bb473c93756f5f225a613a", "<h2>Hello world</h2>"));
    }

    @Test
    public void testUnpackWar() throws Exception {
        assertTrue(configureFileService.unpackWar("0", "form_64b9168140cc4c96b6ed4b2df06eb3b2"));
        assertTrue(configureFileService.unpackWar("1", "form_abfac0f998bb473c93756f5f225a613a"));
    }

    @Test
    public void testPackWar() throws Exception {
        assertTrue(configureFileService.packWar("form_64b9168140cc4c96b6ed4b2df06eb3b2"));
        assertTrue(configureFileService.packWar("form_abfac0f998bb473c93756f5f225a613a"));
    }

    @Test
    public void testGenerateWar() throws Exception {
        List<FixationIdComponentTO> fctList = new ArrayList<>();
        fctList.add(new FixationIdComponentTO("component_1111111", null, null, null, "38"));
        fctList.add(new FixationIdComponentTO("component_2222222", null, null, null, "39"));
        fctList.add(new FixationIdComponentTO("component_3333333", null, null, null, "40"));
        fctList.add(new FixationIdComponentTO("component_4444444", null, null, null, "41"));
        assertTrue(configureFileService.generateWar("0", "form_64b9168140cc4c96b6ed4b2df06eb3b2", "<h2>Hello world</h2>", fctList));
        assertTrue(configureFileService.generateWar("0", "form_abfac0f998bb473c93756f5f225a613a", "<h2>Hello world</h2>", fctList));
    }

    @Test
    public void testWriteModelConfigure() throws Exception {
        assertTrue(configureFileService.writeModelConfigure("form_64b9168140cc4c96b6ed4b2df06eb3b2", "cyx测试表单2", "[{\"component_1499908147000\":{\"filedName\":\"时间\",\"type\":\"time\"}},{\"componentDate_1499908148000\":{\"filedName\":\"日期\",\"type\":\"date\"}},{\"componentIndex_1499908150000\":{\"filedName\":\"邮箱\",\"type\":\"email\"}},{\"componentIndex_1499908152000\":{\"filedName\":\"手机\",\"type\":\"mobilePhone\"}},{\"component_uploadimg_input1499908154000\":{\"filedName\":\"上传图片\",\"type\":\"uploadimg\"}},{\"component_uploadfile_input1499908155000\":{\"filedName\":\"附件上传\",\"type\":\"uploadfile\"}},{\"component_1499908167000\":{\"filedName\":\"两级下拉框\",\"type\":\"cascadedropdown\"}},{\"component_1499908169000\":{\"filedName\":\"子表单\",\"type\":\"table\"}}]"));
        assertTrue(configureFileService.writeModelConfigure("form_abfac0f998bb473c93756f5f225a613a", "测试表单444", "[{\"componentuploadimginput_1499915385000\":{\"filedName\":\"上传图片\",\"type\":\"uploadimg\"}},{\"componentuploadfileinput_1499915386000\":{\"filedName\":\"附件上传\",\"type\":\"uploadfile\"}},{\"component_1499915388000\":{\"filedName\":\"两级下拉框\",\"type\":\"cascadedropdown\"}},{\"groupTitle_1499915903000\":{\"filedName\":\"分类标题\",\"type\":\"groupTitle\"}},{\"component_1499915390000\":{\"filedName\":\"子表单\",\"type\":\"table\"}},{\"component_1499915392000\":{\"filedName\":\"居民姓名\",\"type\":\"fieldtext\"}}]"));
    }
}