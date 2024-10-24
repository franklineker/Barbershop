package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderCreateRequestDto {

    private LocalDateTime date;
    private Integer barberId;
    private Integer customerId;
    private Integer statusCode;
}
