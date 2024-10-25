import { Room } from '../data/mongodb.js';

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
};

export const roomsAvailability = async (req, res) => {
    const { checkIn, checkOut } = req.body;

    try {
        const rooms = await Room.find({});
        const availableRooms = rooms.filter(room => {
            return room.currentBookings.every(booking => {
                return (
                    new Date(checkIn) > new Date(booking.checkOut) || 
                    new Date(checkOut) < new Date(booking.checkIn)
                );
            });
        });

        res.json(availableRooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la habitación', error });
    }
};

// export const deleteProduct= async (req, res, next) => {
//     try {
//         const productId = req.params.id;
//         const deletedproduct= await Product.findByIdAndDelete(productId);
//         if(!deleteProduct) return res.status(404).json({message: "Correo no encontrado"});
//         res.json({message: "Correo eliminado correctamente"}); // Si no tiene status envia el mensaje. si le ponemos status(204) no envia mensaje
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }

// Marcar correo como leido
// export const updateProduct = async (req, res, next) => {
//     try {
//         const productId = req.params.id;

//         // Utilizamos el new: true para que nos devuelva el documento actualizado
//         // Utilizamos {isLeido:true} para marcar el correo como leido
//         const updatedproduct= await Product.findByIdAndUpdate(
//             productId,
//             {isLeido: true},
//             {new: true}    
//         )
//         if(!updateProduct) return es.status(404).json({message: "Correo no encontrado"});
//         res.status(200).json(updateProduct);

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }