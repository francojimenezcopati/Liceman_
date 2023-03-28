package com.devForce.learning.controller;

import com.devForce.learning.model.dto.SolicitudDTO;
import com.devForce.learning.model.enums.EMentorArea;
import com.devForce.learning.model.entity.Solicitud;
import com.devForce.learning.repository.SolicitudRepository;
import com.devForce.learning.repository.UsuarioRepository;
import com.devForce.learning.service.SolicitudService;
import com.devForce.learning.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SolicitudController {

    @Autowired
    SolicitudRepository solicitudRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    SolicitudService solicitudService;

    @Autowired
    UsuarioService usuarioService;


    // SOLO PARA TEST
    @GetMapping("/test/solicitudes")
    public List<Solicitud> allSolicitudes(){
        return solicitudRepository.findAll();
    }

    // SOLO PARA TEST
    @GetMapping("/test/solicitudesDTO")
    public List<SolicitudDTO> allSolicitudesDTO() {
        return new ArrayList<SolicitudDTO>(solicitudRepository.findAll().stream().map(solicitudService::crearSolicitudDTO).collect(Collectors.toList()));
    }

    @GetMapping("/solicitudesusuario")
    @PreAuthorize("hasRole('USUARIO')")
    public List<SolicitudDTO> solicitudesUsuario(){
        return solicitudService.solicitudesUsuario();
    }

    @GetMapping("/solicitudesmentor")
    @PreAuthorize("hasRole('MENTOR')")
    public List<SolicitudDTO> solicitudesMentor(){
        return solicitudService.solicitudesMentor();
    }

    @GetMapping("/solicitudesadmin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<SolicitudDTO> solicitudesAdmin() {
        return solicitudService.solicitudesAdmin();
    }

    @PostMapping("/nuevaSolicitud")
    @PreAuthorize("hasRole('USUARIO')")
    public ResponseEntity<?> nuevaSolicitud (@RequestBody Solicitud solicitud, Authentication authentication){
        return solicitudService.crearSolicitud(solicitud, authentication);
    }

    @GetMapping("/test/areas")
    public List<String> getAreas(){
        List<String> listaAreas= new ArrayList<>();
        for(EMentorArea name: EMentorArea.values()){
            listaAreas.add(name.toString());
        }
        return listaAreas;
    }

    @GetMapping("/test/tiposdesolicitudes")
    public List<String> getTiposDeSolicitudes(){
        List<String> listaAreas= new ArrayList<>();
        for(EMentorArea name: EMentorArea.values()){
            listaAreas.add(name.toString());
        }
        return listaAreas;
    }

}
