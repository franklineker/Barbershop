package com.barbershop.agenda.errors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        ApiError apiError = new ApiError(
                "Data conflict: " + e.getMessage(),
                HttpStatus.CONFLICT.value(),
                "Conflict",
                new Date());

        if (e.getCause().getMessage().contains("app_user_username_key")) {
            apiError = new ApiError(
                    "Data conflict: A user with this email already exists",
                    HttpStatus.CONFLICT.value(),
                    "Conflict",
                    new Date());
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiError);
    }

    @ExceptionHandler(BarberNotFoundException.class)
    public ResponseEntity<ApiError> handleBarberNotFound(BarberNotFoundException e) {
        ApiError errorResponse = new ApiError(
                "An unexpected error occurred: " + e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                new Date());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception e) {
        ApiError errorResponse = new ApiError(
                "An unexpected error occurred: " + e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                new Date());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
