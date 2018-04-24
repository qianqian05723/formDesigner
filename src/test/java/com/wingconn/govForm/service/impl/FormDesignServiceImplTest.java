package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.service.FormDesignService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-17 17:01.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class FormDesignServiceImplTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(FormDesignServiceImplTest.class);

    @Autowired
    private FormDesignService formDesignService;

    @Test
    public void testGetPublishedContentByFormId() throws Exception {
        LOGGER.info(formDesignService.getPublishedContentByFormId("form_64b9168140cc4c96b6ed4b2df06eb3b2"));
    }
}