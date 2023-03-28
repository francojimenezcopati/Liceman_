import { useForm } from "../../customHooks/useForm";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from 'axios';
// axios.defaults.withCredentials = true

export const LoginPage = () => {

	const { setstatus } = useContext(UserContext);

	const showPassword = () => {
		var input = document.getElementById("pass")
		if (input.type === "password") {
			input.type = "text";
		} else {
			input.type = "password";
		}
	}

	const { formState, onInputChange } = useForm({
		username: '', password: ''
	})
	const { username, password } = formState

	async function enviardatos(username, password) {
		try {
			const data = await
				fetch('http://localhost:8080/api/auth/signin', {
					mode: 'cors',
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Cache': 'no-cache',
						'Access-Control-Allow-Origin': 'http://localhost:8080',
					},
					credentials: 'include',
				}).then(resp => resp.json())

			// 	axios.post('http://localhost:8080/api/auth/signin', { username, password }, {
			// 		headers: {
			// 			'Accept': 'application/json',
			// 			'Content-Type': 'application/json'
			// 		},
			// 		// withCredentials: true
			// 	})
			// const { data } = resp

			var rol = "ROLE_USUARIO"

			data.contenido.authorities.forEach(rolB => {
				if (rolB.authority == "ROLE_MENTOR") {
					rol = "ROLE_MENTOR"
				}
				if (rolB.authority == "ROLE_ADMIN") {
					rol = "ROLE_ADMIN"
				}
			})

			let dataarmada = {
				statusLog: data.ok,
				contenido: data.contenido,
				rolA: rol,
			}
			setstatus(status => ({
				...status,
				...dataarmada
			})
			)
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<div className="page-container">
			<div className="container">
				<div className="row d-flex align-items-center">
					<div className="col-6">
						<img className="login-ilustration" src='../../../assets/loginIlustration.svg' alt="Login Ilustration" />
					</div>
					<div className="col-lg-6 col-12">
						<div className="card rounded-3 shadow p-5">
							<div>
								<h1 className="text-center">Bienvenido de nuevo</h1>
								<p className="text-center fs-4">A Liceman!</p>
							</div>
							<form className="px-4" onSubmit={(e) => { enviardatos(username, password); e.preventDefault() }}>
								<label className="input-icon username w-100 my-3">
									<input className="input with-icon w-100" type="text" placeholder="Usuario" name="username" value={username} onChange={onInputChange} />
								</label>
								<label className="input-icon password w-100 my-3">
									<input className="input with-icon w-100" type="password" placeholder="Contraseña" id="pass" name="password" value={password} onChange={onInputChange} />
									<i className="fa-solid fa-eye btn" id="eye" onClick={showPassword}></i>
								</label>
								<button className="w-100 btn btn-dark mt-3" type="submit">Iniciar sesión</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}