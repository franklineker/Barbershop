package com.barbershop.agenda.exceptions;

public class AppEntityNotFoundException extends RuntimeException{

    public AppEntityNotFoundException(String msg){
        super(msg);
    }
}
