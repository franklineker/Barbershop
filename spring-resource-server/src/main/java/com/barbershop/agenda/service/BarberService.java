package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.CreateBarberRequestDto;
import com.barbershop.agenda.dto.UpdateBarberRequestDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.errors.BarberNotFoundException;
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
        Barber barber = BarberMapper.toBarber(dto);
        barber.setPassword(passwordEncoder.encode(dto.getPassword()));
        return barberRepository.save(barber);
    }

    public Barber getByEmail(String email) {
        try {
            Barber barber = barberRepository.getByEmail(email);
            System.out.println(barber);
            return barber;
        } catch (RuntimeException e) {
            throw new BarberNotFoundException("Barber Not Found.");
        }
    }

    public Barber getById(int id) {
        try {
            Barber barber = barberRepository.getById(id);
            System.out.println(barber);
            return barber;
        } catch (RuntimeException e) {
            throw new BarberNotFoundException("Barber Not Found");
        }
    }

    public List<Barber> findAll() {
        return barberRepository.findAll().stream().collect(Collectors.toList());
    }

    public Barber updateBarber(UpdateBarberRequestDto requestDto) {
        if(!barberRepository.existsById(requestDto.getId())){
            throw new BarberNotFoundException("Barber Not Found");
        }

        Barber barber = barberRepository.getById(requestDto.getId());

        if(requestDto.getName() != null) {
            barber.setName(requestDto.getName());
        }
        if( requestDto.getPhoneNumber() != null){
            barber.setPhoneNumber(requestDto.getPhoneNumber());
        }

        return barberRepository.save(barber);
    }

    public Barber deleteBarber(int id) {
        if(!barberRepository.existsById(id)){
            throw new BarberNotFoundException("Barber Not Found");
        }
        Barber barber = barberRepository.getById(id);
        barberRepository.deleteById(id);
        return barber;
    }

}
