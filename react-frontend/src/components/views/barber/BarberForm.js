import React, { useRef, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import usePrivateResourceAxios from '../../../hooks/usePrivateResourceAxios';

const RESOURCE_URL = process.env.REACT_APP_RESOURCE_BASE_URL;

export default function BarberForm() {

    const privateResourceAxios = usePrivateResourceAxios();
    const emailRef = useRef();

    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [confirmPws, setConfirmPwd] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [name, setName] = useState(null);

    const handleSubmit = async () => {
        try {
            const body = {
                email,
                password: pwd,
                name,
                phoneNumber,
                roles: [1001],
                statusCode: 3000
            }
            console.log(body);
            const response = await privateResourceAxios.post(RESOURCE_URL + "/barber", body);
            console.log(response)
        } catch (error) {
            console.log(error);
            alert("Falha ao criar barbeiro.");
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>E-mail</label>
                <input
                    id='email'
                    type='text'
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='name'>Nome</label>
                <input
                    id='name'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor='phoneNumber'>Telefone</label>
                <input
                    id='phoneNumber'
                    type='text'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <label htmlFor='pwd'>Senha</label>
                <input
                    id='pwd'
                    type='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                <label htmlFor='confirmPwd'>Confirme a senha</label>
                <input
                    id='confirmPwd'
                    type='password'
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    required
                />
                <button type='submit'>Salvar</button>
            </form>
        </div>
    )
}
