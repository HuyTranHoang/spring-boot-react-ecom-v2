package com.huy.api.common.exception;

import com.huy.api.common.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class ExceptionHandling {

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<HttpResponse> NoHandlerFoundException(NoHandlerFoundException e) {
    return createResponseEntity(HttpStatus.NOT_FOUND, e.getMessage());
    }

    private ResponseEntity<HttpResponse> createResponseEntity(HttpStatus status, String message) {
        HttpResponse httpResponse = new HttpResponse(status.value(), status, status.getReasonPhrase(), message);
        return new ResponseEntity<>(httpResponse, status);
    }
}
