/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken";
import { privateResourceAxios } from "../api/axios";


const usePrivateResourceAxios = () => {
    const { auth } = useAuth();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = privateResourceAxios.interceptors.request.use(config => {
            if (!config?.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        const responseInterceptor = privateResourceAxios.interceptors.response.use(
            response => response, async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return privateResourceAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            privateResourceAxios.interceptors.request.eject(requestInterceptor);
            privateResourceAxios.interceptors.response.eject(responseInterceptor);
        }


    }, [auth, refreshToken]);

    return privateResourceAxios;

}

export default usePrivateResourceAxios;