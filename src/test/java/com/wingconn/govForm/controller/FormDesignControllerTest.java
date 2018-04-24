package com.wingconn.govForm.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-10 16:49.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class FormDesignControllerTest {

    @Autowired
    private FormDesignController controller;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

}