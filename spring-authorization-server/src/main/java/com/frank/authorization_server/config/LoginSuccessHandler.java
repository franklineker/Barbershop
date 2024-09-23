package com.frank.authorization_server.config;

import com.frank.authorization_server.entity.User;
import com.frank.authorization_server.mapper.UserMapper;
import com.frank.authorization_server.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;
import java.util.function.Consumer;

@Component
@Data
public class LoginSuccessHandler implements Consumer<OAuth2User> {

    @Value("${config.uris.redirect-uri}")
    private String redirectUri;

    private final UserRepository userRepository;

    @Override
    public void accept(OAuth2User oAuth2User) {
        String oAuth2UserEmail = oAuth2User.getAttributes().get("email").toString();
        Collection<? extends GrantedAuthority> roles = oAuth2User.getAuthorities();
        List<String> roleNames = roles.stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        List<String> roleNamesList = new ArrayList<>(roleNames);
        roleNamesList.add("CUSTOMER");
        System.out.println("role names: " + roleNames);


        if (!Optional.ofNullable(userRepository.findByUsername(oAuth2UserEmail)).isPresent()) {
            User user = UserMapper.fromOauth2User(oAuth2User);
            user.setRoles(roleNamesList);

            this.userRepository.save(user);
        }else {
            System.out.println("Bem-vindo " +  oAuth2User.getAttributes().get("name"));
        }
    }

}
