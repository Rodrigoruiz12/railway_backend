// Capa de Controlador: Maneja las peticiones HTTP (req, res).
import * as servicioCarrito from '../services/cart.service.js';

// Para un sistema real, el ID de usuario vendría de un Token (JWT).
// Por ahora, tu frontend deberá enviar un header 'x-user-id'.
const obtenerUsuarioId = (req) => {
    const usuarioId = req.headers['x-user-id'];
    if (!usuarioId) {
        // Si no hay ID, no podemos saber de quién es el carrito.
        throw new Error('Usuario no autenticado. Se requiere header x-user-id.');
    }
    return usuarioId;
};


export const obtenerCarritoUsuario = (req, res) => {
    try {
        const usuarioId = obtenerUsuarioId(req);
        const carrito = servicioCarrito.obtenerCarrito(usuarioId);
        res.json(carrito);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const agregarItemAlCarrito = (req, res) => {
    try {
        const usuarioId = obtenerUsuarioId(req);
        const producto = req.body; // El frontend envía el objeto producto
        const carrito = servicioCarrito.agregarItem(usuarioId, producto);
        res.json(carrito);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const eliminarItemDelCarrito = (req, res) => {
    try {
        const usuarioId = obtenerUsuarioId(req);
        const { id: productoId } = req.params;
        const carrito = servicioCarrito.eliminarItem(usuarioId, productoId);
        res.json(carrito);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


export const checkout = (req, res) => {
    try {
        const usuarioId = obtenerUsuarioId(req);
        const carritoVacio = servicioCarrito.vaciarCarrito(usuarioId);
        res.json({ message: 'Compra realizada con éxito', cart: carritoVacio });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};