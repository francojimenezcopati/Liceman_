import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../../components/Modal'
import { PushNoti } from '../../components/PushNoti'
import { PushNotiSimple } from '../../components/PushNotiSimple'
import { TablaUsuarios } from "../../components/tables/TablaUsuarios"
import {UserContext} from '../../../UserContext'
import { useContext, useState, useEffect } from 'react'
import { triggerToast } from '../../components/PushNotiSimple'
import { Notificacion } from '../../components/Notificacion'
import { mostrarNoti } from '../../components/Notificacion'
import { NotificacionContext } from '../../../notificacionContext'

export const User = () => {
    // const {accion,coso}=status
    const{notificacion, setNotificacion} = useContext(NotificacionContext)
    const [accion, setAccion] = useState("")
    const [coso, setCoso] = useState("")
    const [texto, setTexto] = useState("")
    
    useEffect(() => {
        if(notificacion == "solicitud")
        {
            setAccion('creada')
            setCoso('Solicitud')
            setTexto('exitosamente')
            mostrarNoti(1)
            setNotificacion("0")
        }
        if(notificacion == "modificado")
        {
            setAccion('modificado')
            setCoso('Usuario')
            setTexto('exitosamente')
            mostrarNoti(1)
            setNotificacion("0")
        }
    }, []);

    return (
        <>
            <div className='container-fluid'>
                <h2 className='text-center mt-5 mb-5'>Historial de Solicitudes</h2>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-md-10">
                        <TablaUsuarios />
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-4 col-sm-7 col-md-7 col-lg-8"></div>
                    <div className="col-8 col-sm-5 col-md-4 col-lg-3"><Link to="/crear-soli"><button className='btn btn-dark w-100' >Generar solicitud</button></Link></div>
                    <div className="col"></div>
                </div>
            </div>
            < Notificacion accion={accion} coso={coso} texto={texto}/>
            {/* Ejemplo modal (revisar si se importa el modal)*/}
            {/* <Modal titulo="Titulo" accion="Aprobar" usuario="Nombre Apellido" tipoSoli="Udemy" descripcion="Lorem ipsum dolor asodjh asoudhkasbd oaqijwdh" /> */}

            {/* <PushNoti accion="asignada" serial={1234567} /> */}
            {/* <PushNotiSimple accion='rechazada' coso='Solicitud' /> */}
        </>
    )
}
