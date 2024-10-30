import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plato from './Plato';
import Carrito from './Carrito';
import PreferenciasEntrega from './PreferenciasEntrega';
import { useLocation } from 'react-router-dom';
import HistorialPedidos from './HistorialPedidos';

const Menu = () => {
    const [platos, setPlatos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [mesaAbierta, setMesaAbierta] = useState(false);
    const [mesa, setMesa] = useState({});
    const [cargando, setCargando] = useState(true);
    const location = useLocation();
    const numeroMesa = new URLSearchParams(location.search).get('mesa');
    const LIMIT = 10;

    useEffect(() => {
        const verificarOMeterMesa = async (intentos = 3) => {
            if (!numeroMesa) return;
    
            try {
                const verificarResponse = await fetch(`http://192.168.1.132:3000/api/mesas/verificar-mesa/${numeroMesa}`);
                if (!verificarResponse.ok) throw new Error('Error al verificar la mesa');
                const verificarData = await verificarResponse.json();
    
                if (verificarData.abierta) {
                    setMesaAbierta(true);
                    setMensaje(`Mesa ${numeroMesa} ya está abierta.`);
                    setMesa({ ...mesa, _id: verificarData._id }); // Guarda el ID de la mesa
                } else {
                    const abrirResponse = await fetch(`http://192.168.1.132:3000/api/mesas/abrir-mesa/${numeroMesa}`, {
                        method: 'POST',
                    });
                    if (!abrirResponse.ok) throw new Error('Error al abrir la mesa');
                    const abrirData = await abrirResponse.json();
    
                    if (abrirData.abierta) {
                        setMesaAbierta(true);
                        setMensaje(`Mesa ${numeroMesa} ha sido abierta.`);
                        setMesa({ ...mesa, _id: abrirData._id }); // Guarda el ID de la mesa
                    }
                }
            } catch (error) {
                if (intentos > 1) {
                    console.warn(`Error al verificar o abrir la mesa. Reintentando... (${intentos - 1} intentos restantes)`);
                    verificarOMeterMesa(intentos - 1);
                } else {
                    console.error('Error al verificar o abrir la mesa:', error);
                    setMensaje("Hubo un error al verificar o abrir la mesa.");
                }
            } finally {
                setCargando(false);
            }
        };
    
        verificarOMeterMesa();
    }, [mesa, numeroMesa]);
    
    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await fetch('http://192.168.1.132:3000/api/platos');
                if (!response.ok) throw new Error('Error en la conexión al backend');
                const data = await response.json();
                setPlatos(data);
            } catch (error) {
                console.error('Error al hacer la solicitud:', error);
            }
        };

        fetchPlatos();
    }, []);

    

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!mesaAbierta) {
        return <div>{mensaje}</div>;
    }
    

    const agregarAlCarrito = (plato) => {
        if (!mesaAbierta) {
            alert("La mesa no está abierta. No puedes agregar platos al carrito.");
            return;
        }
        if (carrito.length < LIMIT) {
            const existe = carrito.find(item => item._id === plato._id);
            if (existe) {
                setCarrito(carrito.map(item =>
                    item._id === plato._id ? { ...item, cantidad: item.cantidad + 1 } : item
                ));
            } else {
                setCarrito([...carrito, { ...plato, cantidad: 1 }]);
            }
        } else {
            alert(`No puedes añadir más de ${LIMIT} platos al carrito.`);
        }
    };

    const eliminarDelCarrito = (platoId) => {
        setCarrito(carrito => {
            const plato = carrito.find(item => item._id === platoId);
            if (plato && plato.cantidad > 1) {
                return carrito.map(item =>
                    item._id === platoId ? { ...item, cantidad: item.cantidad - 1 } : item
                );
            } else {
                return carrito.filter(item => item._id !== platoId);
            }
        });
    };

    const enviarPedido = async () => {
        if (!numeroMesa) {
            alert('Por favor, introduce el número de mesa.');
            return;
        }

        try {
            const response = await fetch('http://192.168.1.132:3000/api/pedidos/crear-pedido', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productos: carrito.map(plato => ({
                        platoId: plato._id,
                        cantidad: plato.cantidad || 1
                    })),
                    total: carrito.reduce((total, plato) => total + plato.precio * (plato.cantidad || 1), 0),
                    numeroMesa,
                    mensaje
                }),
            });

            if (!response.ok) throw new Error('Error al enviar el pedido');
            const data = await response.json();
            console.log(data.message);
            setCarrito([]);
            setMensaje('');
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Menú</h2>
            <div className="row">
                {platos.map(plato => (
                    <Plato key={plato._id} plato={plato} agregarAlCarrito={agregarAlCarrito} />
                ))}
            </div>
            <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
            <PreferenciasEntrega mensaje={mensaje} setMensaje={setMensaje} />
            <button
                className="btn btn-success mt-4"
                onClick={enviarPedido}
                disabled={carrito.length === 0 || !mesaAbierta}
            >
                Enviar Pedido
            </button>
            <HistorialPedidos idMesa={mesa._id} />
        </div>
    );
};

export default Menu;
