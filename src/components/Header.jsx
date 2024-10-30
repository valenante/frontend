import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoZf.webp';
import { FaFacebook, FaInstagram, FaGoogle, FaTripadvisor } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
    return (
        <div className="bg text-black p-3">
            <div className="container">
                <div className="row align-items-center">
                    {/* Columna del logo */}
                    <div className="col-md-12 d-flex justify-content-center gap-3" style={{ borderBottom: '1px solid black', paddingBottom: '30px' }}>
                        <img src={logo} alt="Zabor Fetén" />
                    </div>
                </div>
            </div>

            <div className="bg text-black p-4">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Columna de navegación */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <nav className="text-center">
                                <Link to="/" className="text-decoration-none text-purple mx-2 large-text">Inicio</Link> |
                                <Link to="/nuestra-carta" className="text-decoration-none text-purple mx-2 large-text">Nuestra Carta</Link> |
                                <Link to="/blog" className="text-decoration-none text-purple mx-2 large-text">Blog</Link> |
                                <Link to="/encuesta" className="text-decoration-none text-purple mx-2 large-text">Encuesta</Link>
                            </nav>
                        </div>


                        {/* Columna de enlaces de contacto */}
                        <div className="col-md-6 d-flex flex-row justify-content-center align-items-center gap-4">
                            {/* Fila de email */}
                            <p className="mb-0 contact-text">
                                <a href="mailto:zaborfeten@gmail.com" className="text-decoration-none text-purple">zaborfeten@gmail.com</a>
                            </p>

                            {/* Fila de teléfonos */}
                            <p className="mb-0 contact-text">
                                <a href="tel:665925413" className="text-decoration-none text-purple">665 92 54 13</a> <br></br>
                                <a href="tel:622024285" className="text-decoration-none text-purple">622 024 285</a>
                            </p>

                            {/* Fila de íconos de redes sociales */}
                            <div className="d-flex gap-3">
                                <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FaGoogle color="black" /></a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook color="black" /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram color="black" /></a>
                                <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><FaTripadvisor color="black" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;
