package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.BarberResponseDto;
import com.barbershop.agenda.dto.CreateBarberRequestDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.enums.BarberStatus;
import com.barbershop.agenda.enums.UserRole;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class BarberMapper {

    public static Barber toBarber(CreateBarberRequestDto dto) {
        Set<String> roles = dto.getRoles().stream()
                .map(code -> UserRole.ofCode(code).getDescription()).collect(Collectors.toSet());

        return dto != null ? Barber.builder()
                .name(dto.getName())
                .phoneNumber(dto.getPhoneNumber())
                .email(dto.getEmail())
                .status(BarberStatus.ofCode(dto.getStatusCode()).getDescription())
                .password(dto.getPassword())
                .roles(roles)
                .build() : null;
    }

    public static BarberResponseDto toBarberResponseDto(Barber barber) {
        return barber != null ? BarberResponseDto.builder()
                .id((barber.getId()))
                .email(barber.getEmail())
                .name(barber.getName())
                .phoneNumber(barber.getPhoneNumber())
                .build() : null;
    }
}
