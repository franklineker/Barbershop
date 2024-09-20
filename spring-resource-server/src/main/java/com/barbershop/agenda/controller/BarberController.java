package com.barbershop.agenda.controller;

import com.barbershop.agenda.dto.BarberRequestDto;
import com.barbershop.agenda.dto.BarberResponseDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.mapper.BarberMapper;
import com.barbershop.agenda.service.BarberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/barber")
public class BarberController {

    private final BarberService barberService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public BarberResponseDto createBarber(@RequestBody BarberRequestDto dto) {
        return barberService.save(dto);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public BarberResponseDto findBarberByEmail(@RequestBody String email) {
        return barberService.findByEmail(email);
    }
}
