
import { useNavigate, useLocation } from 'react-router-dom';

export default function Unauthorized() {

    const navigate = useNavigate();
    const location = useLocation();
    console.log("state location de unauthorized: ", location.state)

    const goBack = () => navigate(-1);

    return (
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Não autorizado</h1>
            <article className="bg-dark text-light p-5 rounded d-flex flex-column">
                <span>
                    Você não tem permissão para acessar essa página.
                </span>
                <button className='btn btn-primary mt-3 w-50 align-self-center' onClick={goBack}>Voltar</button>
            </article>
        </section>
    )
}
