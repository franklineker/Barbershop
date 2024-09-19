package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.BarberDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.mapper.BarberMapper;
import com.barbershop.agenda.repository.BarberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BarberService {

    private final BarberRepository barberRepository;
    private final PasswordEncoder passwordEncoder;

    public Barber save(BarberDto dto){
        Barber barber = BarberMapper.toBarber(dto);
        barber.setPassword(passwordEncoder.encode(dto.getPassword()));

        return barberRepository.save(barber);
    }
}
