package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.BarberRequestDto;
import com.barbershop.agenda.dto.BarberResponseDto;
import com.barbershop.agenda.entity.Barber;

public class BarberMapper {

    public static Barber toBarber(BarberRequestDto dto) {
        return dto != null ? Barber.builder()
                .name(dto.getName())
                .phoneNumber(dto.getPhoneNumber())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .roles(dto.getRoles())
                .build() : null;
    }

    public static BarberResponseDto toBarberResposeDto (Barber barber) {
        return barber != null ? BarberResponseDto.builder()
                .email(barber.getEmail())
                .name(barber.getName())
                .phoneNumber(barber.getPhoneNumber())
                .build() : null;
    }
}
