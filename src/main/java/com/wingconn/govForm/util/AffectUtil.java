package com.wingconn.govForm.util;

import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.result.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 15:51.
 */
public class AffectUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(AffectUtil.class);
    /**
     * 判断影响条数
     * @param affect
     * @return
     */
    public static boolean isAffect(int affect) {
        return affect == 1;
    }

    /**
     * 对数据库操作，但是没有影响
     * @return
     */
    public static Result noAffectDB() {
        LOGGER.warn(ServerMsgConstants.FORM_INSERT_EXCEPTION);
        return ResultFactory.failResult();
    }

}
