import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Admin } from '../pages/admin/Admin'
import { Mentor } from '../pages/mentor/Mentor'
import { User } from '../pages/user/User'
import { SolicitarCapacitacion } from '../pages/user/SolicitarCapacitacion'
import { VerLicencias } from '../pages/admin/VerLicencias'
import { Modal } from '../../app/components/Modal'
import { ModificarUsuario } from '../pages/user/ModificarUsuario'
import {CrearUsuario } from '../pages/admin/CrearUsuario'

export const DevForceRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/licencias' element={<VerLicencias />} />
        <Route path='/mentor' element={<Mentor />} />
        <Route path='/user' element={<User />} />"
        <Route path='/crear-soli' element={<SolicitarCapacitacion />} />"
        <Route path='/*' element={<Navigate to="/user" />} />
        <Route path='/Modal' element={<Modal/>} />
        <Route path='/ver-perfil' element={<ModificarUsuario/>} />
        <Route path='/Crear-usuario' element={<CrearUsuario/>} />
      </Routes>
    </>
  )
}
