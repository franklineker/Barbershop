package com.barbershop.agenda.controller;

import com.barbershop.agenda.dto.BarberDto;
import com.barbershop.agenda.entity.Barber;
import com.barbershop.agenda.service.BarberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(name = "/barber")
public class BarberController {

    private final BarberService barberService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Barber createBarber(@RequestBody BarberDto dto) {
        return barberService.save(dto);
    }
}
