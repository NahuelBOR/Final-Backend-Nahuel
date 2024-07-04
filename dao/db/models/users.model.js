import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            require: true
        },
        last_name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        cart: {
            type: [
                {
                    cart: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Cart'
                    }
                }
            ],
            require: true
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    {
        timestamps: true,
        strict: false
    })

userSchema.plugin(paginate)


export const User = mongoose.model('User', userSchema)