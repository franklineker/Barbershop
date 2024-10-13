package com.barbershop.agenda.exceptions;

import com.barbershop.agenda.errors.ApiError;
import com.barbershop.agenda.errors.ApiErrorConflict;
import com.barbershop.agenda.errors.ApiErrorNotFound;
import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
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
        ApiError apiError = null;
        Throwable rootCause = e.getRootCause();
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        if (e.getCause() instanceof ConstraintViolationException violationException) {
            if("unique_username".equals(violationException.getConstraintName())){
                apiError = new ApiError(
                        "Data conflict: A user with this email already exists",
                        HttpStatus.CONFLICT.value(),
                        "Conflict",
                        new Date()
                );
                httpStatus = HttpStatus.CONFLICT;
            }
        }
        if (rootCause instanceof PSQLException violationException) {
            if (violationException.getMessage().contains("null value in column") ||
                    violationException.getMessage().contains("violates not-null constraint")) {
                System.out.println("NOT NULL restriction error");
                apiError = new ApiError(
                        violationException.getLocalizedMessage().split("Detalhe:")[0],
                        HttpStatus.BAD_REQUEST.value(),
                        "Bad Request",
                        new Date()
                );
                httpStatus = HttpStatus.BAD_REQUEST;
            }
        }
        if (rootCause instanceof IllegalArgumentException violationException) {
            if (violationException.getMessage().contains("Password cannot be null")) {
                apiError = new ApiError(
                        violationException.getLocalizedMessage().split("Detalhe:")[0],
                        HttpStatus.BAD_REQUEST.value(),
                        "Bad Request",
                        new Date()
                );
                httpStatus = HttpStatus.BAD_REQUEST;
            }
        }

        return ResponseEntity.status(httpStatus).body(apiError);
    }

    @ExceptionHandler(AppEntityNotFoundException.class)
    public ResponseEntity<ApiErrorNotFound> handleBarberNotFound(AppEntityNotFoundException e) {
        ApiErrorNotFound apiErrorNotFound  = new ApiErrorNotFound(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorNotFound);
    }

    @ExceptionHandler(EmailAlreadyTakenException.class)
    public ResponseEntity<ApiErrorConflict> handleEmailAlreadyTaken(EmailAlreadyTakenException e) {
        ApiErrorConflict apiErrorConflict = new ApiErrorConflict("This email has already been taken by another user.");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiErrorConflict);
    }

    @ExceptionHandler(UserRolesMustNotBeNullException.class)
    public ResponseEntity<ApiError> handleGenericException(UserRolesMustNotBeNullException e) {
        ApiError errorResponse = new ApiError(
                "Error: " + e.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                new Date()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(NullPasswordException.class)
    public ResponseEntity<ApiError> handleNullPasswordException(NullPasswordException e) {
        ApiError errorResponse = new ApiError(
                e.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                new Date()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}
