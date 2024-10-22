# Back

Nuestro Back tendrá una API Rest con rutas para Auth y Usuarios. También poseerá un middleware para proteger rutas privadas.

- [x] Crear Back con Express y dependencias (cors, nodemon, dotenv, mongoose)
- [x] Instalar dependencias de Auth (bcrypt, jsonwebtoken)
- [x] Crear variables de entorno
- [x] Archivo de config.js
- [x] Crear el archivo index.js
- [x] Página de inicio del backend
- [x] Crear archivo de rutas index.routes.js (rutas más ordenadas)
- [x] Crear controladores para las rutas (usuarios.controller.js)
- [] Crear una ruta protegida (/admin)
- [] Hash con Bcrypt
- [] JWT con JsonWebToken para protección de rutas privadas
- [] Crear middleware auth.js que devuelve true siempre
- [] Esquemas de Mongoose para usuarios (nombre, email, contraseña)
- [] Conexión a MongoDB Atlas
- [] Testing
- [] Upload de Archivos (Multer)

1. Crear Back con Express y dependencias.
```bash
npm init -y
npm i express mongoose dotenv cors
npm i nodemon -D
npm i bcrypt jsonwebtoken
npm i multer
```
y cambiar el package.json
```json
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    },
```

2. Crear variables de entorno
```bash
PORT = "3000"
DOMAIN = "http://localhost"
MONGO_URI = "mongodb+srv://guecolmar:iOmPwThYD9p3FQPn@cluster0.tzkzh.mongodb.net/ca_marmota?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET = "3804654c6e96ba5f96128f098877179c"
```

3. Archivo de config.js
```js
import dotenv from 'dotenv';
dotenv.config();

// Para que vercel acceda a nuestra carpeta public
import path from 'path';
export const __dirname = path.resolve();

export const PORT = process.env.PORT || 5000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

export const URL = `${DOMAIN}:${PORT}`;

export const DB = process.env.MONGO_URI;

export const JWT_SECRET = process.env.JWT_SECRET || "utiliza_otra_clave_segura_no_esta"
```

4. Creamos el archivo index.js
```js
import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js'
import { PORT, DOMAIN, URL } from './config/config.js'
import { connectDB } from './data/mongodb.js';
import path from "path";
import { upload } from './middlewares/multer.js';
import { __dirname } from './config/config.js';

// Crear la aplicación de express
const app = express();

// Middlewares
// Conectar a la base de datos
connectDB();

// Para subir archivos estaticos desde el servidor (vercel)
app.use(express.static(path.join(__dirname, "public"))) 
// Comunicación entre servidores
app.use(cors());
// Para que express entienda json
app.use(express.json());
// true para parsear arrays y objetos complejos
app.use(express.urlencoded({extended: true}));
// Rutas de la API que serán el localhost:3000 + /api/v1 + /ruta
app.use("/api/v1", indexRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);

    const responseAPI = {
        status: "error",
        msg: "Error en la API",
        error: err.message,
        code: 500
    }

    res.status(500).send(responseAPI)
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${URL}`);
})
```

5. Página de inicio del backend
Nota: Para la página inicial del backend, Podemos crear dentro del archivo index.js una ruta que devuelva un mensaje de bienvenida.
```js
app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html")
    const hola = `<h1>Bienvenidos a nuestra REST-API</h1>
    <p> Este proyecto trata de un hotel </p>`
    res.status(200).send(hola)
});
```
o en public un archivo index.html normal
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ca marmota</title>
</head>
<body>
    <h1>Bienvenido a la API de la Marmota</h1>
    <p>Esta es mi pagina home de back-end de Express del proyecto hotel</p>
</body>
</html>
```

6. Crear archivo de rutas index.routes.js
```js
import {Router} from "express"
import { createRegister, authLogin } from "../controllers/usuarios.controller.js";
const router = Router();

// Rutas
// Registro de usuarios
router.post('/register', createRegister);
router.post('/login', authLogin);
// router.get('/users', getUsers);

export default router;
```


Clase 38 25:00 min