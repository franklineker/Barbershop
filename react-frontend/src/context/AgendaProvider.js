import { createContext, useState } from "react"

const AgendaContext = createContext({});

export const AgendaProvider = ({ children }) => {

    const [countRenderAgenda, setCountRenderAgenda] = useState(0);

    return (
        <AgendaContext.Provider value={{ countRenderAgenda, setCountRenderAgenda }}>
            {children}
        </AgendaContext.Provider>
    )

}

export default AgendaContext;