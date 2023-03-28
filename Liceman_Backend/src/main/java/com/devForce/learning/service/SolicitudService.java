package com.devForce.learning.service;

import com.devForce.learning.model.dto.SolicitudDTO;
import com.devForce.learning.model.entity.Solicitud;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface SolicitudService {

    ResponseEntity<?> crearSolicitud(Solicitud solicitud, Authentication authentication);

    ResponseEntity<?> getTiposDeSolicitud();

    ResponseEntity<?> getAreasDeSolicitud();

    List<SolicitudDTO> solicitudesUsuario();

    List<SolicitudDTO> solicitudesMentor();

    List<SolicitudDTO> solicitudesAdmin();

    SolicitudDTO crearSolicitudDTO(Solicitud solicitud);
}
