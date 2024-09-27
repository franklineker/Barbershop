package com.barbershop.agenda.exceptions;

public class UserRolesMustNotBeNullException extends RuntimeException{

    public UserRolesMustNotBeNullException(String msg) {
        super(msg);
    }
}
