package com.devForce.learning.service;

import com.devForce.learning.model.dto.LicenciaDTO;
import com.devForce.learning.model.entity.Licencia;
import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.dto.authRequestDTO.RegistroDTO;
import com.devForce.learning.model.entity.Solicitud;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;


public interface AdminService {

    ResponseEntity<RespuestaDTO> crearUsuario(RegistroDTO registroDTO);

    ResponseEntity<?> asignarLicencia(Solicitud solicitud);

    List<LicenciaDTO> getLicencias ();

    ResponseEntity<RespuestaDTO> revocarLicencia(Licencia licencia);

    ResponseEntity<RespuestaDTO> reservarLicencia(Licencia licencia);

    ResponseEntity<RespuestaDTO> rechazarSolicitudAdmin(Solicitud solicitud);

}
