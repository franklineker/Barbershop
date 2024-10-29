import { useLocation } from "react-router-dom"

export default function Reports() {
    const location = useLocation()
    console.log(location.state)
    return (
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Relatórios</h1>
            <article className="bg-dark text-light p-5 rounded">
                <span>
                    Página com os relatórios da aplicação.
                </span>
            </article>
        </section>
    )
}
