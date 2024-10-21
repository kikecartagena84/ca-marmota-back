import { User } from '../data/mongodb.js';
// Hash y JWT
import bcrypt from 'bcrypt' // Hacer hash a nuestros pass
import jwt from 'jsonwebtoken' // Crear y leer token
import { PORT, DOMAIN, JWT_SECRET, __dirname } from '../config/config.js';

// Bases de datos ficticias:
const users = []

export const MockUser = {
    name:"Marta",
    username:"marta@gmail.com",
    password:"1234",
    image: 'https://picsum.photos/200'
}

export const getUsers = async (req, res, next) => {
    try {
        res.status(200).json({data: users, message: "Correcto users"})
    } catch (error) {
        res.status(500).json({error: "Error en el servidor"})
    }
}

export const authLogin = async (req, res, next) => {

try {
    const {username, password} = req.body;
    const user = User.findOne({ username: username });

    if (!user) {
        return res.status(400).json({message: "Usuario no encontrado"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({message: "Clave incorrecta"})
    }

    // Crear jwt y devuelvo el usuario

    // create and sign a new token(contenido purpura, llave privada, opciones(cuado expira))
    const token = jwt.sign({username:username}, JWT_SECRET, {expiresIn: '5h'});

    res.status(200).json({data: user, message: "Correcto login", token})
    } catch (error) {
        res.status(500).json({error: "Error en el servidor"})
    }
}

export const createRegister =  async (req, res, next) => {
    try {
        const id = Math.floor(Math.random()*10000)+1;
        const {name, username, password, image='https://picsum.photos/200'} = req.body;
        // Hash de contraseña con bcrypt(importante el orden)
        //                                      (contraseña, vueltas del algoritmo)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Esto es para la base de datos ficticia (hago push xq mando un json)
        // const newUser = {id, name, username, password:hashedPassword, image};
        // users.push(newUser);

        // Esto es para la base de datos mongo (hago save xq una colección)
        const newUser = new User({name, username, password:hashedPassword, image:"https://picsum.photos/200"});
        await newUser.save();

        // Obtener el usuario recien creado
        const user = User.find((u) => u.username === username)
        // const user = users.find((u) => {id === id})

        res.status(200).json({data: user, message: "Correcto register"})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

export const getAdmin =  async (req, res, next) => {
    try {
        res.status(200).json({message: "Correcto admin privado"})
    } catch (error) {
        res.status(500).json({error: "Error en el servidor"})
    }
}

export const getUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.id;
        const user = await User.findById(username);
        if(!user) return res.status(404).json({message: "Usuario no encontrado, revisa el ID"})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        const newUser = new User({username, email, password});
        await newUser.save();  // Guuarda el nuevo documento en la base de datos. 
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) return res.status(404).json({message: "Usuario no encontrado"});
        res.json({message: "Usuario eliminado correctamente"}); // Si no tiene status envia el mensaje. si le ponemos status(204) no envia mensaje
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const {username, email, password} = req.body;

        // Utilizamos el new: true para que nos devuelva el documento actualizado
        const updatedUser = await User.findByIdAndUpdate(userId, {username, email, password}, {new: true});
        if(!updatedUser) return res.status(404).json({message: "Usuario no encontrado"});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// export const updateEmail = async (req, res, next) => {
//     try {
//         const correoId = req.params.id;
//
//         // Utilizamos el new: true para que nos devuelva el documento actualizado
//         // Utilizamos {isLeido:true} para marcar el correo como leido
//         const updatedemail = await
//         Email.findByIdAndUpdate(
//             correoId,
//             {isLeido: true},
//             {new: true}
//         )

//         if(!updateEmail) return es.status(404).json({message: "Correo no encontrado"});
//         res.status(200).json(updateEmail);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }

// }


