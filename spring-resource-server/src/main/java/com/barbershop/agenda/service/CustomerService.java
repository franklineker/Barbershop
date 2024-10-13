package com.barbershop.agenda.service;

import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Customer> findAll() {
        return customerRepository.findAll().stream().collect(Collectors.toList());
    }

    public Customer createCustomer(Customer request) {
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        return customerRepository.save(request);
    }


}
