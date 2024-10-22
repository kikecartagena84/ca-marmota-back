import {Router} from "express"
// import { getProducts, getProductById, createProductByUser, updateProduct, deleteProduct } from '../controllers/productos.controller.js';
// import { getAdmin, createRegister, getUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js';
import {authenticateToken} from '../middlewares/auth.js'
import { users, login, register, admin } from "../controllers/usuarios.controller.js";
import { createRegister, getUsers, authLogin, getAdmin } from "../controllers/usuarios.controller.js";
const router = Router();

// -------------------------  pruebas ----------------------------
router.get('/usersPrueba', users);
router.post('/loginPrueba', login);
router.post('/registerPrueba', register);
router.get('/adminPrueba', admin);

// -------------------------  pruebas ----------------------------

// Rutas
// Registro de usuarios
router.post('/register', createRegister);
router.post('/login', authLogin);
router.get('/users', getUsers);
router.get('/admin', authenticateToken, getAdmin);

export default router;