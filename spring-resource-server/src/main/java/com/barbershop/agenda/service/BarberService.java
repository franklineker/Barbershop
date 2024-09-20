package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.BarberRequestDto;
import com.barbershop.agenda.dto.BarberResponseDto;
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

    public BarberResponseDto save(BarberRequestDto dto){
        Barber barber = BarberMapper.toBarber(dto);
        barber.setPassword(passwordEncoder.encode(dto.getPassword()));

        barber = barberRepository.save(barber);

        return BarberMapper.toBarberResposeDto(barber);
    }

    public BarberResponseDto findByEmail(String email) {
        Barber barber = barberRepository.findByEmail(email);
        return BarberMapper.toBarberResposeDto(barber);
    }
}
