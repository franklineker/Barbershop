import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Barber.module.css';
import useAgendaContext from "../hooks/useAgendaContext";

export default function Success({ setIsVisible, setIsParentMounted }) {

    const { setCountRenderAgenda } = useAgendaContext();

    return (
        <div className={`${styles.success}`}>
            <FontAwesomeIcon icon={faCheckCircle} className='text-success fs-5 mx-2 mb-1' />
            <span className='fs-6'>Salvo!</span><br />
            <button
                className='btn btn-sm btn-success w-50'
                onClick={() => {
                    setIsVisible(false);
                    setIsParentMounted(false);
                    setCountRenderAgenda(prev => prev + 1);
                }}
            >
                Fechar
            </button>
        </div>
    )
}
