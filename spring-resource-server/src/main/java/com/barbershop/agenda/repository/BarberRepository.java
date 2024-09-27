package com.barbershop.agenda.repository;

import com.barbershop.agenda.entity.Barber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Integer> {

    Optional<Barber> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsById(Integer id);
}
