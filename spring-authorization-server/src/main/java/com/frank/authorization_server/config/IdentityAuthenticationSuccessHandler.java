package com.frank.authorization_server.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.function.Consumer;

public class IdentityAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthenticationSuccessHandler delegate = new SavedRequestAwareAuthenticationSuccessHandler();
    private Consumer<OAuth2User> oAuth2UserHandler = (user) -> {};
    private Consumer<OidcUser> oidcUserHandler = (user) -> this.oAuth2UserHandler.accept(user);
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println(authentication);
        if (authentication instanceof OAuth2AuthenticationToken) {
            if (authentication.getPrincipal() instanceof OidcUser) {
                this.oidcUserHandler.accept((OidcUser) authentication.getPrincipal());
            }else if (authentication.getPrincipal() instanceof OAuth2User) {
                this.oAuth2UserHandler.accept((OAuth2User) authentication.getPrincipal());
            }
        }



        this.delegate.onAuthenticationSuccess(request, response,authentication);
    }

    public void setOAuth2UserHandler(Consumer<OAuth2User> oAuth2UserHandler) {
        this.oAuth2UserHandler = oAuth2UserHandler;
    }

    public Consumer<OAuth2User> getOAuth2UserHandler() {
        return oAuth2UserHandler;
    }

    public void setOidcUserHandler (Consumer<OidcUser> oidcUserHandler) {
        this.oidcUserHandler = oidcUserHandler;
    }

}
