package com.wingconn.govForm.domain;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-20 19:43.
 */

public class TableFields {
    private String field;

    private String type;

    private String Null;

    private String key;

    private String Default;

    private String extra;

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNull() {
        return Null;
    }

    public void setNull(String aNull) {
        Null = aNull;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDefault() {
        return Default;
    }

    public void setDefault(String aDefault) {
        Default = aDefault;
    }

    public String getExtra() {
        return extra;
    }

    public void setExtra(String extra) {
        this.extra = extra;
    }

    @Override
    public String toString() {
        return "TableFields{" +
                "field='" + field + '\'' +
                ", type='" + type + '\'' +
                ", Null='" + Null + '\'' +
                ", key='" + key + '\'' +
                ", Default='" + Default + '\'' +
                ", extra='" + extra + '\'' +
                '}';
    }
}
