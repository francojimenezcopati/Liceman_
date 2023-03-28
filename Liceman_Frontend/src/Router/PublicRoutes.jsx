import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
export const PublicRoutes = ({ children }) => {
  const { status } = useContext(UserContext)
  const { statusLog } = status;
  const { rolA } = status;
  let rol = rolA
  switch (rolA) {
    case 'ROLE_USUARIO': rol = '/user'; break;
    case 'ROLE_MENTOR': rol = '/mentor'; break;
    case 'ROLE_ADMIN': rol = '/admin'; break
    default: rol = '';
  }
  return (
    (!statusLog)
      ?
      children : <Navigate to={rol} />
  )
}
