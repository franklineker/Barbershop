import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCalendarAlt, faScissors, faChartColumn, faHome, faLock, faUser, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../hooks/useAuth";

export default function Menu() {
    const { auth } = useAuth();

    return (
        <aside>
            <nav>
                <div
                    className="d-flex border-bottom border-light rounded-2 align-items-center fw-bolder"
                    style={{ height: "8vh" }}>
                    <span className="mx-2">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <span>Menu</span>
                </div>
                <ul style={{ marginLeft: "1rem", marginRight: "0.2rem" }}>
                    <li>
                        <span style={{ width: "25px" }}>
                            <FontAwesomeIcon icon={faHome} />
                        </span>
                        <Link to="/">Início</Link>
                    </li>
                </ul>
                {auth?.user?.roles.includes("ADMIN")
                    ?
                    <ul style={{ marginLeft: "1rem", marginRight: "0.2rem" }}>
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
                    :
                    null
                }
                <ul style={{ marginLeft: "1rem", marginRight: "0.2rem" }}>
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
            </nav>
        </aside>
    )
}
