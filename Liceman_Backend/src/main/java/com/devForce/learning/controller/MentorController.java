package com.devForce.learning.controller;

import com.devForce.learning.model.entity.Solicitud;
import com.devForce.learning.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Autowired
    MentorService mentorService;

    @PutMapping("/aceptarSolicitud")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<?> aceptarSolicitud(@RequestParam Solicitud solicitud, @RequestParam(required = false) Integer dias) throws Exception {
        return mentorService.aceptarSolicitud(solicitud, dias);
    }

    @PutMapping("/rechazarSolicitudPlataforma")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<?> rechazarSolicitudPlataforma(@RequestBody Solicitud solicitud) throws Exception {
        return mentorService.rechazarSolicitud(solicitud);
    }

    @PutMapping("/devolverSolicitudPlataforma")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<?> devolverSolicitudPlataforma(@RequestBody Solicitud solicitud) throws Exception {
        return mentorService.devolverSolicitud(solicitud);
    }
}
