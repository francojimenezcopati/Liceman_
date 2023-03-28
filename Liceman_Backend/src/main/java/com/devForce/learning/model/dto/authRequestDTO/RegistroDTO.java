package com.devForce.learning.model.dto.authRequestDTO;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
public class RegistroDTO {

    @NotBlank
    @Size(min = 3, max = 50)
    private String nombre;

    @NotBlank
    @Size(min = 3, max = 50)
    private String apellido;

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @Size(max = 50)
    @Email
    private String email;


    private Set<String> role;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    private String phone;

    private Boolean hasTeams;

    private String mentorArea;

}
