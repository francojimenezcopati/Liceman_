package com.devForce.learning.service.impl;

import com.devForce.learning.model.dto.LicenciaDTO;
import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.dto.SolicitudDTO;
import com.devForce.learning.model.dto.UsuarioDTO;
import com.devForce.learning.model.dto.authRequestDTO.RegistroDTO;
import com.devForce.learning.model.entity.*;
import com.devForce.learning.model.enums.ERole;
import com.devForce.learning.repository.LicenciaRepository;
import com.devForce.learning.repository.RoleRepository;
import com.devForce.learning.repository.SolicitudRepository;
import com.devForce.learning.repository.UsuarioRepository;
import com.devForce.learning.security.jwt.JwtUtils;
import com.devForce.learning.security.services.UserDetailsImpl;
import com.devForce.learning.service.AdminService;
import com.devForce.learning.service.SolicitudService;
import com.devForce.learning.service.UsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    SolicitudRepository solicitudRepository;

    @Autowired
    LicenciaRepository licenciaRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    SolicitudService solicitudService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    /** Intenta crear un usuario a partir de un objeto usuario que viene del front
    @Param Usuario
     */
    @Override
    public ResponseEntity<RespuestaDTO> crearUsuario(RegistroDTO registroDTO) {
        if (usuarioRepository.existsByUsername(registroDTO.getUsername())) {
            return new ResponseEntity<>(new RespuestaDTO(false,"Usuario Ya Existe", null), HttpStatus.BAD_REQUEST);
        }

        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            return new ResponseEntity<>(new RespuestaDTO(false,"Email ya se encuentra en uso", null), HttpStatus.BAD_REQUEST);
        }

        // Create new user's account
        Usuario user = new Usuario(
                registroDTO.getNombre(),
                registroDTO.getApellido(),
                registroDTO.getUsername(),
                registroDTO.getEmail(),
                encoder.encode(registroDTO.getPassword()),
                registroDTO.getPhone(),
                registroDTO.getHasTeams(),
                registroDTO.getMentorArea());

        Set<String> strRoles = registroDTO.getRole();
        Set<Role> roles = new HashSet<>();
        AtomicInteger mentorAreaIsMissing= new AtomicInteger();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USUARIO)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mentor":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MENTOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        Role userRoleMentor = roleRepository.findByName(ERole.ROLE_USUARIO)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRoleMentor);
                        if(registroDTO.getMentorArea()==null){
                            mentorAreaIsMissing.getAndIncrement();
                        }

                        break;
                    default:
                        Role defaultRole = roleRepository.findByName(ERole.ROLE_USUARIO)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(defaultRole);
                }
            });
        }
        if(mentorAreaIsMissing.get() ==1){
            return new ResponseEntity<>(new RespuestaDTO(false,"Falta definir un area para el mentor", null), HttpStatus.BAD_REQUEST);
        }

        user.setRoles(roles);
        usuarioRepository.save(user);
        UsuarioDTO contenido = usuarioService.crearUsuarioDTO(usuarioRepository.findByUsername(user.getUsername()).orElse(null));
        if (contenido == null){
            return new ResponseEntity<>(new RespuestaDTO(false,"Usuario no se registró correctamente", null), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new RespuestaDTO(true,"Usuario creado!",contenido),HttpStatus.OK);
    }

    /**Intenta asignar una licencia a una solicitud.
     * Si el usuario ya tiene una solicitud con licencia activa del mismo tipo de solicitud, se le extiende el tiempo
     * de la licencia que ya tiene asignada
     @Param Solicitud
     */
    @Override
    public ResponseEntity<?> asignarLicencia(Solicitud solicitud) {

        UserDetailsImpl admin = usuarioService.obtenerUsuario();

        if(!solicitud.getEstado().equals("PENDIENTE-ADMIN")){
            return new ResponseEntity<>(new RespuestaDTO(false,"Estado de solicitud incorrecto", null), HttpStatus.FORBIDDEN);
        }
        // Se buscan solicitudes aceptadas del mismo tipo de solicitud
        // verificar que la licencia no esté vencida. Si ya tiene una licencia activa, se extiende el tiempo de la misma
        List<Solicitud> solicitudesAceptadas = solicitudRepository.findByUsuarioAndTipoAndEstado(solicitud.getUsuario(), solicitud.getTipo(), "ACEPTADA");
            for (Solicitud solicitudAux : solicitudesAceptadas){
                if(solicitudAux.getLicencia().getEstado()!="DISPONIBLE"){
                    if (!solicitudAux.getLicencia().getVencimiento().isBefore(LocalDate.now())) {
                        return darLicencia(solicitud,solicitudAux);
                    }
                }
            }
        return darLicencia(solicitud,null);
    }

    /**Asigna una licencia a una solicitud
     * solicitudAux se utiliza para los casos donde hay que extender una licencia ya asignada al usuario.
     @Param Solicitud solicitud
     @Param Solicitud solicitudAux
     */
    private ResponseEntity<?> darLicencia (Solicitud solicitud, Solicitud solicitudAux){

        UserDetailsImpl admin = usuarioService.obtenerUsuario();

        Licencia licencia;
        HttpStatus httpStatus = HttpStatus.CREATED;
        String mensaje;

        if (solicitudAux!=null){
            licencia = solicitudAux.getLicencia();
            httpStatus = HttpStatus.OK;
            mensaje = "Serial de licencia asignada: "+ licencia.getSerie();
        }
        else {
            licencia = licenciaRepository.findFirstByEstadoOrderById("DISPONIBLE");
            mensaje = "Serial de licencia extendida: "+ licencia.getSerie();
        }

        solicitud.setLicencia(licencia);
        solicitud.setEstado("ACEPTADA");
        solicitud.setApruebaAdminID(admin.getId().intValue());
        solicitudRepository.save(solicitud);
        licencia.setEstado("ASIGNADA");
        asignarTiempo(solicitud);
        licenciaRepository.save(licencia);

        SolicitudDTO contenido= solicitudService.crearSolicitudDTO(solicitudRepository.findById(solicitud.getId()));

        RespuestaDTO respuestaDTO = new RespuestaDTO();
        respuestaDTO.setMensaje(mensaje);
        respuestaDTO.setContenido(contenido);
        respuestaDTO.setOk(true);

        return new ResponseEntity<>(respuestaDTO, httpStatus);
    }

    /** Le asigna el tiempo designado en la solicitud por el mentor a una licencia.
     * Si el usuario ya tiene una licencia que no expiró, se le extenderá el tiempo designado en la solicitud a la licencia
     * que ya posee asignada.
     @Param Solicitud solicitud
     */
    private void asignarTiempo(Solicitud solicitud){
        Licencia licenciaActual = licenciaRepository.findById(solicitud.getLicencia().getId());
        if(solicitud.getLicencia().getVencimiento()==null){
            licenciaActual.setVencimiento(LocalDate.now().plusDays(solicitud.getTiempoSolicitado()));
        }
        else{
            licenciaActual.setVencimiento(licenciaActual.getVencimiento().plusDays(solicitud.getTiempoSolicitado()));
        }
    }

    public List<LicenciaDTO> getLicencias (){
        List<Licencia> listaLicencias = licenciaRepository.findAll();
        return listaLicencias
                .stream()
                .map(this::crearLicenciaDTO)
                .collect(Collectors.toList());
    }

    private LicenciaDTO crearLicenciaDTO(Licencia licencia) {
        return new LicenciaDTO(licencia.getId(),
                licencia.getSerie(),
                licencia.getEstado(),
                licencia.getPlataforma(),
                licencia.getVencimiento(),
                licencia.getSolicitudes().stream().map(solicitud -> solicitudService.crearSolicitudDTO(solicitud)).collect(Collectors.toList()));

    }

    @Override
    public ResponseEntity<RespuestaDTO> revocarLicencia(Licencia licencia) {
        Licencia licenciaEnBase = licenciaRepository.findBySerie(licencia.getSerie());

        if(licenciaEnBase.getEstado()=="DISPONIBLE"){
            return new ResponseEntity<RespuestaDTO>(new RespuestaDTO(
                    false,
                    "La licencia '" + licenciaEnBase.getSerie() + "' ya se encuentra disponible",
                    null), HttpStatus.BAD_REQUEST);
        }
        licenciaEnBase.setEstado("DISPONIBLE");
        licenciaEnBase.setVencimiento(null);
        licenciaRepository.save(licenciaEnBase);

        return new ResponseEntity<RespuestaDTO>(new RespuestaDTO(true, "Licencia revocada", null), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<RespuestaDTO> reservarLicencia(Licencia licencia) {
        Licencia licenciaEnBase = licenciaRepository.findBySerie(licencia.getSerie());

        if(licenciaEnBase.getEstado()!="DISPONIBLE"){
            return new ResponseEntity<RespuestaDTO>(new RespuestaDTO(
                    false,
                    "La licencia '" + licenciaEnBase.getSerie() + "' no se encuentra disponible para reservar",
                    null), HttpStatus.BAD_REQUEST);
        }

        licenciaEnBase.setEstado("RESERVADA");
        licenciaRepository.save(licenciaEnBase);

        return new ResponseEntity<RespuestaDTO>(new RespuestaDTO(true, "Licencia reservada", null), HttpStatus.OK);

    }

    @Override
    public ResponseEntity<RespuestaDTO> rechazarSolicitudAdmin(Solicitud solicitud) {
        UserDetailsImpl admin = usuarioService.obtenerUsuario();
        Usuario adminUser = usuarioRepository.findById(admin.getId()).orElse(null);
        if(!solicitud.getEstado().equalsIgnoreCase("PENDIENTE-ADMIN")||(solicitud.getApruebaMentorID()==0)){
            return new ResponseEntity<>(new RespuestaDTO(false,"Estado de solicitud incorrecto", null), HttpStatus.FORBIDDEN);
        }
        solicitud.setApruebaAdminID(admin.getId().intValue());
        solicitud.setEstado("DENEGADA");
        solicitudRepository.save(solicitud);
        return new ResponseEntity<>(new RespuestaDTO(true,"Solicitud Rechazada por Admin", null), HttpStatus.OK);
    }


}
