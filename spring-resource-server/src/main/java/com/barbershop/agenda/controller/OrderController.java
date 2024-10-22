package com.barbershop.agenda.controller;

import com.barbershop.agenda.dto.OrderCreateRequestDto;
import com.barbershop.agenda.dto.OrderResponseDto;
import com.barbershop.agenda.dto.OrderUpdateRequestDto;
import com.barbershop.agenda.mapper.OrderMapper;
import com.barbershop.agenda.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderCreateRequestDto dto) {
        OrderResponseDto responseDto = orderService.createOrder(dto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> findAllOrders() {
        List<OrderResponseDto> orderResponseDto = orderService.findAll();
        return ResponseEntity.ok(orderResponseDto);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResponseDto> updateOrder(@RequestBody OrderUpdateRequestDto dto) {
        OrderResponseDto responseDto = orderService.updateOrder(dto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResponseDto> deleteOrder(@PathVariable String id) {
        OrderResponseDto responseDto = orderService.deleteOrder(Integer.parseInt(id));
        return ResponseEntity.ok(responseDto);
    }
}
