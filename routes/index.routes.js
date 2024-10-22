import {Router} from "express"
// import { getProducts, getProductById, createProductByUser, updateProduct, deleteProduct } from '../controllers/productos.controller.js';
// import { getAdmin, createRegister, getUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js';
// import {authenticateToken} from '../middlewares/auth.js'
import { createRegister, authLogin } from "../controllers/usuarios.controller.js";
const router = Router();

// Rutas
// Registro de usuarios
router.post('/register', createRegister);
router.post('/login', authLogin);
// router.get('/users', getUsers);
// router.get('/admin', authenticateToken, getAdmin);

export default router;