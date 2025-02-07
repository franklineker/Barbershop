/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import usePrivateResourceAxios from './usePrivateResourceAxios';
import { useEffect } from 'react';

const CUSTOMERS_URI = '/customer'

const useCustomers = () => {

    const privateResourceAxios = usePrivateResourceAxios();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);

    const fetchCustomers = useCallback(async () => {
        try {
            const response = await privateResourceAxios.get(CUSTOMERS_URI);
            setCustomers(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return { customers, error, fetchCustomers };
}

export default useCustomers;