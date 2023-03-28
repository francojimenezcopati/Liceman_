import { useEffect,useState, useContext } from 'react'
import { sortTable,expandRow } from './functions/auxFunctions'
import { Modal } from '../Modal'
import { Notificacion } from '../Notificacion'
import { mostrarNoti } from '../Notificacion'
import { NotificacionContext } from '../../../notificacionContext'
import { mostrarNotiSerial, NotificacionSerial } from '../NotificacionSerial'

export const TablaAdmin = () => {
    const{notificacion, setNotificacion} = useContext(NotificacionContext)
    const [accionNoti, setAccionNoti] = useState("")
    const [cosoNoti, setCosoNoti] = useState("")
    const [textoNoti, setTextoNoti] = useState("")
    const [accionNotiSerial, setAccionNotiSerial] = useState("")
    const [serialNoti, setSerialNoti] = useState("")

    const apiFetchAdmin=async (accion,soli) => {
        try {
            let ruta;
            if (accion=="Asignar") {
                ruta="asignarLicencia"
            }
            if (accion=="Rechazar") {
                ruta="rechazarSolicitudAdmin"
            }
            const data=await
                fetch(`http://localhost:8080/api/admin/${ruta}`,{
                    mode: 'cors',
                    method: "POST",
                    body: JSON.stringify(soli),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Cache': 'no-cache',
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    },
                    credentials: 'include',
                })
                    .then(resp => resp.json())
                setMensajeSerial(data.mensaje)
                setUpdateSolis(data)
                if(data.mensaje == "LICENCIA DENEGADA. No hay licencias disponibles por el momento.")
                {
                    setAccionNoti('disponibles')
                    setCosoNoti('No hay licencias')
                    setTextoNoti('')
                    mostrarNoti(1)
                }
                if(accion == "Rechazar")
                {
                    setAccionNoti('rechazada')
                    setCosoNoti('Solicitud')
                    setTextoNoti('exitosamente')
                    mostrarNoti(1)
                }
                if(accion == 'Asignar')
                {
                    if(data.mensaje == "LICENCIA RENOVADA"){setAccionNotiSerial('renovada')}
                    if(data.mensaje == "LICENCIA ASIGNADA"){setAccionNotiSerial('asignada')}
                    setSerialNoti(data.contenido.serie)
                    mostrarNotiSerial(1)
                }     
        } catch (error) {
            console.log({ error });
        }
    }

    const [dirSort0,setDirSort0]=useState("asc")
    const [dirSort2,setDirSort2]=useState("asc")
    const [solicitudes,setSolicitudes]=useState([])
    const [accion,setAccion]=useState("")
    const [titulo,setTitulo]=useState("")
    const [usuario,setUsuario]=useState("")
    const [tipoSoli,setTipoSoli]=useState("")
    const [descripcion,setDescripcion]=useState("")
    const [coso,setCoso]=useState("")
    const [soli,setSoli]=useState({})

    const [updateSolis, setUpdateSolis] = useState("")
    const [mensajeSerial, setMensajeSerial] = useState("")

    useEffect(() => {
        getSolicitudes(setSolicitudes)
        if(notificacion == "modificado")
        {
            setAccionNoti('modificado')
            setCosoNoti('Usuario')
            setTextoNoti('exitosamente')
            mostrarNoti(1)
            setNotificacion("0")
        }
        if(notificacion == "creado")
        {
            setAccionNoti('creado')
            setCosoNoti('Usuario')
            setTextoNoti('exitosamente')
            mostrarNoti(1)
            setNotificacion("0")
        }
    },[updateSolis])

    const getSolicitudes=async (setSolicitudes) => {
        try {
            const data=await

                fetch('http://localhost:8080/api/solicitudesadmin',{
                    mode: 'cors',
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Cache': 'no-cache',
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    },
                    credentials: 'include',
                })
                    .then(resp => resp.json())
            setSolicitudes(data)
        } catch (error) {
            console.log({ error });
        }
    }

    const xmark=(usuario,tipoSoli,descripcion,soli) => {
        setAccion("Rechazar");
        setTitulo("Rechazar Solicitud");
        setCoso("SolicitudAdmin");
        setUsuario(usuario);
        setTipoSoli(tipoSoli);
        setDescripcion(descripcion);
        setSoli(soli);
    }

    const checkmark=(usuario,tipoSoli,descripcion,soli) => {
        setAccion("Asignar");
        setTitulo("Asignar Licencia");
        setCoso("Solicitud");
        setUsuario(usuario);
        setTipoSoli(tipoSoli);
        setDescripcion(descripcion);
        setSoli(soli);
    }
    
    return (
        <>
            <table className="table shadow text-center align-middle table-sm" id='tablaUsuarios'>
                <thead className="text-white">
                    <tr>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Usuario
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(0,dirSort0,setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col0'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Tipo de solicitud
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(2,dirSort0,setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col2'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="align-middle">
                            <div>
                                Descripción
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Acciones
                            </div>
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="fs-7">
                    {
                        solicitudes.map(soli => (

                            (soli.estado == "PENDIENTE-ADMIN")?(
                                <tr key={soli.id}>
                                    <td>
                                        {soli.usuario.nombre+" "+soli.usuario.apellido} <br />
                                        <sub>{soli.usuario.email}</sub>
                                    </td>
                                    <td>
                                        {soli.tipo}
                                    </td>
                                    <td>
                                        <p id={`s${soli.id}-description`} className=' w-100'>
                                            {soli.descripcion}
                                            {console.log(soli.id)}
                                            {console.log(soli.id)}
                                            {console.log(soli.id)}
                                            {console.log(soli.id)}
                                            {console.log(soli.id)}
                                            {console.log(soli.id)}
                                            {console.log(soli.id)}
                                        </p>
                                    </td>
                                    <td>
                                        <i onClick={() => xmark(soli.usuario.nombre+" "+soli.usuario.apellido,soli.tipo,soli.descripcion,soli)} data-bs-toggle="modal" data-bs-target="#aprobSoli" className="ms-2 fa-solid fa-xmark fa-xl me-2"></i>
                                        <i onClick={() => checkmark(soli.usuario.nombre+" "+soli.usuario.apellido,soli.tipo,soli.descripcion,soli)} data-bs-toggle="modal" data-bs-target="#aprobSoli" className="ms-2 fa-solid fa-check me-2"></i>
                                    </td>
                                    <td>
                                        <i onClick={() => expandRow(soli.id)} id={`s${soli.id}-expandIcon`} className="fa-solid fa-angle-down me-2"></i>
                                    </td>
                                </tr>
                            ):null
                        ))
                    }
                </tbody>
            </table >
            <Modal accion={accion} titulo={titulo} usuario={usuario} tipoSoli={tipoSoli} descripcion={descripcion} coso={coso} soli={soli} mensajeSerial={mensajeSerial} apiFetchAdmin={apiFetchAdmin} />
            <Notificacion accion={accionNoti} coso={cosoNoti} texto={textoNoti}/>
            <NotificacionSerial accion={accionNotiSerial} serial={serialNoti}/>
        </>
    )
}
