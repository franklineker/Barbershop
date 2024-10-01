import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import BarberForm from './BarberForm';

const RESOURCE_URI = process.env.REACT_APP_RESOURCE_BASE_URL;

export default function Barber() {

    const [barbers, setBarbers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [bodyRowIndex, setBodyRowIndex] = useState(null);
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
            Header: "Status",
            accessor: "statusDescription"
        }
    ], []);
    const getBarbers = async () => {
        console.log("Baarbers componet")
        try {
            const response = await axios.get(`${RESOURCE_URI}/barber`);
            console.log(response.data);
            setBarbers(response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                console.log("error message: ", error);
                alert("Servidor não está respondendo.");
            }
        }
    }
    const data = useMemo(() => barbers.map(barber => {
        const formatedStatus = barber.statusDescription.charAt(0) + barber.statusDescription.slice(1).toLowerCase();
        return ({
            ...barber,
            statusDescription: formatedStatus
        })
    }), [barbers]);
    const table = useTable({ columns, data });

    useEffect(() => {
        getBarbers();
    }, [])

    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
                <table className='w-100' {...table.getTableProps()}>
                    <thead>
                        {table.headerGroups.map(headerGroup => (
                            <tr style={styles.tableHeader} key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className='p-2' key={column.id} {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody style={styles.tableBody} {...table.getTableBodyProps()}>
                        {table.rows.map((row, rowIndex) => {
                            table.prepareRow(row);
                            return (
                                <tr
                                    key={rowIndex}
                                    style={bodyRowIndex == rowIndex ? styles.onRowHover : {}}
                                    onMouseEnter={() => setBodyRowIndex(rowIndex)}
                                    onMouseLeave={() => setBodyRowIndex(null)}
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell, cellIndex) => (
                                        <td className='p-1 fw-bold' key={cellIndex} {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <FontAwesomeIcon
                    type='button' icon={faPlusCircle}
                    style={styles.plusButton}
                    onClick={(e) => setIsFormOpen(true)}
                />
                {isFormOpen ? <BarberForm /> : null}
            </div>
        </>
    )
}

const styles = {
    tableHeader: {
        backgroundColor: "#020430",
        color: "white"
    },
    tableBody: {
        backgroundColor: "#cfd0d1"
    },
    onRowHover: {
        backgroundColor: "#79797a",
        // cursor: "pointer",
        color: "white"
    },
    plusButton: {
        fontSize: "2.3rem",
        color: "#020430",
        alignSelf: "end",
        marginTop: "10px"
    }
}
