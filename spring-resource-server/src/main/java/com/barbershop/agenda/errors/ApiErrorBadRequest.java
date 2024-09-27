package com.barbershop.agenda.errors;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Data
@NoArgsConstructor
public class ApiErrorBadRequest {

    private String message;
    private int statusCode = HttpStatus.BAD_REQUEST.value();
    private String error = "Bad Request";
    private Date date = new Date();

    public ApiErrorBadRequest(String msg){
        this.message = msg;
    }

}
