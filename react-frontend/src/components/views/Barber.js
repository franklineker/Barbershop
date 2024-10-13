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
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);

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
            setIncToGetBarbers(prev => prev + 1);
            setIsEdit(false);
            setEditSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {


        try {
            await privateResourceAxios.delete(`${RESOURCE_URI}/${selectedBarber.id}`);
            setIncToGetBarbers(prev => prev + 1);
            setIsDelete(false);
            setDeleteSuccess(true);
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
                    className={isFormOpen || isDelete || isEdit ? "styles.offscreen fs-4 fw-bold align-self-center" : "fs-4 fw-bold align-self-center"}
                >
                    Barbeiros
                </h1>
                <button
                    onClick={(e) => setIsFormOpen(true)}
                    className={isFormOpen || isDelete || isEdit ? styles.offscreen : `${styles.addButton} btn btn-sm`}>
                    Novo +
                </button>
            </div>
            <div className={isFormOpen || isDelete || isEdit ? "" : styles.tableContainer} >

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
                                            <td className='p-2 fw-bold' key={cellIndex} {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                            :
                                            <td className='d-flex py-2 justify-content-end'>
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faPencil}
                                                    className={isFormOpen ? styles.offscreen : (`${styles.settingsButton} ${styles.pencilButton} mx-2`)}
                                                    onClick={(e) => handleEditFrom(rowIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    type='button'
                                                    icon={faTrash}
                                                    className={isFormOpen ? styles.offscreen : (`${styles.settingsButton} ${styles.trashButton} mx-2`)}
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
                            title: "Cadastrar Barbeiro",
                            isCalledFromParent: true,
                            apiPath: "/barber",
                            parentName: "Barbeiro"
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
                            onClick={() => setDeleteSuccess(false)}
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
                            <h3 className='fs-5 mb-5 text-center'><span>Tem certeza que deseja excluir o barbeiro <strong>{selectedBarber?.name}</strong>?</span></h3>
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
                editSuccess ?
                    <div className={`${styles.editSuccess}`}>
                        <FontAwesomeIcon icon={faCheckCircle} className='text-success fs-5 mx-2 mb-1' />
                        <span className='fs-6'>
                            Salvo!
                        </span><br />
                        <button
                            className='btn btn-sm btn-light w-50'
                            onClick={() => setEditSuccess(false)}
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
                            <label htmlFor='name'>Nome</label>
                            <input
                                type='text'
                                name='name'
                                className='mb-2'
                                value={selectedBarber?.name}
                                onChange={(e) => setSelectedBarber(prev => ({ ...prev, name: e.target.value }))} />
                            <label htmlFor='phone'>Telefone</label>
                            <input
                                type='text'
                                name='phone'
                                className='mb-2'
                                value={selectedBarber?.phoneNumber}
                                onChange={(e) => setSelectedBarber(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                            <label htmlFor='email'>E-mail</label>
                            <input
                                type='text'
                                name='email'
                                className='mb-2'
                                value={selectedBarber?.email}
                                disabled />
                            <div className='d-flex justify-content-around mt-4'>
                                <button className='btn btn-success w-25' type='submit'>Sim</button>
                                <button className='btn btn-danger w-25' onClick={() => setIsEdit(false)}>Não</button>
                            </div>
                        </form>
                    </div>
                    :
                    null
            }

        </section>
    )
}

