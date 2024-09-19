package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BarberDto {

    private String email;
    private String password;
    private Set<String> roles;
    private String name;
    private String phoneNumber;
}
