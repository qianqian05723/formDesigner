package com.wingconn.govForm.constant;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-26 17:26.
 */
public enum RespFailCodeAndMsgEnum {
    USER_VERIFY_FAIL(1001, "用户验证失败"),
    SIGN_VERIFY_FAIL(1002, "sign验证失败"),
    FORM_NOT_EXIST(1003, "表单不存在"),
    REQUEST_METHOD_NOT_SUPPORT(1004, "请求方法不正确"),
    REQUEST_PARAM_NOT_CORRECT(1005, "请求参数不正确"),
    REQUEST_NOT_EXIST(1006, "请求资源不存在"),
    EXIST_SAME_RECORD(1007, "已经存在相同的增强字段"),
    SERVER_ERROR(2000, RespMsgConstants.SERVER_EXCEPTION),
    CODE_ERROR(2001, RespMsgConstants.CODE_ERROR);

    /**
     * 错误码
     */
    private int errorCode;

    /**
     * 错误信息
     */
    private String errorMsg;

    RespFailCodeAndMsgEnum(int errorCode, String errorMsg) {
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getErrorMsg() {
        return errorMsg;
    }
}
