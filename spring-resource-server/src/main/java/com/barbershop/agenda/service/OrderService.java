package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.OrderCreateRequestDto;
import com.barbershop.agenda.dto.OrderResponseDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.entity.Order;
import com.barbershop.agenda.exceptions.AppEntityNotFoundException;
import com.barbershop.agenda.mapper.OrderMapper;
import com.barbershop.agenda.repository.BarberRepository;
import com.barbershop.agenda.repository.CustomerRepository;
import com.barbershop.agenda.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}
