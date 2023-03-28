package com.devForce.learning.repository;

import com.devForce.learning.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findById(long id);

    Usuario findByNombreAndApellido (String nombre, String Apellido);

    Optional<Usuario> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String mail);

}
