package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.CreateBarberRequestDto;
import com.barbershop.agenda.dto.UpdateBarberRequestDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.exceptions.AppEntityNotFoundException;
import com.barbershop.agenda.exceptions.NullPasswordException;
import com.barbershop.agenda.mapper.BarberMapper;
import com.barbershop.agenda.repository.BarberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BarberService {

    private final BarberRepository barberRepository;
    private final PasswordEncoder passwordEncoder;

    public Barber createBarber(CreateBarberRequestDto dto) {
        if(dto.getPassword() == null){
            throw new NullPasswordException("Password cannot be null");
        }
        Barber barber = BarberMapper.toBarberCreate(dto);
        barber.setPassword(passwordEncoder.encode(dto.getPassword()));
        return barberRepository.save(barber);
    }

    public Barber findByEmail(String email) {
        Barber barber = barberRepository.findByEmail(email)
                .orElseThrow(() -> new AppEntityNotFoundException("Barber Not Found"));
        barber.getRoles().add("BARBER");
        return barber;
    }

    public Barber findById(int id) {
        Barber barber = barberRepository.findById(id).orElseThrow(() -> new AppEntityNotFoundException("Barber Not Found"));
        System.out.println("Barber retured from DB: " + barber.toString());
        return barber;
    }

    public List<Barber> findAll() {
        return barberRepository.findAll().stream().collect(Collectors.toList());
    }

    public Barber updateBarber(UpdateBarberRequestDto requestDto) {

        Barber currentBarber = barberRepository.findById(requestDto.getId())
                .orElseThrow(() -> new AppEntityNotFoundException("Barber Not Found"));
        Barber updatedBarber = BarberMapper.toBarberUpdate(requestDto, currentBarber);
        return barberRepository.save(updatedBarber);
    }

    public Barber deleteBarber(int id) {
        Barber barber = barberRepository.findById(id)
                .orElseThrow(() -> new AppEntityNotFoundException("Barber Not Found"));
        barberRepository.deleteById(id);
        return barber;
    }

}
