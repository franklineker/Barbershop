package com.frank.authorization_server.mapper;

import com.frank.authorization_server.entity.User;
import com.frank.authorization_server.web.dto.UserRequest;
import com.frank.authorization_server.web.dto.UserResponse;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Data
@NoArgsConstructor
public class UserMapper {

    public static User toUser(UserRequest request) {
        return request != null ? User.builder()
                .username((request.getUsername()))
                .email(request.getEmail())
                .password(request.getPassword())
                .roles(request.getRoles())
                .expired(false)
                .credentialsExpired(false)
                .disabled(false)
                .locked(false)
                .build() : null;
    }

    public static UserResponse toUserResponse(User user) {
        return user != null ? UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build() : null;
    }

    public static User fromOauth2User(OAuth2User oAuth2User) {
        User user = User.builder()
                .email(oAuth2User.getAttributes().get("email").toString())
                .fullName(oAuth2User.getAttributes().get("name").toString())
                .firstName(oAuth2User.getAttributes().get("given_name").toString())
                .lastName(oAuth2User.getAttributes().get("family_name").toString())
                .pictureUrl(oAuth2User.getAttributes().get("picture").toString())
                .build();

        return user;
    }
}
