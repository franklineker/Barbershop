/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import usePrivateResourceAxios from '../../hooks/usePrivateResourceAxios';
import { useTable } from 'react-table/dist/react-table.development';
import styles from "../styles/Barber.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const ORDERS_URI = "/order";
const BARBERS_URI = "/barber";
const AVAILABILITY_URI = "/availability/1";
var HOURS = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
]

export default function Agenda() {

    const [orders, setOrders] = useState([]);
    const [incToGetOrders, setIncToGetOrders] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToUpdate, setOrderToUpdate] = useState({
        id: null,
        barberId: null,
        date: null
    });


    const [barbers, setBarbers] = useState([]);
    const [selectedhour, setselectedHour] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availability, setAvailability] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isEdit, setIsEdit] = useState();
    const [deleteSuccess, setDeleteSuccess] = useState(false);//dfsdaf
    const [editSuccess, setEditSuccess] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isHoursOpen, setIsHoursOpen] = useState(false);
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);


    const privateResourceAxios = usePrivateResourceAxios();

    const columns = useMemo(() => [
        {
            Header: "Cliente",
            accessor: "customer"
        },
        {
            Header: "Barbeiro",
            accessor: "barber"
        },
        {
            Header: "Data",
            accessor: "dateToDisplay"
        },
        {
            Header: "Hora",
            accessor: "hour"
        },
        {
            Header: "Status",
            accessor: "status"
        },
        {
            Header: "",
            accessor: "config"
        }
    ], []);
    const data = useMemo(() => orders.map(order => {
        const status = order.statusCode === 2000 ? "Pendente" : "Concluído";
        let date = new Date(order.date);
        let day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
        let month = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const dateToDisplay = `${day}-${month}-${date.getFullYear()}`;
        const dateToSave = `${date.getFullYear()}-${month}-${day}`;
        const hour = (
            (date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours()) +
            ":" +
            (date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes())
        );
        return ({
            ...order,
            isSelected: false,
            barber: order.barber.name,
            customer: order.customer.name,
            status,
            hour,
            dateToSave,
            dateToDisplay
        })
    }), [orders])
    const table = useTable({ columns, data });

    const getOrders = async () => {

        try {
            const response = await privateResourceAxios.get(ORDERS_URI);
            setOrders(response?.data);
        } catch (error) {
        }
    }

    const getBarbers = async () => {
        try {
            const response = await privateResourceAxios.get(BARBERS_URI);
            setBarbers(response.data);
        } catch (error) {
        }
    }

    const getAvailabiliy = async () => {
        try {
            const response = await privateResourceAxios.get(AVAILABILITY_URI);
            const [startHours, startMinutes] = response?.data?.start.split(":");
            const [endHours, endMinutes] = response?.data?.end.split(":");
            const currentAvailability = {
                id: response.data.id,
                start: `${startHours}:${startMinutes}`,
                end: `${endHours}:${endMinutes}`
            }
            const startSliceIndex = HOURS.indexOf(currentAvailability.start);
            const endSliceIndex = HOURS.indexOf(currentAvailability.end);

            HOURS = HOURS.slice(startSliceIndex, endSliceIndex + 1);

            setAvailability(currentAvailability);
        } catch (error) {
        }
    }

    const handleAvailabilityStart = (startSlice) => {
        const start = HOURS.indexOf(startSlice);
        HOURS = HOURS.slice(start);
    }

    const handleAvailabilityEnd = (endSlice) => {
        const end = HOURS.indexOf(endSlice);
        HOURS = HOURS.slice(end);
    }

    const handleSaveAvailability = async () => {
        // try {
        //     const response = await privateResourceAxios.put(AVAILABILITY_URI,)
        // } catch (error) {
        // }
    }

    const handleSettingsClose = (type) => {
        if (type === "edit") {
            setIsEdit(false);
        } else if (type === "editSuccess") {
            setEditSuccess(false);
        } else if (type === "delete") {
            setIsDelete(false);
        } else if (type === "deleteSuccess") {
            setDeleteSuccess(false);
        }
        setIncToGetOrders(prev => prev + 1);
    }

    const handleSelectedOrder = (index) => {
        let order = data.find((current, currentIndex) => currentIndex === index);
        order.isSelected = order.isSelected ? false : true;
        setSelectedOrder(order);
        setOrderToUpdate(prev => ({ ...prev, id: order.id }))
    }

    const handleDeleteWarning = (index) => {
        handleSelectedOrder(index);
        setIsDelete(true);
        setIsEdit(false);
    }

    const handleEditFrom = (index) => {
        handleSelectedOrder(index);
        setIsEdit(true);
        setIsDelete(false);
    }

    const handleOrderBarberToUpdate = (barberId) => {
        const barber = barbers.find(barber => barber.id === Number.parseInt(barberId));
        setSelectedOrder((prev) => ({ ...prev, barber: barber.name, barberId: barberId }));
    }

    const handleSelectedDate = (value, event) => {
        setIsCalendarOpen(false);
        const newDate = new Date(value);
        let day = newDate.getDate().toString().length === 1 ? `0${newDate.getDate()}` : newDate.getDate();
        let month = (newDate.getMonth() + 1).toString().length === 1 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const dateToDisplay = `${day}-${month}-${newDate.getFullYear()}`;
        const dateToSave = `${newDate.getFullYear()}-${month}-${day}`;

        setSelectedDate(dateToDisplay);
        setSelectedOrder(prev => ({ ...prev, date: dateToSave }))
    }

    const handleSelectedHour = (hour) => {
        setselectedHour(hour);
        setSelectedOrder(prev => ({ ...prev, hour }))
        setIsHoursOpen(false);
    }

    const handleEdit = async (event) => {
        event.preventDefault();
        const date = `${selectedOrder.dateToSave}T${selectedOrder.hour}:00Z`;
        const orderToUpdate = {
            id: selectedOrder.id,
            barberId: Number.parseInt(selectedOrder.barberId),
            date: date,
            statusCode: selectedOrder.statusCode
        }
        console.log(orderToUpdate)
        try {
            const response = await privateResourceAxios.put(ORDERS_URI, orderToUpdate);
            console.log(response)
            setIsEdit(false);
            setEditSuccess(true);
        } catch (error) {
        }
    }

    const handleDelete = async () => {
        try {
            await privateResourceAxios.delete(`${ORDERS_URI}/${selectedOrder.id}`);
            setIsDelete(false);
            setDeleteSuccess(true);
        } catch (error) {
        }
    }

    useEffect(() => {
        getOrders();
    }, [incToGetOrders]);

    useEffect(() => {
        getBarbers();
    }, []);

    useEffect(() => {
        getAvailabiliy();
    }, []);

    return (
        <section className={styles.container}>
            <div className='d-flex justify-content-between'>
                <h1
                    className={"fs-4 fw-bold align-self-center"}
                >
                    Agenda
                </h1>
                <button
                    onClick={(e) => setIsAvailabilityOpen(true)}
                    className={`${styles.availabilityButton} btn btn-sm`}>
                    Disponibilidade
                </button>
            </div>
            <div className={styles.tableContainer}>
                <table style={{ width: "100%" }} {...table.getTableProps()}>
                    <thead style={{ width: "100%" }} key={1}>
                        {table.headerGroups.map(headerGroup => (
                            <tr className={styles.tableHeader} {...headerGroup.getHeaderGroupProps()} key={1}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        className='p-2'
                                        {...column.getHeaderProps()}
                                        key={column.id}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))
                        }
                    </thead>
                    <tbody
                        className={styles.tableBody}
                        {...table.getTableBodyProps()}
                        key={2}
                    >
                        {table.rows.map((row, rowIndex) => {
                            table.prepareRow(row);
                            return (
                                <tr className={styles.tableRow} {...row.getRowProps()} key={row.original.id}>
                                    {row.cells.map((cell, cellIndex) => (
                                        cellIndex !== row.cells.length - 1
                                            ?
                                            <td
                                                className='p-2 fw-bold'
                                                {...cell.getCellProps()}
                                                key={cellIndex}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                            :
                                            <td className='d-flex py-2 justify-content-end' key={cellIndex}>
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faPencil}
                                                    className={isFormOpen || isDelete || isEdit || editSuccess || deleteSuccess
                                                        ?
                                                        styles.offscreen
                                                        :
                                                        (`${styles.settingsButton} ${styles.pencilButton} mx-2`)
                                                    }
                                                    onClick={(e) => handleEditFrom(rowIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faTrash}
                                                    className={isFormOpen || isDelete || isEdit || editSuccess || deleteSuccess
                                                        ? styles.offscreen
                                                        :
                                                        (`${styles.settingsButton} ${styles.trashButton} mx-2`)
                                                    }
                                                    onClick={() => handleDeleteWarning(rowIndex)}
                                                />
                                            </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* if necessary, create a form to save an appointment. The idea is that appointments should be make from customer's end.
            {
                isFormOpen
                    ?
                    <div className={styles.formContainer}>
                        <form>
                            <h3>Criar agendamento</h3>
                            <label>Cliente</label>
                            <select>
                                
                            </select>
                        </form>
                    </div>
                    :
                    null
            } */}
            {
                deleteSuccess ?
                    <div className={`${styles.editSuccess}`}>
                        <FontAwesomeIcon icon={faCheckCircle} className='text-success fs-5 mx-2 mb-1' />
                        <span className='fs-6'>
                            Excluído!
                        </span><br />
                        <button
                            className='btn btn-sm btn-light w-50'
                            onClick={() => handleSettingsClose("deleteSuccess")}
                        >
                            Fechar
                        </button>
                    </div>
                    :
                    null
            }
            {
                isDelete ?
                    <div className={styles.settingsContainer}>
                        <div className={styles.delete}>
                            <h3 className='fs-5 mb-5 text-center'>
                                <span>Tem certeza que deseja excluir o agendamento do cliente <strong>{selectedOrder?.customer}</strong>?</span>
                            </h3>
                            <div className='d-flex justify-content-around'>
                                <button className='btn btn-success w-25' onClick={handleDelete}>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => handleSettingsClose("delete")}>Não</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                editSuccess ?
                    <div className={`${styles.editSuccess}`}>
                        <FontAwesomeIcon icon={faCheckCircle} className='text-success fs-5 mx-2 mb-1' />
                        <span className='fs-6'>
                            Salvo!
                        </span><br />
                        <button
                            className='btn btn-sm btn-light w-50'
                            onClick={() => handleSettingsClose("editSuccess")}
                        >
                            Fechar
                        </button>
                    </div>
                    :
                    null
            }
            {
                isEdit ?
                    <div className={`${styles.settingsContainer}`}>
                        <form className={`${styles.edit}`} onSubmit={(e) => handleEdit(e)}>
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
                                <option defaultChecked>{selectedOrder.barber}</option>
                                {barbers.map(barber => (
                                    <option key={barber.id} value={barber.id}>
                                        {barber.name}
                                    </option>
                                ))}
                            </select>
                            <label>Data</label>
                            <select className={styles.input} onClick={() => setIsCalendarOpen(true)}>
                                {isCalendarOpen ?
                                    null
                                    :
                                    <option>{selectedOrder.dateToDisplay}</option>
                                }
                            </select>
                            {isCalendarOpen ?
                                <div>
                                    <Calendar className={styles.calendar} onClickDay={(value, event) => handleSelectedDate(value, event)} />
                                </div>
                                :
                                null
                            }
                            <label>Hora</label>
                            <select className={styles.input} onChange={(e) => handleSelectedHour(e.target.value)}>
                                <option defaultChecked>{selectedOrder.hour}</option>
                                {HOURS.map(hour => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <div className='d-flex justify-content-around mt-4'>
                                <button className='btn btn-success w-25' type='submit'>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => handleSettingsClose("edit")}>Não</button>
                            </div>
                        </form>
                    </div>
                    :
                    null
            }
            {isAvailabilityOpen ?
                <div className={`${styles.settingsContainer} flex-column justify-content-start`}>
                    <form className='d-flex flex-column'>
                        <h3 className='fs-5 mb-5'>Configurar disponibilidade</h3>
                        <label>Selecione o início</label>
                        <select className={styles.input} onChange={(e) => handleAvailabilityStart(e.target.value)}>
                            {HOURS.map(hour => (
                                <option key={hour} value={hour}>{availability.start}</option>
                            ))}
                        </select>
                        <label>Selecione o fim</label>
                        <select className={styles.input} onChange={(e) => handleAvailabilityEnd(e.target.value)}>
                            {HOURS.map(hour => (
                                <option key={hour} value={hour}>{availability.end}</option>
                            ))}
                        </select>
                        <button onClick={e => { e.preventDefault(); setIsAvailabilityOpen(false) }}>Salvar</button>
                    </form>
                </div>
                :
                null
            }
        </section>
    )
}
