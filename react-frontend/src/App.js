import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './config/Login';
import Authorization from './config/Authorization';
import Profile from './views/Profile';
import Help from './views/Help';
import RequireAuth from './config/RequireAuth';
import Layout from './templates/Layout';
import Unauthorized from './views/Unauthorized';
import Reports from './views/Reports';
import Security from './views/Security';
import Agenda from './views/Agenda';
import Barber from './views/Barber';
import Customer from './views/Customer';
import { AgendaProvider } from './context/AgendaProvider';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* public routes */}
                <Route path='' element={<Home />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='authorization' element={<Authorization />} />
                <Route path='help' element={<Help />} />
                <Route path='unauthorized' element={<Unauthorized />} />

                {/* private routes: must be logged in*/}
                <Route element={<RequireAuth allowedRoles={['CUSTOMER', 'ADMIN']} />}>
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['CUSTOMER', 'ADMIN']} />}>
                    <Route path='security' element={<Security />} />
                </Route>

                {/* private routes: must be an ADMIN */}
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='reports' element={<Reports />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='agenda' element={
                        <AgendaProvider>
                            <Agenda />
                        </AgendaProvider>
                    } />
                </Route>
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='barbers' element={< Barber />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='customers' element={< Customer />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App;
