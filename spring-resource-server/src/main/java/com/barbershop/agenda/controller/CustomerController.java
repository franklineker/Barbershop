package com.barbershop.agenda.controller;

import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/customer")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Customer>> findAll() {
        System.out.println("chamando customers...");
        List<Customer> customers = customerService.findAll();
        return ResponseEntity.ok(customers);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer request) {
        Customer customer = customerService.createCustomer(request);
        return ResponseEntity.ok(customer);
    }
}
