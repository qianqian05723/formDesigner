package com.wingconn.govForm.constant;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-15 11:29.
 */
public enum TongEnum {
    ENTERPRISE("0", "FormFillInEnterprise"),
    RESIDENT("1", "FormFillInResident");

    private String type;
    private String name;

    TongEnum(String type, String name) {
        this.type = type;
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }
}
