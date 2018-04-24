package com.wingconn.govForm.service.impl;

import com.wingconn.govForm.constant.ServerMsgConstants;
import com.wingconn.govForm.exception.StorageException;
import com.wingconn.govForm.exception.StorageFileNotFoundException;
import com.wingconn.govForm.property.StorageProperties;
import com.wingconn.govForm.service.StorageService;
import com.wingconn.govForm.util.FilenameUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.stream.Stream;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-21 16:46.
 */
@Service
public class HtmlStorageServiceImpl implements StorageService {
    private static final Logger LOGGER = LoggerFactory.getLogger(HtmlStorageServiceImpl.class);

    /**
     * html 表单在服务器存储路径
     */
    private final Path rootLocation;

    @Autowired
    public HtmlStorageServiceImpl(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
        if (Files.notExists(rootLocation)) {
            try {
                Files.createDirectories(rootLocation);
            } catch (IOException e) {
                LOGGER.error(ServerMsgConstants.CREATE_DIRECTORY_VIEW_EXCEPTION, e);
            }
        }
    }

    @Override
    public void init() {
        try {
            if (Files.notExists(rootLocation)) {
                Files.createDirectory(rootLocation);
            }
        } catch (IOException e) {
            LOGGER.error("初始化目录异常", e);
            throw new StorageException("Could not initialize storage", e);
        }
    }

    @Override
    public String store(InputStream is) {
        try {
            String formId = FilenameUtil.getUniqueFormId();
            String htmlName = FilenameUtil.addHtmlSuffix(formId);
            Files.copy(is, this.rootLocation.resolve(htmlName), StandardCopyOption.REPLACE_EXISTING);
            return formId;
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.HTML_SAVE_EXCEPTION, e);
            throw new StorageException(ServerMsgConstants.HTML_SAVE_EXCEPTION);
        }
    }

    @Override
    public void store(InputStream is, String formId) {
        try {
            String htmlName = FilenameUtil.addHtmlSuffix(formId);
            Files.copy(is, this.rootLocation.resolve(htmlName), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            LOGGER.error(ServerMsgConstants.HTML_SAVE_EXCEPTION, e);
            throw new StorageException("Failed to store file");
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            throw new StorageFileNotFoundException("Could not read file: " + filename);
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }
}
