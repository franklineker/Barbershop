/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development';
import usePrivateResourceAxios from '../../hooks/usePrivateResourceAxios';
import styles from '../styles/Barber.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

const RESOURCE_URI = "/customer";
export default function Customer() {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [incToGetCustomers, setIncToGetCustomers] = useState();

    const privateResourceAxios = usePrivateResourceAxios();


    const data = useMemo(() => customers.map(customer => {
        const isAdult = customer.isAdult ? "Sim" : "Não";
        return ({
            ...customer,
            isAdult,
            isSelected: false
        })
    }), [customers]);
    const columns = useMemo(() => [
        {
            Header: "Nome",
            accessor: "name"
        },
        {
            Header: "E-mail",
            accessor: "email"
        },
        {
            Header: "Telefone",
            accessor: "phoneNumber"
        },
        {
            Header: "Adulto",
            accessor: "isAdult"
        },
        {
            Header: "",
            accessor: "config"
        }
    ], [])
    const table = useTable({ columns, data });

    const getCustomers = async () => {
        try {
            const response = await privateResourceAxios.get(RESOURCE_URI);
            setCustomers(response?.data);
            console.log(response.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCustomers();
    }, [incToGetCustomers]);

    return (
        <section>
            <div>Customer</div>
            <div>
                <table {...table.getTableProps()}>
                    <thead>
                        {table.headerGroups.map(headerGroup => (
                            <tr className={styles.tableHeader} key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) =>
                                    <th className='p-2' key={column.id} {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>

                                )}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={styles.tableBody} {...table.getTableBodyProps()}>
                        {table.rows.map((row, rowIndex) => {
                            table.prepareRow(row);
                            return (
                                <tr
                                    key={rowIndex}
                                    className={styles.tableRow}
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell, cellIndex) => (
                                        (cellIndex !== 4 ?
                                            <td className='p-2 fw-bold' key={cellIndex} {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                            :
                                            <td className='d-flex py-2 justify-content-end'>
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faPencil}
                                                    className={false ? styles.offscreen : (`${styles.settingsButton} ${styles.pencilButton} mx-2`)}
                                                // onClick={(e) => handleEditFrom(rowIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faTrash}
                                                    className={false ? styles.offscreen : (`${styles.settingsButton} ${styles.trashButton} mx-2`)}
                                                // onClick={() => handleDeleteWarning(rowIndex)}
                                                />
                                            </td>
                                        )
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
