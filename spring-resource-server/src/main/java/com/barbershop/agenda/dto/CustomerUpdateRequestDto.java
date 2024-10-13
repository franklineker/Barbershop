package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerUpdateRequestDto {

    private Integer id;
    private String name;
    private String phoneNumber;
    private Boolean isAdult;
}
