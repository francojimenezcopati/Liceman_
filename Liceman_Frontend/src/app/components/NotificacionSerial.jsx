import React from "react";
import { useEffect } from "react";

export const mostrarNotiSerial = (mostrar) => {
    if (document.getElementsByClassName("toastSerialNuevo")[0].classList.contains("hide")) {
        document.getElementsByClassName("toastSerialNuevo")[0].classList.remove("hide");
    }
    if (mostrar == 1) {
        setTimeout(() => {
            document.getElementById("notiSerial").classList.add("hide");
        }, 3000);
    }
};

export const NotificacionSerial = ({ accion, serial }) => {
    useEffect(() => {
        document.getElementsByClassName("toastSerialNuevo")[0].classList.add("hide");
    }, []);
    return (
        <>
            <div className={`toastSerialNuevo toast-header-${accion}`} id="notiSerial">
                <div className="tituloSerial">
                    <span>
                        <i
                            className={`fa fa-solid ${accion == "asignada" && "fa-check"} ${accion == "renovada" && "fa-check"} ${
                                accion == "revocada" && "fa-xmark"
                            } ${accion == "reservada" && "fa-clock"}`}
                        ></i>
                    </span>
                    <span>Licencia {`${accion}`}</span>
                    <i
                        className="fa-solid fa-xmark close"
                        onClick={() => {
                            document.getElementById("noti").classList.add("hide");
                        }}
                    ></i>
                </div>
                <div className="toastSerial-content">
                    <div className="message">
                        <p className="text text-1">Serial de licencia {`${accion}`}:</p>
                        <p className="text text-2 text-decoration-underline">{`${serial}`}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
