// Capa de Rutas: Define los endpoints para el carrito.
import { Router } from 'express';
import {
    obtenerCarritoUsuario,
    agregarItemAlCarrito,
    eliminarItemDelCarrito
} from '../controllers/cart.controller.js';

const router = Router();

// GET /api/cart (Obtiene el carrito del usuario)
router.get('/', obtenerCarritoUsuario);

// POST /api/cart/item (Agrega un item al carrito)
router.post('/itemlo', agregarItemAlCarrito);

// DELETE /api/cart/item/5 (Elimina un item por su ID)
router.delete('/itemlo/:id', eliminarItemDelCarrito);

export default router;