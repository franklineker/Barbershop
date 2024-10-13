package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.CustomerCreateRequestDto;
import com.barbershop.agenda.dto.CustomerUpdateRequestDto;
import com.barbershop.agenda.entity.Customer;
import com.barbershop.agenda.exceptions.AppEntityNotFoundException;
import com.barbershop.agenda.exceptions.NullPasswordException;
import com.barbershop.agenda.mapper.CustomerMapper;
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

    public Customer createCustomer(CustomerCreateRequestDto dto) {

        if(dto.getPassword() == null) {
            throw new NullPasswordException("Password cannot be null");
        }

        Customer customer = CustomerMapper.toCustomerCreate(dto);
        customer.setPassword(passwordEncoder.encode(dto.getPassword()));
        return customerRepository.save(customer);
    }

    public Customer findCustomerById(Integer id) {
        return customerRepository.findById(id).orElseThrow(() -> new AppEntityNotFoundException("Customer not found."));
    }

    public Customer findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new AppEntityNotFoundException("Customer not found."));
    }

    public Customer updateCustomer(CustomerUpdateRequestDto dto) {
        Customer customer = customerRepository.findById(dto.getId())
                .orElseThrow(() -> new AppEntityNotFoundException("Customer not found"));
        Customer updatedCustomer = customerRepository.save(CustomerMapper.toCustomerUpdate(dto, customer));
        return updatedCustomer;
    }

    public Customer deleteCustomer(Integer id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppEntityNotFoundException("Customer not found."));
        customerRepository.deleteById(customer.getId());
        return customer;
    }

}
