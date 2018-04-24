package com.wingconn.govForm.model;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 10:36.
 */
public class AppModel {
    private AppModelProperty property;

    private AppModelContent content;

    private String path = "";

    public AppModel() {
    }

    public AppModel(AppModelProperty property, AppModelContent content) {
        this.property = property;
        this.content = content;
    }

    public AppModel(AppModelProperty property, AppModelContent content, String path) {
        this.property = property;
        this.content = content;
        this.path = path;
    }

    public AppModelProperty getProperty() {
        return property;
    }

    public void setProperty(AppModelProperty property) {
        this.property = property;
    }

    public AppModelContent getContent() {
        return content;
    }

    public void setContent(AppModelContent content) {
        this.content = content;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "ModelIdModel{" +
                "property=" + property +
                ", content=" + content +
                ", path='" + path + '\'' +
                '}';
    }
}
