package com.wingconn.govForm.handler;

import com.wingconn.govForm.constant.RespFailCodeAndMsgEnum;
import com.wingconn.govForm.constant.RespMsgConstants;
import com.wingconn.govForm.result.Result;
import com.wingconn.govForm.util.ResultFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-21 9:49.
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = RuntimeException.class)
    @ResponseBody
    public Result exceptionHandler(RuntimeException ex) {
        LOGGER.error(RespMsgConstants.SERVER_EXCEPTION, ex);
        return ResultFactory.failResult();
    }

//    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
//    @ResponseBody
//    public Result exceptionHandler(HttpRequestMethodNotSupportedException ex) {
//        LOGGER.error(RespMsgConstants.REQUEST_METHOD_EXCEPTION + ": " + ex.getMethod());
//        return ResultFactory.failResult(RespFailCodeAndMsgEnum.REQUEST_METHOD_NOT_SUPPORT.getErrorCode(),
//                RespFailCodeAndMsgEnum.REQUEST_METHOD_NOT_SUPPORT.getErrorMsg());
//    }
}
