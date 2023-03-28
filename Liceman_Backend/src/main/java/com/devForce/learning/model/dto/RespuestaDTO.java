package com.devForce.learning.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RespuestaDTO {

    private boolean ok;
    private String mensaje;
    private Object contenido;

}