/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import usePrivateResourceAxios from './usePrivateResourceAxios';
import { useEffect } from 'react';

const BARBER_URI = '/barber'

const useBarbers = () => {

    const privateResourceAxios = usePrivateResourceAxios();
    const [barbers, setBarbers] = useState([]);
    const [error, setError] = useState(null);

    const fetchBarbers = useCallback(async () => {
        try {
            const response = await privateResourceAxios.get(BARBER_URI);
            setBarbers(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }, []);


    useEffect(() => {
        fetchBarbers();
    }, [fetchBarbers]);

    return { barbers, error, fetchBarbers };
}

export default useBarbers;