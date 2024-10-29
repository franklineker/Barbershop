import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/Barber.module.css';
import { privateResourceAxios } from '../api/axios';
import useCustomers from '../hooks/useCustomers';
import useBarbers from '../hooks/useBarbers';
import useOrders from '../hooks/useOrders';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import useAvaliability from '../hooks/useAvailability';
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

export default function CreateOrderForm({ setIsVisible }) {

    const calendarRef = useRef(null);
    const formCreteRef = useRef(null);


    const { barbers } = useBarbers();
    const { customers } = useCustomers();
    const { orders } = useOrders();
    const { availability } = useAvaliability();

    const [success, setSuccess] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState({});
    const [newOrder, setNewOrder] = useState({});

    const pickedDateTime = useMemo(() => orders.map(order => format(order?.dateTime, 'yyyy-MM-dd HH:mm')), [orders]);

    const handleSelectedDate = (value, event) => {
        setIsCalendarOpen(false);
        const newDate = new Date(value);
        const dateToDisplay = format(newDate, 'dd-MM-yyyy');
        const dateToSave = format(newDate, 'yyyy-MM-dd');

        if (formCreteRef.current?.contains(event.target)) {
            setNewOrder(prev => ({ ...prev, date: dateToSave }))
        }

        setSelectedOrder(prev => ({ ...prev, dateToSave, dateToDisplay }))
    }

    const handleSettingsClose = () => {
        setNewOrder(null);
        setSelectedOrder(null);
        setSuccess(false);
        setIsVisible(false);
    }

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        const dateTime = `${newOrder?.date}T${newOrder?.hour}:00.000Z`;
        const body = {
            barberId: newOrder?.barberId,
            customerId: newOrder?.customerId,
            dateTime,
            statusCode: 2000
        };
        console.log(newOrder)
        try {
            await privateResourceAxios.post(ORDERS_URI, body);
            setSuccess(true);
            setNewOrder(null);
            setSelectedOrder(null);
        } catch (error) {
            alert('Não foi possível salvar.');
            console.log(error);
        }
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
                <form ref={formCreteRef} className={`${styles.form}`} onSubmit={(e) => handleCreateOrder(e)}>
                    <h3 className='fs-5 align-self-center mb-2'>Agendar</h3>
                    <label htmlFor='customer'>Cliente</label>
                    <select
                        className={styles.input}
                        value={newOrder?.barber}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, customerId: e.target.value }))}
                    >
                        {newOrder?.customerId ?
                            null
                            :
                            <option
                                defaultChecked
                                className='bg-primary text-light'>
                                Selecione...
                            </option>
                        }
                        {customers.sort((a, b) => {
                            if (a.name.toUpperCase() > b.name.toUpperCase()) {
                                return 1;
                            } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }).map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor='barber'>Barbeiro</label>
                    <select
                        className={styles.input}
                        disabled={!newOrder?.customerId}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, barberId: e.target.value }))}
                    >
                        {newOrder?.barberId ?
                            null
                            :
                            <option
                                defaultChecked
                                className='bg-primary text-light'>
                                Selecione...
                            </option>
                        }
                        {barbers.sort((a, b) => {
                            if (a.name.toUpperCase() > b.name.toUpperCase()) {
                                return 1;
                            } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }).map(barber => (barber.statusCode === 3001 ?
                            null
                            :
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
                        <select
                            className={styles.input}
                            disabled={!newOrder?.barberId}
                            onClick={() => setIsCalendarOpen(true)}>
                            {newOrder?.date ?
                                null
                                :
                                <option>Selecione...</option>
                            }
                            <option>
                                {selectedOrder?.dateToDisplay}
                            </option>
                        </select>
                    }
                    <label>Hora</label>
                    <select
                        className={styles.input}
                        disabled={!newOrder?.date}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, hour: e.target.value }))}
                    >
                        {newOrder?.hour ?
                            null
                            :
                            <option
                                onClick={() => setNewOrder(prev => ({ ...prev, hour: null }))}
                                defaultChecked
                                className='bg-primary text-light'>
                                Selecione...
                            </option>
                        }
                        {HOURS.slice(HOURS.indexOf(availability?.start), HOURS.indexOf(availability?.end) + 1)
                            .map(hour => (pickedDateTime.includes(`${selectedOrder?.dateToSave} ${hour}`) ?
                                null
                                :
                                <option key={hour} value={hour}>{hour}</option>
                            )
                            )
                        }
                    </select>
                    <div className='d-flex justify-content-around mt-4'>
                        <button
                            disabled={!newOrder?.customerId || !newOrder?.barberId || !newOrder?.date || !newOrder?.hour}
                            className='btn btn-primary'
                            style={{ width: '7rem' }}
                            type='submit'>Salvar</button>
                        <button
                            className='btn btn-danger'
                            style={{ width: '7rem' }}
                            onClick={() => handleSettingsClose()}>Cancelar</button>
                    </div>
                </form>
            </div>
            {success && <Success setIsVisible={setSuccess} setIsParentMounted={setIsVisible} />}
        </>
    )
}
