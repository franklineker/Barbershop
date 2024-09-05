package com.barbershop.agenda.service;

import com.barbershop.agenda.dto.UserDto;
import com.barbershop.agenda.entity.User;
import com.barbershop.agenda.mapper.UserMapper;
import com.barbershop.agenda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public User delete(int id) {
       return userRepo.deleteById(id);
    }

}
