import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useParams, useNavigate } from 'react-router-dom';

const CodigoQR = () => {
    const { numeroMesa } = useParams(); // Obtener el número de mesa de la URL
    const navigate = useNavigate(); // Para redirigir al usuario

    useEffect(() => {
        const abrirMesa = async () => {
            try {
                // Solicitud para abrir la mesa
                const response = await fetch(`http://192.168.1.132:3001/api/mesas/abrir-mesa/${numeroMesa}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al abrir la mesa');
                }

                // Redirigir al menú con el número de mesa en la URL si la mesa se abre correctamente
                navigate(`/nuestra-carta?mesa=${numeroMesa}`);
            } catch (error) {
                console.error('Error:', error);
                // Opcional: manejar el error
            }
        };

        // Llamar a abrirMesa solo si numeroMesa está definido
        if (numeroMesa) {
            abrirMesa();
        }
    }, [numeroMesa, navigate]);

    // Verificar que numeroMesa esté definido antes de mostrar el QR
    if (!numeroMesa) {
        return <p>No se ha proporcionado un número de mesa.</p>;
    }

    // Generar la URL de redirección del QR para abrir el menú
    const qrValue = `http://192.168.1.132:3001/nuestra-carta?mesa=${numeroMesa}`;

    return (
        <div>
            <h2>Código QR para la Mesa {numeroMesa}</h2>
            <QRCodeSVG value={qrValue} size={256} />
        </div>
    );
};

export default CodigoQR;
