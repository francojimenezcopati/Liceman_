import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from '../Auth/Routes/AuthRoutes';
import { DevForceRoutes } from '../app/Routes/DevForceRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { UserContext } from '../UserContext';
import { NotificacionContext } from '../notificacionContext';

export const AppRouter = () => {
  const [status, setstatus] = useState({});
  const [notificacion, setNotificacion] = useState({});

  return (
    <>
      <UserContext.Provider value={{ status, setstatus }}  >
      <NotificacionContext.Provider value={{notificacion, setNotificacion }}>
        <Routes>
          {/* Login */}
          <Route path='/Auth/*' element={
            <PublicRoutes>
              <AuthRoutes />
            </PublicRoutes>
          }
          />
          {/* DevForceApp */}
          <Route path='/*' element={
            <PrivateRoutes>
              <DevForceRoutes />
            </PrivateRoutes>
          }
          />
        </Routes>
      </NotificacionContext.Provider>
      </UserContext.Provider>
    </>
  )
}