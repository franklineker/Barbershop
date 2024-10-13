import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCalendarAlt, faScissors, faChartColumn, faHome, faLock, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";

export default function Menu() {
    const { auth } = useAuth();

    return (
        <aside>
            <nav>
                <div>
                    <ul>
                        <li>
                            <span style={{ width: "25px" }}>
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                            <Link to="/">Início</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {auth?.user?.roles.includes("ADMIN")
                        ?
                        <ul  >
                            {/* <h3 style={{ fontSize: "0.75rem", margin: "10px" }}>Área do administardor</h3> */}
                            <li>
                                <span style={{ width: "25px" }}>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                <Link to="/agenda">Agenda</Link>
                            </li>
                            <li>
                                <span style={{ width: "25px" }}>
                                    <FontAwesomeIcon icon={faScissors} />
                                </span>
                                <Link to="/barbers">Barbeiros</Link>
                            </li>
                            <li>
                                <span style={{ width: "25px" }}>
                                    <FontAwesomeIcon icon={faUsers} />
                                </span>
                                <Link to="/customers">Clientes</Link>
                            </li>
                            <li>
                                <span style={{ width: "25px" }}>
                                    <FontAwesomeIcon icon={faChartColumn} />
                                </span>
                                <Link to="/reports">Relatórios</Link>
                            </li>
                        </ul>
                        : null}
                </div>
                <div>
                    <ul>
                        <li>
                            <span style={{ width: "25px" }}>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <Link to="/profile">Perfil</Link>
                        </li>
                        <li>
                            <span style={{ width: "25px" }}>
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <Link to="/security">Segurança</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}
