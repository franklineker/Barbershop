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
                .filter(barberStatus -> Objects.equals(code, barberStatus.code))
                .findAny()
                .orElse(null);
    }

    public static BarberStatus ofDescription(String description) {
        return Stream.of(values())
                .filter(barberStatus -> description.equals(barberStatus.description))
                .findAny()
                .orElse(null);
    }
}
