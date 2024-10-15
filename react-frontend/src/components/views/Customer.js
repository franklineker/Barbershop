/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development';
import usePrivateResourceAxios from '../../hooks/usePrivateResourceAxios';
import styles from '../styles/Barber.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Register from './Register';

const RESOURCE_URI = "/customer";
export default function Customer() {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [incToGetCustomers, setIncToGetCustomers] = useState(0);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);

    const privateResourceAxios = usePrivateResourceAxios();

    const handleDataFromChild = (data) => {
        setIsFormOpen(data.isFormOpen);
        setIncToGetCustomers(prev => prev + 1);
    }

    const handleSelectedCustomer = (index) => {
        const barber = data.find((current, currentIndex) => currentIndex === index);
        barber.isSelected = barber.isSelected ? false : true;
        setSelectedCustomer(barber);
        console.log(barber);
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
        setSelectedCustomer(null);
        setIncToGetCustomers(prev => prev + 1);
    }

    const handleDeleteWarning = (index) => {
        handleSelectedCustomer(index);
        setIsDelete(true);
    }

    const handleEditFrom = (index) => {
        handleSelectedCustomer(index);
        setIsEdit(true);
    }

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            console.log("update => ", selectedCustomer)
            const isAdult = selectedCustomer.isAdult === "Sim" ? true : false;
            const body = { ...selectedCustomer, isAdult }
            await privateResourceAxios.put(RESOURCE_URI, body);
            setIsEdit(false);
            setEditSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {


        try {
            await privateResourceAxios.delete(`${RESOURCE_URI}/${selectedCustomer.id}`);
            setIsDelete(false);
            setDeleteSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

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
        } catch (error) {
            console.log(error);
            alert("Servidor não está respondendo...")
        }
    };

    useEffect(() => {
        getCustomers();
    }, [incToGetCustomers]);

    return (
        <section className={styles.container}>
            <div className='d-flex justify-content-between'>
                <h1
                    className={"fs-4 fw-bold align-self-center"}
                >
                    Clientes
                </h1>
                <button
                    onClick={(e) => setIsFormOpen(true)}
                    className={`${styles.addButton} btn btn-sm`}>
                    Novo +
                </button>
            </div>
            <div className={styles.tableContainer}>
                <table style={{ width: "100%" }} {...table.getTableProps()}>
                    <thead style={{ width: "100%" }} key={1}>
                        {table.headerGroups.map(headerGroup => (
                            <tr
                                className={styles.tableHeader}
                                {...headerGroup.getHeaderGroupProps()}
                                key={1}
                            >
                                {headerGroup.headers.map((column) =>
                                    <th
                                        className='p-2'
                                        {...column.getHeaderProps()}
                                        key={column.id}
                                    >
                                        {column.render("Header")}
                                    </th>

                                )}
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
                                    key={row.original.id}
                                >
                                    {row.cells.map((cell, cellIndex) => (
                                        (cellIndex !== row.cells.length - 1 ?
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
                                                        ?
                                                        styles.offscreen
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
                isFormOpen ? <div className={styles.formContainer}>
                    <Register
                        parentData={{
                            title: "Cadastrar Cliente",
                            isCalledFromParent: true,
                            apiPath: "/customer",
                            parentName: "Cliente"
                        }}
                        dataToParent={handleDataFromChild} />
                </div> : null
            }
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
                            <h3 className='fs-5 mb-5 text-center'><span>Tem certeza que deseja excluir o cliente <strong>{selectedCustomer?.name}</strong>?</span></h3>
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
                            <label htmlFor='email'>E-mail</label>
                            <input
                                type='text'
                                name='email'
                                className={`${styles.input} text-light`}
                                value={selectedCustomer?.email}
                                disabled />
                            <label htmlFor='name'>Nome</label>
                            <input
                                type='text'
                                name='name'
                                className={styles.input}
                                value={selectedCustomer?.name}
                                onChange={(e) => setSelectedCustomer(prev => ({ ...prev, name: e.target.value }))} />
                            <label htmlFor='phone'>Telefone</label>
                            <input
                                type='text'
                                name='phone'
                                className={styles.input}
                                value={selectedCustomer?.phoneNumber}
                                onChange={(e) => setSelectedCustomer(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                            <div className='d-flex justify-content-around mt-4'>
                                <button className='btn btn-success w-25' type='submit'>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => handleSettingsClose("edit")}>Não</button>
                            </div>
                        </form>
                    </div>
                    :
                    null
            }
        </section>
    )
}
