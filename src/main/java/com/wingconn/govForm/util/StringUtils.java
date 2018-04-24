package com.wingconn.govForm.util;


import java.io.File;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-27 15:54.
 */
public class StringUtils {

    /**
     * 判断是否是 null 或者是空字符串
     * @param s 要判断的字符串
     * @return
     */
    public static boolean isNullOrEmpty(String s) {
        return org.apache.commons.lang3.StringUtils.isEmpty(s) || "null".equalsIgnoreCase(s);
    }

    public static String escapeSqlWildcard(String fixationFieldName) {
        fixationFieldName = org.apache.commons.lang3.StringUtils.replace(fixationFieldName, "%", "\\%");
        return org.apache.commons.lang3.StringUtils.replace(fixationFieldName, "_", "\\_");
    }

    /**
     * 判断两个字符串相等
     * @param s1
     * @param s2
     * @return
     */
    public static boolean equals(String s1, String s2) {
        return org.apache.commons.lang3.StringUtils.equals(s1, s2);
    }


    /**
     * 去除 .war 后缀
     * @param source
     * @return
     */
    public static String removeWarSuffix(String source) {
        return removeSuffix(source);
    }

    /**
     * 去除后缀，最后一个点及后缀名去除
     * @param source
     * @return
     */
    public static String removeSuffix(String source) {
        if (org.apache.commons.lang3.StringUtils.contains(source, ".")) {
            return org.apache.commons.lang3.StringUtils.substring(source, 0, org.apache.commons.lang3.StringUtils.lastIndexOf(source, "."));
        }
        return source;
    }

    /**
     * 添加 .war 后缀
     * @param source
     * @return
     */
    public static String appendWarSuffix(String source) {
        return appendSuffix(source, "war");
    }

    /**
     * 添加后缀
     * @param source
     * @param suffix
     * @return
     */
    public static String appendSuffix(String source, String suffix) {
        if (isEmpty(source)) {
            source = "";
        }
        if (isEmpty(suffix)) {
            suffix = "";
        }
        if (isEmpty(source) && isEmpty(suffix)) {
            return "";
        } else {
            return source + "." + suffix;
        }
    }

    /**
     * 判断是否为 null 或者长度为零，或者都是空字符串
     * @param source
     * @return
     */
    public static boolean isEmpty(String source) {
        return null == source || 0 == source.length() || 0 ==  source.trim().length();
    }

    /**
     * 判断是否以文件分隔符结尾
     * @param source
     * @return
     */
    public static boolean endsWithFileSeparator(String source) {
        return org.apache.commons.lang3.StringUtils.endsWith(source, File.separator);
    }

    /**
     * 去除字符串中已有的部分
     * @param source
     * @param removed
     * @return
     */
    public static String remove(String source, String removed) {
        return org.apache.commons.lang3.StringUtils.replace(source, removed, "");
    }

    /**
     * 去除版本号
     * @param source
     * @return
     */
    public static String removeSuffixVersion(String source) {
        return org.apache.commons.lang3.StringUtils.substring(source, 0, org.apache.commons.lang3.StringUtils.lastIndexOf(source, "_"));
    }

    /**
     * 添加版本号
     * @param source
     * @param version
     * @return
     */
    public static String addSuffixVersion(String source, String version) {
        if (isEmpty(source)) {
            source = "";
        }
        if (isEmpty(version)) {
            version = "";
        }
        return source + "_" + version;
    }

    /**
     * 添加默认版本号
     * @param source
     * @return
     */
    public static String addSuffixVersion(String source) {
        return addSuffixVersion(source, "v1.0.0");
    }
}
