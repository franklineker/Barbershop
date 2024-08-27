import React from 'react'

export default function Security() {
    return (
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Segurança</h1>
            <article className="bg-dark text-light p-5 rounded">
                <p>
                    Página com informções de segurança, como senhes, por exemplo.
                </p>
                <p>
                    Você precisa estar logado para acessar esta página.
                </p>
            </article>
        </section>
    )
}
