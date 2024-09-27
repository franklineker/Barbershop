package com.barbershop.agenda.errors;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;
@NoArgsConstructor
@Data
public class ApiErrorNotFound {
    private String message;
    private int statusCode = HttpStatus.NOT_FOUND.value();
    private String error = "Not Found";
    private Date data = new Date();

    public ApiErrorNotFound(String msg){
        this.message = msg;
    }
}
