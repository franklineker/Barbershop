package com.barbershop.agenda.exceptions;

public class NullPasswordException extends RuntimeException{

    public NullPasswordException(String msg){
        super(msg);
    }
}
