package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.OrderCreateRequestDto;
import com.barbershop.agenda.dto.OrderResponseDto;
import com.barbershop.agenda.dto.OrderUpdateRequestDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.entity.Order;
import com.barbershop.agenda.enums.OrderStatus;
import com.barbershop.agenda.exceptions.AppEntityNotFoundException;
import com.barbershop.agenda.mapper.OrderMapper;
import com.barbershop.agenda.repository.BarberRepository;
import com.barbershop.agenda.repository.CustomerRepository;
import com.barbershop.agenda.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BarberRepository barberRepository;
    private final CustomerRepository customerRepository;

    public OrderResponseDto createOrder(OrderCreateRequestDto dto) {
        Barber barber = barberRepository.findById(dto.getBarberId())
                .orElseThrow(() -> new AppEntityNotFoundException("Barber not found"));
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new AppEntityNotFoundException("Customer not found"));
        Order order = orderRepository.save(OrderMapper.toOrderCreate(dto, barber, customer));

        return OrderMapper.toOrderResponseDto(order);
    }

    public List<OrderResponseDto> findAll() {
        List<OrderResponseDto> orderResponseDto = orderRepository.findAll()
                .stream()
                .map(order -> OrderMapper.toOrderResponseDto(order))
                .collect(Collectors.toList());
        return orderResponseDto;
    }

    public OrderResponseDto updateOrder(OrderUpdateRequestDto dto) {
        Order order = orderRepository.findById(dto.getId())
                .orElseThrow(() -> new AppEntityNotFoundException("Order not found"));

        if(dto.getBarberId() != null && dto.getBarberId() != order.getBarber().getId()) {
            Barber barber = barberRepository.findById(dto.getBarberId())
                    .orElseThrow(() -> new AppEntityNotFoundException("barber_id informed does not match with any registered barber."));
            order.setBarber(barber);
        }
        if(dto.getDate() != null && dto.getDate() != order.getDate()){
            order.setDate(dto.getDate());
        }
        if(dto.getStatusCode() != null && dto.getStatusCode() != OrderStatus.ofDescripton(order.getStatus()).getCode()){
            order.setStatus(OrderStatus.ofCode(dto.getStatusCode()).getDescription());
        }

        return OrderMapper.toOrderResponseDto(order);
    }
}