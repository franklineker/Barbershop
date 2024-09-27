package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BarberResponseDto {

    private int id;
    private String email;
    private String name;
    private String phoneNumber;
    private String statusDescription;
    private Integer statusCode;

}