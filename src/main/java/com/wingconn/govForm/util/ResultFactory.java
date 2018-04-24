package com.wingconn.govForm.util;

import com.wingconn.govForm.constant.RespFailCodeAndMsgEnum;
import com.wingconn.govForm.constant.RespMsgConstants;
import com.wingconn.govForm.result.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-17 10:43.
 */
public final class ResultFactory {
    /**
     * 服务器异常
     * @return
     */
    public static Result failResult() {
        return failResult(RespFailCodeAndMsgEnum.SERVER_ERROR.getErrorCode(), RespFailCodeAndMsgEnum.SERVER_ERROR.getErrorMsg());
    }

    /**
     * 非服务器异常
     * @param errorCode
     * @param errorMsg
     * @return
     */
    public static Result failResult(int errorCode, String errorMsg) {
        return new Result(errorCode, errorMsg);
    }

    /**
     * 编码异常
     * @return
     */
    public static Result codeFailResult() {
        return failResult(RespFailCodeAndMsgEnum.CODE_ERROR.getErrorCode(), RespFailCodeAndMsgEnum.CODE_ERROR.getErrorMsg());
    }

    /**
     * 成功且不返回数据
     * @return
     */
    public static Result success() {
        return success(null);
    }

    /**
     * 成功且返回数据
     * @param data
     * @return
     */
    public static Result success(Object data) {
        return new Result(RespMsgConstants.SUCCESS, data);
    }

}
