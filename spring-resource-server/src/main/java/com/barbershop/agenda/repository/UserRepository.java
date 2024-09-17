package com.barbershop.agenda.repository;

import com.barbershop.agenda.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(int id);
    User deleteById(int id);
}
