import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const app = express();
app.use(cors());
app.use(express.json());

// Definimos las URLs: Primero intentamos leer la variable de entorno, si no existe, usamos localhost
const PRODUCT_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
const LOGIN_URL   = process.env.LOGIN_SERVICE_URL   || 'http://localhost:3002';
const USER_URL    = process.env.USER_SERVICE_URL    || 'http://localhost:3003';
const CART_URL    = process.env.CART_SERVICE_URL    || 'http://localhost:3004';
const BLOG_URL    = process.env.BLOG_SERVICE_URL    || 'http://localhost:3005';

console.log(`Configurando rutas...`);
console.log(`Products -> ${PRODUCT_URL}`);
console.log(`Login    -> ${LOGIN_URL}`);

// Redirigimos cada petición al microservicio correcto usando las variables
app.use('/api/products', proxy(PRODUCT_URL));
app.use('/api/login',    proxy(LOGIN_URL));
app.use('/api/users',    proxy(USER_URL));
app.use('/api/cart',     proxy(CART_URL));
app.use('/api/blog',     proxy(BLOG_URL));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Gateway corriendo en puerto ${PORT}`);
});