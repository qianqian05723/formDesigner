package com.wingconn.govForm.util;

import org.apache.commons.lang3.StringUtils;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-17 11:10.
 */
public final class FilenameUtil {
    private static final AtomicInteger ai = new AtomicInteger(1);

    private static final String[] chars = new String[] { "a", "b", "c", "d", "e", "f",
            "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
            "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
            "W", "X", "Y", "Z" };


    private static String generateShortUuid() {
        StringBuilder shortBuffer = new StringBuilder();
        String uuid = UUID.randomUUID().toString().replace("-", "");
        for (int i = 0; i < 8; i++) {
            String str = uuid.substring(i * 4, i * 4 + 4);
            int x = Integer.parseInt(str, 16);
            shortBuffer.append(chars[x % 0x3E]);
        }
        return shortBuffer.toString();

    }

    public static String create() {
        return generateShortUuid() + ai.getAndIncrement();
    }


    public static String addHtmlSuffix(String formId) {
        return formId + ".html";
    }

    /**
     * 给 form 表单取一个唯一名
     * @return
     */
    public static String getUniqueFormId() {
        // 使用 uuid 来给form表单命名
        UUID uuid = UUID.randomUUID();
        // 把 - 用去掉
        String uuidStr = StringUtils.replace(uuid.toString(), "-", "");
        return "form_" + uuidStr;
    }
}
