package com.barbershop.agenda.exceptions;

public class EmailAlreadyTakenException  extends RuntimeException{
    public EmailAlreadyTakenException(String msg){
        super(msg);
    }
}
