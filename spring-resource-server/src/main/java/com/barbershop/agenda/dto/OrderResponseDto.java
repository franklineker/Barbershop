package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderResponseDto {

    private Integer id;
    private LocalDateTime date;
    private BarberResponseDto barber;
    private CustomerResponseDto customer;
    private String statusDescription;
    private Integer statusCode;
}
