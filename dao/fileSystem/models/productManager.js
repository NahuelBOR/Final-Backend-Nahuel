import {promises as fs} from 'fs'
import crypto from 'crypto'

export class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return prods
    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(e => e.id === id)
        return prod
    }

    async addProduct(prod) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const existProd = prods.find(e => e.code === prod.code)
        if(existProd){
            return false
        }else{
            prod.id = crypto.randomBytes(16).toString('hex')
            prods.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }
    }

    async updateProductById(id, producto) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(e => e.id === id)
        if(prod){
            prod.title = producto.title  
            prod.description = producto.description
            prod.code = producto.code
            prod.price = producto.price
            prod.status = producto.status
            prod.stock = producto.stock
            prod.thumbenail = producto.thumbenail
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }else{
            return false
        }
    }

    async deleteProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(e => e.id === id)
        if(prod){
            await fs.writeFile(this.path, JSON.stringify(prods.filter(e => e.id !== id)))
            return true
        }else{
            return false
        }
    }
}
