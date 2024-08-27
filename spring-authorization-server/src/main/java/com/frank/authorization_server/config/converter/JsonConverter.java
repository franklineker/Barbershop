package com.frank.authorization_server.config.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

public class JsonConverter<T> implements AttributeConverter<Set<T>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Set<T> attribute) {
        if (attribute == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting set to JSON string", e);
        }
    }

    @Override
    public Set<T> convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        try {
            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(Set.class, AuthorizationGrantType.class));
        } catch (IOException e) {
            throw new RuntimeException("Error converting JSON string to set", e);
        }
    }
}

//@Converter
//public class AuthorizationGrantTypeConverter extends JsonConverter<AuthorizationGrantType> {}

//@Converter
//public class ClientAuthenticationMethodConverter extends JsonConverter<ClientAuthenticationMethod> {}

