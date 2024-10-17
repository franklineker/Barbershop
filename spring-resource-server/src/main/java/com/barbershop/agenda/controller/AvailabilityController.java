package com.barbershop.agenda.controller;

import com.barbershop.agenda.entity.Availability;
import com.barbershop.agenda.service.AvailabilityService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/availability")
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @GetMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Availability> findAvailability(@PathVariable String id) {
        Availability availability = availabilityService.findAvailability(Integer.parseInt(id));
        return ResponseEntity.ok(availability);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Availability> updateAvailability(@RequestBody Availability request) {
        Availability availability = availabilityService.updateAvailability(request);
        return ResponseEntity.ok(availability);
    }
}
