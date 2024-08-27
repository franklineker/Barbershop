import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowUpRightFromSquare, faCalendarAlt, faChartColumn, faCircleQuestion, faEnvelope, faHome, faLock, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";

export default function Menu() {
    const { auth } = useAuth();

    return (
        <aside>
            <nav>
                <div>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faHome} />
                            <Link to="/">Início</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <Link to="/contact">Contato</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faUser} />
                            <Link to="/profile">Perfil</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faLock} />
                            <Link to="/security">Segurança</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {auth?.user?.roles.includes("ADMIN")
                        ?
                        <ul id="adminArea">
                            <h3 style={{ fontSize: "0.75rem", margin: "10px" }}>Área do administardor</h3>
                            <li>
                                <FontAwesomeIcon icon={faChartColumn} />
                                <Link to="/reports">Relatórios</Link>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <Link to="/agenda">Agenda</Link>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faUsers} />
                                <Link to="/users">Usuários</Link>
                            </li>
                        </ul>
                        : null}
                    <ul>
                        <li className="justify-self-end py-1" style={{ fontSize: "1rem" }}>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            <Link to="/help" target="_blank" className="d-flex justify-content-between p-0 mx-2">
                                Ajuda
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: "0.8rem", alignSelf: "center" }} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}
