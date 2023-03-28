import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../customHooks/useForm';
import { UserContext } from '../../../UserContext'
import { useContext,useState, useEffect } from 'react'
import { NotificacionContext } from '../../../notificacionContext';
import { mostrarNoti, Notificacion } from '../../components/Notificacion';

export const SolicitarCapacitacion = () => {

  const{notificacion, setNotificacion} = useContext(NotificacionContext)
  const [accionNoti, setAccionNoti] = useState("")
  const [cosoNoti, setCosoNoti] = useState("")
  const [textoNoti, setTextoNoti] = useState("")

  useEffect(() => {
    if(notificacion == "modificado")
    {
        setAccionNoti('modificado')
        setCosoNoti('Usuario')
        setTextoNoti('exitosamente')
        mostrarNoti(1)
        setNotificacion("0")
    }
  },[])

  const navigate = useNavigate();

  const { formState, onInputChange } = useForm({
    descripcion: '', link: ''
  })
  const { descripcion, link } = formState

  const hideOrShowInput = () => {
    var valorSeleccionado = document.getElementById("tipo-selector").value;
    var linkArea = document.getElementById("link-area");
    if (valorSeleccionado == "UDEMY" || valorSeleccionado == "OTRA PLATAFORMA") {
      linkArea.classList.remove("hide");
      document.getElementById("link").disabled = false
    }
    else {
      document.getElementById("link").required = false
      linkArea.classList.add("hide");
      document.getElementById("link").disabled = true
    }
  }

  const sendSolicitud = async () => {
    try{
      const tipo = document.getElementById("tipo-selector").value;
      const area = document.getElementById("area-selector").value;

      if(tipo == 'UDEMY' || tipo == 'OTRA PLATAFORMA')
      {
        var solicitud = { tipo, descripcion, estado: 'PENDIENTE-MENTOR', area, ...(link != '' && { link }) }
      }
      else{
        var solicitud = { tipo, descripcion, estado: 'PENDIENTE-MENTOR', area }
      }

      fetch('http://localhost:8080/api/nuevaSolicitud', {
        mode:'cors',
        method: 'POST',
        body: JSON.stringify(solicitud),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
        credentials: 'include',
      }).then(resp => resp.json())
      setNotificacion("solicitud")
    }catch (error) {
      console.log( {error} );
    }
    
  }

  const onClickBTN = () => {
    if (document.getElementById("tipo-selector").value != 0){
      if (!document.getElementById("link-area").classList.contains("hide")) {
        if (link.length < 1) {
          document.getElementById("link").required = true
        }
        else{
          if(document.getElementById("area-selector").value != 0)
          {
            sendSolicitud()
            navigate(-1)
          }
        }
      }
      else{
        if(document.getElementById("area-selector").value != 0)
          {
            sendSolicitud()
            navigate(-1)
          }
      }
    }

    if(document.getElementById("area-selector").value == 0){
      document.getElementById("area-selector").classList.add("input-invalid")
      setAccionNoti('campos')
      setCosoNoti('Complete todos los ')
      setTextoNoti('')
      mostrarNoti(1);
    }
    if(document.getElementById("tipo-selector").value == 0){
      document.getElementById("tipo-selector").classList.add("input-invalid")
      setAccionNoti('campos')
      setCosoNoti('Complete todos los ')
      setTextoNoti('')
      mostrarNoti(1);
    }
    checkValidacion()
  }

  const checkValidacion = () =>{
    if(document.getElementById("tipo-selector").value != 0){
      document.getElementById("tipo-selector").classList.remove("input-invalid")
    }
    if(document.getElementById("area-selector").value != 0){
      document.getElementById("area-selector").classList.remove("input-invalid")
    }
  }
  
  return (<>
  
    <div className='container-center'>
      <div className='card-form shadow rounded m-3'>
        <h2 className="text-center pt-4"> Solicitud de capacitación</h2>
        <form onSubmit={(e) =>  e.preventDefault() } className="p-3">

          <h5>Tipo de solicitud</h5>
          
          <select id='tipo-selector' className="form-select" onChange={() => {hideOrShowInput();checkValidacion()}} defaultValue={0}>
            <option disabled value={0}>Elegí el tipo de solicitud</option>
            <option value={"ASESORAMIENTO"}>Asesoramiento</option>
            <option value={"OTROS"}>Otros</option>
            <option value={"UDEMY"}>Udemy</option>
            <option value={"OTRA PLATAFORMA"}>Otra Plataforma</option>
          </select>

          <div id='link-area' className="hide mt-4">
            <h5>Link al curso:</h5>
            <input id='link' type="text" className="form-control" placeholder="Ej: https://gire.udemy.com/course/master-completo-java-de-cero-a-experto" name="link" value={link} onChange={onInputChange} disabled/>
          </div>

          <h5 className='mt-4'>Área:</h5>
          <select id='area-selector' className="form-select" defaultValue={0} onChange={() => checkValidacion()}>
            <option disabled value={0}>Elegí un área a desarrollarte</option>
            <option value={"BACKEND"}>Back-End</option>
            <option value={"FRONTEND"}>Front-End</option>
            <option value={"BD"}>Base de Datos</option>
            <option value={"CRM"}>CRM</option>
            <option value={"SALESFORCE"}>Saleforce</option>
          </select>

          <h5 className='mt-4'>Detalle de la capacitación</h5>
          <textarea className="form-control" placeholder="Contanos a que tipo de capacitación te gustaría aplicar y cual es tu objetivo?" rows="10" name="descripcion" id="descripcion123" value={descripcion} onChange={onInputChange}></textarea>

          <div className="d-flex my-4">
            <button className='btn btn-outline-dark w-100 me-4' onClick={() => navigate(-1)}>Cancelar</button>
            <button className='btn btn-dark w-100 ms-4' type='submit' onClick={onClickBTN}>Crear</button>
          </div>
        </form>
      </div>
    </div>
    <Notificacion accion={accionNoti} coso={cosoNoti} texto={textoNoti}/>
  </>
  )
}