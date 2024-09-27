package com.barbershop.agenda.errors;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@NoArgsConstructor
@Data
public class ApiErrorInternalServerError {

    private String message;
    private int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    private String error = "Internal Server Error";
    private Date date = new Date();

    public ApiErrorInternalServerError(String msg){
        this.message = msg;
    }
}
