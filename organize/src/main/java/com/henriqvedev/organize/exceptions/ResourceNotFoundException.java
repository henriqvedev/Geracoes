package com.henriqvedev.organize.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Object id) {
        super("ID não encontrado: " + id);
    }
}
