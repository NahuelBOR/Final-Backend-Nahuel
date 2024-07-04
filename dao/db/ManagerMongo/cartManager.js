import { Cart } from '../models/carts.model.js'

export class CartManagerMongo{

    async allCarts(){
        try{
            let resp = await Cart.find()
            return resp
        }catch(err){
            return 'Error: ', err
        }
    }

    async addCart(prod){
        try{
            await Cart.create(prod)
            return 'Carrito creado'
        }catch(err){
            return 'Error: ', err
        }
    }

    async getCartById(id){
        try{
            let resp = await Cart.findById(id)
            return resp
        }catch(err){
            return 'Error: ', err
        }
    }

    async updateCartById(id, change) {
        try{
            await Cart.findByIdAndUpdate(id, change)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }

    async addProductById(cid, pid) {
        try{
            let cart = await Cart.findOne({_id: cid})
            cart.products.push({product: pid})
            await Cart.updateOne({_id: cid}, cart)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }


    async acctualizaProd(cid, pid, body) {
        try{       
            let resp = await Cart.findById(cid)
            let index = resp.products.findIndex( x => x.product == pid )
            if (index < 0) {
                return false
            }
            resp.products[index].cant = body
            await Cart.findByIdAndUpdate(cid, resp)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }

    async deleteCartById(id) {
        try{
            await Cart.findByIdAndDelete(id)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }

    async deleteCart(cid) {
        try{
            let resp = await Cart.findById(cid)
            resp.products = []
            await Cart.findByIdAndUpdate(cid, resp)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }

    async deleteProductById(cid, pid) {
        try{
            let resp = await Cart.findById(cid)
            let index = resp.products.findIndex( x => x.product == pid )
            if (index < 0) {
                return false
            }
            resp.products.splice( index, 1 );
            await Cart.findByIdAndUpdate(cid, resp)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }
}