import { useEffect, useState } from 'react'
import { sortTable, expandRow } from './functions/auxFunctions'

export const TablaUsuarios = () => {
    //Para q el modal spawnee poner esto en los iconos/columnas q sean
    // data-bs-toggle="modal" data-bs-target="#aprobSoli"

    const [dirSort0, setDirSort0] = useState("asc")
    const [dirSort2, setDirSort2] = useState("asc")
    const [solicitudes, setSolicitudes] = useState([])

    useEffect(() => {
        getSolicitudes(setSolicitudes)
    }, [])

    const getSolicitudes = async (setSolicitudes) => {
        try {
            const data = await
                fetch('http://localhost:8080/api/solicitudesusuario', {
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

    return (
        <>
            <table className="table shadow text-center align-middle table-sm" id='tablaUsuarios'>
                <thead className="text-white">
                    <tr>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Tipo de solicitud
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(0, dirSort0, setDirSort0) }} className="fa-solid fa-arrow-up text-secondary" id='col0'></i>
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
                                Estado
                                <div className="ms-2">
                                    <i onClick={() => { sortTable(2, dirSort2, setDirSort2) }} className="fa-solid fa-arrow-up text-secondary" id='col2'></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="fs-7">
                    <tr>
                        <td>
                        </td>
                        <td>
                            <p className='collapsed w-100'>
                            </p>
                        </td>
                        <td>
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    {
                        solicitudes.map(soli => (
                            <tr>
                                <td>
                                    {soli.tipo}
                                </td>
                                <td>
                                    <p id={`s${soli.id}-description`} className='d-flex justify-content-center align-items-center'>
                                        {soli.descripcion}
                                    </p>
                                </td>
                                <td>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <p className="text-muted m-0">{soli.estado}</p>
                                        {
                                            soli.estado == 'PENDIENTE-MENTOR' && (<i className="ms-2 fa-solid fa-clock"></i>)
                                        }
                                        {
                                            soli.estado == 'PENDIENTE-ADMIN' && (<i className="ms-2 fa-solid fa-clock"></i>)
                                        }
                                        {
                                            soli.estado == 'DEVUELTO-USER' && (<i className="ms-2 fa-solid fa-pencil"></i>)
                                        }
                                        {
                                            soli.estado == 'ACEPTADA' && (<i className="ms-2 fa-solid fa-check"></i>)
                                        }
                                        {
                                            soli.estado == 'DENEGADA' && (<i className="ms-2 fa-solid fa-xmark"></i>)
                                        }
                                    </div>
                                </td>
                                <td><i onClick={() => expandRow(soli.id)} id={`s${soli.id}-expandIcon`} className="fa-solid fa-angle-down me-2"></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table >
        </>
    )
}