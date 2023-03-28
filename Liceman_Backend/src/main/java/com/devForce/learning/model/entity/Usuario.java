package com.devForce.learning.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"password", "phone", "hasTeams", "solicitudes"} )
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", length = 50, nullable = false)
    private String nombre;

    @Column(name = "lastname", length = 50, nullable = false)
    private String apellido;

    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "hasTeams")
    private Boolean hasTeams;

    // TODO utilizar el EMentorArea para realizar la relación. Enviar al front por API para la validación de formularios, o coordinar con front.
    @Column(name = "mentorArea", length = 25)
    private String mentorArea;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    //Relación con solicitud
    @OneToMany(mappedBy="usuario", fetch=FetchType.EAGER)
    private List<Solicitud> solicitudes;

    @JsonIgnore
    public List<Solicitud> getSolicitudes() {
        return solicitudes;
    }



   public Usuario(String nombre, String apellido, String username, String email, String password, String phone, Boolean hasTeams, String mentorArea) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.hasTeams = hasTeams;
        this.mentorArea = mentorArea;
    }

   public Usuario(String nombre, String apellido, String username, String email, String password, String phone, Boolean hasTeams, Set<Role> roles) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.hasTeams = hasTeams;
        this.roles = roles;
    }

}
