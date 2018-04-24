package com.wingconn.govForm.exception;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-21 17:01.
 */
public class StorageFileNotFoundException extends StorageException {
    public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
