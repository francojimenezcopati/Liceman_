import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
export const PrivateRoutes = ({ children }) => {
  const { status } = useContext(UserContext)
  const { statusLog } = status
  // CONDICION PARA EL LOGIN CAMBIA EL LOGGED
  return (
    (statusLog)
      ?
      children : <Navigate to='/Auth/login' />
  )
}