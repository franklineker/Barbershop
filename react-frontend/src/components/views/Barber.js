/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Register from './Register';
import styles from '../styles/Barber.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import usePrivateResourceAxios from '../../hooks/usePrivateResourceAxios';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const RESOURCE_URI = "/barber";

export default function Barber() {

    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [incToGetBarbers, setIncToGetBarbers] = useState(0);

    const [isFormOpen, setIsFormOpen] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isEdit, setIsEdit] = useState();
    const [success, setSuccess] = useState(false);

    const privateResourceAxios = usePrivateResourceAxios();

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
            const response = await privateResourceAxios.get(RESOURCE_URI);
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
            const formatedStatus = barber.statusCode === 3000 ? "Ativo" : "Inativo";
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
        setIncToGetBarbers(prev => prev + 1)
    }

    const handleSettingsClose = (type) => {
        if (type === "editCancel") {
            setIsEdit(false);
        } else if (type === "deleteCancel") {
            setIsDelete(false);
        } else if ("success") {
            setIncToGetBarbers(prev => prev + 1);
        }

        setSuccess(false);
    }

    const handleSelectedBarber = (index) => {
        const barber = data.find((current, currentIndex) => currentIndex === index);
        barber.isSelected = barber.isSelected ? false : true;
        setSelectedBarber(barber);
        console.log(barber);
    }

    const handleDeleteWarning = (index) => {
        handleSelectedBarber(index);
        setIsDelete(true);
        setIsEdit(false);
    }

    const handleEditFrom = (index) => {
        handleSelectedBarber(index);
        setIsEdit(true);
        setIsDelete(false);
    }

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            console.log("update => ", selectedBarber)
            await privateResourceAxios.put(RESOURCE_URI, selectedBarber);
            setIsEdit(false);
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {


        try {
            await privateResourceAxios.delete(`${RESOURCE_URI}/${selectedBarber.id}`);
            setIsDelete(false);
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBarbers();
    }, [incToGetBarbers])

    return (
        <section className={styles.container}>
            <div className='d-flex justify-content-between'>
                <h1
                    className={"fs-4 fw-bold align-self-center"}
                >
                    Barbeiros
                </h1>
                <button
                    onClick={(e) => setIsFormOpen(true)}
                    className={`${styles.addButton} btn btn-sm`}>
                    Novo +
                </button>
            </div>
            <div className={styles.tableContainer} >
                <table style={{ width: "100%" }} {...table.getTableProps()}>
                    <thead key={1}>
                        {table.headerGroups.map(headerGroup => (
                            <tr
                                className={styles.tableHeader}
                                {...headerGroup.getHeaderGroupProps()}
                                key={1}
                            >
                                {headerGroup.headers.map((column) => {
                                    return (
                                        <th
                                            className='p-2'
                                            {...column.getHeaderProps()}
                                            key={column.id}
                                        >
                                            {column.render("Header")}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody
                        className={styles.tableBody}
                        {...table.getTableBodyProps()}
                        key={2}
                    >
                        {table.rows.map((row, rowIndex) => {
                            table.prepareRow(row);
                            return (
                                <tr
                                    className={styles.tableRow}
                                    {...row.getRowProps()}
                                    key={rowIndex}
                                >
                                    {row.cells.map((cell, cellIndex) => (
                                        (cellIndex !== row.cells.length - 1 ?
                                            <td
                                                className='p-2 fw-bold'
                                                {...cell.getCellProps()}
                                                key={cellIndex}
                                            >
                                                <span
                                                    className={
                                                        cell.column.id === 'statusDescription' ? (
                                                            cell.value === 'Ativo' ? styles.completed : styles.pending
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
                                                    className={isFormOpen || isDelete || isEdit || success
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
                                                    className={isFormOpen || isDelete || isEdit || success
                                                        ? styles.offscreen
                                                        :
                                                        (`${styles.settingsButton} ${styles.trashButton} mx-2`)
                                                    }
                                                    onClick={() => handleDeleteWarning(rowIndex)}
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
                success ?

                    <div className={`${styles.success}`}>
                        <FontAwesomeIcon icon={faCheckCircle} className='text-success fs-5 mx-2 mb-1' />
                        <span className='fs-6'>
                            {isDelete ? 'Exculído!' : 'Salvo!'}
                        </span><br />
                        <button
                            className='btn btn-sm btn-light w-50'
                            onClick={() => handleSettingsClose("success")}
                        >
                            Fechar
                        </button>
                    </div>
                    :
                    null
            }
            {
                isFormOpen ? <div className={styles.formContainer}>
                    <Register
                        parentData={{
                            title: "Cadastrar Barbeiro",
                            isCalledFromParent: true,
                            apiPath: "/barber",
                            parentName: "Barbeiro"
                        }}
                        dataToParent={handleDataFromChild} />
                </div> : null
            }
            {
                isDelete ?
                    <div className={styles.settingsContainer}>
                        <div className={styles.delete}>
                            <h3 className='fs-5 mb-5 text-center'><span>Tem certeza que deseja excluir o barbeiro <strong>{selectedBarber?.name}</strong>?</span></h3>
                            <div className='d-flex justify-content-around'>
                                <button className='btn btn-success w-25' onClick={handleDelete}>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => handleSettingsClose("deleteCancel")}>Não</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                isEdit ?
                    <div className={`${styles.settingsContainer}`}>
                        <form className={`${styles.form}`} onSubmit={(e) => handleEdit(e)}>
                            <h3 className='fs-5 align-self-center mb-2'>Editar</h3>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                type='text'
                                name='email'
                                className={`${styles.input} text-light`}
                                value={selectedBarber?.email}
                                disabled />
                            <label htmlFor='name'>Nome</label>
                            <input
                                type='text'
                                name='name'
                                className={styles.input}
                                value={selectedBarber?.name}
                                onChange={(e) => setSelectedBarber(prev => ({ ...prev, name: e.target.value }))} />
                            <label htmlFor='phone'>Telefone</label>
                            <input
                                type='text'
                                name='phone'
                                className={styles.input}
                                value={selectedBarber?.phoneNumber}
                                onChange={(e) => setSelectedBarber(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                            <div className='d-flex justify-content-around mt-4'>
                                <button className='btn btn-success w-25' type='submit'>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => handleSettingsClose("editCancel")}>Não</button>
                            </div>
                        </form>
                    </div>
                    :
                    null
            }

        </section>
    )
}

