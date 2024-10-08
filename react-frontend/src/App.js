import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/views/Home';
import Register from './components/views/Register';
import Login from './components/config/Login';
import Authorization from './components/config/Authorization';
import Profile from './components/views/Profile';
import Contact from './components/views/Contact';
import Help from './components/views/Help';
import RequireAuth from './components/config/RequireAuth';
import Layout from './components/templates/Layout';
import Unauthorized from './components/views/Unauthorized';
import Reports from './components/views/Reports';
import Security from './components/views/Security';
import Agenda from './components/views/Agenda';
import Barber from './components/views/Barber';
import Users from './components/views/Users';

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
                <Route path='contact' element={<Contact />} />

                {/* private routes: must be logged in*/}
                <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
                    <Route path='security' element={<Security />} />
                </Route>

                {/* private routes: must be an ADMIN */}
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='reports' element={<Reports />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='agenda' element={<Agenda />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='barbers' element={< Barber />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path='users' element={< Users />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App;
