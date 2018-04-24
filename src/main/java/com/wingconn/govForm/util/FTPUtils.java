package com.wingconn.govForm.util;

import com.wingconn.govForm.constant.RespMsgConstants;
import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.property.FTPServerProperties;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-15 16:26.
 */
public final class FTPUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(FTPUtils.class);

    /**
     * 上传文件（可供Action/Controller层使用）
     * @param ftp ftp应用
     * @param fileName 上传到FTP服务器后的文件名称
     * @param is 输入文件流
     * @return
     */
    public static boolean uploadFile(FTPServerProperties ftp, String fileName, InputStream is) {
        boolean flag = false;
        FTPClient ftpClient = null;
        try {
            ftpClient = createAndLoginFTP(ftp);
            ftpClient.setControlEncoding("UTF-8");
            // 是否成功登录 FTP 服务器
            if (!isLoginSuccess(ftpClient)) {
                return false;
            }
            ftpClient.changeWorkingDirectory(ftp.getPathname());
            LOGGER.debug(String.valueOf(ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE)));
            LOGGER.debug("当前FTP服务器端路径：" + ftpClient.printWorkingDirectory());
            flag = ftpClient.storeFile(fileName, is);
            ftpClient.logout();
        } catch (IOException e) {
            LOGGER.error("登录上传", e);
        } finally {
            closeFTPClient(ftpClient);
        }
        return flag;
    }

    /**
     * 删除文件
     * @param ftp FTP服务器信息
     * @param filename 要删除的文件名称
     * @return
     */
    public static boolean deleteFile(FTPServerProperties ftp, String filename) {
        boolean flag = false;
        FTPClient ftpClient = new FTPClient();
        try {
            // 连接FTP服务器
            ftpClient.connect(ftp.getHostname(), ftp.getPort());
            // 登录FTP服务器
            ftpClient.login(ftp.getUsername(), ftp.getPassword());
            // 验证FTP服务器是否登录成功
            int replyCode = ftpClient.getReplyCode();
            if (!FTPReply.isPositiveCompletion(replyCode)) {
                return false;
            }
            // 切换FTP目录
//            LOGGER.debug("切换目录：" + ftpClient.changeWorkingDirectory(pathname));
            LOGGER.debug("删除文件：" + ftpClient.deleteFile(filename));
            ftpClient.logout();
            flag = true;
        } catch (IOException e) {
            LOGGER.error("删除文件异常", e);
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    flag = false;
                    LOGGER.error("关闭连接异常", e);
                }
            }
        }
        return flag;
    }

    /**
     * 根据文件名下载文件
     * @param ftp FTP服务器
     * @param filename 文件名
     * @return
     */
    public static String downloadFile(FTPServerProperties ftp, String filename) {
        String html = null;
        FTPClient ftpClient = null;
        try (OutputStream os = new ByteArrayOutputStream()) {
            ftpClient = createAndLoginFTP(ftp);
            if (!isLoginSuccess(ftpClient)) {
                return null;
            }
            // 切换FTP目录
            ftpClient.changeWorkingDirectory(ftp.getPathname());
            ftpClient.retrieveFile(filename, os);
            html = os.toString();
//            FTPFile[] ftpFiles = ftpClient.listFiles();
//            for (FTPFile ftpFile : ftpFiles) {
//                if (StringUtils.equals(ftpFile.getName(), filename)) {
//                    OutputStream os = new ByteArrayOutputStream();
//                    ftpClient.retrieveFile(filename, os);
//                    html = os.toString();
//                    break;
//                }
//             }
            ftpClient.logout();
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.DOWNLOAD_FILE_FROM_FTP_EXCEPTION, e);
        } finally {
           closeFTPClient(ftpClient);
        }
        return html;
    }

    /**
     * 创建 FTPClient 并且登录
     * @param ftp FTP 服务器配置信息
     * @return
     * @throws IOException
     */
    private static FTPClient createAndLoginFTP(FTPServerProperties ftp) throws IOException {
        FTPClient ftpClient = new FTPClient();
        // 连接FTP服务器
        ftpClient.connect(ftp.getHostname(), ftp.getPort());
        // 登录FTP服务器
        ftpClient.login(ftp.getUsername(), ftp.getPassword());
        return ftpClient;
    }

    /**
     * 判断是否成功登录 FTP 服务器
     * @param ftpClient FTP 客户端
     * @return
     */
    private static boolean isLoginSuccess(FTPClient ftpClient) {
        int replyCode = ftpClient.getReplyCode();
        return FTPReply.isPositiveCompletion(replyCode);
    }

    /**
     * 关闭 FTP服务器的连接
     * @param ftpClient FTP 客户端
     */
    private static void closeFTPClient(FTPClient ftpClient) {
        if (ftpClient != null && ftpClient.isConnected()) {
            try {
                ftpClient.disconnect();
            } catch (IOException e) {
                LOGGER.error(RespMsgConstants.ClOSE_FTP_EX, e);
            }
        }
    }
}
