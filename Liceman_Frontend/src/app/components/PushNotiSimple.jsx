export const triggerToast = () => {
    let toastLiveExample = document.getElementById('pushNotiSimple')
    let toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

export const PushNotiSimple = ({ accion, coso }) => {
    if(accion == "Aprobar"){ accion = "aprobada"};
    if(accion == "Rechazar"){ accion = "rechazada"};
    if(accion == "Devolver"){ accion = "devuelta"};
    if(accion == "Crear"){ 
        accion = "creado"};

    return (
        <>
            {/* BOTON PARA PROBAR LA NOTIFICACION: */}
            {/* <button type="button" className="btn btn-primary" id="liveToastBtn" onClick={triggerToast}> Show live toast</button> */}
            
            <div className="position-fixed bottom-0 end-0 p-3 toast-container">
                <div className="toast align-items-center text-bg-primary border-0" id="pushNotiSimple" role="alert" aria-live="assertive" aria-atomic="true" >
                    <div className={`toast-body h-100 d-flex justify-content-between toast-header-${accion}`}>
                        <p className="m-0 mt-05">{`${coso} ${accion} exitosamente`}</p>
                        <span><i className={`fa-solid ${accion == 'aprobada' && 'fa-check'}${accion == 'modificado' && 'fa-check'}${accion == 'creada' && 'fa-check'} ${accion == 'creado' && 'fa-check'} ${accion == 'rechazada' && 'fa-xmark'} ${accion == 'devuelta' && 'fa-clock'} text-white text-center`} data-bs-dismiss="toast" aria-label="Close"></i></span>
                    </div>
                </div>
            </div>
        </>
    )
}
