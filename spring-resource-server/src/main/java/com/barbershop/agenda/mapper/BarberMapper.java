package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.BarberResponseDto;
import com.barbershop.agenda.dto.CreateBarberRequestDto;
import com.barbershop.agenda.dto.UpdateBarberRequestDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.enums.BarberStatus;
import com.barbershop.agenda.enums.UserRole;
import com.barbershop.agenda.exceptions.UserRolesMustNotBeNullException;

import java.util.Set;
import java.util.stream.Collectors;


public class BarberMapper {

    public static Barber toBarberCreate(CreateBarberRequestDto requestDto) {
        Set<String> roles;

        if(requestDto.getRoles() != null) {
            roles = requestDto.getRoles().stream()
                    .map(code -> UserRole.ofCode(code).getDescription()).collect(Collectors.toSet());
        } else {
            throw new UserRolesMustNotBeNullException("field 'roles' must not be null");
        }

        String status = requestDto.getStatusCode() != null ? BarberStatus.ofCode(requestDto.getStatusCode()).getDescription() : "ACTIVE";
        return requestDto != null ? Barber.builder()
                .name(requestDto.getName())
                .phoneNumber(requestDto.getPhoneNumber())
                .email(requestDto.getEmail())
                .status(status)
                .password(requestDto.getPassword())
                .roles(roles)
                .build() : null;
    }

    public static Barber toBarberUpdate(UpdateBarberRequestDto requestDto, Barber barber) {

        System.out.println(barber.toString());
        if (requestDto.getName() != null) {
            barber.setName(requestDto.getName());
        }
        if (requestDto.getPhoneNumber() != null) {
            barber.setPhoneNumber(requestDto.getPhoneNumber());
        }
        if (requestDto.getStatusCode() != null) {
            barber.setStatus(BarberStatus.ofCode(requestDto.getStatusCode()).getDescription());
        }

        return barber;
    }

    public static BarberResponseDto toBarberResponseDto(Barber barber) {
        return barber != null ? BarberResponseDto.builder()
                .id((barber.getId()))
                .email(barber.getEmail())
                .name(barber.getName())
                .phoneNumber(barber.getPhoneNumber())
                .statusDescription(barber.getStatus())
                .statusCode(BarberStatus.ofDescription(barber.getStatus()).getCode())
                .build() : null;
    }
}
