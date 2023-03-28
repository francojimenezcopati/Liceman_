import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/liceman-3.png";
import { LoginPage } from "../../Auth/Pages/LoginPage";
import { UserContext } from "../../UserContext";
import { ModificarUsuario } from "../pages/user/ModificarUsuario";

const Logout = async () => {
    try {
        fetch("http://localhost:8080/api/auth/signout", {
            mode: "cors",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                "Access-Control-Allow-Origin": "http://localhost:8080",
            },
            credentials: "include",
        }).then((resp) => resp.json());
    } catch (error) {
        console.log({ error });
    }
};

export const NavBar = () => {
    const {
        status: {
            contenido: { username },
        },
    } = useContext(UserContext);
    const { status, setstatus } = useContext(UserContext);
    const logout2 = () => {
        let dataarmada = {
            statusLog: false,
        };
        setstatus((status) => ({
            ...dataarmada,
        }));
    };

    return (
        <>
            <nav className="navbar navbar-expand bg cont">
                <div className="row w-100">
                    <div className="col"></div>
                    <div className="col-2">
                        <Link className="navbar-brand text-light" to="">
                            <img className="logo-liceman" src={logo} alt="Logo Liceman" />
                        </Link>
                    </div>
                    <div className="col-9 d-flex justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-light"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user"></i> {username.replace(/([A-Z])/g, " $1").trim()}
                                </a>
                                <ul className="dropdown-menu w-100">
                                    <li>
                                        <Link className="dropdown-item text-light" to="/ver-perfil">
                                            Ver Perfil
                                        </Link>
                                    </li>
                                    <li className="ps-3 pe-3">
                                        <hr className="dropdown-divider" />
                                    </li>
                                    {/*<li><Link className="dropdown-item text-light" to="/logout">Cerrar Sesión</Link></li>*/}
                                    <li
                                        className="dropdown-item text-light"
                                        onClick={() => {
                                            Logout();
                                            logout2();
                                        }}
                                    >
                                        Cerrar Sesión
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col"></div>
                </div>
            </nav>
        </>
    );
};
