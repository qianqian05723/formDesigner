package com.wingconn.govForm.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 11:41.
 */
@Component
@ConfigurationProperties(prefix = "storage")
public class StorageProperties {
    /**
     * html 文件存放位置
     */
    private String location;

    /**
     * html 前缀
     */
    private String htmlPrefix;

    /**
     * html 后缀
     */
    private String htmlSuffix;

    /**
     * 配置文件路径，在这里放 企业通和居民通的war包
     */
    private String config;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHtmlPrefix() {
        return htmlPrefix;
    }

    public void setHtmlPrefix(String htmlPrefix) {
        this.htmlPrefix = htmlPrefix;
    }

    public String getHtmlSuffix() {
        return htmlSuffix;
    }

    public void setHtmlSuffix(String htmlSuffix) {
        this.htmlSuffix = htmlSuffix;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    @Override
    public String toString() {
        return "StorageProperties{" +
                "location='" + location + '\'' +
                ", htmlPrefix='" + htmlPrefix + '\'' +
                ", htmlSuffix='" + htmlSuffix + '\'' +
                ", config='" + config + '\'' +
                '}';
    }
}
