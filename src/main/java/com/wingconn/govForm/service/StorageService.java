package com.wingconn.govForm.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Path;
import java.util.stream.Stream;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-21 16:42.
 */
public interface StorageService {

    void init();

    String store(InputStream is);

    void store(InputStream is, String formId);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
}
