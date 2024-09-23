package com.barbershop.agenda.controller;

import com.barbershop.agenda.dto.BarberResponseDto;
import com.barbershop.agenda.dto.CreateBarberRequestDto;
import com.barbershop.agenda.dto.UpdateBarberRequestDto;
import com.barbershop.agenda.mapper.BarberMapper;
import com.barbershop.agenda.service.BarberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/barber")
public class BarberController {

    private final BarberService barberService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createBarber(@RequestBody CreateBarberRequestDto barberRequest) {
        BarberResponseDto createdBarberDto = BarberMapper.toBarberResponseDto(barberService.createBarber(barberRequest));
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBarberDto);
    }

    @GetMapping(path = "/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BarberResponseDto> findBarberById(@PathVariable Integer id) {
        BarberResponseDto barberDto = BarberMapper.toBarberResponseDto(barberService.getById(id));
        return ResponseEntity.ok(barberDto);
    }

    @GetMapping(path = "/email/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BarberResponseDto> findBarberByEmail(@PathVariable String email) {
        BarberResponseDto barberDto = BarberMapper.toBarberResponseDto(barberService.getByEmail(email));
        return ResponseEntity.ok(barberDto);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BarberResponseDto>> findAllBarbers() {
        List<BarberResponseDto> barberDtos = barberService.findAll()
                .stream()
                .map(barber -> BarberMapper.toBarberResponseDto(barber))
                .collect(Collectors.toList());
        return ResponseEntity.ok(barberDtos);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BarberResponseDto> updateBarber(@RequestBody UpdateBarberRequestDto requestDto) {
        BarberResponseDto updatedBarberDto = BarberMapper.toBarberResponseDto(barberService.updateBarber(requestDto));
        return ResponseEntity.ok(updatedBarberDto);
    }

    @DeleteMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BarberResponseDto> deleteBarber(@PathVariable String id) {
        BarberResponseDto deletedBarberDto = BarberMapper.toBarberResponseDto(barberService.deleteBarber(Integer.parseInt(id)));
        return ResponseEntity.ok(deletedBarberDto);
    }
}
