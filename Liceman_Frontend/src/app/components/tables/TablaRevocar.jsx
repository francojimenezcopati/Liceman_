import { useEffect, useState, useContext } from "react";
import { sortTable, expandRow } from "./functions/auxFunctions";
import { Modal } from "../Modal";
import { Notificacion } from "../Notificacion";
import { mostrarNoti } from "../Notificacion";
import { NotificacionContext } from "../../../notificacionContext";
import { NotificacionSerial } from "../NotificacionSerial";
import { mostrarNotiSerial } from "../NotificacionSerial";

export const TablaRevocar = () => {
    const { notificacion, setNotificacion } = useContext(NotificacionContext);
    const [accionNoti, setAccionNoti] = useState("");
    const [accionNotiSerial, setAccionNotiSerial] = useState("");
    const [serialNoti, setSerialNoti] = useState("");
    const [cosoNoti, setCosoNoti] = useState("");
    const [textoNoti, setTextoNoti] = useState("");
    //Para q el modal spawnee poner esto en los iconos/columnas q sean
    // data-bs-toggle="modal" data-bs-target="#aprobSoli"

    const [dirSort0, setDirSort0] = useState("asc");
    const [dirSort2, setDirSort2] = useState("asc");
    const [licencias, setLicencias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [accion, setAccion] = useState("");
    const [titulo, setTitulo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [plat, setPlat] = useState("");
    const [serial, setSerial] = useState("");
    const [coso, setCoso] = useState("");
    const [exp, setExp] = useState("");
    const [tipoSoli, setTipoSoli] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mentorAsign, setMentorAsign] = useState("");
    const [adminAsign, setAdminAsign] = useState("");
    const [updateLicencias, setUpdateLicencias] = useState({});

    const apiFetchRevocar = async (accion, serial) => {
        try {
            let ruta;
            if (accion == "Revocar") {
                ruta = "revocarLicencia";
            }
            if (accion == "Reservar") {
                ruta = "reservarLicencia";
            }
            const data = await fetch(`http://localhost:8080/api/admin/${ruta}`, {
                mode: "cors",
                method: "PUT",
                body: JSON.stringify({
                    serie: serial,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Cache: "no-cache",
                    "Access-Control-Allow-Origin": "http://localhost:8080",
                },
                credentials: "include",
            }).then((resp) => resp.json());
            console.log(data);
            if (accion == "Revocar") {
                setAccionNotiSerial("revocada");
            }
            if (accion == "Reservar") {
                setAccionNotiSerial("reservada");
            }
            setSerialNoti(serial);
            mostrarNotiSerial(1);
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
        getLicencias(setLicencias);
        if (notificacion == "modificado") {
            setAccionNoti("modificado");
            setCosoNoti("Usuario");
            setTextoNoti("exitosamente");
            mostrarNoti(1);
            setNotificacion("0");
        }
    }, [updateLicencias]);

    const getLicencias = async (setLicencias) => {
        try {
            const data = await fetch("http://localhost:8080/api/admin/licencias", {
                mode: "cors",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Cache: "no-cache",
                    "Access-Control-Allow-Origin": "http://localhost:8080",
                },
                credentials: "include",
            }).then((resp) => resp.json());
            setLicencias(data);
            setUpdateLicencias(data);
        } catch (error) {
            console.log({ error });
        }
    };

    const revocar = (usuario, plat, exp, serial) => {
        setAccion("Revocar");
        setTitulo("Revocar Licencia");
        setCoso("Licencia");
        setSerial(serial);
        setTipoSoli("");
        setDescripcion("");
        setUsuario(usuario);
        setPlat(plat);
        setExp(exp);
    };

    const reservar = (plat, serial) => {
        setAccion("Reservar");
        setTitulo("Reservar Licencia");
        setCoso("Licencia");

        setExp("");
        setUsuario("");
        setTipoSoli("");
        setDescripcion("");

        setPlat(plat);
        setSerial(serial);
    };

    const solicitud = (usuario, tipoSoli, descripcion /*, mentorAsign, adminAsign*/) => {
        setTitulo("Solicitud de la Licencia");
        setCoso("Solicitud");
        setAccion("");
        setUsuario(usuario);
        setTipoSoli(tipoSoli);
        setDescripcion(descripcion);
        /*setMentorAsign(mentorAsign);
        setAdminAsign(adminAsign);*/

        setPlat("");
        setSerial("");
        setExp("");
    };

    return (
        <>
            <table className="table shadow text-center align-middle table-sm" id="tablaUsuarios">
                <thead className="text-white">
                    <tr>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Usuario
                                <div className="ms-2">
                                    <i
                                        onClick={() => {
                                            sortTable(0, dirSort0, setDirSort0);
                                        }}
                                        className="fa-solid fa-arrow-up text-secondary"
                                        id="col0"
                                    ></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Plataforma
                                <div className="ms-2">
                                    <i
                                        onClick={() => {
                                            sortTable(1, dirSort0, setDirSort0);
                                        }}
                                        className="fa-solid fa-arrow-up text-secondary"
                                        id="col1"
                                    ></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="align-middle">
                            <div className="d-flex justify-content-center align-items-center">
                                Expiración
                                <div className="ms-2">
                                    <i
                                        onClick={() => {
                                            sortTable(2, dirSort0, setDirSort0);
                                        }}
                                        className="fa-solid fa-arrow-up text-secondary"
                                        id="col2"
                                    ></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Serial</div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Ver solicitud</div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">
                                Estado
                                <div className="ms-2">
                                    <i
                                        onClick={() => {
                                            sortTable(6, dirSort0, setDirSort0);
                                        }}
                                        className="fa-solid fa-arrow-up text-secondary"
                                        id="col6"
                                    ></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-center align-items-center">Acciones</div>
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="fs-7">
                    {licencias.map((lice) => (
                        <tr key={lice.id}>
                            <td>
                                {lice.estado == "ASIGNADA" ? (
                                    <>
                                        {lice.solicitudes[lice.solicitudes.length - 1].usuario.nombre +
                                            " " +
                                            lice.solicitudes[lice.solicitudes.length - 1].usuario.apellido}
                                        <br />
                                        {<sub>{lice.solicitudes[lice.solicitudes.length - 1].usuario.email}</sub>}
                                        <br />
                                        {<sub>{lice.solicitudes[lice.solicitudes.length - 1].usuario.phone}</sub>}
                                        <br />
                                        {lice.solicitudes[lice.solicitudes.length - 1].usuario.hasTeams == true ? (
                                            <img className="teams-logo" src="src\assets\teamsLogo.png" />
                                        ) : (
                                            <sub>{""}</sub>
                                        )}
                                    </>
                                ) : (
                                    <>{"--"}</>
                                )}
                            </td>
                            <td>{lice.plataforma}</td>
                            <td>
                                <div className="d-flex justify-content-center align-items-top">
                                    {lice.estado == "DISPONIBLE" ? <>--</> : <>{lice.vencimiento}</>}
                                </div>
                            </td>
                            <td>{lice.serie}</td>
                            <td>
                                {" "}
                                {lice.estado == "ASIGNADA" ? (
                                    <i
                                        onClick={() =>
                                            solicitud(
                                                lice.solicitudes[lice.solicitudes.length - 1].usuario.nombre +
                                                    " " +
                                                    lice.solicitudes[lice.solicitudes.length - 1].usuario.apellido,
                                                lice.solicitudes[lice.solicitudes.length - 1].tipo,
                                                lice.solicitudes[lice.solicitudes.length - 1].descripcion
                                            )
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#aprobSoli"
                                        className="  text-center btn-solicitud "
                                    >
                                        Solicitud
                                    </i>
                                ) : (
                                    <>--</>
                                )}
                            </td>
                            <td>{lice.estado}</td>
                            <td>
                                {lice.estado == "DISPONIBLE" ? (
                                    <>
                                        <i
                                            onClick={() => reservar(lice.plataforma, lice.serie)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#aprobSoli"
                                            className="ms-2 fa-solid fa-clock"
                                        ></i>
                                        <br />
                                        <sub>Reservar</sub>
                                    </>
                                ) : (
                                    ""
                                )}
                                {lice.estado == "RESERVADA" ? (
                                    <>
                                        <i
                                            onClick={() => revocar("", lice.plataforma, "", lice.serie)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#aprobSoli"
                                            className="ms-2 fa-solid fa-xmark fa-xl me-2"
                                        ></i>
                                        <br />
                                        <sub>Revocar</sub>
                                    </>
                                ) : (
                                    ""
                                )}
                                {lice.estado == "ASIGNADA" ? (
                                    <>
                                        <i
                                            onClick={() =>
                                                revocar(
                                                    lice.solicitudes[lice.solicitudes.length - 1].usuario.nombre +
                                                        " " +
                                                        lice.solicitudes[lice.solicitudes.length - 1].usuario.apellido,
                                                    lice.plataforma,
                                                    lice.vencimiento,
                                                    lice.serie
                                                )
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#aprobSoli"
                                            className="ms-2 fa-solid fa-xmark fa-xl me-2"
                                        ></i>
                                        <br />
                                        <sub>Revocar</sub>
                                    </>
                                ) : (
                                    ""
                                )}
                            </td>
                            <td>
                                <i
                                    onClick={() => expandRow(lice.id)}
                                    id={`s${lice.id}-expandIcon`}
                                    className="fa-solid fa-angle-down me-2 rotated"
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                accion={accion}
                titulo={titulo}
                plataforma={plat}
                serialLic={serial}
                coso={coso}
                usuario={usuario}
                fechaExpir={exp}
                soli={""}
                tipoSoli={tipoSoli}
                descripcion={descripcion}
                apiFetchRevocar={apiFetchRevocar}
            />
            <NotificacionSerial accion={accionNotiSerial} serial={serialNoti} />
            <Notificacion accion={accionNoti} coso={cosoNoti} texto={textoNoti} />
        </>
    );
};
