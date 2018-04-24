package com.wingconn.govForm.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-17 10:29.
 */
@Component
@ConfigurationProperties(prefix = "FTP")
public class FTPServerProperties {
    /**
     * FTP服务器IP地址
     */
    private String hostname;

    /**
     * FTP服务器端口号
     */
    private int port;

    /**
     * FTP服务器用户名
     */
    private String username;

    /**
     * FTP服务器用户密码
     */
    private String password;

    /**
     * 存放到 FTP 的路径
     */
    private String pathname;

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPathname() {
        return pathname;
    }

    public void setPathname(String pathname) {
        this.pathname = pathname;
    }

    @Override
    public String toString() {
        return "FTPServerProperties{" +
                "hostname='" + hostname + '\'' +
                ", port=" + port +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", pathname='" + pathname + '\'' +
                '}';
    }
}
