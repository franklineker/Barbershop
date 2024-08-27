
import useAuth from './useAuth';


const useIsAdmin = () => {
    const { auth } = useAuth();
    const isAdmin = auth?.user?.roles.find(role => role === "ADMIN") ? true : false;

    return isAdmin;
}

const useIsLogged = () => {
    const { auth } = useAuth();
    const isLogged = auth?.accessToken ? true : false;

    return isLogged;
}

export { useIsAdmin, useIsLogged }

