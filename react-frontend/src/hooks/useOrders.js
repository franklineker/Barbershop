/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import usePrivateResourceAxios from './usePrivateResourceAxios';
import { useEffect } from 'react';

const BARBER_URI = '/order'

const useOrders = () => {

    const privateResourceAxios = usePrivateResourceAxios();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        try {
            const response = await privateResourceAxios.get(BARBER_URI);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, setOrders, error, fetchOrders };
}

export default useOrders;