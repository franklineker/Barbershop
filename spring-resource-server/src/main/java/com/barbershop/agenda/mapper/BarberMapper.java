package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.BarberDto;
import com.barbershop.agenda.entity.Barber;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BarberMapper {

    public static Barber toBarber(BarberDto dto) {
        return dto != null ? Barber.builder()
                .username(dto.getEmail())
                .password(dto.getPassword())
                .roles(dto.getRoles())
                .name(dto.getName())
                .phoneNumber(dto.getPhoneNumber())
                .build() : null;
    }
}
