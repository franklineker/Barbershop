import React, { useEffect, useRef, useState } from 'react'
import useBarbers from '../hooks/useBarbers';
import styles from '../styles/Barber.module.css';
import usePrivateResourceAxios from '../hooks/usePrivateResourceAxios';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import useAvaliability from '../hooks/useAvailability';
import 'react-calendar/dist/Calendar.css';
import Success from './Success';

const ORDERS_URI = "/order";
const HOURS = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
]

export default function UpdateOrderForm({ setIsVisible, selectedOrder, setSelectedOrder }) {

    const { barbers } = useBarbers();
    const { availability } = useAvaliability();
    const privateResourceAxios = usePrivateResourceAxios();


    const calendarRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);


    const handleOrderUpdate = async (event) => {
        event.preventDefault();
        const dateTime = `${selectedOrder?.dateToSave}T${selectedOrder?.hour}:00Z`;
        const orderToUpdate = {
            id: selectedOrder?.id,
            barberId: Number.parseInt(selectedOrder?.barberId),
            dateTime,
            statusCode: selectedOrder?.statusCode
        }
        try {
            await privateResourceAxios.put(ORDERS_URI, orderToUpdate);
            setSuccess(true);
            setSelectedOrder(null);
        } catch (error) {
            alert("Não foi possível atualizar.");
            console.log(error);
        }
    }

    const handleOrderBarberToUpdate = (barberId) => {
        const barber = barbers.find(barber => barber.id === Number.parseInt(barberId));
        setSelectedOrder((prev) => ({ ...prev, barber: barber.name, barberId: barberId }));
    }

    const handleSelectedDate = (value, event) => {
        setIsCalendarOpen(false);
        const newDate = new Date(value);
        const dateToDisplay = format(newDate, 'dd-MM-yyyy');
        const dateToSave = format(newDate, 'yyyy-MM-dd');

        setSelectedOrder(prev => ({ ...prev, dateToSave, dateToDisplay }))
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (calendarRef.current && !calendarRef.current.contains(e.target)) {
                setIsCalendarOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [calendarRef]);

    return (
        <>
            <div className={success ? styles.offscreen : styles.settingsContainer}>
                <form className={`${styles.form}`} onSubmit={(e) => handleOrderUpdate(e)}>
                    <h3 className='fs-5 align-self-center mb-2'>Editar</h3>
                    <label htmlFor='customer'>Cliente</label>
                    <input
                        type='text'
                        name='customer'
                        className={`${styles.input} text-light`}
                        disabled
                        value={selectedOrder?.customer} />
                    <label htmlFor='barber'>Barbeiro</label>
                    <select
                        className={styles.input}
                        value={selectedOrder?.barber}
                        onChange={(e) => handleOrderBarberToUpdate(e.target.value)}
                    >
                        <option defaultChecked>{selectedOrder?.barber}</option>
                        {barbers.map(barber => (
                            <option key={barber.id} value={barber.id}>
                                {barber.name}
                            </option>
                        ))}
                    </select>
                    <label>Data</label>
                    {isCalendarOpen ?
                        <div ref={calendarRef}>
                            <Calendar
                                className={styles.calendar}
                                onClickDay={(value, event) => handleSelectedDate(value, event)}
                                tileDisabled={({ activeStartDate, date, view }) => date.setHours(1) < new Date().setHours(0)} />
                        </div>
                        :
                        <select className={styles.input} onClick={() => setIsCalendarOpen(true)}>
                            <option>{selectedOrder?.dateToDisplay}</option>
                        </select>
                    }
                    <label>Hora</label>
                    <select className={styles.input} onChange={(e) => setSelectedOrder(prev => ({ ...prev, hour: e.target.value }))}>
                        <option defaultChecked className='bg-primary text-light'>{selectedOrder?.hour}</option>
                        {HOURS.slice(HOURS.indexOf(availability?.start), HOURS.indexOf(availability?.end) + 1)
                            .map(hour => (
                                <option key={hour} value={hour}>{hour}</option>
                            ))}
                    </select>
                    <div className='d-flex justify-content-around mt-4'>
                        <button className='btn btn-success w-25' type='submit'>Sim</button>
                        <button className='btn btn-danger w-25' onClick={() => setIsVisible(false)}>Não</button>
                    </div>
                </form>
            </div>
            {success && <Success setIsVisible={setSuccess} setIsParentMounted={setIsVisible} />}
        </>
    )
}
