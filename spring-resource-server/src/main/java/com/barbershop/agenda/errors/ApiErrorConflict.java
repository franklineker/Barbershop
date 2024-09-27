package com.barbershop.agenda.errors;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Data
@NoArgsConstructor
public class ApiErrorConflict {

    private String message;
    private int statusCode = HttpStatus.CONTINUE.value();
    private String error = "Conflict";
    private Date date = new Date();

    public ApiErrorConflict(String msg){
        this.message = msg;
    }

}
