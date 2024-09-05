import { useIsAdmin, useIsLogged } from "../../hooks/useTokenDetails"

export default function Home() {

    const isAdmin = useIsAdmin();
    const isLogged = useIsLogged();

    const handleLoginStatus = () => {
        if (isLogged) {
            if (isAdmin) {
                return "Olá! Seu perfil é de administrador!";
            } else {
                return "Olá! Seu perfil é de usuário.";
            }
        } else {
            return "Você ainda não fez login.";
        }
    }

    return (
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Início</h1>
            <article className="bg-dark text-light p-5 rounded">
                <p>
                    {handleLoginStatus()}
                </p>
                <p>
                    Aqui ficará a página inicial da aplicação.
                </p>
            </article>
        </section>
    )
}
