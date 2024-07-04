import {promises as fs} from 'fs'
import crypto from 'crypto'

export class CartManager {

    async getCarts() {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return carts
    }

    async getProductsById(id) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const cart = carts.find(e => e.id === id)
        return cart.products
    }

    async addCart(cart) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        cart.id = crypto.randomBytes(16).toString('hex')
        carts.push(cart)
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    async addProd(cid, pid) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const cart = carts.find(e => e.id === cid)
        const prodExist = cart.products.find(e => e.product === pid)
        if(prodExist){
            prodExist.quantity += 1
        }else{
            const nuevoProd = {
                "quantity": 1
            }
            nuevoProd.product = pid
            cart.products.push(nuevoProd)
        }
        await fs.writeFile(this.path, JSON.stringify(carts))
    }
}
