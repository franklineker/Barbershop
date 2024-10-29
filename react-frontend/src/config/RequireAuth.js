import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth({ allowedRoles }) {

    const location = useLocation();
    const { auth } = useAuth();

    if (auth?.user?.roles?.find(role => allowedRoles.includes(role))) {
        return <Outlet />;
    } else if (auth?.accessToken) {
        return <Navigate to='/unauthorized' state={{ from: location }} replace />;
    } else {
        return <Navigate to='/authorization' state={{ from: location }} replace />;
    }
}

export default RequireAuth;