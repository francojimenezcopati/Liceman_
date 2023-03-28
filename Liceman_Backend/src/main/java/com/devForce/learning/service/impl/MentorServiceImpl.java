package com.devForce.learning.service.impl;

import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.entity.Solicitud;
import com.devForce.learning.model.entity.Usuario;
import com.devForce.learning.repository.SolicitudRepository;
import com.devForce.learning.repository.UsuarioRepository;
import com.devForce.learning.security.services.UserDetailsImpl;
import com.devForce.learning.service.MentorService;
import com.devForce.learning.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MentorServiceImpl implements MentorService {

    @Autowired
    SolicitudRepository solicitudRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioService usuarioService;

    public ResponseEntity<RespuestaDTO> aceptarSolicitud (Solicitud solicitud, Integer dias) {
        if (solicitud.getTipo().equalsIgnoreCase("UDEMY") || solicitud.getTipo().equalsIgnoreCase("OTRA PLATAFORMA")) {
            if(dias == null){
                return new ResponseEntity<>(new RespuestaDTO(false,"Se necesita ingresar el 'Tiempo Solicitado' por el mentor", null), HttpStatus.BAD_REQUEST);
            }
            return aceptarSolicitudPlataforma(solicitud, dias);
        }
        else if(solicitud.getTipo().equalsIgnoreCase("OTROS") || solicitud.getTipo().equalsIgnoreCase("ASESORAMIENTO")){
            return aceptarSolicitudSimple(solicitud);
        }
        else {
            return new ResponseEntity<>(new RespuestaDTO(false,"Tipo de solicitud incorrecta", null), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<RespuestaDTO> aceptarSolicitudPlataforma (Solicitud solicitud, int dias){
        solicitud.setTiempoSolicitado(dias);
        return validacionMentor(solicitud, "PENDIENTE-ADMIN", "Solicitud aceptada por mentor. Resta la resolución por parte de un Admin");
    }

    public ResponseEntity<RespuestaDTO> aceptarSolicitudSimple (Solicitud solicitud){
        return validacionMentor(solicitud, "ACEPTADA", "Solicitud aceptada");
    }

    public ResponseEntity<RespuestaDTO> rechazarSolicitud (Solicitud solicitud){
        return validacionMentor(solicitud, "DENEGADA", "Solicitud denegada");
    }

    public ResponseEntity<RespuestaDTO> devolverSolicitud (Solicitud solicitud){
        return validacionMentor(solicitud, "DEVUELTA-USER", "Solicitud devuelta al usuario");
    }

    private ResponseEntity<RespuestaDTO> validacionMentor (Solicitud solicitud, String estado, String mensaje){
        UserDetailsImpl mentor = usuarioService.obtenerUsuario();
        Usuario mentorUser = usuarioRepository.findById(mentor.getId()).orElse(null);
        if(!solicitud.getEstado().equalsIgnoreCase("PENDIENTE-MENTOR")){
            return new ResponseEntity<>(new RespuestaDTO(false,"Estado de solicitud incorrecto", null), HttpStatus.FORBIDDEN);
        }
        if(mentorUser==null || !mentorUser.getMentorArea().equalsIgnoreCase(solicitud.getArea())){
            return new ResponseEntity<>(new RespuestaDTO(false,"No se tienen permisos para resolver esta solicitud", null), HttpStatus.FORBIDDEN);
        }
        if(solicitudRepository.findById(solicitud.getId()).getUsuario().getId()== mentor.getId()){
            return new ResponseEntity<>(new RespuestaDTO(false,"Solicitud no puede ser resuelta por el mismo usuario que la creó", null), HttpStatus.FORBIDDEN);
        }
        solicitud.setApruebaMentorID(mentor.getId().intValue());
        solicitud.setEstado(estado);
        solicitudRepository.save(solicitud);
        return new ResponseEntity<>(new RespuestaDTO(true,mensaje, null), HttpStatus.OK);
    }


}
