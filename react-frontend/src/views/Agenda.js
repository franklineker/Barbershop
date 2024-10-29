/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development';
import styles from "../styles/Barber.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSortBy } from 'react-table';
import { format } from 'date-fns';
import Availability from '../components/Availability';
import CreateOrderForm from '../components/CreateOrderForm';
import useOrders from '../hooks/useOrders';
import useAgendaContext from '../hooks/useAgendaContext';
import UpdateOrderForm from '../components/UpdateOrderForm';
import DeleteOrder from '../components/DeleteOrder';

export default function Agenda() {

    const { orders, fetchOrders } = useOrders();
    const { countRenderAgenda } = useAgendaContext();
    const [selectedOrder, setSelectedOrder] = useState(null);


    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);


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
        const date = new Date(order.dateTime);
        const dateToDisplay = format(date, 'dd-MM-yyyy');
        const dateToSave = format(date, 'yyyy-MM-dd');
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
            dateToDisplay,
        })
    }), [orders])

    const table = useTable({
        columns,
        data,
        initialState: {
            sortBy: [
                {
                    id: 'status'
                }
            ]
        }
    }, useSortBy);


    const handleSelectedOrder = (index) => {
        let order = data.find((current, currentIndex) => currentIndex === index);
        order.isSelected = order.isSelected ? false : true;
        setSelectedOrder(order);
    }

    const handleDeleteWarning = (index) => {
        handleSelectedOrder(index);
        setIsDelete(true);
        setIsEdit(false);
    }

    const handleEditFromVisibility = (index) => {
        handleSelectedOrder(index);
        setIsEdit(true);
        setIsDelete(false);
    }

    useEffect(() => {
        fetchOrders();
    }, [countRenderAgenda]);
    console.log("agenda")


    return (
        <section className={styles.container}>
            <div className='d-flex justify-content-between'>
                <h1
                    className={"fs-4 fw-bold align-self-center"}
                >
                    Agenda
                </h1>
                <div>
                    <button
                        onClick={(e) => setIsAvailabilityOpen(true)}
                        className={`${styles.availabilityButton} btn btn-sm`}>
                        Disponibilidade
                    </button>
                    <button
                        onClick={(e) => setIsCreate(true)}
                        className={`${styles.availabilityButton} btn btn-sm`}>
                        Novo +
                    </button>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <table style={{ width: "100%" }} {...table.getTableProps()}>
                    <thead style={{ width: "100%" }} key={1}>
                        {table.headerGroups.map(headerGroup => (
                            <tr className={`${styles.tableHeader}`} {...headerGroup.getHeaderGroupProps()} key={1}>
                                {headerGroup.headers.map((column, colIndex) => (
                                    <th
                                        className={`${column.id === 'status' ? 'px-3' : 'p-2'}`}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        key={column.id}
                                    >
                                        <div className='d-flex'>
                                            <span>{column.render("Header")}</span>
                                        </div>
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
                                                <span
                                                    className={
                                                        cell.column.id === 'status' ? (
                                                            cell.value === 'Concluído' ? styles.completed : styles.pending
                                                        ) : ''
                                                    }
                                                >
                                                    {cell.render("Cell")}
                                                </span>
                                            </td>
                                            :
                                            <td className='d-flex py-2 justify-content-end' key={cellIndex}>
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faPencil}
                                                    className={isDelete || isEdit
                                                        ?
                                                        styles.offscreen
                                                        :
                                                        (`${styles.settingsButton} ${styles.pencilButton} mx-2`)
                                                    }
                                                    onClick={() => handleEditFromVisibility(rowIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faTrash}
                                                    className={isDelete || isEdit
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
            {
                isDelete &&
                <DeleteOrder setIsVisible={setIsDelete} selectedOrder={selectedOrder} />
            }
            {isEdit &&
                <UpdateOrderForm setIsVisible={setIsEdit} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
            }
            {isCreate &&
                <CreateOrderForm setIsVisible={setIsCreate} />
            }
            {isAvailabilityOpen &&
                <Availability setIsVisible={setIsAvailabilityOpen} />}
        </section >
    )
}
