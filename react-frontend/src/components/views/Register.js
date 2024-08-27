
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Register.module.css';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authAxios } from '../../api/axios';
import { Link } from 'react-router-dom';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9-.]+\.[A-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%]).{8,24}$/;
const UPPER_REGEX = /^(?=.*[A-Z]).*$/;
const LOWER_REGEX = /^(?=.*[a-z]).*$/;
const NUM_REGEX = /^(?=.*[0-9]).*$/;
const SPECIAL_CHAR_REGEX = /^(.*[!#@$%]).*$/;
const PWD_SIZE_REGEX = /^(?=.*).{8,24}$/;
const REGISTER_URL = "/auth/user";

export default function Register() {

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailblur, setEmailBlur] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [numCheck, setNumCheck] = useState(false);
    const [upperCheck, setUpperCheck] = useState(false);
    const [lowerCheck, setLowerCheck] = useState(false);
    const [charCheck, setCharCheck] = useState(false);
    const [sizeCheck, setSizeCheck] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [MatchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const resultPwd = PWD_REGEX.test(pwd);
        const resultUpper = UPPER_REGEX.test(pwd);
        const resultLower = LOWER_REGEX.test(pwd);
        const resultNum = NUM_REGEX.test(pwd);
        const resultChar = SPECIAL_CHAR_REGEX.test(pwd);
        const resultSize = PWD_SIZE_REGEX.test(pwd);

        setValidPwd(resultPwd);
        setNumCheck(resultNum);
        setUpperCheck(resultUpper);
        setLowerCheck(resultLower);
        setCharCheck(resultChar);
        setSizeCheck(resultSize);
    }, [pwd])

    useEffect(() => {
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd, email])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const check1 = USERNAME_REGEX.test(username);
        const check2 = PWD_REGEX.test(pwd);
        console.log(check1)
        console.log(check2)
        if (!check1 || !check2) {
            setErrMsg("Entrada inválida!");
            return;
        }

        try {
            const response = await authAxios
                .post(REGISTER_URL,
                    {
                        username: username,
                        email: email,
                        password: pwd,
                        roles: ["USER"]
                    }
                );
            console.log(response?.data);
            setUsername('');
            setPwd('');
            setMatchPwd('');
            setSuccess(true);

        } catch (error) {

            const errorReason = error.response.data.reason;

            if (!error?.response) {
                setErrMsg('O servidor não está respondendo.');
            }

            if (error.response.status === 409) {
                if (errorReason === "username") {
                    setErrMsg('Nome de usuário já existe.');
                } else if (errorReason === "email") {
                    setErrMsg('e-mail já cadastrado.');
                }
                console.log(error);
            } else {
                setErrMsg("Falha ao registrar.");
            }

            errRef.current.focus();
        }

    }

    return (
        <>
            {success ?
                (
                    <section className={styles.section}>
                        <div className={`${styles.form} d-flex flex-column align-items-center`}>
                            <span>Usuário registrado com sucesso!</span><br />
                            <Link to='/authorization' className='btn btn-warning w-50'>Fazer login</Link>
                        </div>
                    </section>
                ) :
                (
                    <section section className={styles.section}>
                        <p ref={errRef} className={errMsg ? styles.errmsg : styles.offScreen} aria-live='assertive'>{errMsg}</p>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h1>Registre-se</h1>
                            <label htmlFor='username'>
                                Usuário:
                                <span className={validUsername ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validUsername || !username ? styles.hide : styles.invalid}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='username'
                                type='text'
                                ref={usernameRef}
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                            />
                            <p
                                id='uidnote'
                                className={`${usernameFocus && username && !validUsername ? styles.instructions : styles.offscreen} d-flex`}>

                                <FontAwesomeIcon icon={faInfoCircle} className='mt-1' />
                                <span className='mx-2'>
                                    Precisa ter de 4 a 24 caracteres. <br />
                                    Precisa começar com uma letra. <br />
                                    Letras, números, hífens, underlines apenas.
                                </span>
                            </p>
                            <label htmlFor='email'>
                                E-mail:
                                <span className={validEmail && emailFocus ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={!validEmail && emailFocus && email ? styles.invalid : styles.hide}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='email'
                                type='text'
                                aria-invalid={validEmail ? "false" : "true"}
                                required
                                aria-describedby="emailnote"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => {
                                    setEmailFocus(true);
                                }}
                                onBlur={() => {
                                    setEmailBlur(true);
                                    console.log(validEmail)
                                }}
                            />
                            <p id='emailnote' className={!validEmail
                                && email && emailblur ? styles.instructions : styles.offscreen}>
                                <FontAwesomeIcon icon={faTimes} className={styles.invalid} />
                                E-mail inválido.
                            </p>
                            <label htmlFor='pwd'>
                                Senha:
                                <span className={validPwd ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='pwd'
                                type='password'
                                autoComplete='off'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p
                                id='pwdnote'
                                className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={upperCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!upperCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos uma letra maúscula.
                                </span>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={lowerCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!lowerCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos uma letra minúscula.
                                </span>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={numCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!numCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos um número.
                                </span>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={charCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!charCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos um caractere especial (!#@$%).
                                </span>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={sizeCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!sizeCheck ? styles.invalid : styles.hide} />
                                    Deve conter de 8 a 24 caracteres.
                                </span>
                            </p>
                            <label htmlFor='matchPwd'>
                                Confirme a senha:
                                <span className={validMatch && matchPwd ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPwd ? styles.hide : styles.invalid}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='matchPwd'
                                type='password'
                                autoComplete='off'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="matchPwdNote"
                                onFocus={() => setMatchPwdFocus(true)}
                                onBlur={() => setMatchPwdFocus(false)}
                            />
                            <p id='matchPwdNote' className={!validMatch && matchPwd && MatchPwdFocus ? styles.instructions : styles.offscreen}>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={validMatch ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!validMatch ? styles.invalid : styles.hide} />
                                    A senha e sua confirmação devem ser iguais.
                                </span>
                            </p>

                            <button
                                className={`btn btn-lg ${styles.button}`}
                                onClick={(e) => handleSubmit(e)}
                                disabled={!validUsername || !validPwd || !validMatch || !validEmail ? true : false}>
                                Enviar
                            </button>
                        </form>
                    </section >
                )
            }
        </>
    )
}
