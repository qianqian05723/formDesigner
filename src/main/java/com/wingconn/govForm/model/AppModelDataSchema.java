package com.wingconn.govForm.model;


import com.wingconn.govForm.to.ColumnInfoTO;

import java.util.List;
import java.util.Map;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-14 14:25.
 */
public class AppModelDataSchema {
    private String $schema = "http://json-schema.org/draft-04/schema#";
    private String id = "/";
    private String type = "object";
    private String description = "description.";
    private Map<String, ColumnInfoTO> properties;
    private List<String> required;

    public String get$schema() {
        return $schema;
    }

    public void set$schema(String $schema) {
        this.$schema = $schema;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, ColumnInfoTO> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, ColumnInfoTO> properties) {
        this.properties = properties;
    }

    public List<String> getRequired() {
        return required;
    }

    public void setRequired(List<String> required) {
        this.required = required;
    }

    @Override
    public String toString() {
        return "AppModelDataSchema{" +
                "$schema='" + $schema + '\'' +
                ", id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", properties=" + properties +
                ", required=" + required +
                '}';
    }
}
