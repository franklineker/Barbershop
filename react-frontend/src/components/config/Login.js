/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
const GRANT_TYPE = process.env.REACT_APP_GRANT_TYPE;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export default function Login() {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.pathname || "/"

    const handleToken = async () => {

        const seachParams = new URLSearchParams(window.location.search);
        const code = seachParams.get("code");
        const codeDecoded = decodeURIComponent(code);
        const codeVerifier = localStorage.getItem("codeVerifier");
        console.log("verifier on login ==> ", codeVerifier)

        const body = new URLSearchParams();
        body.set("grant_type", GRANT_TYPE);
        body.set("client_id", CLIENT_ID);
        body.set("redirect_uri", REDIRECT_URL);
        body.set("code_verifier", codeVerifier);
        body.set("code", codeDecoded);


        try {
            const response = await axios.post(TOKEN_URL, body, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET
                }
            });

            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            const decodedToken = jwtDecode(accessToken);
            const roles = decodedToken.roles;

            setAuth((prevAuth => ({
                ...prevAuth,
                refreshToken: refreshToken,
                accessToken: accessToken,
                user: {
                    roles: roles
                }
            })));

            localStorage.removeItem("codeVerifier");
            navigate(from, { replace: true });

        } catch (error) {
            console.log("error no token ==> ", error);
            if (!error?.response) {
                alert("Servidor de autenticação não está respondendo...")
            }
        }

    }

    useEffect(() => {
        handleToken();
    }, [])

}
