import { useMemo, useState } from 'react';
import usePrivateResourceAxios from './usePrivateResourceAxios';
import { useEffect } from 'react';

const CUSTOMERS_URI = '/customer'

const useCustomers = () => {

    const privateResourceAxios = usePrivateResourceAxios();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await privateResourceAxios.get(CUSTOMERS_URI);
                setCustomers(response.data);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };

        fetchCustomers();
    }, [privateResourceAxios]);

    return { customers, error };
}

export default useCustomers;