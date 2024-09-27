package com.barbershop.agenda.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@Entity
@Table(name = "barbers")
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
public class Barber extends Person{

    private String status;

    public String toString() {
        return String.format("{ \"email\": \"%s\", \"name\": \"%s\", \"phoneNumber\": \"%s\", \"status\": \"%s\" }",
                this.getEmail(),
                this.getName(),
                this.getPhoneNumber(),
                this.getStatus());
    }

}
