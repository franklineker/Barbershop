import '../../App.css';
import React from 'react';
import Menu from './Menu';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className='App'>
            <Menu />
            <div className='d-flex flex-column block2'>
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    )
}
