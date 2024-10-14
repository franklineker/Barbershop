package com.barbershop.agenda.controller;

import com.barbershop.agenda.dto.CustomerCreateRequestDto;
import com.barbershop.agenda.dto.CustomerResponseDto;
import com.barbershop.agenda.dto.CustomerUpdateRequestDto;
import com.barbershop.agenda.mapper.CustomerMapper;
import com.barbershop.agenda.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/customer")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerResponseDto> createCustomer(@RequestBody CustomerCreateRequestDto dto) {
        CustomerResponseDto response = CustomerMapper.toCustomerResponse(customerService.createCustomer(dto));
        return ResponseEntity.ok(response);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CustomerResponseDto>> findAll() {
        List<CustomerResponseDto> response = customerService.findAll()
                .stream()
                .map(customer -> CustomerMapper.toCustomerResponse(customer))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/id/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerResponseDto> findById(@PathVariable String id) {
        CustomerResponseDto response = CustomerMapper
                .toCustomerResponse(customerService.findCustomerById(Integer.parseInt(id)));
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/email/{email}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerResponseDto> findByEmail(@PathVariable String email) {
        CustomerResponseDto response = CustomerMapper
                .toCustomerResponse(customerService.findCustomerByEmail(email));
        return ResponseEntity.ok(response);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerResponseDto> updateCustomer(@RequestBody CustomerUpdateRequestDto dto) {
        CustomerResponseDto response = CustomerMapper.toCustomerResponse(customerService.updateCustomer(dto));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerResponseDto> deleteBarber(@PathVariable String id) {
        CustomerResponseDto response = CustomerMapper
                .toCustomerResponse(customerService.deleteCustomer(Integer.parseInt(id)));

        return ResponseEntity.ok(response);
    }
}
