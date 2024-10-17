package com.barbershop.agenda.service;

import com.barbershop.agenda.entity.Availability;
import com.barbershop.agenda.exceptions.AppEntityNotFoundException;
import com.barbershop.agenda.repository.AvailabilityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;

    public Availability findAvailability(Integer id) {
        return availabilityRepository.findById(id)
                .orElseThrow(() -> new AppEntityNotFoundException("Availability not found"));
    }

    public Availability updateAvailability(Availability request) {
        if(request.getStart() == null || request.getEnd() == null){
            throw new RuntimeException("Nither start_time nor end_time can be null");
        }
        Availability availability = availabilityRepository.findById(request.getId())
                .orElseThrow(() -> new AppEntityNotFoundException("Availability not found"));
        availability.setStart(request.getStart());
        availability.setEnd(request.getEnd());

        return availabilityRepository.save(availability);
    }
}
