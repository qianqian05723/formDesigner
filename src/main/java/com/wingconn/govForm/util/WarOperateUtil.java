package com.wingconn.govForm.util;

import com.wingconn.govForm.constant.ServerMsgConstants;
import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.ArchiveOutputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.jar.JarArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;

/**
 * @author ZD.
 *         Description:
 * @since 2017-07-12 18:11.
 */
public class WarOperateUtil {
    private static final Logger LOGGER  = LoggerFactory.getLogger(WarOperateUtil.class);

    public static Path getClassesPath() {
        try {
            Path classesPath = Paths.get(WarOperateUtil.class.getResource("/").toURI());

            LOGGER.debug(classesPath.toString());

            Path warPath = classesPath.resolve("war/FormFillInResident.war");

            LOGGER.debug(warPath.toAbsolutePath().toFile().getCanonicalPath());

            Path dirPath = classesPath.resolve("war");

            LOGGER.debug(dirPath.toString());


//            Path toWarDirPath = dirPath.resolve("FormFillInResident");
            Path toWarDirPath = dirPath.resolve("form_5b875016960f4b6ab2eee8502a55b76e");

//            unZipWar(warPath, warPath.resolve("../form_5b875016960f4b6ab2eee8502a55b76e"));
//            unZipWar(warPath, warPath.resolve("../FormFillInResident"));

            zipWar(toWarDirPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 解压war文件
     * @param warPath war文件路径
     * @param unZipPath 解压到的路径
     */
    public static boolean unZipWar(Path warPath, Path unZipPath) {
        String warName = warPath.toFile().getName();
        LOGGER.debug("warName: " + warName);
        LOGGER.debug("unZipPath: " + unZipPath.toString());
        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(warPath.toFile()));
             ArchiveInputStream ais = new ArchiveStreamFactory().createArchiveInputStream(
                     ArchiveStreamFactory.JAR, bis)) {
            if (Files.exists(unZipPath)) {
                Files.delete(unZipPath);
            }
            Files.createDirectories(unZipPath);
            JarArchiveEntry entry;
            while ((entry = (JarArchiveEntry) ais.getNextEntry()) != null) {
                if (entry.isDirectory()) {
                    Path currentPath = Paths.get(unZipPath.toString(), entry.getName());
                    if (!Files.exists(currentPath.getParent())) {
                        Files.createDirectories(currentPath);
                    } else if (!Files.exists(currentPath)) {
                        Files.createDirectory(currentPath);
                    }
                } else {
                    Path currentPath = unZipPath.resolve(entry.getName());
                    if (!Files.exists(currentPath.getParent())) {
                        Files.createDirectories(currentPath.getParent());
                    }
                    try (OutputStream os = Files.newOutputStream(currentPath)) {
                        IOUtils.copy(ais, os);
                    }
                }
            }
        } catch (ArchiveException | IOException e) {
            LOGGER.error(ServerMsgConstants.UNPACK_WAR_ERROR + warName, e);
            return false;
        }
        return true;
    }

    /**
     * 创建 war 文件
     * @param sourceDir
     */
    public static boolean zipWar(Path sourceDir) {
        sourceDir = sourceDir.toAbsolutePath();
        String rootDir = sourceDir.toString();
        LOGGER.debug("rootDir: " + rootDir);
        if (!StringUtils.endsWithFileSeparator(rootDir)) {
            rootDir += File.separator;
        }
        Path warPath = sourceDir.getParent().resolve(StringUtils.appendWarSuffix(sourceDir.getFileName().toString()));
        try (BufferedOutputStream bos = new BufferedOutputStream(Files.newOutputStream(warPath));
             ArchiveOutputStream aos = new ArchiveStreamFactory().createArchiveOutputStream(ArchiveStreamFactory.JAR, bos)) {
            Iterator<File> files = FileUtils.iterateFiles(sourceDir.toFile(), null, true);
            LOGGER.debug("rootDir: " + rootDir);
            while (files.hasNext()) {
                File file = files.next();
                ZipArchiveEntry entry = new ZipArchiveEntry(file, StringUtils.remove(file.getAbsolutePath(), rootDir));
                aos.putArchiveEntry(entry);
                try (InputStream is = new FileInputStream(file)) {
                    IOUtils.copy(is, aos);
                }
                aos.closeArchiveEntry();
            }
            aos.flush();
        } catch (IOException | ArchiveException e) {
            LOGGER.error(ServerMsgConstants.PACK_WAR_ERROR, e);
            return false;
        }
        return true;
    }

    /**
     * 判断对象是否是 null
     * @param o
     * @return
     */
    private static boolean isObjectNull(Object o) {
        return null == o;
    }
}
