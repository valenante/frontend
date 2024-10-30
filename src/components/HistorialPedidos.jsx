import React, { useEffect, useState } from 'react';

const HistorialPedidos = ({ idMesa }) => {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mensajeError, setMensajeError] = useState('');

    useEffect(() => {
        const obtenerPedidos = async () => {
            try {
                const response = await fetch(`http://192.168.1.132:3000/api/pedidos/mesa/${idMesa}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos.');
                }
                const data = await response.json();
                setPedidos(data.pedidos);
            } catch (error) {
                console.error(error);
                setMensajeError("Hubo un problema al cargar el historial de pedidos.");
            } finally {
                setCargando(false);
            }
        };

        obtenerPedidos();
    }, [idMesa]);

    if (cargando) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2 className="mt-5 mb-4">Mi pedido</h2>
            {mensajeError && <p className="text-danger">{mensajeError}</p>}
            {pedidos.length === 0 ? (
                <p>No hay pedidos anteriores.</p>
            ) : (
                <ul className="list-group">
                    {pedidos.map(pedido => (
                        <li key={pedido._id} className="list-group-item">
                            {pedido.productos.map(producto => (
                                <p key={producto.platoId._id}>
                                    Plato: {producto.platoId.nombre} - Cantidad: {producto.cantidad}
                                </p>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistorialPedidos;
