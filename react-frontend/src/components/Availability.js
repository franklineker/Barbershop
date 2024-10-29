import { useState } from 'react';
import styles from '../styles/Barber.module.css';
import { privateResourceAxios } from '../api/axios';
import Success from './Success';
import useAvaliability from '../hooks/useAvailability';

const AVAILABILITY_URI = "/availability";
const HOURS = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

export default function Availability({ setIsVisible }) {

    const { availability, setAvailability } = useAvaliability();

    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSaveAvailability = async (e) => {
        e.preventDefault();

        try {
            await privateResourceAxios.put(AVAILABILITY_URI, availability);
            setIsSaveButtonEnabled(false);
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={success ? styles.offscreen : `${styles.settingsContainer} flex-column justify-content-start`}>
                <p className={`bg-danger p-1 rounded ${availability?.end <= availability?.start ? '' : styles.offscreen}`}>
                    O horário final deve ser maior que o inicial.
                </p>
                <form className={'d-flex flex-column'} onSubmit={(e) => handleSaveAvailability(e)}>
                    <h3 className='fs-5 mb-5'>Configurar disponibilidade</h3>
                    <label>Selecione o início</label>
                    <select
                        value={availability?.start}
                        className={styles.input}
                        onChange={(e) => {
                            setAvailability((prev) => ({ ...prev, start: e.target.value }));
                            setIsSaveButtonEnabled(true);
                        }}>
                        {HOURS.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <label>Selecione o fim</label>
                    <select
                        value={availability?.end}
                        className={styles.input}
                        onChange={(e) => {
                            setAvailability((prev) => ({ ...prev, end: e.target.value }));
                            setIsSaveButtonEnabled(true);
                        }}
                    >
                        {HOURS.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <div className='d-flex justify-content-around mt-4'>
                        <button
                            style={{ width: "7rem" }}
                            className='btn btn-primary'
                            onClick={() => setSuccess(true)}
                            type='submit'
                            disabled={isSaveButtonEnabled && availability?.start < availability?.end ? false : true}>
                            Salvar
                        </button>
                        <button
                            style={{ width: "7rem" }}
                            className='btn btn-danger'
                            onClick={() => setIsVisible(false)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            {success && <Success setIsVisible={setSuccess} setIsParentMounted={setIsVisible} />}
        </>
    )
}
