package com.barbershop.agenda.mapper;

import com.barbershop.agenda.dto.UserDto;
import com.barbershop.agenda.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMapper {

    public static User toUser(UserDto userDto){
        return userDto != null ? User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .build() : null;
    }
}
