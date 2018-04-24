package com.wingconn.govForm.model;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 14:24.
 */
public class AppModelContent {
    private AppModelDataSchema dataSchema;

    private String sortSchema = "";

    public AppModelDataSchema getDataSchema() {
        return dataSchema;
    }

    public void setDataSchema(AppModelDataSchema dataSchema) {
        this.dataSchema = dataSchema;
    }

    public String getSortSchema() {
        return sortSchema;
    }

    public void setSortSchema(String sortSchema) {
        this.sortSchema = sortSchema;
    }

    @Override
    public String toString() {
        return "AppModelContent{" +
                "dataSchema=" + dataSchema +
                ", sortSchema='" + sortSchema + '\'' +
                '}';
    }
}
