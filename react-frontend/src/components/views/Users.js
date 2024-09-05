/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import usePrivateResourceAxios from '../../hooks/usePrivateResourceAxios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Users() {

    const [users, setUsers] = useState();
    const privateResourceAxios = usePrivateResourceAxios();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const getUsers = async () => {
            try {
                console.log("indo buscar users...")
                const response = await privateResourceAxios.get("/users", {
                    signal: controller.signal
                });

                isMounted && setUsers(response?.data);
            } catch (error) {
                if (error?.name === 'CanceledError') {
                    console.log('The request to get users has been aborted.');
                    return;
                } else if ([401, 403].find(i => i === error?.response?.status)) {
                    navigate("/authorization", { state: { from: location } });
                }
                console.log(error);
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, []);

    return (
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Usuários</h1>
            <article className="bg-dark text-light p-5 rounded">
                {users?.length
                    ? (
                        <ul>
                            {users?.map((user, i) => {
                                return (
                                    <>
                                        <li key={i}>
                                            <span>Usuário: {user.username || "nulo."}</span>
                                            <br />
                                            <span>Email: {user.email}</span>
                                        </li>
                                        <br />
                                    </>
                                )
                            })}
                        </ul>
                    )
                    : (
                        <p>Nenhum usuário encontrado.</p>
                    )
                }
            </article>
        </section>
    )
}
