package com.devForce.learning.model.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString (exclude = { "solicitudes"})
@Table(name = "licencia")
public class Licencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "serie", length = 255)
    private String serie;

    @Column(name = "estado", length = 25)
    private String estado;

    @Column(name = "vencimiento")
    private LocalDate vencimiento;

    @Column(name = "plataforma", length = 25)
    private String plataforma;

    //Relación con solicitud
    @OneToMany(mappedBy="licencia", fetch=FetchType.EAGER)
    private List<Solicitud> solicitudes;


}
