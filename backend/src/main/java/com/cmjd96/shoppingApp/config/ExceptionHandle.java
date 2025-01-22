package com.cmjd96.shoppingApp.config;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandle {
    @ExceptionHandler(ResourceNotFoundException.class)
    public String ResourceNotFound(ResourceNotFoundException e){
        return e.getMessage();
    }
}

