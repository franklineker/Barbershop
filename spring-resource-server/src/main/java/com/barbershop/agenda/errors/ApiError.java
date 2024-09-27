package com.barbershop.agenda.errors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiError {

    private String message;
    private int statusCode;
    private String error;
    private Date date;
}
