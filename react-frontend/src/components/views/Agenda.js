/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import usePrivateResourceAxios from '../../hooks/usePrivateResourceAxios';
import Header from '../templates/Header';
import { useTable } from 'react-table/dist/react-table.development';


const RESOURCE_URI = "/order";

export default function Agenda() {

    const [orders, setOrders] = useState([]);
    const [incToGetOrders, setIncToGetOrders] = useState(0);

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
            accessor: "date"
        },
        {
            Header: "Status",
            accessor: "status"
        }
    ], []);
    const data = useMemo(() => orders.map(order => {
        const status = order.statusCode === 2000 ? "Pendente" : "Concluído";
        console.log(order)
        return ({
            ...order,
            barber: order.barber.name,
            customer: order.customer.name,
            status
        })
    }), [orders])
    const table = useTable({ columns, data });

    const getOrders = async () => {

        try {
            const response = await privateResourceAxios.get(RESOURCE_URI);
            setOrders(response?.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getOrders();
    }, [incToGetOrders])

    return (
        <section>
            <h1>Agenda</h1>
            <table {...table.getTableProps()}>
                <thead>
                    {table.headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={1}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))
                    }
                </thead>
                <tbody>
                    {table.rows.map(row => {
                        table.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.original.id}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td key={cellIndex}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}
