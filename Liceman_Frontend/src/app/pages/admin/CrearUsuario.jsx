import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../customHooks/useForm';
import { Modal } from '../../components/Modal';
import { triggerToast } from '../../components/PushNotiSimple';
import { NotificacionContext } from '../../../notificacionContext';
import { mostrarNoti } from '../../components/Notificacion';
import { Notificacion } from '../../components/Notificacion';


export const CrearUsuario = () => {

  const navigate = useNavigate();
  const [role, setRole]=useState([])
  const [usernameModal, setUsernameModal] = useState("")
  const [emailModal, setEmailModal] = useState("")

  const showPassword = () => {
		var input = document.getElementById("password1")
		if (input.type === "password") {
			input.type = "text";
		} else {
			input.type = "password";
		}
    var input2 = document.getElementById("password2")
		if (input2.type === "password") {
			input2.type = "text";
		} else {
			input2.type = "password";
		}
	}

  const hideOrShowInput = () => {
    var valorSeleccionado = document.getElementById("tipo-selector").value;
    var area = document.getElementById("mentor-area");
    if (valorSeleccionado == "mentor") {
      area.classList.remove("hide");
      document.getElementById("mentor-selector").disabled = false
    }
    else {
      document.getElementById("mentor-selector").required = false
      area.classList.add("hide");
      document.getElementById("mentor-selector").disabled = true
    }
  }

  const sendUsuario = async () => {
    try {
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password1").value;
      const phone = document.getElementById("phone").value;
      if(document.getElementById("flexSwitchCheckDefault").checked == true){
        var hasTeams = true;
      }
      else{
        var hasTeams = false;
      }
      const mentorArea = document.getElementById("mentor-selector").value; 
      const role = [document.getElementById("tipo-selector").value];
      const usuarioCreado = { nombre, apellido, username, email, password, phone, hasTeams, mentorArea, role}
      const data=await
      fetch('http://localhost:8080/api/admin/registrarUsuario', {
        mode:'cors',
        method: 'POST',
        body: JSON.stringify(usuarioCreado),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
        credentials: 'include',
      }).then(resp => resp.json())
      if(data.mensaje == 'El Mail ya esta en uso'){
        setAccionNoti('uso')
        setCosoNoti('El mail ya esta en')
        document.getElementById('email').classList.add("input-invalid")
        setTextoNoti('')
        mostrarNoti(1)
      }
      if(data.mensaje == 'El usuario ya existe'){
        setAccionNoti('existe')
        setCosoNoti('El nombre de usuario ya')
        document.getElementById('username').classList.add("input-invalid")
        setTextoNoti('')
        mostrarNoti(1)
      }
      if(data.mensaje == 'El usuario ha sido creado correctamente'){
        setNotificacion("creado")
        navigate(-1)
      }
    }catch (error) {
      console.log({ error });
    }
  }

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
    document.getElementById("createBtnCR").disabled = true
  },[])
  
  var errores = 0;
  const verificaciones = () =>{
    errores = 0;
    if((document.getElementById("nombre").value == 0)||
    (document.getElementById("apellido").value == 0)||
    (document.getElementById("username").value == 0)||
    (document.getElementById("phone").value == 0)||
    (document.getElementById("password1").value == 0)||
    (document.getElementById("password2").value == 0)||
    (document.getElementById("tipo-selector").value == 0)){
      errores = errores + 1
    }
    if(document.getElementById("tipo-selector").value == 'mentor' && document.getElementById("mentor-selector").value == 0){
      errores = errores + 1
    }
    if(document.getElementById("email").value.search("@") == -1)
    {
      errores = errores + 1
    }
    if(!((document.getElementById("email").value.substr(document.getElementById("email").value.search("@")+1) >= 'A' && document.getElementById("email").value.substr(document.getElementById("email").value.search("@")+1) <= 'Z') || (document.getElementById("email").value.substr(document.getElementById("email").value.search("@")+1) >= 'a' && document.getElementById("email").value.substr(document.getElementById("email").value.search("@")+1) <= 'z')))
    {
      errores = errores + 1
    }
    if(document.getElementById("password1").value != document.getElementById("password2").value){
      errores = errores + 1
    }
    if(errores == 0){
      document.getElementById("createBtnCR").disabled = false
    }
    else{
      document.getElementById("createBtnCR").disabled = true
    }
    if(document.getElementById("username").value != 0){
      document.getElementById("username").classList.remove('input-invalid')
    }
    if(document.getElementById("email").value != 0){
      document.getElementById("email").classList.remove('input-invalid')
    }
  }

  return (
    <>
      <div className='container-center'>
        <div className='card-form shadow rounded m-3'>
          <h2 className="text-center pt-4"> Crear Usuario</h2>
          <form onSubmit={(e) => { sendSolicitud(); e.preventDefault() }} className="p-3" id="createUserForm">

            <h5>Tipo de usuario:</h5>
            <select id='tipo-selector' className="form-select" onChange={() => {hideOrShowInput();verificaciones()}} defaultValue={0}>
              <option disabled value={0}>Tipo de usuario</option>
              <option value={"usuario"}>USER</option>
              <option value={"mentor"}>MENTOR</option>
              <option value={"admin"}>ADMIN</option>
            </select>

            <div id='mentor-area' className="hide mt-4">
              <h5 className='mt-4'>Área de mentor:</h5>
              <select id='mentor-selector' className="form-select" defaultValue={0} disabled onChange={verificaciones}>
                <option disabled value={0}>Elegí un área para el mentor</option>
                <option value={"BACKEND"}>Back-End</option>
                <option value={"FRONTEND"}>Front-End</option>
                <option value={"BD"}>Base de Datos</option>
                <option value={"CRM"}>CRM</option>
                <option value={"SALESFORCE"}>Saleforce</option>
              </select>
            </div>

            <div className="row">
              <div className="col-sm">
                <h5 className='mt-4'>Nombre:</h5>
                <input className="form-control i " placeholder="Ej:Juan" rows="1" name="nombre" id="nombre" onChange={verificaciones}></input>
              </div>
              <div className="col-sm">
                <h5 className='mt-4'>Apellido:</h5>
                <input className="form-control i " placeholder="Ej:Ramirez" rows="1" name="apellido" id="apellido" onChange={verificaciones}></input>
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <h5 className='mt-4'>Nombre de usuario:</h5>
                <input className="form-control i " placeholder="Ej:JPerez" rows="1" name="username" id="username" onChange={verificaciones}></input>
              </div>
              <div className="col-sm">
                <h5 className='mt-4'>Número de teléfono:</h5>
                <input className="form-control i " placeholder="Ej:+54 9 1123867095" rows="1" name="phone" id="phone" onChange={verificaciones}></input>
              </div>
            </div>

            <h5 className='mt-4'>Mail:</h5>
            <input className="form-control i " placeholder="juan.perez@gire.com" rows="1" name="email" id="email" onChange={verificaciones}></input>

            <div className="row">
              <div className="col-sm">
                <h5 className='mt-4'>Contraseña:</h5>
                <div className=" input-icon password w-100">
									<input className="form-control i  with-icon w-100" type="password" placeholder="Contraseña" id="password2" name="password" onChange={verificaciones}/>
									<i className="fa-solid fa-eye btn" id="eye" onClick={showPassword}></i>
								</div>
              </div>
              <div className="col-sm">
                <h5 className='mt-4'>Repetir Contraseña:</h5>
                <div className=" input-icon password w-100">
									<input className="form-control i  with-icon w-100" type="password" placeholder="Contraseña" id="password1" name="repitePassword" onChange={verificaciones}/>
									<i className="fa-solid fa-eye btn" id="eye" onClick={showPassword}></i>
								</div>
              </div>
            </div>

            <div className = "d-flex align-items-center mt-2">
                <img className="mt-2" src="/src/assets/teamsLogo.png"  width="70" height="35"></img>
                <h5 className='TieneEquipos'>Tiene teams?</h5>
                <div className="form-check form-switch" id="checkBoxDiv">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="hasTeams"></input>
                </div>
            </div>
          </form>
            <div className="d-flex my-4 mt-0">
              <button className='btn btn-outline-dark w-75 me-4' id="cancelBtnCR" onClick={() => navigate(-1)}>Cancelar</button>
              <button className='btn btn-dark w-75 ms-4' id="createBtnCR" data-bs-toggle="modal" data-bs-target="#aprobSoli" onClick={()=>{setRole(document.getElementById("tipo-selector").value);setUsernameModal(document.getElementById("username").value);setEmailModal(document.getElementById("email").value)}} >Crear</button>
            </div>
        </div>
      </div>
      <Modal accion="Crear" titulo="Confirmar creacion de usuario"  usuario={usernameModal} role={role} coso="Usuario" mail={emailModal} sendUsuario={sendUsuario}/>
      <Notificacion accion={accionNoti} coso={cosoNoti} texto={textoNoti}/>
    </>
  )
}