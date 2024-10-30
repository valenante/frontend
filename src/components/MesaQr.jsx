import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MesaQR = () => {
    const { numeroMesa } = useParams(); // Obtener el número de mesa de la URL
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Usar navigate para redirigir al menú

    useEffect(() => {
        const abrirMesa = async () => {
            try {
                const response = await fetch(`http://192.168.1.132:3000/api/mesas/abrir-mesa/${numeroMesa}`, {
                    method: 'POST', // Usar POST
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al abrir la mesa');
                }

                const data = await response.json();
                setMensaje(data.message);
                
                // Redirigir al menú después de abrir la mesa
                localStorage.setItem('mesaAbierta', numeroMesa); // Guardar en Local Storage
                navigate('/nuestra-carta'); // Cambia '/nuestra-carta' por la ruta de tu menú
            } catch (error) {
                console.error('Error:', error);
                setMensaje('Error al abrir la mesa');
            }
        };

        abrirMesa(); // Llamar a la función al montar el componente
    }, [numeroMesa, navigate]);

    return (
        <div>
            <h2>Estado de la Mesa</h2>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default MesaQR;
