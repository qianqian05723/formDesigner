package com.wingconn.govForm.result;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-16 15:53.
 */
public class Result {
    /**
     * 结果
     */
    private boolean success;

    /**
     * 返回查询到的数据
     */
    private Object returnValue;

    /**
     * 数据条数
     */
    private int errorCode;

    /**
     * 总条数
     */
    private String errorReason;

    /**
     * 不传入参数
     */
    public Result() {
    }

    /**
     * 用在只需返回正确的情况
     * @param success
     */
    public Result(boolean success) {
        this.success = success;
    }

    /**
     * 用在正确且返回数据的情况
     * @param success
     * @param returnValue
     */
    public Result(boolean success, Object returnValue) {
        this.success = success;
        this.returnValue = returnValue;
    }

    /**
     * 错误
     * @param errorCode
     * @param errorReason
     */
    public Result(int errorCode, String errorReason) {
        this.errorCode = errorCode;
        this.errorReason = errorReason;
    }

    /**
     * 主要用在错误情况下返回
     * @param success
     * @param returnValue
     * @param errorCode
     * @param errorReason
     */
    public Result(boolean success, Object returnValue, int errorCode, String errorReason) {
        this.success = success;
        this.returnValue = returnValue;
        this.errorCode = errorCode;
        this.errorReason = errorReason;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getReturnValue() {
        return returnValue;
    }

    public void setReturnValue(Object returnValue) {
        this.returnValue = returnValue;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorReason() {
        return errorReason;
    }

    public void setErrorReason(String errorReason) {
        this.errorReason = errorReason;
    }

    @Override
    public String toString() {
        return "Result{" +
                "success=" + success +
                ", returnValue=" + returnValue +
                ", errorCode=" + errorCode +
                ", errorReason='" + errorReason + '\'' +
                '}';
    }
}
