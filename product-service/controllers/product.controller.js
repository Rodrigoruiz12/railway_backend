// Capa de Controlador: Maneja las peticiones HTTP (req, res).
import * as servicioProducto from '../services/product.service.js';

export const obtenerTodosLosProductos = (req, res) => {
    const todosLosProductos = servicioProducto.obtenerTodos();
    res.json(todosLosProductos);
};

export const obtenerProductoPorId = (req, res) => {
    const producto = servicioProducto.obtenerPorId(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

export const crearProducto = (req, res) => {
    const nuevoProducto = servicioProducto.crear(req.body);
    res.status(201).json(nuevoProducto);
};

export const actualizarProducto = (req, res) => {
    const productoActualizado = servicioProducto.actualizar(req.params.id, req.body);
    if (productoActualizado) {
        res.json(productoActualizado);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

export const eliminarProducto = (req, res) => {
    const productoEliminado = servicioProducto.eliminar(req.params.id);
    if (productoEliminado) {
        res.json({ message: 'Producto eliminado con éxito', producto: productoEliminado });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};