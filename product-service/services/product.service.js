import productos from '../data/db.js';

export const obtenerTodos = () => {
    return productos;
};

export const obtenerPorId = (id) => {
    const producto = productos.find(p => p.id === parseInt(id));
    return producto;
};

// 'datosProducto' vendrá con { name, price, image, description }
export const crear = (datosProducto) => {
    const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        // Leemos las propiedades en inglés que manda el frontend
        name: datosProducto.name,
        price: parseFloat(datosProducto.price),
        image: datosProducto.image,
        description: datosProducto.description,
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
};
export const actualizar = (id, datosActualizados) => {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        // Actualizamos solo los campos que nos envíen
        productos[index] = { ...productos[index], ...datosActualizados };
        return productos[index];
    }
    return null;
};

export const eliminar = (id) => {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        // Eliminamos el producto del array
        const eliminado = productos.splice(index, 1);
        return eliminado[0];
    }
    return null;
};