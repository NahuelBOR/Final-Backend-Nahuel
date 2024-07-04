import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    date: {
        type: String,
        require: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                cant: {
                    type: Number,
                }
            }
        ],
        require: true
    }
})

cartSchema.pre('find', function() {
    this.populate('products.product')
})



export const Cart = mongoose.model('Cart', cartSchema)