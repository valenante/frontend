import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Footer from './components/Footer';
import MesaQR from './components/MesaQr';
import CodigoQR from './components/CodigosQR';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/abrir-mesa/:numeroMesa" element={<MesaQR />} />
                <Route path="/nuestra-carta" element={<Menu />} />
                <Route path="/codigo-qr/:numeroMesa" element={<CodigoQR />} /> {/* Cambia aquí para capturar el número de mesa */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
