import { useState } from 'react'
import Success from './Success'
import styles from '../styles/Barber.module.css'
import usePrivateResourceAxios from '../hooks/usePrivateResourceAxios';

const ORDERS_URI = "/order";

export default function DeleteOrder({ setIsVisible, selectedOrder }) {

    const [success, setSuccess] = useState(false);

    const privateResourceAxios = usePrivateResourceAxios();

    const handleDelete = async () => {
        try {
            await privateResourceAxios.delete(`${ORDERS_URI}/${selectedOrder?.id}`);
            setSuccess(true);
        } catch (error) {
            alert("Não foi possível excluir.");
            console.log(error);
        }
    }

    return (
        <>
            <div className={success ? styles.offscreen : styles.settingsContainer}>
                <div className={styles.delete}>
                    <h3 className='fs-5 mb-5 text-center'>
                        <span>Tem certeza que deseja excluir o agendamento do cliente <strong>{selectedOrder?.customer}</strong>?</span>
                    </h3>
                    <div className='d-flex justify-content-around'>
                        <button className='btn btn-success w-25' onClick={handleDelete}>Sim</button>
                        <button className='btn btn-danger w-25' onClick={() => setIsVisible(false)}>Não</button>
                    </div>
                </div>
            </div>
            {success && <Success setIsVisible={setSuccess} setIsParentMounted={setIsVisible} />}
        </>
    )
}
