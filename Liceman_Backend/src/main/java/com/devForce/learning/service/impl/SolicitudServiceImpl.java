package com.devForce.learning.service.impl;

import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.dto.SolicitudDTO;
import com.devForce.learning.model.entity.Solicitud;
import com.devForce.learning.model.entity.Usuario;
import com.devForce.learning.repository.SolicitudRepository;
import com.devForce.learning.repository.UsuarioRepository;
import com.devForce.learning.security.services.UserDetailsImpl;
import com.devForce.learning.service.SolicitudService;
import com.devForce.learning.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitudServiceImpl implements SolicitudService {

    @Autowired
    SolicitudRepository solicitudRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioService usuarioService;


    @Override
    public ResponseEntity<?> crearSolicitud(@Valid Solicitud solicitud, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Usuario usuario = usuarioRepository.findById(userDetails.getId()).get();
        Solicitud newSolicitud = new Solicitud(
                solicitud.getTipo(),
                solicitud.getDescripcion(),
                solicitud.getArea(),
                solicitud.getLink(),
                usuario
                );

        if((solicitud.getTipo().equalsIgnoreCase("UDEMY") || solicitud.getTipo().equalsIgnoreCase("OTRA PLATAFORMA")) &&
        solicitud.getLink()==null){
            return new ResponseEntity<>(new RespuestaDTO(
                    false,
                    "Para este tipo de solicitud se requiere link. Si no lo tenés, crea una solicitud de tipo asesoramiento",
                    null),
                    HttpStatus.BAD_REQUEST);
        }

        RespuestaDTO respuestaDTO = new RespuestaDTO();
        newSolicitud.setEstado("PENDIENTE-MENTOR");
        solicitudRepository.save(newSolicitud);
        respuestaDTO.setOk(true);
        respuestaDTO.setMensaje("Solicitud Creada");
        respuestaDTO.setContenido(solicitud);

        return new ResponseEntity<>(respuestaDTO, HttpStatus.OK);
    }

    // TODO: Terminar getTiposDeSolicitud() y getAreasDeSolicitud
    @Override
    public ResponseEntity<?> getTiposDeSolicitud() {
        return null;
    }

    @Override
    public ResponseEntity<?> getAreasDeSolicitud() {
        return null;
    }

    @Override
    public List<SolicitudDTO> solicitudesUsuario() {
        UserDetailsImpl usuarioAuth = usuarioService.obtenerUsuario();
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioAuth.getId());
        return new ArrayList<>(solicitudRepository.findByUsuario(usuario.get())
                .stream().map(sol -> crearSolicitudDTO(sol)).collect(Collectors.toList()));
    }

    @Override
    public List<SolicitudDTO> solicitudesMentor(){
        UserDetailsImpl usuarioAuth = usuarioService.obtenerUsuario();
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioAuth.getId());
        return new ArrayList<>(solicitudRepository.findByUsuarioNotAndArea(usuario.get(),usuario.get().getMentorArea())
                .stream().map(sol -> crearSolicitudDTO(sol)).collect(Collectors.toList()));
    }

    @Override
    public List<SolicitudDTO> solicitudesAdmin(){
        return new ArrayList<SolicitudDTO>(solicitudRepository.findAll().stream().map(sol->crearSolicitudDTO(sol)).collect(Collectors.toList()));
    }

    @Override
    public SolicitudDTO crearSolicitudDTO(Solicitud solicitud) {

        SolicitudDTO dto = new SolicitudDTO();
        dto.setId(solicitud.getId());
        dto.setDescripcion(solicitud.getDescripcion());
        dto.setEstado(solicitud.getEstado());
        dto.setTipo(solicitud.getTipo());
        dto.setApruebaAdminID(solicitud.getApruebaAdminID());
        dto.setApruebaMentorID(solicitud.getApruebaMentorID());
        dto.setTiempoSolicitado(solicitud.getTiempoSolicitado());
        dto.setArea(solicitud.getArea());
        dto.setLink(solicitud.getLink());
        dto.setUsuario(usuarioService.crearUsuarioDTO(solicitud.getUsuario()));

        return dto;
    }



}
