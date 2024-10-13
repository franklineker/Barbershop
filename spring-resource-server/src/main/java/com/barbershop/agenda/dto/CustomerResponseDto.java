package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerResponseDto {

    private String email;
    private String name;
    private String phoneNumber;
    private Integer isAdult;
}
