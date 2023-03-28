package com.devForce.learning.controller;

import com.devForce.learning.model.dto.RespuestaDTO;
import com.devForce.learning.model.dto.UsuarioDTO;
import com.devForce.learning.model.entity.Solicitud;
import com.devForce.learning.model.entity.Usuario;
import com.devForce.learning.repository.UsuarioRepository;
import com.devForce.learning.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioService usuarioService;


    @GetMapping("/test/usuarios")
    public List<Usuario> allUsers() {
        return usuarioRepository
                .findAll()
                .stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/test/usuariosDTO")
    public List<UsuarioDTO> allUsersDTO() {
        return usuarioRepository.findAll().stream().map(usuarioService::crearUsuarioDTO).collect(Collectors.toList());
    }

    @GetMapping("/test/usuario")
    public ResponseEntity<Usuario> findById (@RequestParam Long id) throws Exception {
        Usuario user = usuarioRepository.findById(id).orElse(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PutMapping("/usuario/updatedatos")
    public ResponseEntity<RespuestaDTO> updateDatos (@RequestBody Usuario usuario) throws Exception {
        return usuarioService.updateDatos(usuario);
    }


}
