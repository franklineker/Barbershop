/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import CryptoJS from 'crypto-js';
import useAuth from "../../hooks/useAuth";

const AUTH_URL = process.env.REACT_APP_AUTHORIZATION_URL;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPE = process.env.REACT_APP_SCOPES;
const RESPONSE_TYPE = "code";
const RESPONSE_MODE = "form_post";
const CODE_CHALLENGE_METHOD = "S256"
const CHARACTERS = 'ABCDEFGHIJKLMNOPQWXYZabcdefghijklmnopqwxyz0123456789';

export default function Authorization() {

    const { setAuth } = useAuth();

    const handleCodeVerifier = () => {
        let codeVerifier = "";
        let charLength = CHARACTERS.length;

        for (let i = 0; i < 44; i++) {
            codeVerifier += CHARACTERS.charAt(Math.floor(Math.random() * charLength));
        };
        return codeVerifier;
    };

    const handleCodeChallenge = (codeVerifier) => {
        const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64url);
        const codeChallenge = codeVerifierHash
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        return codeChallenge;
    };

    const handleAuthorizationCode = () => {
        const codeVerifier = handleCodeVerifier();
        setAuth({ codeVerifier });
        localStorage.setItem('codeVerifier', codeVerifier);
        const challenge = handleCodeChallenge(codeVerifier);
        const body = new URLSearchParams();
        body.set('client_id', CLIENT_ID);
        body.set("redirect_uri", REDIRECT_URI);
        body.set("scope", SCOPE);
        body.set("response_type", RESPONSE_TYPE);
        body.set("response_mode", RESPONSE_MODE);
        body.set("code_challenge_method", CODE_CHALLENGE_METHOD);
        body.set("code_challenge", challenge);

        const codeURL = AUTH_URL + "?" + body.toString();

        console.log("code url => ", codeURL)

        window.location.href = codeURL;
    }

    useEffect(() => {
        handleAuthorizationCode();
    }, [])

}
