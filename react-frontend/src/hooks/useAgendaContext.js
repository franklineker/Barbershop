import { useContext } from "react"
import AgendaContext from "../context/AgendaProvider";

const useAgendaContext = () => {
    return useContext(AgendaContext);
}

export default useAgendaContext;