package com.devForce.learning.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SolicitudDTO {

    private long id;

    private String tipo, descripcion, estado, area, link;

    private int apruebaMentorID, apruebaAdminID, tiempoSolicitado;

    private UsuarioDTO usuario;

}
