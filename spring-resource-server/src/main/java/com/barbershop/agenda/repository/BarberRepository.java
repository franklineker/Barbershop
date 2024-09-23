package com.barbershop.agenda.repository;

import com.barbershop.agenda.entity.Barber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Integer> {

    Barber getById(int id);
    Barber getByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsById(Integer id);
}
