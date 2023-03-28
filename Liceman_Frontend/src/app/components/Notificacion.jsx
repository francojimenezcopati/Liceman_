import React from "react";
import { useContext, useEffect } from "react";
import { NotificacionContext } from "../../notificacionContext";

export const mostrarNoti = (mostrar) => {
    if (document.getElementsByClassName("toastNuevo")[0].classList.contains("hide")) {
        document.getElementsByClassName("toastNuevo")[0].classList.remove("hide");
    }
    if (mostrar == 1) {
        setTimeout(() => {
            document.getElementById("noti").classList.add("hide");
        }, 3000);
    }
};

export const Notificacion = ({ accion, coso, texto }) => {
    useEffect(() => {
        document.getElementsByClassName("toastNuevo")[0].classList.add("hide");
    }, []);
    return (
        <>
            <div className={`toastNuevo toast-header-${accion}`} id="noti">
                <div className="toast-content">
                    <span>
                        <i
                            className={`fa-solid ${accion == "aprobada" && "fa-check"} ${accion == "modificado" && "fa-check"} ${
                                accion == "creada" && "fa-check"
                            } ${accion == "creado" && "fa-check"} ${accion == "rechazada" && "fa-xmark"} ${accion == "campos" && "fa-xmark"} ${
                                accion == "devuelta" && "fa-clock"
                            } ${accion == "reservada" && "fa-clock"} ${accion == "revocada" && "fa-xmark"} ${accion == "uso" && "fa-xmark"} ${
                                accion == "existe" && "fa-xmark"
                            } ${accion == "disponibles" && "fa-xmark"} ${accion == "permitida" && "fa-xmark"}`}
                        ></i>
                    </span>

                    <div className="message">
                        <span className="text text-1">{`${coso} ${accion} ${texto}`}</span>
                    </div>
                </div>
                <i
                    className="fa-solid fa-xmark close"
                    onClick={() => {
                        document.getElementById("noti").classList.add("hide");
                    }}
                ></i>
            </div>
        </>
    );
};
