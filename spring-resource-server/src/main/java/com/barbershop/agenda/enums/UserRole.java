package com.barbershop.agenda.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

@AllArgsConstructor
@Getter
public enum UserRole {
    ADMIN(1000, "ADMIN"),
    BARBER(1001, "BARBER"),
    CUSTOMER(1002, "CUSTOMER");

    private int code;
    private String description;

    public static UserRole ofCode(Integer code) {
        return Stream.of(values())
                .filter(userRole -> Objects.equals(code, userRole.code))
                .findAny()
                .orElse(null);
    }
}
