// Carrito.js
import React from 'react';

const Carrito = ({ carrito, eliminarDelCarrito }) => (
    <div>
        <h2 className="mt-5 mb-4">Carrito</h2>
        {carrito.length === 0 ? (
            <p>No hay platos en el carrito.</p>
        ) : (
            <div className="list-group">
                {carrito.map(plato => (
                    <div className="list-group-item d-flex justify-content-between align-items-center" key={plato._id}>
                        <div>
                            <h5>{plato.nombre} (Cantidad: {plato.cantidad || 1})</h5>
                            <p>Precio: ${(plato.precio * (plato.cantidad || 1)).toFixed(2)}</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => eliminarDelCarrito(plato._id)}>Eliminar</button>
                    </div>
                ))}
                <h4 className="mt-4">Total: ${carrito.reduce((total, plato) => {
                    const precio = plato.precio || 0;
                    return total + precio * (plato.cantidad || 1);
                }, 0).toFixed(2)}</h4>
            </div>
        )}
    </div>
);

export default Carrito;
