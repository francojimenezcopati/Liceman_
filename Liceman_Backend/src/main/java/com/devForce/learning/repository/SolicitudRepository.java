package com.devForce.learning.repository;


import com.devForce.learning.model.entity.Solicitud;
import com.devForce.learning.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitudRepository extends JpaRepository<Solicitud,Long> {

    Solicitud findById (long Id);

    List<Solicitud> findByUsuario (Usuario usuario);

    List<Solicitud> findByUsuarioNotAndArea (Usuario usuario, String area);

    List<Solicitud> findByUsuarioAndTipoAndEstado (Usuario usuario, String tipo, String estado);

}
