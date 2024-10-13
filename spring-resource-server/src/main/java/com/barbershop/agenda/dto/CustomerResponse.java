package com.barbershop.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomerResponse {

    private Integer id;
    private String email;
    private String name;
    private String phoneNumber;
    private Boolean isAdult;
}
