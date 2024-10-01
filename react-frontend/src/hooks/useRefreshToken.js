import useAuth from "./useAuth"
import { authAxios } from './../api/axios';

const env = process.env;

const useRefreshToken = () => {

    const { auth, setAuth } = useAuth();

    const refreshToken = async () => {
        try {

            const body = new URLSearchParams();
            body.set("REACT_APP_GRANT_TYPE", "refresh_token");
            body.set("refresh_token", auth?.refreshToken);

            const response = await authAxios.post(env.REACT_APP_TOKEN_URL, body,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic " + btoa(`${env.REACT_APP_CLIENT_ID}: ${env.REACT_APP_CLIENT_SECRET}`)
                    }
                });

            await setAuth(prevAuth => {
                return {
                    ...prevAuth,
                    accessToken: response.data.access_token
                }
            });
            return response.data.access_token;
        } catch (error) {
            console.log("erro refresh token", error);
        }
    }

    return refreshToken;

}

export default useRefreshToken;