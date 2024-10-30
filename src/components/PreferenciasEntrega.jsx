import React from 'react';

const PreferenciasEntrega = ({ mensaje, setMensaje }) => (
    <div className="form-group mt-4">
        <label htmlFor="mensaje">Preferencia de entrega:</label>
        <select
            id="mensaje"
            className="form-control"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
        >
            <option value="todo junto">Todo junto</option>
            <option value="por separado">Por separado</option>
            <option value="como salga">Como salga</option>
        </select>
    </div>
);

export default PreferenciasEntrega;
