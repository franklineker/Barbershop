package com.frank.authorization_server.config.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.security.oauth2.core.AuthorizationGrantType;

import java.util.Set;
import java.util.stream.Collectors;
@Converter
public class AuthorizationGrantTypeConverter extends JsonConverter<AuthorizationGrantType> {}
//public class AuthorizationGrantTypeConverter implements AttributeConverter<Set<AuthorizationGrantType>, Set<String>> {
//    @Override
//    public Set<String> convertToDatabaseColumn(Set<AuthorizationGrantType> attribute) {
//        return attribute == null ? null : attribute
//                .stream()
//                .map(gt -> gt.getValue())
//                .collect(Collectors.toSet());
//    }
//
//    @Override
//    public Set<AuthorizationGrantType> convertToEntityAttribute(Set<String> dbData) {
//        return dbData == null ? null : dbData
//                .stream()
//                .map(string -> new AuthorizationGrantType(string))
//                .collect(Collectors.toSet());
//    }
//}