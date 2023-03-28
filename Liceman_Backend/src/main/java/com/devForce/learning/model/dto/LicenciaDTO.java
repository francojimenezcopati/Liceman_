package com.devForce.learning.model.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LicenciaDTO {

    private long id;

    private String serie, estado, plataforma;

    private LocalDate vencimiento;

    private List<SolicitudDTO> solicitudes;

}
