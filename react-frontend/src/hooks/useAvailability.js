/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import usePrivateResourceAxios from "./usePrivateResourceAxios";

const AVAILABILITY_URI = "/availability";

const useAvaliability = () => {

    const privateResourceAxios = usePrivateResourceAxios();
    const [availability, setAvailability] = useState(null);
    const [error, setError] = useState(null);

    const fetchAvailability = useCallback(async () => {
        try {
            const response = await privateResourceAxios.get(AVAILABILITY_URI + "/1");
            const [startHours, startMinutes] = response?.data?.start.split(":");
            const [endHours, endMinutes] = response?.data?.end.split(":");
            const currentAvailability = {
                id: response.data.id,
                start: `${startHours}:${startMinutes}`,
                end: `${endHours}:${endMinutes}`
            }
            console.log(currentAvailability);
            setAvailability(currentAvailability);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }, []);

    useEffect(() => {
        fetchAvailability();
    }, [fetchAvailability]);

    return { availability, setAvailability, error, fetchAvailability }
}

export default useAvaliability;