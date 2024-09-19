package com.barbershop.agenda.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

@Getter
@AllArgsConstructor
public enum BarberStatus {

    ACTIVE(3000, "ACTIVE"),
    INACTIVE(3001, "INACTIVE");

    private int code;
    private String description;

    public static BarberStatus ofCode(Integer code){
        return Stream.of(values())
                .filter(orderStatus -> Objects.equals(code, orderStatus.code))
                .findAny()
                .orElse(null);
    }
}
