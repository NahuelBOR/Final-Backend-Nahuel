import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    mensaje: {
        type: String,
        require: true
    }
})



export const Messages = mongoose.model('Messages', chatSchema)