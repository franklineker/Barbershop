import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";

const env = process.env;

export default function Header() {

    const { auth } = useAuth();

    return (
        <header>
            <img src={logo} alt="logo" style={{ width: "15vh", height: "12vh" }} />
            <div>
                {auth?.accessToken ?
                    <a href={env.REACT_APP_LOGOUT_URL} className="btn btn-outline-light mx-2">
                        <span style={{ marginRight: "1vh" }}>Sair</span> <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </a> :
                    <>
                        <Link to='/register' className="btn btn-outline-light">Cadastrar</Link>
                        <Link to='/authorization' className="btn mx-2" id="loginButton">Fazer login</Link>
                    </>
                }
            </div>
        </header>
    )
}
