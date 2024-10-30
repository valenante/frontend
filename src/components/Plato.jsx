import React, { useState } from 'react';

const Plato = ({ plato, agregarAlCarrito }) => {
    // Estado para manejar la opción seleccionada (tapa o ración)
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(
        plato.precios && plato.precios.tapa ? 'tapa' : 'precio'
    );

    const manejarAgregarAlCarrito = () => {
        // Obtiene el precio basado en la opción seleccionada
        const precio = plato.precios ? plato.precios[opcionSeleccionada] : plato.precio;
        
        // Agrega al carrito, asegurando que se pase la cantidad correctamente
        agregarAlCarrito({ ...plato, precio, cantidad: 1 });
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{plato.nombre}</h5>
                    <p className="card-text">{plato.descripcion}</p>

                    {plato.precios ? (
                        <select
                            value={opcionSeleccionada}
                            onChange={(e) => setOpcionSeleccionada(e.target.value)}
                        >
                            <option value="tapa">Tapa - ${plato.precios.tapa.toFixed(2)}</option>
                            <option value="racion">Ración - ${plato.precios.racion.toFixed(2)}</option>
                        </select>
                    ) : (
                        <p>Precio: ${plato.precio.toFixed(2)}</p>
                    )}

                    <button className="btn btn-primary mt-3" onClick={manejarAgregarAlCarrito}>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Plato;
