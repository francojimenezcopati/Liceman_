package com.devForce.learning.controller;

import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.dto.authRequestDTO.LoginRequest;
import com.devForce.learning.model.dto.authRequestDTO.RegistroDTO;
import com.devForce.learning.security.jwt.JwtUtils;
import com.devForce.learning.service.AdminService;
import com.devForce.learning.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AdminService adminService;

  @Autowired
  UsuarioService usuarioService;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<RespuestaDTO> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return usuarioService.login(loginRequest);
  }

  @PostMapping("/signup")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<RespuestaDTO> registerUser(@Valid @RequestBody RegistroDTO registroDTO) {
    return adminService.crearUsuario(registroDTO);
  }

  @PostMapping("/signout")
  public ResponseEntity<RespuestaDTO> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new RespuestaDTO(true, "Usuario deslogueado", null));
  }
}
