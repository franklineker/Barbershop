package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerCreateRequestDto {

    private String email;
    private String password;
    private Set<Integer> roles;
    private String name;
    private String phoneNumber;
    private Boolean isAdult;
}
