package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.OrderCreateRequestDto;
import com.barbershop.agenda.dto.OrderResponseDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.entity.Order;
import com.barbershop.agenda.enums.OrderStatus;

public class OrderMapper {

    public static Order toOrderCreate(OrderCreateRequestDto dto, Barber barber, Customer customer) {
        return dto != null ? Order.builder()
                .date(dto.getDate())
                .barber(barber)
                .customer(customer)
                .status(OrderStatus.ofCode(dto.getStatusCode()).getDescription())
                .build() : null;
    }

    public static OrderResponseDto toOrderResponseDto (Order order) {
        return order != null ? OrderResponseDto.builder()
                .id(order.getId())
                .date(order.getDate())
                .barber(BarberMapper.toBarberResponseDto(order.getBarber()))
                .customer(CustomerMapper.toCustomerResponse(order.getCustomer()))
                .statusDescription(order.getStatus())
                .statusCode(OrderStatus.ofDescripton(order.getStatus()).getCode())
                .build() : null;
    }
}
