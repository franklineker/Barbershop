package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateBarberRequestDto {

    private String email;
    private String password;
    private Set<Integer> roles;
    private String name;
    private String phoneNumber;
    private Integer statusCode;
}
