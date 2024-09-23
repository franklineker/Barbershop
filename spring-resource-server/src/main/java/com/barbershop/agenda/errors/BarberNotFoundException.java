package com.barbershop.agenda.errors;

public class BarberNotFoundException extends RuntimeException{

    public BarberNotFoundException(String msg){
        super(msg);
    }
}
