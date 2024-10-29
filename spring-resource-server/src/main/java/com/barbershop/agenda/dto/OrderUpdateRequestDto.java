package com.barbershop.agenda.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderUpdateRequestDto {

    private Integer id;
    private Integer barberId;
    private LocalDateTime dateTime;
    private Integer statusCode;
}
