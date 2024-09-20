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
public class Barber extends Person{


}
