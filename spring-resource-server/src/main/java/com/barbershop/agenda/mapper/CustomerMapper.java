package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.CustomerCreateRequestDto;
import com.barbershop.agenda.dto.CustomerResponse;
import com.barbershop.agenda.dto.CustomerUpdateRequestDto;
import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.enums.UserRole;
import com.barbershop.agenda.exceptions.UserRolesMustNotBeNullException;

import java.util.Set;
import java.util.stream.Collectors;

public class CustomerMapper {

    public static Customer toCustomerCreate(CustomerCreateRequestDto dto) {
        Set<String> roles;

        if(dto.getRoles() != null) {
            roles = dto.getRoles().stream()
                    .map(code -> UserRole.ofCode(code).getDescription()).collect(Collectors.toSet());
        } else {
            throw new UserRolesMustNotBeNullException("field 'roles' must not be null");
        }
        return dto != null ? Customer.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .roles(roles)
                .name(dto.getName())
                .phoneNumber(dto.getPhoneNumber())
                .isAdult(dto.getIsAdult())
                .build() : null;
    }

    public static Customer toCustomerUpdate(CustomerUpdateRequestDto dto, Customer customer) {
        if (dto.getName() != null) {
            customer.setName(dto.getName());
        }
        if(dto.getPhoneNumber() != null) {
            customer.setPhoneNumber(dto.getPhoneNumber());
        }
        if(dto.getIsAdult() != null){
            customer.setIsAdult(dto.getIsAdult());
        }

        return customer;
    }

    public static CustomerResponse toCustomerResponse(Customer customer) {
        return customer != null ? CustomerResponse.builder()
                .id(customer.getId())
                .email(customer.getEmail())
                .name(customer.getName())
                .phoneNumber(customer.getPhoneNumber())
                .isAdult(customer.getIsAdult())
                .build() : null;
    }
}
