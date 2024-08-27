package com.frank.authorization_server.config.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import java.util.Set;
import java.util.stream.Collectors;
@Converter
public class ClientAuthenticationMethodConverter extends JsonConverter<ClientAuthenticationMethod> {}
//public class ClientAuthenticationMethodConverter implements AttributeConverter<Set<ClientAuthenticationMethod>, Set<String>> {
//    @Override
//    public Set<String> convertToDatabaseColumn(Set<ClientAuthenticationMethod> attributes) {
//        return attributes == null ? null : attributes.stream()
//                .map(method -> method.getValue())
//                .collect(Collectors.toSet());
//    }
//
//    @Override
//    public Set<ClientAuthenticationMethod> convertToEntityAttribute(Set<String> dbData) {
//        return dbData == null ? null : dbData.stream()
//                .map(string -> new ClientAuthenticationMethod(string))
//                .collect(Collectors.toSet());
//    }
//}
