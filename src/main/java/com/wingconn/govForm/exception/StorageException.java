package com.wingconn.govForm.exception;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-21 16:51.
 */
public class StorageException extends RuntimeException {

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
