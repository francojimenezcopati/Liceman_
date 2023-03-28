import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../../components/Modal'
import { PushNoti } from '../../components/PushNoti'
import { PushNotiSimple } from '../../components/PushNotiSimple'
import { TablaRevocar } from '../../components/tables/TablaRevocar'
import { TablaUsuarios } from "../../components/tables/TablaUsuarios"

export const VerLicencias = () => {
    return (
        <>
            <div className='container-fluid'>
                <h2 className='text-center mt-5 mb-5'>Revocar Licencias</h2>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-md-10">
                        <TablaRevocar />
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-4 col-sm-7 col-md-7 col-lg-8"></div>
                    <div className="col-8 col-sm-5 col-md-4 col-lg-3"><Link to="/admin"><button className='btn btn-dark w-100' >Volver</button></Link></div>
                    <div className="col"></div>
                </div>
            </div>

            {/* Ejemplo modal (revisar si se importa el modal)*/}
            {/* <Modal titulo="Titulo" accion="Aprobar" usuario="Nombre Apellido" tipoSoli="Udemy" descripcion="Lorem ipsum dolor asodjh asoudhkasbd oaqijwdh" /> */}

            {/* <PushNoti accion="asignada" serial={1234567} /> */}
            {/* <PushNotiSimple accion='rechazada' coso='Solicitud' /> */}
        </>
    )
}