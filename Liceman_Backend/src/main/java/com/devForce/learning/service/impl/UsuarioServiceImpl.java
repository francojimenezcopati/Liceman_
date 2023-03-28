package com.devForce.learning.service.impl;

import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.dto.UsuarioDTO;
import com.devForce.learning.model.dto.authRequestDTO.LoginRequest;
import com.devForce.learning.model.entity.Usuario;
import com.devForce.learning.repository.UsuarioRepository;
import com.devForce.learning.security.jwt.JwtUtils;
import com.devForce.learning.security.services.UserDetailsImpl;
import com.devForce.learning.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public ResponseEntity<RespuestaDTO> updateDatos(@Valid Usuario usuario) {

        UserDetailsImpl usuarioAuth = obtenerUsuario();
        Usuario updateUser = usuarioRepository.findByNombreAndApellido(usuario.getNombre(), usuario.getApellido());

        if(updateUser == null){
            return new ResponseEntity<>(new RespuestaDTO(false, "Usuario no existe", null),HttpStatus.BAD_REQUEST);
        }

        if(!(updateUser.getId()==usuarioAuth.getId() &&
                updateUser.getEmail()==usuarioAuth.getEmail() &&
                updateUser.getId()==usuarioAuth.getId())){
            return new ResponseEntity<>(new RespuestaDTO(false, "Usuario no existe", null),HttpStatus.BAD_REQUEST);
        }

        updateUser.setPhone(usuario.getPhone());
        updateUser.setEmail(usuario.getEmail());
        updateUser.setHasTeams(usuario.getHasTeams());
        updateUser.setPassword(encoder.encode(usuario.getPassword()));

        usuarioRepository.save(updateUser);
        Usuario contenido = usuarioRepository.findById(usuarioAuth.getId().intValue());

        return new ResponseEntity<>(new RespuestaDTO(true, "Datos Datos actualizados correctamente", contenido),HttpStatus.OK);

    }

    @Override
    public UsuarioDTO crearUsuarioDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setUsername(usuario.getUsername());
        dto.setMail(usuario.getEmail());
        dto.setPhone(usuario.getPhone());
        dto.setHasTeams(usuario.getHasTeams());
        dto.setRoles(usuario.getRoles());

        return dto;
    }


    @Override
    public UserDetailsImpl obtenerUsuario() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetail = (UserDetailsImpl) auth.getPrincipal();
        return userDetail;
    }

    @Override
    public ResponseEntity<RespuestaDTO> login(@Valid LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new RespuestaDTO(true, "logueado", userDetails));
    }
}
