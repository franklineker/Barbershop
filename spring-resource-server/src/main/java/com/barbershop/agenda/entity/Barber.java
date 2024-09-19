package com.barbershop.agenda.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "barbers")
public class Barber extends Person{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}
