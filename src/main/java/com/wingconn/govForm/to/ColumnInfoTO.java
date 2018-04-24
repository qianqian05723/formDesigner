package com.wingconn.govForm.to;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 11:05.
 */
public class ColumnInfoTO {
    private String id;

    private String describe;

    private String type = "string";

    private Integer maxLength = 255;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

    @Override
    public String toString() {
        return "ColumnInfoTO{" +
                "id='" + id + '\'' +
                ", describe='" + describe + '\'' +
                ", type='" + type + '\'' +
                ", maxLength=" + maxLength +
                '}';
    }
}
