import { faPencilSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Register from './Register';
import styles from '../styles/Barber.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { privateResourceAxios } from '../../api/axios';

const RESOURCE_URI = process.env.REACT_APP_RESOURCE_BASE_URL + "/barber";

export default function Barber() {

    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [incToGetBarbers, setIncToGetBarbers] = useState(0);

    const [isFormOpen, setIsFormOpen] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isEdit, setIsEdit] = useState();
    console.log("barbers")

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
        },
        {
            Header: "",
            accessor: "config"
        }
    ], []);

    const getBarbers = async () => {
        try {
            const response = await axios.get(RESOURCE_URI);
            setBarbers(response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                console.log("error message: ", error);
                alert("Servidor não está respondendo.");
            }
        }
    }

    var data = useMemo(() => {
        return barbers.map(barber => {
            const formatedStatus = barber.statusDescription.charAt(0) + barber.statusDescription.slice(1).toLowerCase();
            const formatedBarbers = {
                ...barber,
                statusDescription: formatedStatus,
                isSelected: false
            }
            return formatedBarbers;
        });
    }, [barbers]);
    const table = useTable({ columns, data });

    const handleDataFromChild = (data) => {
        setIsFormOpen(data.isFormOpen)
    }

    const handleSelectedBarber = (index) => {
        const barber = data.find((current, currentIndex) => currentIndex === index);
        barber.isSelected = barber.isSelected ? false : true;
        setSelectedBarber(barber);
        console.log(data);
    }

    const openDeleteAlert = (index) => {
        handleSelectedBarber(index);
        setIsDelete(true);
    }

    const handleDelete = async () => {
        try {
            const response = await privateResourceAxios.delete(`${RESOURCE_URI}/${selectedBarber.id}`);
            alert(`Barbeiro ${response?.data?.name} exculído com sucesso.`);
            setIncToGetBarbers(prev => prev + 1);
            setIsDelete(false);
        } catch (error) {
            console.log(error);
            alert(error?.response?.data);
        }
    }

    useEffect(() => {
        getBarbers();
    }, [incToGetBarbers])

    return (
        <section className={styles.container}>
            <button
                onClick={(e) => setIsFormOpen(true)}
                className={isFormOpen || isDelete || isEdit ? styles.offscreen : `${styles.addButton} btn btn-md`}>
                Novo +
            </button>
            <h1
                className={isFormOpen || isDelete || isEdit ? styles.offscreen : "fs-4 fw-bold align-self-center"}
            >
                Barbeiros
            </h1>
            <div className={isFormOpen || isDelete || isEdit ? styles.offscreen : styles.tableContainer} >

                <table style={{ width: "100%" }} {...table.getTableProps()}>
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
                                            <td className='p-1 fw-bold' key={cellIndex} {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                            :
                                            <td className='d-flex py-2 justify-content-end'>
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faPencil}
                                                    className={isFormOpen ? styles.offscreen : (`${styles.settingsButton} ${styles.pencilButton} mx-2`)}
                                                    onClick={(e) => setIsEdit(true)}
                                                />
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faTrash}
                                                    className={isFormOpen ? styles.offscreen : (`${styles.settingsButton} ${styles.trashButton} mx-2`)}
                                                    onClick={() => openDeleteAlert(rowIndex)}
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
            {
                isFormOpen ? <div className={styles.formContainer}>
                    <Register parentData={{ title: "Cadastrar Barbeiro", isCalledFromParent: true, apiPath: "/barber", parentName: "Barbeiro" }} dataToParent={handleDataFromChild} />
                </div> : null
            }
            {
                isDelete ?
                    <div className={styles.settingsContainer}>
                        <div className={styles.delete}>
                            <h3 className='fs-5 mb-5'><span>Tem certeza que deseja excluir o barbeiro <strong>{selectedBarber?.name}</strong>?</span></h3>
                            <div className='d-flex justify-content-around'>
                                <button className='btn btn-success w-25' onClick={handleDelete}>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => setIsDelete(false)}>Não</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                isEdit ?
                    <div className={`${styles.settingsContainer}`}>
                        <form className={`p-3 bg-dark text-light`}>
                            <h3 className='fs-5'>Editar</h3>
                            <button onClick={() => setIsEdit(false)}>Cancelar</button>
                        </form>
                    </div>
                    :
                    null
            }

        </section>
    )
}

