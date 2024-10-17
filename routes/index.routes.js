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

// router.get('/products', getProducts);
// router.get('/products/:id', getProductById);
// router.post('/products', authenticateToken, createProductByUser);
// router.put('/products/:id', updateProduct);
// router.delete('/products/:id', deleteProduct);

// // router.get('/users', getUsers);
// router.get('/usuarios/:username', getUserByUsername);
// router.post('/users', createUser);
// router.put('/usuarios/:id', updateUser);
// router.delete('/usuarios/:id', deleteUser);

export default router;