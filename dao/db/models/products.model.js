import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true,
        enum: ['Hogar', 'Cocina', 'Higiene']
    },
    stock: {
        type: Number,
        default: 10
    }
})

productSchema.plugin(paginate)


export const Product = mongoose.model('Product', productSchema)