package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateBarberRequestDto {

    private int id;
    private String name;
    private String phoneNumber;
    private Integer statusCode;

}
