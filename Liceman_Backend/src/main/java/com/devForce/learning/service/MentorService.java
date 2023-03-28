package com.devForce.learning.service;

import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.entity.Solicitud;
import org.springframework.http.ResponseEntity;

public interface MentorService {

    ResponseEntity<RespuestaDTO> aceptarSolicitudPlataforma (Solicitud solicitud, int dias);

    ResponseEntity<RespuestaDTO> rechazarSolicitud (Solicitud solicitud);

    ResponseEntity<RespuestaDTO> devolverSolicitud (Solicitud solicitud);

    ResponseEntity<RespuestaDTO> aceptarSolicitudSimple (Solicitud solicitud);

    ResponseEntity<RespuestaDTO> aceptarSolicitud (Solicitud solicitud, Integer dias);



    }
