import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Función para generar un ID aleatorio
const generarIdUnico = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9); // Genera un ID único aleatorio
};

const Plato = ({ plato, agregarAlCarrito }) => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(
        plato.precios && plato.precios.precio ? 'precio' : 
        plato.precios && plato.precios.tapa ? 'tapa' : 
        'racion'
    );

    const [modalShow, setModalShow] = useState(false);
    const [opcionesAdicionales, setOpcionesAdicionales] = useState({});
    const [uniqueId, setuniqueId] = useState(generarIdUnico());

    const manejarAgregarAlCarrito = () => {
        const precio = plato.precios ? plato.precios[opcionSeleccionada] : null;

        if (precio !== null) {
            setModalShow(true); // Mostrar el modal para seleccionar opciones adicionales
        }
    };

    const confirmarAdicion = () => {
        // Verificar si el plato tiene precios definidos y obtener el precio basado en la opción seleccionada
        const precio = plato.precios && plato.precios[opcionSeleccionada] ? plato.precios[opcionSeleccionada] : 0; // Maneja el caso en que no se encuentra el precio
    
        // Asegúrate de que estás definiendo correctamente las opciones adicionales
        const opcionesSeleccionadas = {
            nivelDeCoccion: opcionesAdicionales.nivelDeCoccion || 'Sin especificar', // Cambié a un valor por defecto
            queso: opcionesAdicionales.queso || 'Sin especificar', // Cambié a un valor por defecto
            acompañamiento: opcionesAdicionales.acompañamiento || 'Sin especificar', // Cambié a un valor por defecto
        };
    
        // Verifica que el idUnicoCarrito se esté generando correctamente
        const uniqueId = `${plato._id}-${JSON.stringify(opcionesSeleccionadas)}`;
    
        // Agregar el plato al carrito con todas las propiedades necesarias
        agregarAlCarrito({ 
plato, opcionesSeleccionadas
        });
        
    
        console.log(opcionesSeleccionadas, 'naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaops')

        // Cerrar el modal
        setModalShow(false);
    };
    
    

    const manejarCambioOpciones = (e) => {
        const { name, value } = e.target;
        setOpcionesAdicionales(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Generar un nuevo ID único cada vez que se cambia una opción
        setuniqueId(generarIdUnico());
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
                            {plato.precios.tapa !== undefined && (
                                <option value="tapa">Tapa - ${plato.precios.tapa.toFixed(2)}</option>
                            )}
                            {plato.precios.racion !== undefined && (
                                <option value="racion">Ración - ${plato.precios.racion.toFixed(2)}</option>
                            )}
                            {plato.precios.precio !== undefined && (
                                <option value="precio">Precio General - ${plato.precios.precio.toFixed(2)}</option>
                            )}
                        </select>
                    ) : (
                        <p>Precio: No disponible</p>
                    )}

                    <button className="btn btn-primary mt-3" onClick={manejarAgregarAlCarrito}>
                        Agregar al Carrito
                    </button>
                </div>
            </div>

            {/* Modal para seleccionar opciones personalizables */}
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona Opciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{plato.nombre}</h5>
                    <p>Precio: ${plato.precios[opcionSeleccionada]?.toFixed(2)}</p>
                    
                    {/* Input para quesos */}
                    {plato.opcionesQueso && (
                        <Form.Group controlId="queso">
                            <Form.Label>Selecciona un queso</Form.Label>
                            <Form.Control as="select" name="queso" onChange={manejarCambioOpciones}>
                                <option value="">-- Selecciona --</option>
                                {plato.opcionesQueso.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    )}

                    {/* Input para acompañamientos */}
                    {plato.opcionesAcompañamiento && (
                        <Form.Group controlId="acompañamiento">
                            <Form.Label>Selecciona el acompañamiento</Form.Label>
                            <Form.Control as="select" name="acompañamiento" onChange={manejarCambioOpciones}>
                                <option value="">-- Selecciona --</option>
                                {plato.opcionesAcompañamiento.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarAdicion}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Plato;
