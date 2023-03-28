import { useEffect,useState } from 'react'
import { PushNotiSimple } from './PushNotiSimple'
import { PushNoti } from './PushNoti'
import { triggerToast } from './PushNotiSimple'
import { triggerToastPushNoti } from './PushNoti'
import { useForm } from '../../customHooks/useForm'

export const Modal=({ accion,titulo,usuario,tipoSoli,descripcion,mail,plataforma,fechaExpir,serialLic,mentorAsign,adminAsign,coso,soli,mensajeSerial,apiFetch,apiFetchAdmin,apiFetchRevocar, role, sendUsuario }) => {

    const { formState,onInputChange }=useForm({
        numeroDias: ""
    })

    const funcionesModal=(accion) => {
        if (accion == "Asignar"){
            apiFetchAdmin(accion,soli)
        }
        if (accion == "Rechazar"){
            if(coso == 'Solicitud'){
                apiFetch(accion,soli);
            }
            if(coso == 'SolicitudAdmin'){
                apiFetchAdmin(accion,soli);
            }
        }
        if (accion == "Aprobar"){
            apiFetch(accion,soli,numeroDias);
        }
        if (accion == "Revocar" || accion == "Reservar"){
            apiFetchRevocar(accion,serialLic);
        }
        if (accion == "Devolver"){
            apiFetch(accion, soli);
        }
        if (accion == 'Crear'){
            sendUsuario()
        }
    }

    const funcionesNotificacion=(accion)=>{
        // if (accion == "Asignar"){
        //     triggerToastPushNoti();
        // }
        // if (accion == "RechazarMentor"){
        //     triggerToast();
        // }
        // if (accion == "RechazarAdmin"){
        //     triggerToast();
        // }
        // if (accion == "Aprobar"){
        //     triggerToast();
        // }
        // if (accion == "Revocar" || accion == "Reservar"){
        //     triggerToast();
        // }
        // if (accion == "Devolver"){
        //     triggerToast();
        // }
    }

    const { numeroDias }=formState
    return (
        <>
            {/* Boton para Porbar el modal!!!!!!! */}
            {/*<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aprobSoli">
                Probar Modal
            </button>*/}
            <div className="modal fade" id="aprobSoli" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content modal-class1">
                        <div className="modal-body modal-styles">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className='text-center mt-3'>{titulo}</h1>
                                    </div>
                                </div>
                                {
                                    role&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Tipo de usuario:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{role}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    usuario&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Usuario:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{usuario}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    tipoSoli&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Tipo de solicitud:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{tipoSoli}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    descripcion&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Descripcion:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{descripcion}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    mail&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Mail:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{mail}</p></div>
                                            </div>
                                        </>
                                    )

                                }
                                {
                                    plataforma&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Plataforma:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{plataforma}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    fechaExpir&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Fecha de expiración:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{fechaExpir}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    serialLic&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Serial:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{serialLic}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    mentorAsign&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Mentor asignado:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{mentorAsign}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    adminAsign&&(
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Admin asignado:</h5></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 text-center"><p>{adminAsign}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    accion=="Aprobar"? (soli.tipo=="Udemy"||soli.tipo=="Otra plataforma"|| soli.tipo=="UDEMY"||soli.tipo=="OTRA PLATAFORMA")? (
                                        <>
                                            <div className="row">
                                                <div className="col-12 mt-3 text-center"><h5>Dias a completar el curso:</h5></div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <input type="number" className="col-12 text-center input w-75" placeholder='Ej: 10' name='numeroDias' value={numeroDias} onChange={onInputChange} />
                                            </div>
                                        </>
                                    ):null:null

                                }
                            </div>
                            {
                                //En caso de que no haya accion, 1 solo boton de volver (Modal solicitud de licencia)
                                accion? ( accion=="Crear"?(
                                            <div className="d-flex mt-3 justify-content-around">
                                                <div className="mt-3"><button type="button" className="btn btn-outline-dark w-100 mb-3 me-2" data-bs-dismiss="modal">Cancelar</button></div>
                                                <div className="mt-3"><button type="button" className="btn btn-dark w-100 mb-3 ms-2" id="liveToastBtn" data-bs-dismiss="modal" onClick={()=>{funcionesModal(accion)}} >{accion}</button> </div>
                                            </div>
                                        )
                                            :(
                                            <div className="d-flex mt-3 justify-content-around">
                                                <div className="mt-3"><button type="button" className="btn btn-outline-dark w-100 mb-3 me-2" data-bs-dismiss="modal">Cancelar</button></div>
                                                <div className="mt-3"><button type="button" className="btn btn-dark w-100 mb-3 ms-2" id="liveToastBtn" data-bs-dismiss="modal" onClick={() => {  funcionesModal(accion); funcionesNotificacion(accion)}} >{accion}</button> </div>
                                            </div>
                                            )
                                )
                                    :(
                                        <div className="row">
                                            <div className="col"></div>
                                            <div className="col-10"><button type="button" className="btn btn-outline-dark w-100 mb-3 me-2" data-bs-dismiss="modal">Volver</button></div>
                                            <div className="col"></div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <PushNotiSimple accion={accion} coso={coso} />
            <PushNoti accion={accion} serial={mensajeSerial}/>
        </>
    )
}