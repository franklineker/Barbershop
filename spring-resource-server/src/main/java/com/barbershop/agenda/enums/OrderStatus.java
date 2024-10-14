package com.barbershop.agenda.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

@Getter
@AllArgsConstructor
public enum OrderStatus {

    PENDING(2000, "PENDING"),
    COMPLETED(2001, "COMPLETED");

    private final int code;
    private final String description;

    public static OrderStatus ofCode(Integer code){
        return Stream.of(values())
                .filter(orderStatus -> Objects.equals(code, orderStatus.code))
                .findAny()
                .orElse(null);
    }

    public static OrderStatus ofDescripton(String description) {
        return Stream.of(values())
                .filter(status -> Objects.equals(description, status.description))
                .findAny()
                .orElse(null);
    }
}
