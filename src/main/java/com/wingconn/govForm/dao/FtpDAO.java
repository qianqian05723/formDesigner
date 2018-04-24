package com.wingconn.govForm.dao;

import com.wingconn.govForm.property.FTPServerProperties;
import com.wingconn.govForm.util.FTPUtils;
import org.springframework.stereotype.Repository;

import java.io.InputStream;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-17 10:51.
 */
@Repository
public class FtpDAO {
    /**
     * 上传文件到FTP服务器
     * @param ftp FTP服务器信息
     * @param filename 文件名
     * @param is html内容
     * @return 上传是否成功
     */
    public boolean upload(FTPServerProperties ftp, String filename, InputStream is) {
        return FTPUtils.uploadFile(ftp, filename, is);
    }

    /**
     * 删除在FTP服务器中的文件
     * @param ftp FTP服务器信息
     * @param filename 要删除的文件名
     * @return 是否删除成功
     */
    public boolean delete(FTPServerProperties ftp, String filename) {
        return FTPUtils.deleteFile(ftp, filename);
    }

    /**
     * 下载 html 模板文件
     * @param ftp FTP 服务器信息
     * @param filename 文件名
     * @return 下载是否成功
     */
    public String download(FTPServerProperties ftp, String filename) {
        return FTPUtils.downloadFile(ftp, filename);
    }
}
