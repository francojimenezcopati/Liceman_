package com.devForce.learning.model.dto;

import com.devForce.learning.model.entity.Role;
import com.devForce.learning.model.entity.Solicitud;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsuarioDTO {

    private long id;

    private String nombre, apellido, username, mail, phone;

    private Set<Role> roles;

    private boolean hasTeams;

}
