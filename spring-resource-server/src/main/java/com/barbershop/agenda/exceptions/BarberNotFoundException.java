package com.barbershop.agenda.exceptions;

public class BarberNotFoundException extends RuntimeException{

    public BarberNotFoundException(String msg){
        super(msg);
    }
}
