package com.wingconn.govForm.to;

import com.google.gson.annotations.Expose;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 16:19.
 */
public class FixationIdComponentTO {
    @Expose
    private String id;
    @Expose
    private String apiUrl;
    @Expose
    private String apiField;
    @Expose
    private String apiModelId;
    private String fieldId;

    public FixationIdComponentTO() {
    }

    public FixationIdComponentTO(String id, String apiUrl, String apiField, String apiModelId, String fieldId) {
        this.id = id;
        this.apiUrl = apiUrl;
        this.apiField = apiField;
        this.apiModelId = apiModelId;
        this.fieldId = fieldId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getApiField() {
        return apiField;
    }

    public void setApiField(String apiField) {
        this.apiField = apiField;
    }

    public String getApiModelId() {
        return apiModelId;
    }

    public void setApiModelId(String apiModelId) {
        this.apiModelId = apiModelId;
    }

    public String getFieldId() {
        return fieldId;
    }

    public void setFieldId(String fieldId) {
        this.fieldId = fieldId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FixationIdComponentTO that = (FixationIdComponentTO) o;

        if (apiUrl != null ? !apiUrl.equals(that.apiUrl) : that.apiUrl != null) return false;
        return apiModelId != null ? apiModelId.equals(that.apiModelId) : that.apiModelId == null;

    }

    @Override
    public int hashCode() {
        int result = apiUrl != null ? apiUrl.hashCode() : 0;
        result = 31 * result + (apiModelId != null ? apiModelId.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "FixationIdComponentTO{" +
                "id='" + id + '\'' +
                ", apiUrl='" + apiUrl + '\'' +
                ", apiField='" + apiField + '\'' +
                ", apiModelId='" + apiModelId + '\'' +
                ", fieldId='" + fieldId + '\'' +
                '}';
    }
}
